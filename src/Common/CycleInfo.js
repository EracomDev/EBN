import { ethers } from 'ethers';
import ContractDetails from '../Contracts/ContractDetails';

export default async function CycleInfo (acc) {
    try{
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractinstance = new ethers.Contract(ContractDetails.contract, ContractDetails.contractABI, signer); 

    console.log("contractinstance " , contractinstance);
    
     const cycleInformation = await contractinstance.cycleInfo1(acc , 1);
     console.log("cycleInformation",cycleInformation)
    return cycleInformation;
}catch(e){  
    console.log(e);
}
}
 