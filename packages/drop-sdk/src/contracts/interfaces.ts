import { Interface } from "@ethersproject/abi";

export const DropFactoryInterface = new Interface([
    "function createDrop(address template, address token, bytes32 merkleRoot, uint256 expiration, bytes32 salt, bytes32 ipfsHash) returns (address drop)",
    "function predictDropAddress(address implementation, bytes32 salt) view returns (address predicted)",
    "event CreateDrop(address indexed drop, address token, address template, uint expiration, bytes32 ipfsHash)"
]);

export const DropInterfaceERC20 = new Interface([
    "function claim(uint256 index, address beneficiary, uint256 amount, bytes32[] calldata merkleProof)",
    "function checkClaim(uint256 index, bytes32 node, bytes32[] calldata merkleProof) view returns (bool)",
    "function isClaimed(uint256 index) view returns (bool)",
    "function isExpired()  view returns (bool)",
    "event ClaimedERC20(uint256 indexed index, address beneficiary, uint256 amount)"
]);

export const DropInterfaceERC721 = new Interface([
    "function claim(uint256 index, address beneficiary, uint256 tokenId, bytes32[] calldata merkleProof)",
    "function checkClaim(uint256 index, bytes32 node, bytes32[] calldata merkleProof) view returns (bool)",
    "function isClaimed(uint256 index) view returns (bool)",
    "function isExpired()  view returns (bool)",
    "event ClaimedERC721(uint256 indexed index, address beneficiary, uint256 tokenId)"
]);

export const DropInterfaceERC1155 = new Interface([
    "function claim(uint256 index, address beneficiary, uint256 tokenId, uint256 amount, bytes32[] calldata merkleProof)",
    "function checkClaim(uint256 index, bytes32 node, bytes32[] calldata merkleProof) view returns (bool)",
    "function isClaimed(uint256 index) view returns (bool)",
    "function isExpired()  view returns (bool)",
    "event ClaimedERC1155(uint256 indexed index, address beneficiary, uint256 tokenId, uint256 amount)"
]);
