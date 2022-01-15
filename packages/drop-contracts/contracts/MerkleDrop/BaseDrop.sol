// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/contracts/utils/introspection/ERC165.sol";
import "./IDrop.sol";

contract BaseDrop is IDrop, ERC165 {
    bytes32 public override merkleRoot;
    address public override token;
    bytes32 public override ipfsHash;
    uint256 public override expiration;
    address public override sender;
    bool public override initialized;
    
    mapping(uint256 => uint256) public claimedBitMap;

    error NotImplementedError();
    
    function init(address sender_, address token_, bytes32 merkleRoot_, uint256 expiration_, bytes32 ipfsHash_) external {
        require(!initialized, "Drop already initialized");
        initialized = true;
        token = token_;
        merkleRoot = merkleRoot_;
        expiration = expiration_;
        ipfsHash = ipfsHash_;
        sender = sender_;
    }
    
    function isClaimed(uint256 index) public override view returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }
    
    function isExpired() public override view returns (bool) {
        return block.timestamp < expiration;
    }

    function checkClaim(uint256 index, bytes32 node, bytes32[] calldata merkleProof) public view returns (bool) {

      // drop not expired 
      require(!isExpired(), 'MerkleDrop: Drop expired');

      // leaf isn't claimed
      require(!isClaimed(index), 'MerkleDrop: Token already claimed');
      
      // Verify the merkle proof.
      require(MerkleProof.verify(merkleProof, merkleRoot, node), 'MerkleDistributor: Invalid proof.');

      return true;
    }
    
    function _setClaimed(uint256 index) internal {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] = claimedBitMap[claimedWordIndex] | (1 << claimedBitIndex);
    }
}
