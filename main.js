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
}

// test

let coinChain = new Blockchain(); 
coinChain.addBlock()