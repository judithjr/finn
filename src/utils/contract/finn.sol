// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Bucket is ReentrancyGuard {
    using Counters for Counters.Counter;

    address public creator;
    uint256 public totalValue;
    bool public isPublic;
    uint256 public unlockTimestamp;
    mapping(address => uint256) public tokenProportions;
    mapping(address => uint256) public tokenBalances;
    string public name;
    string public description;
    string[] public chains;

    struct BucketStruct {
        address tokenAddress;
        uint256 share;
        string chain;
    }

    BucketStruct[] public bucketsDetails;

    event BucketCreated(
        address indexed creator,
        uint256 totalValue,
        bool isPublic,
        uint256 unlockTimestamp,
        address[] tokens,
        uint256[] proportions,
        string[] chains,
        string name,
        string description
    );
    event TokensLocked(address indexed token, uint256 amount);

    modifier onlyCreator() {
        require(msg.sender == creator, "Not the bucket creator");
        _;
    }

    modifier isUnlocked() {
        require(block.timestamp >= unlockTimestamp, "Bucket is still locked");
        _;
    }

    constructor(
        address _creator,
        uint256 _totalValue,
        bool _isPublic,
        uint256 _lockDurationInDays,
        address[] memory _tokens,
        uint256[] memory _proportions,
        string[] memory _chains,
        string memory _name,
        string memory _description
    ) {
        require(_tokens.length == _proportions.length && _chains.length > 0, "Invalid input");

        creator = _creator;
        totalValue = _totalValue;
        isPublic = _isPublic;
        unlockTimestamp = block.timestamp + (_lockDurationInDays * 1 days);
        name = _name;
        description = _description;
        chains = _chains;

        // Validate and set token proportions
        uint256 totalProportion;
        for (uint256 i = 0; i < _tokens.length; i++) {
            require(_proportions[i] > 0, "Proportion must be greater than 0");
            totalProportion += _proportions[i];
            tokenProportions[_tokens[i]] = _proportions[i];
            bucketsDetails.push(BucketStruct({
                tokenAddress: _tokens[i],
                share: _proportions[i],
                chain: _chains[i]
            }));
        }
        require(totalProportion == 100, "Total proportion must be 100");

        emit BucketCreated(
            _creator,
            _totalValue,
            _isPublic,
            unlockTimestamp,
            _tokens,
            _proportions,
            _chains,
            _name,
            _description
        );
    }

    function addToken(address token, uint256 amount) external onlyCreator nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        tokenBalances[token] += amount;

        emit TokensLocked(token, amount);
    }

    function withdrawTokens(address token) external onlyCreator isUnlocked nonReentrant {
        require(tokenBalances[token] > 0, "No tokens to withdraw");

        require(
            IERC20(token).transfer(creator, tokenBalances[token]),
            "Token transfer failed"
        );

        tokenBalances[token] = 0;
    }

    function getBucketDetails(address bucketAddress)
        external
        view
        returns (
            address _creator,
            uint256 _totalValue,
            bool _isPublic,
            uint256 _unlockTimestamp,
            address[] memory _tokens,
            uint256[] memory _proportions,
            string[] memory _chains,
            string memory _name,
            string memory _description
        )
    {
        Bucket bucket = Bucket(bucketAddress);
        _creator = bucket.creator();
        _totalValue = bucket.totalValue();
        _isPublic = bucket.isPublic();
        _unlockTimestamp = bucket.unlockTimestamp();
        _name = bucket.name();
        _description = bucket.description();

        // Initialize arrays with correct length
        _tokens = new address[](bucketsDetails.length);
        _proportions = new uint256[](bucketsDetails.length);
        _chains = new string[](bucketsDetails.length);

        // Populate arrays with correct values
        for (uint256 i = 0; i < bucketsDetails.length; i++) {
            _tokens[i] = bucketsDetails[i].tokenAddress;
            _proportions[i] = bucketsDetails[i].share;
            _chains[i] = bucketsDetails[i].chain;
        }
    }
}

contract BucketFactory {
    using Counters for Counters.Counter;

    address[] public allBuckets;
    Counters.Counter private bucketIds;
    mapping(address => address[]) public userToBuckets;
    mapping(address => address[]) public userInvestedBuckets;

    event BucketCreated(
        address indexed creator,
        address indexed bucket,
        uint256 totalValue,
        bool isPublic,
        uint256 unlockTimestamp,
        address[] tokens,
        uint256[] proportions,
        string[] chains,
        string name,
        string description
    );
    event InvestmentMade(address indexed investor, address indexed bucket, uint256 amount);

    function createBucket(
        uint256 _totalValue,
        bool _isPublic,
        uint256 _lockDurationInDays,
        address[] memory _tokens,
        uint256[] memory _proportions,
        string[] memory _chains,
        string memory _name,
        string memory _description
    ) external {
        Bucket newBucket = new Bucket(
            msg.sender,
            _totalValue,
            _isPublic,
            _lockDurationInDays,
            _tokens,
            _proportions,
            _chains,
            _name,
            _description
        );
        userToBuckets[msg.sender].push(address(newBucket));
        allBuckets.push(address(newBucket));

        emit BucketCreated(
            msg.sender,
            address(newBucket),
            _totalValue,
            _isPublic,
            newBucket.unlockTimestamp(),
            _tokens,
            _proportions,
            _chains,
            _name,
            _description
        );
    }

    function investInBucket(address bucketAddress, uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than 0");

        Bucket bucket = Bucket(bucketAddress);
        require(bucket.isPublic() || bucket.creator() == msg.sender, "Bucket not public or not created by the investor");

        require(
            IERC20(bucketAddress).transferFrom(msg.sender, address(bucket), amount),
            "Token transfer failed"
        );

        bucket.addToken(bucketAddress, amount);
        userInvestedBuckets[msg.sender].push(bucketAddress);

        emit InvestmentMade(msg.sender, bucketAddress, amount);
    }

    function getNumBuckets() external view returns (uint256) {
        return allBuckets.length;
    }

    function getAllBuckets() external view returns (address[] memory) {
        return allBuckets;
    }

    function getBucketsByCreator(address creator) external view returns (address[] memory) {
        return userToBuckets[creator];
    }

    function getInvestedBuckets(address investor) external view returns (address[] memory) {
        return userInvestedBuckets[investor];
    }
}
