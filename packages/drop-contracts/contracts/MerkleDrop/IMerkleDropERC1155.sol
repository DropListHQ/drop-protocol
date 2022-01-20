// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IDrop.sol";

interface IMerkleDropERC1155 {
    /**
     * @dev Executes claim transaction.
     * @param index Leaf index in the Merkle tree.
     * @param tokenId token ID being claimed. 
     * @param amount amount of tokens to claim.
     * @param beneficiary The account that the claim should benefit.
     * @param merkleProof Merkle proof for the leaf index. 
     */
    function claim(uint256 index, uint256 tokenId, uint256 amount, address beneficiary, bytes32[] calldata merkleProof) external;

    /**
     * @dev ClaimedERC1155 token event.
     * @param index Leaf index in the Merkle tree.
     * @param tokenId token ID being claimed. 
     * @param amount amount of tokens to claim.
     * @param beneficiary The account that the claim should benefit.
     */    
    event ClaimedERC1155(uint256 indexed index, uint256 tokenId, uint256 amount, address beneficiary);
}
