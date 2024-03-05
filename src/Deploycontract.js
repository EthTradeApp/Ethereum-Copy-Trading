export async function deployContract(masterAddress) {
    // Function implementation

const { Web3 } = require('web3');
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
] // Assuming you have the ABI saved in a file
const contractBytecode = '608060405234801561001057600080fd5b506040516109463803806109468339818101604052602081101561003357600080fd5b8101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600560028190555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610869806100dd6000396000f3fe6080604052600436106100865760003560e01c806354857b171161005957806354857b17146101f4578063692058c21461021f578063af6914c514610276578063ceeac5d4146102a1578063ee97f7f3146102e557610086565b806305b102e31461008b57806313cceec8146100d95780631abc901f14610135578063308837ed146101b0575b600080fd5b6100d7600480360360408110156100a157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061033c565b005b61011b600480360360208110156100ef57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610438565b604051808215151515815260200191505060405180910390f35b34801561014157600080fd5b5061016e6004803603602081101561015857600080fd5b81019080803590602001909291905050506104d7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101f2600480360360208110156101c657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610513565b005b34801561020057600080fd5b50610209610696565b6040518082815260200191505060405180910390f35b34801561022b57600080fd5b5061023461069c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561028257600080fd5b5061028b6106c2565b6040518082815260200191505060405180910390f35b6102e3600480360360208110156102b757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106c8565b005b3480156102f157600080fd5b506102fa61080f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461039557600080fd5b7f50daea861fcecc0a530c2b6f8ba5031f3ce8664a74ca723e54882fa0c321f22c338383604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a15050565b600080600090505b6002548110156104cc578273ffffffffffffffffffffffffffffffffffffffff166004828154811061046e57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156104bf5760019150506104d2565b8080600101915050610440565b50600090505b919050565b600481815481106104e457fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561056d57600080fd5b3073ffffffffffffffffffffffffffffffffffffffff166313cceec8826040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1580156105ec57600080fd5b505af1158015610600573d6000803e3d6000fd5b505050506040513d602081101561061657600080fd5b810190808051906020019092919050505061063057600080fd5b7ff42dab0aba92a9d84a28c2a60305be875668e8bfc6c721ea6d49eeb89753643281604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b60025481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561072257600080fd5b6002546003541061073257600080fd5b60048190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060016003600082825401925050819055507fcbcb9313b290130e9f7274e5ca02f2787e45d5484d7b9bcff360796aedc30b7c81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156fea265627a7a7231582081cea9533a7ff7f3af3242c42b580adffa6112817577f0ece2ac1c01e8eab73e64736f6c63430005110032';

const web3 = new Web3(window.ethereum);


  const accounts = await web3.eth.getAccounts();

  const contract = new web3.eth.Contract(contractABI);

  const deployTx = contract.deploy({
    data: contractBytecode,
    arguments: ['0x2170Ed0880ac9A755fd29B2688956BD959F933F8'], // Pass any constructor arguments here
  });
  console.log(accounts[0])
  const deployedContract = await deployTx.send({
    from: accounts[0], // Choose the account to deploy from
    gas: 2000000, // Adjust the gas limit as needed
  });
  localStorage.setItem("contract address",deployedContract.options.address);
  console.log('Contract deployed at address:', deployedContract.options.address);


};
