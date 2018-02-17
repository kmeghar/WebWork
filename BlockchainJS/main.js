const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash =''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.CreateGenesisBlock()];
    }

    CreateGenesisBlock(){
        return new Block(0, "01/01/2018", "Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let meghaCoin = new Blockchain();
meghaCoin.addBlock(new Block(1,"02/17/2018", { amount: 4}));
meghaCoin.addBlock(new Block(2,"02/19/2018", { amount: 10}));

console.log(JSON.stringify(meghaCoin, null, 4));