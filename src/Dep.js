import React from 'react';
import { deployContract } from './Deploycontract'; // Import the deployment function

function Dep({ isMaster, masterAddress }) { // Add masterAddress as a prop
    console.log(masterAddress)
  const handleDeployContract = async () => {
    if (!isMaster) {
      console.error('Only the master can deploy the contract.');
      return;
    }

    // Show loading indicator or message
    console.log('Deploying contract...');

    try {
      // Call the deployment function with the master's address
      const contractAddress = await deployContract(masterAddress); // Pass masterAddress as an argument
      
      // Provide feedback to the user
      console.log('Contract deployed at:', contractAddress);
    } catch (error) {
      // Handle deployment errors
      console.error('Error deploying contract:', error);
    }
  };

  return (
    <div>
      <h1>Your App</h1>
      {isMaster && <button onClick={handleDeployContract}>Deploy Contract</button>}
    </div>
  );
}

export default Dep;
