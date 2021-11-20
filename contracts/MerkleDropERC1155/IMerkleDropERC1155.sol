// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Allows anyone to claim a token if they exist in a merkle root.
interface IMerkleDropERC1155 {
    // Returns the address of the token distributed by this contract.
    function token() external view returns (address);
    // Returns the merkle root of the merkle tree containing account balances available to claim.
    function merkleRoot() external view returns (bytes32);
    // Returns the ipfs hash containing tree information.
    function ipfsHash() external view returns (bytes32);
    // Returns timestemp when drop will become invalid.
    function expiryTimestamp() external view returns (uint256);
    // Returns true if the index has been marked claimed.
    function isClaimed(uint256 index) external view returns (bool);
    // Returns true if the drop is invalid.
    function isExpired() external view returns (bool);
    // Returns true if anyone already claimed at least one token
    function claimStartedForToken(uint256 tokenId) external view returns (bool);
    // Returns number of tokens left for claiming
    function tokensLeft(uint256 tokenId) external view returns (uint256);
    
    // Claim the given amount of the tokenId to the given address. Reverts if the inputs are invalid.
    function claim(uint256 index, uint256 tokenId, uint256 amount, uint256 maxSupply, address account, bytes32[] calldata merkleProof) external;

    // This event is triggered whenever a call to #claim succeeds.
    event Claimed(uint256 indexed index, uint256 tokenId, uint256 amount, address account);
}