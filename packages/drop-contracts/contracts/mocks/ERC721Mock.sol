//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/token/ERC721/ERC721.sol";

contract ERC721Mock is ERC721 {

    // =================================================================================================================
    //                                         ERC721 Mock
    // =================================================================================================================

    // Mint 10 NFTs to deployer
  constructor() ERC721("Mock NFT", "MOCK") {
        for (uint i = 0; i < 10; i++) {
            super._mint(msg.sender, i);
            // super._setTokenURI(i, "https://api.myjson.com/bins/1dhwd6");
        }
    }
}
