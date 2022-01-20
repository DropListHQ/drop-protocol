// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/contracts/utils/cryptography/MerkleProof.sol";
import "./BaseDrop.sol";
import "./IMerkleDropERC20.sol";

contract MerkleDropERC20 is BaseDrop, IMerkleDropERC20 {
      
  function claim(uint256 index, uint256 amount, address account, bytes32[] calldata merkleProof) public virtual override {
    // standard merkle drop checks working for all token standards (ERC20, ERC721, ERC1155)
    bytes32 node = keccak256(abi.encodePacked(index, amount));
    require(super.checkClaim(index, node, merkleProof), 'invalid claim');
        
    // Mark leaf as claimed and send tokens.
    _setClaimed(index);
    IERC20(token).transferFrom(sender, account, amount);
    
    emit ClaimedERC20(index, amount, account);
  }    
}
