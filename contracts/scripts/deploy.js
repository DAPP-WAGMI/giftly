const hre = require("hardhat");

async function main() {
  const GiftlyProtocol = await hre.ethers.getContractFactory("GiftlyProtocol");

  const deployedContract = await GiftlyProtocol.deploy(10000);

  await deployedContract.deployed();

  console.log("GiftlyProtocol deployed to:", deployedContract.address);

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
