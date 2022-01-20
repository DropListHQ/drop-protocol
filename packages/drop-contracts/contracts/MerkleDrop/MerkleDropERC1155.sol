// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/token/ERC1155/IERC1155.sol";
import "./BaseDrop.sol";
import "./IMerkleDropERC1155.sol";

contract MerkleDropERC1155 is BaseDrop, IMerkleDropERC1155 {
  
  function claim(uint256 index, address beneficiary, uint256 tokenId, uint256 amount, bytes32[] calldata merkleProof) public virtual override {
    // standard merkle drop checks working for all token standards (ERC20, ERC721, ERC1155)
    bytes32 node = keccak256(abi.encodePacked(index, beneficiary, tokenId, amount));
    require(super.checkClaim(index, node, merkleProof), 'invalid claim');
    
    // Mark leaf as claimed and send the token.
    _setClaimed(index);
    IERC1155(token).safeTransferFrom(sender, beneficiary, tokenId, amount, "");
    
    emit ClaimedERC1155(index, beneficiary, tokenId, amount);
  }    
}
