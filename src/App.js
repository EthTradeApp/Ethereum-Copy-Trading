import React, { useState } from 'react';
import Web3 from 'web3';
import { deployContract } from './Deploycontract';
import Dep from './Dep';

function Copy() {
  const [followerAddress, setFollowerAddress] = useState('');
  const [removeFollowerAddress, setRemoveFollowerAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isInFollowersResult,setIsInFollowersResult]=useState();
  const [checkAddress, setCheckAddress] = useState('');
  const [masterAddress, setMasterAddress] = useState(''); 

  const contractAddress = localStorage.getItem("contract address");
  const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_dex",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "follower",
				"type": "address"
			}
		],
		"name": "FollowerAddedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "follower",
				"type": "address"
			}
		],
		"name": "FollowerRemovedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "follower",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "OrderCreatedEvent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_followerAddress",
				"type": "address"
			}
		],
		"name": "addFollower",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dex",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "followers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_followerAddress",
				"type": "address"
			}
		],
		"name": "isInFollowers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "master",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxNrOfFollowers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nrOfFollowers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "order",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_followerAddress",
				"type": "address"
			}
		],
		"name": "removeFollower",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
];
	console.log("the final contract address is " , contractAddress)
console.log("hello ");
  const web3 = new Web3(Web3.givenProvider || 'https://rpc2.sepolia.org/');
  console.log("web3 is",web3);
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  console.log("contractaddress is",contract);

  const handleDeployContract = async () => {
    try {
      console.log('Deploying contract...');
      const contractAddress = await deployContract(web3.eth.defaultAccount);
      console.log('Contract deployed at:', contractAddress);
    } catch (error) {
      console.error('Error deploying contract:', error);
    }
  };
  const connectWallet = async () => {
	try {
	  if (window.ethereum) {
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		setIsConnected(true);
		console.log(accounts);
		setWalletAddress(accounts[0]); // Set the first account as the default
		web3.eth.defaultAccount = accounts[0]; // Set the default account in Web3
		setMasterAddress(accounts[0]);
	  } else {
		console.error('MetaMask is not installed');
	  }
	} catch (error) {
	  console.error('Error connecting to wallet:', error);
	}
  };

  const addFollower = async () => {
    try {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            throw new Error('No accounts found. Please check your MetaMask setup.');
        }
        console.log("acc address at 0 is", accounts[0]);

        const transactionParameters = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.addFollower(followerAddress).encodeABI(),
            gasPrice: '4000000000', // 4 Gwei (example gas price)
        };

        console.log('Follower added successfully');
		console.log('Sending transaction...');
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
		console.log(contract.events);

        console.log('Transaction sent:', txHash);
		contract.events.FollowerAddedEvent({ filter: { follower: accounts[0] } })
		.on('data', event => {
			console.log('Follower added event received:', event);
			// Handle the event data here
		})
		.on('error', error => {
			console.error('Error listening to FollowerAddedEvent:', error);
		});
    } catch (error) {
        console.error('Error adding follower:', error);
    }
};


  const removeFollower = async () => {
    try {
		await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            throw new Error('No accounts found. Please check your MetaMask setup.');
        };
		const transactionParameters = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.removeFollower(removeFollowerAddress).encodeABI(),
            gasPrice: '4000000000', // 4 Gwei (example gas price)
        };
		await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
      
      console.log('Follower removed successfully');
    } catch (error) {
      console.error('Error removing follower:', error);
    }
  };

  const createOrder = async () => {
    try {
		await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            throw new Error('No accounts found. Please check your MetaMask setup.');
        };
		const transactionParameters = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.order(tokenAddress, amount).encodeABI(),
            gasPrice: '200000', // 4 Gwei (example gas price)
        };
		await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
      
      console.log('Order created successfully');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const checkIsInFollowers = async () => {
    try {
      const result = await contract.methods.isInFollowers(checkAddress).call();
      setIsInFollowersResult(result);
      console.log('Is in followers:', result);
    } catch (error) {
      console.error('Error checking isInFollowers:', error);
    }
  };

  return (
	<div className="App">
	<h1>Copy Trading DApp</h1>
	{isConnected ? (
	  <p>Connected with address: {walletAddress}</p>
	) : (
	  <button onClick={connectWallet}>Connect Wallet</button>
	)}

<Dep isMaster={isConnected} masterAddress={masterAddress} /> 
	
	<label htmlFor="followerAddress">Follower Address:</label>
	<input type="text" id="followerAddress" value={followerAddress} onChange={(e) => setFollowerAddress(e.target.value)} />
	<button onClick={addFollower}>Add Follower</button>

	<label htmlFor="removeFollowerAddress">Follower Address:</label>
	<input type="text" id="removeFollowerAddress" value={removeFollowerAddress} onChange={(e) => setRemoveFollowerAddress(e.target.value)} />
	<button onClick={removeFollower}>Remove Follower</button>

	<label htmlFor="tokenAddress">Token Address:</label>
	<input type="text" id="tokenAddress" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
	<label htmlFor="amount">Amount:</label>
	<input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
	<button onClick={createOrder}>Create Order</button>

	<label htmlFor="checkAddress">Check Address:</label>
	<input type="text" id="checkAddress" value={checkAddress} onChange={(e) => setCheckAddress(e.target.value)} />
	<button onClick={checkIsInFollowers}>Check Is in Followers</button>
  </div>
	
  );
}

export default Copy;
