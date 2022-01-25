// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./MerkleDrop/IDrop.sol";
import "clones-with-immutable-args/ClonesWithImmutableArgs.sol";

contract DropFactory {
    
    using ClonesWithImmutableArgs for address;
    
    event CreateDrop(address indexed drop, address template, address token, uint expiration, bytes32 ipfshash);

    mapping (bytes32 => address) public drops;

    error DropAlreadyExists();
    
    function createDrop(
        address template,
        address token,
        bytes32 merkleroot,
        uint256 expiration,
        bytes32 ipfshash
    ) external returns (IDrop drop) {

      // ipfs hash should be unique per drop
      if (drops[ipfshash] != address(0)) {
        revert DropAlreadyExists();
      }
      
      // offset for calldata pointes for clones with immutable args
      // see https://github.com/wighawag/clones-with-immutable-args/
      bytes memory data = abi.encodePacked(
                                           msg.sender, // 0 - first argument at 0
                                           token, // 0 + 20 = 20 (as sender is address (20 bytes))
                                           merkleroot, // 20 + 20 = 40 (as token is address (20 bytes))
                                           expiration, // 40 + 32 = 72 (as token is merkleroot (32 bytes))
                                           ipfshash // 72 + 32 = 104 (expiration is uint256 (32 bytes))
                                           );
      
      drop = IDrop(address(template).clone(data));
      drops[ipfshash] = address(drop);
      
      emit CreateDrop(address(drop), template, token, expiration, ipfshash);
    }

    function getDrop(bytes32 ipfshash) public view returns (address) {
      return drops[ipfshash];
    }
}
