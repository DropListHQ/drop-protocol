// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/contracts/utils/introspection/ERC165.sol";
import "clones-with-immutable-args/Clone.sol";
import "./IDrop.sol";


contract BaseDrop is IDrop, ERC165, Clone {  

  mapping(uint256 => uint256) public claimedBitMap;
  
  error NotImplementedError();
        
  function sender() public virtual override view returns (address) {
    return _getArgAddress(0);
  }
    
  function token() public virtual override view returns (address) {
    return _getArgAddress(20);
  }

  function merkleRoot() public virtual override view returns (bytes32) {
    return bytes32(_getArgUint256(40));
  }    
    
  function expiration() public virtual override view returns (uint256) {
    return _getArgUint256(72);
  }

  function ipfsHash() public virtual override view returns (bytes32) {
    return bytes32(_getArgUint256(104));
  }    
    
  function isExpired() public override view returns (bool) {
    return block.timestamp >= expiration();
  }
        
  function checkClaim(uint256 index, bytes32 node, bytes32[] calldata merkleProof) public view returns (bool) {

    // drop not expired 
    require(!isExpired(), 'MerkleDrop: Drop expired');

    // leaf isn't claimed
    require(!isClaimed(index), 'MerkleDrop: Token already claimed');
      
    // Verify the merkle proof.
    require(MerkleProof.verify(merkleProof, merkleRoot(), node), 'MerkleDistributor: Invalid proof.');

    return true;
  }
    
  function _setClaimed(uint256 index) internal {
    uint256 claimedWordIndex = index / 256;
    uint256 claimedBitIndex = index % 256;
    claimedBitMap[claimedWordIndex] = claimedBitMap[claimedWordIndex] | (1 << claimedBitIndex);
  }

  function isClaimed(uint256 index) public override view returns (bool) {
    uint256 claimedWordIndex = index / 256;
    uint256 claimedBitIndex = index % 256;
    uint256 claimedWord = claimedBitMap[claimedWordIndex];
    uint256 mask = (1 << claimedBitIndex);
    return claimedWord & mask == mask;
  }  
}
