// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IDrop.sol";

interface IMerkleDropERC1155 {
    // Returns true if anyone already claimed at least one token
    function claimStartedForToken(uint256 tokenId) external view returns (bool);
    
    // Returns number of tokens left for claiming
    function tokensLeft(uint256 tokenId) external view returns (uint256);

    /**
     * @dev Executes claim transaction.
     * @param index Leaf index in the Merkle tree.
     * @param tokenId token ID being claimed. 
     * @param amount amount of tokens to claim.
     * @param maxSupply maximum tokens that is being distributed via by the merkle drop.
     * @param beneficiary The account that the claim should benefit.
     * @param merkleProof Merkle proof for the leaf index. 
     */
    function claim(uint256 index, uint256 tokenId, uint256 amount, uint256 maxSupply, address beneficiary, bytes32[] calldata merkleProof) external;
    
}
