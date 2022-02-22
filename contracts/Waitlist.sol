pragma solidity ^0.8.0;

contract Waitlist{
    //maxmum number of waiting list addresses allowed
    uint8 public maxWaitinglistAddresses;

    // Create a mapping of waitinglistAddresses
    // if an address is on waitinglist, we would set it to true, it is false by default for all other addresses.
    mapping(address => bool) public waitinglistAddresses;

    // numAddressesWaitinglist would be used to keep track of how many addresses have been  on waitinglisted
    uint8 public numAddressesWaitinglist;

    //Setting the max num of waiting list addresses
    //User will put the value at the time of deployment
    constructor(uint8 _maxWaitinglistAddresses) {
        maxWaitinglistAddresses = _maxWaitinglistAddresses;
    }
    //function to add an address 0f the sender to the waiting list 
    function addAddressToWaitinglist() public {
        //check if the user has already been on waiting list
        require(!waitinglistAddresses[msg.sender], "Sender has already been on waiting list");
        //check if the numAddresses waiting list < max waiting list addresses, if not throw error
        require(numAddressesWaitinglist < maxWaitinglistAddresses, "More addresses cant be added, limit reached");

        //add the address which called the function to the waiting list address array
        waitinglistAddresses[msg.sender] = true;

        //Increase the number of waiting list addresses
        numAddressesWaitinglist +=1;
    }
} 