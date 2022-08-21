const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const GiftlyProtocol = await hre.ethers.getContractFactory("GiftlyProtocol");

  const deployedContract = await GiftlyProtocol.attach(
    process.env.CONTRACT_ADDRESS // deployed contract address
  );

  console.log("GiftlyProtocol attached to:", deployedContract.address);

  console.log("Gifting card...");

  const amount = hre.ethers.utils.parseEther(".01");

  const recipient = "0xC33003bcEF8DB78167EC77f6ed3B904f8C814649";
  const tokenURI =
    "https://bafkreiez2ez4xqb4xio3fztlu6tlsjc3slpoq4tokhxswpzqgkodbtdg4y.ipfs.nftstorage.link/";

  const res = await deployedContract.gift(recipient, tokenURI, amount, {
    value: ethers.utils.parseEther(".012"),
  });

  console.log("Tokens gifted!", res);
  return deployedContract;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// module.exports = { deploy };
