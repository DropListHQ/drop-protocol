// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IMerkleDropERC1155.sol";

contract MerkleDropERC1155 is IMerkleDropERC1155 {
    bytes32 public override merkleRoot;
    address public override token;
    bytes32 public override ipfsHash;
    uint256 public override expiryTimestamp;
    
    // Everythin increased by 1, to distinguish empty and non initialized
    mapping(uint256 => uint256) private _maxSupply;
    address private _tokenOwner;
    
    bool public initialized;
    
    mapping(uint256 => uint256) public claimedBitMap;
    
    function init(address tokenOwner_, address token_, bytes32 merkleRoot_, uint256 expiryTimestamp_, bytes32 ipfsHash_) external {
        require(!initialized, "Drop already initialized");
        initialized = true;

        token = token_;
        merkleRoot = merkleRoot_;
        expiryTimestamp = expiryTimestamp_;
        ipfsHash = ipfsHash_;
        
        _tokenOwner = tokenOwner_;
    }
    
    function isClaimed(uint256 index) public override view returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }
    
    function isExpired() public override view returns (bool) {
        return block.timestamp < expiryTimestamp;
    }
    
    function claimStartedForToken(uint256 tokenId) public override view returns (bool) {
        return _maxSupply[tokenId] > 0;
    }
    
    function tokensLeft(uint256 tokenId) public override view returns (uint256) {
        return _maxSupply[tokenId] - 1;
    }
    
    function claim(uint256 index, uint256 tokenId, uint256 amount, uint256 maxSupply, address account, bytes32[] calldata merkleProof) external override {
        require(!isExpired(), "MerkleDrop: Drop experied");
        require(!isClaimed(index), 'MerkleDrop: Token already claimed');

        // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(index, tokenId, account, amount, maxSupply));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), 'MerkleDistributor: Invalid proof.');
        
        // Set max suply of not exist
        if (claimStartedForToken(tokenId) == false) {
            _maxSupply[tokenId] = maxSupply + 1;
        }
        // Check that enought token left
        require(tokensLeft(tokenId) - amount >= 0, 'Not enought tokens');
        _maxSupply[tokenId] -= amount;

        // Mark it claimed and send the token.
        _setClaimed(index);
        IERC1155(token).safeTransferFrom(_tokenOwner, account, tokenId, amount, "");

        emit Claimed(index, tokenId, amount, account);
    }
    
    function _setClaimed(uint256 index) private {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] = claimedBitMap[claimedWordIndex] | (1 << claimedBitIndex);
    }
}