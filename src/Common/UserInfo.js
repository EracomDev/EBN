import {ethers } from 'ethers';
import ContractDetails from '../Contracts/ContractDetails';

    
export default async function UserInfo (id) {
try{
    const { ethereum } = window;
    if (ethereum) {
            const { ethereum } = window;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contractinstance = new ethers.Contract(ContractDetails.contract, ContractDetails.contractABI, signer);
                const userData = await contractinstance.users(id);
                console.log('userData 1111',userData)
                return userData;
    }
}catch(e){
    console.log(e)
}
        
}
 
