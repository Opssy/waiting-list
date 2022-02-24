import Head from "next/head";
import styles from "../styles/Home.modules.css";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { WAITINGLIST_CONTRACT_ADDRESS, abi } from "../constant";

function Home() {
    //walletconnected keep track of whether the user's wallet is connected or not
    const [walletConnected, setWalletConnected] = useState(false);
    //joinwaitinglist keeps track of whether the current address has joined the waiting list or not
    const [joinWaitinglist, setJoinWaitinglist] = useState(false);
    //loading is set to true when waiting for a transaction to get mined
    const [loading, setLoading] = useState(false);
    //number of waiting lists track the number of addresses on waiting list  
    const [numberOfWaitinglist, setNumberOfWaitinglist] = useState(0);
    // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
    const web3ModalRef = useRef();

   // @params{*}

    const getProviderOrSigner = async (needSigner = false) => {
        //connect to metamask
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);

        //throw an when not connected to rinkeby
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 4) {
            window.alert("Change the network to Rinkeby");
            throw new Error("Change network to Rinkeby");
        }

        if (needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
        }
        return web3Provider;
    };
    /**
  * addAddressToWaitinglist: Adds the current connected address to the waiting list
  */
    const addAddressToWaitinglist = async () => {
        try {
            //we need a signer here since this is a 'write' transaction.
            const signer = await getProviderOrSigner(true);

            //Create a new instance of the contract with s signer which allows update method
            const waitinglistContract = new Contract(
                WAITINGLIST_CONTRACT_ADDRESS, abi, signer
            );
            //callthe addAddressToWaitinglist from  the contract
            const tx = await waitinglistContract.addAddressToWaitinglist();
            setLoading(true);
            //wait for transaction to get mined 
            await tx.wait();
            setLoading(false);

            //get the updated number of addresses in the whitelist
            await getNumberOfWaitinglist();
            setJoinWaitinglist(true);
        } catch (err) {
            console.error(err);
        };
    }
    /**
   * getNumberOfWaitinglist:  gets the number of whitelisted addresses
   */
    const getNumberOfWaitinglist = async () => {
        try {
             // Get the provider from web3Modal, which in our case is MetaMask
            // No need for the Signer here, as we are only reading state from the blockchain
            const provider = await getProviderOrSigner();
            const waitinglistContract = new Contract(
                WAITINGLIST_CONTRACT_ADDRESS, abi, provider);
            // call the numAddressesWaitinglisted from the contract
            const _numberOfWaitinglist = await waitinglistContract.numAddressesWaitinglist();
            setNumberOfWaitinglist(_numberOfWaitinglist);
        } catch (err) {
            console.error(err);
        }
    };
      /**
   * checkIfAddressInwaitinglist: Checks if the address is in waiting list
   */
  const checkIfAddressInwaitinglist = async () =>{
      try{
           // We will need the signer later to get the user's address
            // Even though it is a read transaction, since Signers are just special kinds of Providers,
            // We can use it in it's place
            const signer = await getProviderOrSigner(true);
            const waitinglistContract = new Contract(
                WAITINGLIST_CONTRACT_ADDRESS, abi, signer
            );
            //Get the address associated to the signer which is connected to  MetaMask
            const address = await signer.getAddress();

            //call the waitinglist addresses from the contract
            const _joinWaitinglist = await waitinglistContract.waitinglistAddresses(
                address
            );
            setJoinWaitinglist(_joinWaitinglist);
      } catch(err){
          console.error(err);
      }
  };

  //connect wallet
  const connectWallet = async () => {
      try {
          //Get the provider from web3modal, which in my case is metamask
          //when used for the first time, it prompts the user to connect their wallet
          await getProviderOrSigner();
          setWalletConnected(true);

          checkIfAddressInwaitinglist();
          getNumberOfWaitinglist();
      } catch(err){
          console.error(err);
      }
  };

   /*
    renderButton: Returns a button based on the state of the dapp
  */
    const renderButton = () => {
        if (walletConnected) {
          if (joinWaitinglist) {
            return (
              <div className={styles.description}>
                Thanks for joining the Whitelist!
              </div>
            );
          } else if (loading) {
            return <button className={styles.button}>Loading...</button>;
          } else {
            return (
              <button onClick={addAddressToWaitinglist} className={styles.button}>
                Join the Whitelist
              </button>
            );
          }
        } else {
          return (
            <button onClick={connectWallet} className={styles.button}>
              Connect your wallet
            </button>
          );
        }
      };
      // In this case, whenever the value of `walletConnected` changes - this effect will be called
      useEffect(() => {

        if(!walletConnected) {
            //Assign the web3modal class to the referenceobject by setting it's 'current' value
            //The 'current' value is perished throughtout as long as this page is open
            web3ModalRef.current = new Web3Modal({
                network: "rinkeby",
                providerOptions: {},
                disableInjectedProvider: false,
            });
            connectWallet();
        }
      }, [walletConnected]);

      return (
        <div>
          <Head>
            <title>Whitelist Dapp</title>
            <meta name="description" content="Whitelist-Dapp" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={styles.main}>
            <div>
              <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
              <div className={styles.description}>
                Its an NFT collection for developers in Crypto.
              </div>
              <div className={styles.description}>
                {numberOfWaitinglist} have already joined the Whitelist
              </div>
              {renderButton()}
            </div>
            <div>
              <img className={styles.image} src="./crypto-devs.svg" />
            </div>
          </div>
    
          <footer className={styles.footer}>
            Made with &#10084; by Crypto Devs
          </footer>
        </div>
      );
}
export default Home;