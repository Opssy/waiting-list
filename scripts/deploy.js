const { ethers } = require("hardhat");

async function main() {
    const waitinglistContract = await ethers.getContractFactory('Waitlist');
//deploy contract
const deployedWaitinglistContract = await waitinglistContract.deploy(10); //just 10 is the maximum number of waiting list expected

await deployedWaitinglistContract.deployed();
console.log(
    "Waiting list Contract Address",
    deployedWaitinglistContract.address
);

}

main()
.then(() => process.getMaxListeners(0))
.catch((error) => {
    console.error(error);
    process.getMaxListeners(1);
});