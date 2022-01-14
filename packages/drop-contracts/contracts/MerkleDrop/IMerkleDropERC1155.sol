// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IDrop.sol";

interface IMerkleDropERC1155 {
    // Returns true if anyone already claimed at least one token
    function claimStartedForToken(uint256 tokenId) external view returns (bool);
    
    // Returns number of tokens left for claiming
    function tokensLeft(uint256 tokenId) external view returns (uint256);
}
