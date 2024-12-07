// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LeaderboardStorage {
    mapping(uint256=>string) private storedData;
    uint256 currentStorageId;
    address public agent = 0x306404AEF545ec8D7591a9cE0c73BB83dbbb0a40;

    event DataStored(uint256 storageid, uint256 timestamp, string data);

    modifier onlyAgent() {
        require(msg.sender == agent, "Only agent can store data");
        _;
    }

    function store(string memory data) public onlyAgent {
        storedData[currentStorageId++] = data;
        emit DataStored(currentStorageId-1, block.timestamp, data);
    }

    function retrieve(uint256 id) public view returns (string memory) {
        return storedData[id];
    }
}