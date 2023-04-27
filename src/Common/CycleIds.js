import { ethers } from 'ethers';
import ContractDetails from '../Contracts/ContractDetails';

export default async function CycleIds (acc, cycle) {
    try{
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractinstance = new ethers.Contract(ContractDetails.contract, ContractDetails.contractABI, signer); 

    console.log("contractinstance " , contractinstance);
    
     const bl = await contractinstance.cycleIds(acc , 1,cycle);
     console.log("CycleIds",bl)
    return bl;
}catch(e){  
    console.log(e);
}
}
 