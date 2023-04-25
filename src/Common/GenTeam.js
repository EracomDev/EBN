import {ethers } from 'ethers';
import ContractDetails from '../Contracts/ContractDetails';

export default async function GenTeam(ids) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractinstance = new ethers.Contract(ContractDetails.contract, ContractDetails.contractABI, signer);   
    console.log('contractinstance',contractinstance)
    let level_team=[];
    let total_team=[];
    let level_team_cnt=[];
    let global_team_cnt=[];
    let global_team=[];
    let total_team_cnt=0;

    for (let ii = 0; ii < 1 ; ii++) {
        try{
            alert();
        var cnt = await contractinstance.genTeam(ids);
        console.log('cnt',cnt)
        // var tm = await contractinstance.getTeam(ids,ii);         
        // var gl = await contractinstance.getglobalTeam(ids,ii);
        
        // level_team_cnt[ii]=String(cnt);
        // global_team_cnt[ii]=String(gl.length);
        // //console.log(ii);
        // level_team[ii]=tm;       
        // global_team[ii]=gl;       
        // total_team_cnt += parseInt(cnt);
        // if(tm.length>0){
        //     total_team.push(tm);
        // }
    }catch(e){
        console.log('erroe',e)
    }
    }
    total_team_cnt = String(total_team_cnt);
    return {level_team:level_team,level_team_count:level_team_cnt,total_team:total_team,total_team_count:total_team_cnt,global_team:global_team,global_team_count:global_team_cnt};   
    //return 1;
}
 