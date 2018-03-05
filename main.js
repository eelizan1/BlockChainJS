const SHA256 = require('crypto-js/sha256');

// Block class
class Block {
    /*
        index - where the block sits on the chain 
        timeStamp - when the block was created 
        data - any type of data to associate with the block
        previousHash - string that contains the hash of the block before this one 
                        Ensures the integrity of our block chain 
    */
    constructor(index, timeStamp, data, previousHash = '') {
        this.index = index; 
        this.timeStamp = timeStamp; 
        this.data = data; 
        this.previousHash = previousHash; 
        this.hash = this.calculateHash(); // contains the hash of the block
    }

    /* Takes property of the block, run them through a hash function and return the hash */
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timeStamp + JSON.stringify(this.data)).toString();             
    }
}

// Block Chain class
class Blockchain {
    constructor() {
        // array of blocks starting with genesis block
        this.chain = [this.createGenesis()]; 
    }

    // first block, genisis, should be created manually 
    createGenesis () {
        return new Block(0, "01/01/1992", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        // get hash of latest block
        newBlock.previousHash = this.getLatestBlock().hash; 
        newBlock.hash = newBlock.calculateHash(); 

        // push on chain 
        this.chain.push(newBlock); 
    }

    // check if chain is valid 
    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previoucBlock = this.chain[i-1]; 

            // if the hash of the current block is still valid by recalcualting
            if(currentBlock.hash != currentBlock.calculateHash()) {
                return false; 
            }

            // if previous hash is correct
            if(currentBlock.previousHash != previoucBlock.hash) {
                return false; 
            }
        }
        return true; 
    }
}



// test

let coinChain = new Blockchain(); 
coinChain.addBlock(new Block(1, "01/01/1992", {value: 4})); 
coinChain.addBlock(new Block(2, "2/01/1992", {value: 24}));
coinChain.addBlock(new Block(3, "11/01/1992", {value: 44})); 

coinChain.chain[1].data = {value:100}; 
console.log(coinChain.isChainValid());
//console.log(JSON.stringify(coinChain, null, 4));