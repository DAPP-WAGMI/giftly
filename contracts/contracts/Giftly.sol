// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GiftlyProtocol is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private tokenCounter;

    string private collectionURI;

    uint256 public MAX_TOTAL_SUPPLY;

    uint256 public constant FEE_PERCENTAGE = 2;

    mapping(uint256 => string) public tokenIdToURI;
    mapping(uint256 => uint256) public tokenIdToBalance;
    mapping(uint256 => address) public tokenIdToTokenAddress;
    mapping(uint256 => mapping(address => bool)) public tokenIdToClaimers;

    // ========= EVENTS =========
    event Gift(address _recipient, string _tokenURI);
    event GiftERC20(
        address _tokenAddress,
        address _recipient,
        string _tokenURI
    );
    event Claim(uint256 _tokenId);
    event ClaimPartial(uint256 _tokenId, uint256 _amount);
    event ClaimERC20(uint256 _tokenId);
    event ClaimERC20Partial(uint256 _tokenId, uint256 _amount);

    constructor(uint256 tokenSupply) ERC721("Giftly NFT Gift Card", "GIFT") {
        MAX_TOTAL_SUPPLY = tokenSupply;
    }

    modifier canMint() {
        require(
            tokenCounter.current() <= MAX_TOTAL_SUPPLY,
            "Insufficient tokens remaining"
        );
        _;
    }

    modifier isCorrectPayment(uint256 _amount) {
        uint256 fee = (_amount / 100) * FEE_PERCENTAGE;

        require(msg.value >= _amount + fee, "Value sent must include a fee");
        _;
    }

    modifier isCorrectBatchPayment(uint256[] memory _amounts) {
        uint256 totalValue;
        uint256 totalFee;

        for (uint256 i = 0; i < _amounts.length; i++) {
            totalFee += (_amounts[i] / 100) * FEE_PERCENTAGE;
            totalValue += _amounts[i];
        }

        require(
            msg.value >= totalValue + totalFee,
            "Insufficient batch payment sent"
        );
        _;
    }

    modifier isCorrectClaimAmount(uint256 _tokenId, uint256 _amount) {
        require(
            tokenIdToBalance[_tokenId] >= _amount,
            "Insufficient balance on card"
        );
        _;
    }

    modifier hasBalance(uint256 _tokenId) {
        require(tokenIdToBalance[_tokenId] > 0, "Insufficient balance on card");
        _;
    }

    modifier canClaimAmount(uint256 _tokenId, uint256 _amount) {
        require(
            tokenIdToBalance[_tokenId] >= _amount,
            "Insufficient balance on card"
        );
        _;
    }

    modifier isClaimer(uint256 _tokenId) {
        require(
            tokenIdToClaimers[_tokenId][msg.sender] = true,
            "Only the claimers can claim"
        );
        _;
    }

    modifier isOwner(uint256 _tokenId) {
        require(
            ownerOf(_tokenId) == msg.sender,
            "Only the owner can call this function"
        );
        _;
    }

    // ============ GIFTING NATIVE TOKEN GIFT CARD ============
    function _gift(
        address _recipient,
        string memory _tokenURI,
        uint256 _amount
    ) private {
        uint256 tokenId = nextTokenId();
        tokenIdToURI[tokenId] = _tokenURI;
        tokenIdToBalance[tokenId] = _amount;

        _safeMint(_recipient, tokenId);
        emit Gift(_recipient, _tokenURI);
    }

    function gift(
        address _recipient,
        string memory _tokenURI,
        uint256 _amount
    ) external payable nonReentrant canMint isCorrectPayment(_amount) {
        _gift(_recipient, _tokenURI, _amount);
    }

    function giftBatch(
        address[] memory _recipients,
        string[] memory _tokenURIs,
        uint256[] memory _amounts
    ) external payable nonReentrant canMint isCorrectBatchPayment(_amounts) {
        for (uint256 i = 0; i < _recipients.length; i++) {
            _gift(_recipients[i], _tokenURIs[i], _amounts[i]);
        }
    }

    // ============ GIFTING ERC20 GIFT CARD ============
    function _giftERC20(
        address _tokenAddress,
        address _recipient,
        string memory _tokenURI,
        uint256 _amount
    ) private {
        uint256 tokenId = nextTokenId();
        uint256 fee = (_amount / 100) * FEE_PERCENTAGE;

        tokenIdToURI[tokenId] = _tokenURI;
        tokenIdToTokenAddress[tokenId] = _tokenAddress;
        tokenIdToBalance[tokenId] = _amount - fee;

        // Before this you should have approved the amount
        IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);

        _safeMint(_recipient, tokenId);
        emit Gift(_recipient, _tokenURI);
    }

    function giftERC20(
        address _tokenAddress,
        address _recipient,
        string memory _tokenURI,
        uint256 _amount
    ) external nonReentrant canMint {
        _giftERC20(_tokenAddress, _recipient, _tokenURI, _amount);
    }

    function giftERC20Batch(
        address[] memory _tokenAddresses,
        address[] memory _recipients,
        string[] memory _tokenURIs,
        uint256[] memory _amounts
    ) external nonReentrant canMint {
        for (uint256 i = 0; i < _recipients.length; i++) {
            _giftERC20(
                _tokenAddresses[i],
                _recipients[i],
                _tokenURIs[i],
                _amounts[i]
            );
        }
    }

    // ============ CLAIMING ============
    function claim(uint256 _tokenId)
        external
        payable
        nonReentrant
        hasBalance(_tokenId)
        isOwner(_tokenId)
    {
        uint256 balance = tokenIdToBalance[_tokenId];
        payable(msg.sender).transfer(balance);
        emit Claim(_tokenId);
    }

    function claimAs(uint256 _tokenId)
        external
        payable
        nonReentrant
        hasBalance(_tokenId)
        isClaimer(_tokenId)
    {
        uint256 balance = tokenIdToBalance[_tokenId];
        payable(msg.sender).transfer(balance);
        emit Claim(_tokenId);
    }

    function claimPartial(uint256 _tokenId, uint256 _amount)
        external
        payable
        nonReentrant
        isCorrectClaimAmount(_tokenId, _amount)
    {
        uint256 balance = tokenIdToBalance[_tokenId];
        tokenIdToBalance[_tokenId] = balance - _amount;
        payable(msg.sender).transfer(_amount);
        emit ClaimPartial(_tokenId, _amount);
    }

    function claimERC20(uint256 _tokenId)
        external
        payable
        nonReentrant
        hasBalance(_tokenId)
    {
        uint256 balance = tokenIdToBalance[_tokenId];
        // uint256 decimals = tokenAddress.decimals();
        // uint256 amount = balance * 10**decimals; // gotta figure out balance
        IERC20(tokenIdToTokenAddress[_tokenId]).transfer(msg.sender, balance);
        emit ClaimERC20(_tokenId);
    }

    function claimERC20Partial(uint256 _tokenId, uint256 _amount)
        external
        payable
        nonReentrant
        isCorrectClaimAmount(_tokenId, _amount)
    {
        uint256 balance = tokenIdToBalance[_tokenId];
        // uint256 decimals = tokenAddress.decimals();
        // uint256 amount = _amount * 10**decimals; // gotta figure out balance
        tokenIdToBalance[_tokenId] = balance - _amount;
        IERC20(tokenIdToTokenAddress[_tokenId]).transfer(msg.sender, _amount);
        emit ClaimERC20Partial(_tokenId, _amount);
    }

    function isGiftCardERC20(uint256 _tokenId) public view returns (bool) {
        return tokenIdToTokenAddress[_tokenId] != address(0);
    }

    // ============ PUBLIC READ-ONLY FUNCTIONS ============
    function getLastTokenId() external view returns (uint256) {
        return tokenCounter.current();
    }

    // ============ SUPPORTING FUNCTIONS ============
    function nextTokenId() private returns (uint256) {
        tokenCounter.increment();
        return tokenCounter.current();
    }

    // ============ FUNCTION OVERRIDES ============
    function contractURI() public view returns (string memory) {
        return collectionURI;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "Non-existent token");

        return tokenIdToURI[_tokenId];
    }

    // ============ OWNER-ONLY ADMIN FUNCTIONS ============
    // only if we want to store the token balance in the JSON
    // function setTokenURI(address _user, string memory _tokenURI)
    //     external
    //     onlyOwner
    // {
    //     uint256 tokenId = addressToTokenId[_user];
    //     tokenIdToURI[tokenId] = _tokenURI;
    // }
    function setClaimer(uint256 _tokenId, address _claimer)
        external
        isOwner(_tokenId)
    {
        tokenIdToClaimers[_tokenId][_claimer] = true;
    }

    function setCollectionURI(string memory _collectionURI) external onlyOwner {
        collectionURI = _collectionURI;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }

    receive() external payable {}
}
