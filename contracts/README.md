# Giftly Protocol Contracts

Core functionalities: (1) Gifting, (2) Claiming, (3) Delegating Claim Access (for vendor compatibility)

## Gifting Interface

### Native Token Gifting

`function gift(address _recipient, string memory _tokenURI, uint256 _amount ) external payable nonReentrant canMint isCorrectPayment(_amount)`

Single card gifting via safe minting ERC721 and payable.

### ERC20 Gifting

`function giftERC20(address _tokenAddress, address _recipient, string memory _tokenURI, uint256 _amount ) external nonReentrant canMint`

Single card gifting via safe minting ERC721 and safeTransfer.

### Native Token Batch Gifting

`function giftBatch( address[] memory _recipients, string[] memory _tokenURIs, uint256[] memory _amounts ) external payable nonReentrant canMint isCorrectBatchPayment(_amounts)`

Multi-card gifting via safe minting ERC721 and safeTransfer.

### ERC20 Batch Gifting

`function giftERC20Batch( address[] memory _tokenAddresses, address[] memory _recipients, string[] memory _tokenURIs, uint256[] memory _amounts ) external nonReentrant canMint`

Multi-card gifting via safe minting ERC721 and safeTransfer.

---

## Claiming Interface

### Native Token Claiming as Owner

`function claim(uint256 _tokenId) external nonReentrant hasBalance(_tokenId) isOwner(_tokenId)`

Checks msg.sender is owner of \_tokenId and withdraws entire balance saved in a (tokenId => balance) mapping.

### Native Token Claiming Partial as Owner

`function claimPartial(uint256 _tokenId, uint256 _amount) external nonReentrant isCorrectClaimAmount(_tokenId, _amount)`
Checks msg.sender is owner of \_tokenId and withdraws specified balance saved in a (tokenId => balance) mapping.

### Native Token Claiming as Claimer

`function claimAs(uint256 _tokenId) external nonReentrant hasBalance(_tokenId) isClaimer(_tokenId)`

Checks msg.sender is whitelisted claimer of \_tokenId and withdraws entire balance saved in a (tokenId => balance) mapping.

### ERC20 Claiming as Owner

`function claimERC20(uint256 _tokenId) external nonReentrant hasBalance(_tokenId)`

Checks msg.sender is owner of \_tokenId and withdraws entire ERC20 balance saved in a (tokenId => balance) mapping.

### ERC20 Claiming Partial as Owner

`function claimERC20Partial(uint256 _tokenId, uint256 _amount) external nonReentrant isCorrectClaimAmount(_tokenId, _amount)`

Checks msg.sender is owner of \_tokenId and withdraws specified ERC20 balance saved in a (tokenId => balance) mapping.
