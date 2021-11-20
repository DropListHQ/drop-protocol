// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./MerkleDropERC1155.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract MerkleDropERC1155Factory {
    using Clones for *;
    
    event CreateDrop(address indexed drop, address indexed token, bytes32 ipfsHash);

    function createDrop(
        address template,
        address token,
        bytes32 merkleRoot,
        uint256 expiryTimestamp,
        bytes32 salt,
        bytes32 ipfsHash
    ) external returns (MerkleDropERC1155 drop) {
        drop = MerkleDropERC1155(Clones.cloneDeterministic(template, salt));
        drop.init(msg.sender, token, merkleRoot, expiryTimestamp, ipfsHash);
        emit CreateDrop(address(drop), token, ipfsHash);
    }
    
    function predictDropAddress(address implementation, bytes32 salt) public view returns (address predicted) {
        return Clones.predictDeterministicAddress(implementation, salt);
    }
}