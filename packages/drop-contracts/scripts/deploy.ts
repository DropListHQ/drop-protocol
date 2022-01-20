import hre from "hardhat";
const { ethers } = hre;

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    console.log("----------")
    console.log("Deploying DropFactory...")
    const DropFactory = await ethers.getContractFactory("DropFactory");
    const dropFactory = await DropFactory.deploy();
    console.log("DropFactory  address:", dropFactory.address);
    console.log("")

    console.log("----------")
    console.log("Deploying MerkleDroperc20...")
    const MerkleDropERC20 = await ethers.getContractFactory("MerkleDropERC20");
    const dropERC20 = await MerkleDropERC20.deploy();
    console.log("MerkleDropERC20  address:", dropERC20.address);
    console.log("")

    console.log("----------")
    console.log("Deploying MerkleDroperc721...")
    const MerkleDropERC721 = await ethers.getContractFactory("MerkleDropERC721");
    const dropERC721 = await MerkleDropERC721.deploy();
    console.log("MerkleDropERC721  address:", dropERC721.address);
    console.log("")

    console.log("----------")
    console.log("Deploying MerkleDroperc1155...")
    const MerkleDropERC1155 = await ethers.getContractFactory("MerkleDropERC1155");
    const dropERC1155 = await MerkleDropERC1155.deploy();
    console.log("MerkleDropERC1155  address:", dropERC1155.address);
    console.log("")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

