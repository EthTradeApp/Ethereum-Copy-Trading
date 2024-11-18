# Copy Trading Platform on Ethereum  

This platform allows users to participate in **copy trading** on the Ethereum blockchain. Users can follow traders they admire and automatically replicate their trades using smart contracts, ensuring transparency and decentralization.

---

## Features  

### Copy Trading  
- Users can follow their favorite traders.  
- Automatically copy trades executed by the followed traders.  

### Decentralized Infrastructure  
- Built on **Ethereum** for secure and transparent transactions.  
- Trades are governed by **Solidity** smart contracts.  

### User Profiles  
- View performance metrics of traders, such as ROI and trade history.  
- Follow/unfollow traders with a simple transaction.  

### Trade Customization  
- Users can set the percentage of their funds to allocate per copied trade.  
- Enable or disable copy trading at any time.  

---

## Smart Contract Details  

The platform is powered by Solidity smart contracts that manage the following:  

### 1. Trader Registration  
- Traders register their wallets and enable their trades to be copied.  

### 2. Follower Management  
- Tracks which users follow which traders.  
- Emits events when follow/unfollow actions are performed.  

### 3. Trade Execution  
- Trades executed by traders are automatically mirrored in followers' wallets.  
- A proportional amount of the follower’s funds is allocated based on user preferences.  

### 4. Fee Distribution  
- Traders earn a percentage of profits from their followers as a reward.  
- Fees are distributed automatically using the smart contract.  

---

## Technologies Used  

### Smart Contracts  
- **Solidity**: Core logic for copy trading and trade execution.  
- **OpenZeppelin**: Used for secure and audited contract components (e.g., ERC20 tokens).  

### Frontend  
- **React**: Web interface for users to interact with the platform.  
- **Web3.js/Ethers.js**: Connects the frontend to the Ethereum blockchain.  

### Backend  
- **Node.js**: For off-chain data aggregation and user management.  
- **IPFS**: Decentralized storage for user profiles and trade history.  

---

## Getting Started  

### Prerequisites  
1. **MetaMask** or a similar Ethereum wallet.  
2. Access to an Ethereum testnet (e.g., Goerli or Sepolia).  
3. Basic ETH and test tokens for transactions.  

