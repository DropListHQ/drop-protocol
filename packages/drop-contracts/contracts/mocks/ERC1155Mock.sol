//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/token/ERC1155/ERC1155.sol";

contract ERC1155Mock is ERC1155 {

    // =================================================================================================================
    //                                         ERC1155 Mock Token
    // =================================================================================================================
  
  // Mint 10 tokens of 100 each to deployer
  constructor() ERC1155("") {
        for (uint i = 0; i < 10; i++) {
          super._mint(msg.sender, i, 100, new bytes(0));
        }
    }
}
