import { BigNumber, ethers } from 'ethers';
import ContractDetails from '../Contracts/ContractDetails';
export default async function AddressToId (add) {
    try{
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractinstance = new ethers.Contract(ContractDetails.contract, ContractDetails.contractABI, signer);   
    const id = await contractinstance.addressToId(add);
    return id;  
    }catch(e){
        console.log(e)
    } 
    
}
 