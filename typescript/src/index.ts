
import * as CryptoJs from 'crypto-js'; 

class Block {

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    
    static calculateBlockHash = (
        index:number, 
        previousHash:string, 
        data:string,
        timestamp:number
    ): string => 
        CryptoJs.SHA256(index+previousHash+data+timestamp).toString();
    
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

// 샘플 블록
const sampleBlock: Block = new Block(0,"hash$Sample$1", "preHash$Sample$1", "sampleData$1", 0);

// 샘플 블록체인
let blockChain: Block[] = [sampleBlock];

// 배열 push기능 및 인스턴스 객체
blockChain.push(new Block(1, "hash$Sample$2","preHash$Sample$2", "sampleData$2", 1));

// blockChain을 위한 함수
const getBlockChain = (): Block[] => blockChain;
const getLastBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);


console.log(blockChain);