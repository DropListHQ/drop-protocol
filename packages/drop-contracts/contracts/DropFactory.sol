// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./MerkleDrop/IDrop.sol";
import "@openzeppelin/contracts/contracts/proxy/Clones.sol";

contract DropFactory {
    using Clones for *;
    
    event CreateDrop(address indexed drop, address indexed token, address template, uint expiration, bytes32 ipfsHash);
    
    function createDrop(
        address template,
        address token,
        bytes32 merkleRoot,
        uint256 expiration,
        bytes32 salt,
        bytes32 ipfsHash
    ) external returns (IDrop drop) {
        drop = IDrop(Clones.cloneDeterministic(template, salt));
        drop.init(msg.sender, token, merkleRoot, expiration, ipfsHash);
        emit CreateDrop(address(drop), token, template, expiration, ipfsHash);
    }
    
    function predictDropAddress(address implementation, bytes32 salt) public view returns (address predicted) {
        return Clones.predictDeterministicAddress(implementation, salt);
    }
}
