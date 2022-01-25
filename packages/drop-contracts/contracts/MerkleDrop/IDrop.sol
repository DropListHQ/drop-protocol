//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/contracts/utils/introspection/IERC165.sol";

interface IDrop is IERC165 {

    // Returns the address of the token distributed by this contract.
    function token() external view returns (address);

    // Returns the merkle root of the merkle tree containing account balances available to claim.
    function merkleroot() external view returns (bytes32);

    // Returns the ipfs hash containing tree information.
    function ipfshash() external view returns (bytes32);

    // Returns timestemp when drop will become invalid.
    function expiration() external view returns (uint256);

    // returns address the drop creator address
    function sender() external view returns (address);
    
  /**
   * @dev Returns if leaf is claimed. 
   * @param index Leaf index in the Merkle tree.
   * @return Boolean if leaf is claimed.
   */
  function isClaimed(uint256 index) external view returns (bool);

  /**
   * @dev Returns if drop is expired.
   * @return Boolean if drop is claimed.
   */
  function isExpired() external view returns (bool);


  /**
   * @dev Runs basic chacks for the drop and returns true if claim is valid. 
   * @param index Leaf index in the Merkle tree.
   * @param node data in the merkle leaf approved by sender.
   * @param merkleProof Merkle proof for the leaf index.   
   * @return Boolean if drop is claimed.
   */
  function checkClaim(uint256 index, bytes32 node, bytes32[] calldata merkleProof) external view returns (bool);
}
