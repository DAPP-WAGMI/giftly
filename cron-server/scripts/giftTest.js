const hre = require("hardhat");
require("dotenv").config();

async function gift(recipient, tokenURI, amount, value) {
  const GiftlyProtocol = await hre.ethers.getContractFactory("GiftlyProtocol");

  const deployedContract = await GiftlyProtocol.attach(
    process.env.CONTRACT_ADDRESS // deployed contract address
  );

  console.log("GiftlyProtocol attached to:", deployedContract.address);

  console.log("Gifting card...");

  const res = await deployedContract.gift(recipient, tokenURI, amount, {
    value,
  });

  console.log("Tokens gifted on server!", res);
  return res;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

module.exports = { gift };
