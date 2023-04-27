import { ethers } from 'ethers';
import ContractDetails from '../Contracts/ContractDetails';

export default async function CurrentCycle (id) {
    const { ethereum } = window;
    if(ethereum){
        try{
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractinstance = new ethers.Contract(ContractDetails.contract, ContractDetails.contractABI, signer); 
        console.log( 'contractinstance',contractinstance)
        const myCurrentCycle = await contractinstance.currentCycle(id,1);
        console.log( 'myCurrentCycle',myCurrentCycle)
        return myCurrentCycle;
        }catch(e){
            console.log(e)
        }
    }
}