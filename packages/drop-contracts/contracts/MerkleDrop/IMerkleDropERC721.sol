// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IDrop.sol";

interface IMerkleDropERC721 {
    /**
     * @dev Executes claim transaction.
     * @param index Leaf index in the Merkle tree.
     * @param beneficiary The account that the claim should benefit.
     * @param tokenId token ID being claimed. 
     * @param merkleProof Merkle proof for the leaf index. 
     */
    function claim(uint256 index, address beneficiary, uint256 tokenId, bytes32[] calldata merkleProof) external;

    /**
     * @dev ClaimedERC721 token event.
     * @param index Leaf index in the Merkle tree.
     * @param beneficiary The account that the claim should benefit.
     * @param tokenId token ID being claimed. 
     */    
    event ClaimedERC721(uint256 indexed index, address beneficiary, uint256 tokenId);
}
