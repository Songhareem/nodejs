
import * as CryptoJs from 'crypto-js'; 

class Block {

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    
    static nextIndex: number = 0;

    static getNextIndex = (): number => (Block.nextIndex++);

    static calculateBlockHash = (
        index:number, 
        previousHash:string, 
        data:string,
        timestamp:number
    ): string => 
        CryptoJs.SHA256(index+previousHash+data+timestamp).toString();

    static vaildateStructure = (aBlock: Block): boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" && 
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";
        
    constructor(
        index: number, 
        hash: string, 
        previousHash: string, 
        data: string, 
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

// blockChain을 위한 함수
const getBlockChain = (): Block[] => blockChain;
const getLastBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const getHashForBlock = (aBlock: Block): string => {
    return Block.calculateBlockHash(
        aBlock.index, 
        aBlock.previousHash, 
        aBlock.data, 
        aBlock.timestamp);
}
const isBlockVaild = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.vaildateStructure(candidateBlock)) {
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if(getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}
const addBlock = (candidateBlock: Block): void => {
    if(isBlockVaild(candidateBlock, getLastBlock())) {
        blockChain.push(candidateBlock);
    }
}
const createNewBlock = (data: string) : Block => {  
    const previousBlock: Block = getLastBlock();
    const newIndex: number = Block.getNextIndex();
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimestamp);

    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);

    addBlock(newBlock);
    return newBlock;
}

// 초기 Salt값
const initSalt = "hash$init";

// 초기화 블록
const initBlock: Block = new Block(Block.getNextIndex(), CryptoJs.SHA256(initSalt).toString(), undefined, undefined, getNewTimeStamp());

// 샘플 블록체인
let blockChain: Block[] = [initBlock];

// 배열 push기능 및 인스턴스 객체
//blockChain.push(new Block(1, "hash$Sample$2","preHash$Sample$2", "sampleData$2", 1));

console.log(getBlockChain());