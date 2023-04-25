import React, { useEffect, useState } from 'react'
import "./RegisterPage.css"
import { useNavigate } from "react-router-dom"
import { ethers } from 'ethers';
import { useSelector } from 'react-redux'
import Loader from '../../Component/Loader';
import IdToAddress from '../../Common/IdToAddress';
import GetBalance from '../../Common/GetBalance';
import GetMaticBalance from '../../Common/GetMaticBalance';
import UserInfo from '../../Common/UserInfo';
const RegisterPage = () => {
    const navigate = useNavigate();
    const [spons, setSponsor] = useState("");
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const BUSD = useSelector((state) => state.contract.value.BUSD);
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const BUSD_ABI = useSelector((state) => state.contract.value.BUSD_ABI);
    const [loading, setLoading] = useState(false);


    const [msg, setMsg] = useState("");
    return (
        <>
            {
                loading === true ? <Loader /> : ''
            }
            <span className='text-danger'>{msg}</span>
            <div className="connectRegisterLeft">

                <input type="text" placeholder="Enter Sponsor ID." value={spons} onChange={(e) => setSponsor(e.target.value)} id="sponsor" />
                <div className="registerButtons">
                    <button className="viewing bgOrange">Register</button>
                </div>

            </div>
        </>
    )
}

export default RegisterPage