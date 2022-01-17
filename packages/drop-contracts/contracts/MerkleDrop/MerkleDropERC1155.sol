// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/contracts/utils/cryptography/MerkleProof.sol";
import "./BaseDrop.sol";
import "./IMerkleDropERC1155.sol";

contract MerkleDropERC1155 is BaseDrop, IMerkleDropERC1155 {
  
  
  // Maximum amount of tokens per tokenId that can be distibuted
  // Everything increased by 1 to distinguish empty and non initialized
  mapping(uint256 => uint256) private _maxSupply;
  
  function claimStartedForToken(uint256 tokenId) public override view returns (bool) {
    return _maxSupply[tokenId] > 0;
  }
    
  function tokensLeft(uint256 tokenId) public override view returns (uint256) {
    return _maxSupply[tokenId] - 1;
  }
    
  function claim(uint256 index, uint256 tokenId, uint256 amount, uint256 maxSupply, address account, bytes32[] calldata merkleProof) public virtual override {
    // standard merkle drop checks working for all token standards (ERC20, ERC721, ERC1155)
    bytes32 node = keccak256(abi.encodePacked(index, tokenId, account, amount, maxSupply));
    require(super.checkClaim(index, node, merkleProof), 'invalid claim');
    
    // Initialize max suply for token Id 
    if (claimStartedForToken(tokenId) == false) {
      _maxSupply[tokenId] = maxSupply + 1;
    }
    // Check that enought token left
    require(tokensLeft(tokenId) - amount >= 0, 'Not enough tokens');

    // decrement maxSupply till 1 
    _maxSupply[tokenId] -= amount;
    
    // Mark leaf as claimed and send the token.
    _setClaimed(index);
    IERC1155(token).safeTransferFrom(sender, account, tokenId, amount, "");
    
    emit ClaimedERC1155(index, tokenId, amount, account);
  }    
}
