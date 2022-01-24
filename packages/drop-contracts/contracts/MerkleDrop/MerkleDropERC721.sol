// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/token/ERC721/IERC721.sol";
import "./BaseDrop.sol";
import "./IMerkleDropERC721.sol";

contract MerkleDropERC721 is BaseDrop, IMerkleDropERC721 {
  
  function claim(uint256 index, address beneficiary, uint256 tokenId, bytes32[] calldata merkleProof) public virtual override {
    // standard merkle drop checks working for all token standards (ERC20, ERC721, ERC721)
    bytes32 node = keccak256(abi.encodePacked(index, beneficiary, tokenId));
    require(super.checkClaim(index, node, merkleProof), 'invalid claim');
    
    // Mark leaf as claimed and send the token.
    _setClaimed(index);
    IERC721(token()).transferFrom(sender(), beneficiary, tokenId);
    
    emit ClaimedERC721(index, beneficiary, tokenId);
  }    
}
