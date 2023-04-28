import React, { useEffect, useState } from 'react'
import "./RegisterPage.css"
import { useNavigate } from "react-router-dom"
import { ethers } from 'ethers';
import { useSelector } from 'react-redux'
import Loader from '../../Component/Loader';
import UserInfo from '../../Common/UserInfo';
import AddressToId from '../../Common/AddressToId';
import IdToAddress from '../../Common/IdToAddress';
import GetBalance from '../../Common/GetBalance';
const RegisterPage = () => {
    const navigate = useNavigate();
    const [spons, setSponsor] = useState("");
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const BUSD = useSelector((state) => state.contract.value.BUSD);
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const BUSD_ABI = useSelector((state) => state.contract.value.BUSD_ABI);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const { ethereum } = window
    useEffect(() => {

        let len = window.location.href.length;
        const after = window.location.search.slice(window.location.search.indexOf('=') + 1);
        console.log("url here", after);
        setSponsor(after)
    }, [])

    async function CheckExist() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        let idd = await AddressToId(accounts[0]);
        let Info = await UserInfo(idd);
        console.log('Info', Info)
        return Info;
    }
    async function increaseAllowance() {
        setLoading(true);
        const { ethereum } = window;
        if (spons.length > 0) {
            // const addr = await IdToAddress(spons);
            const userInfo = await UserInfo(spons);
            const userId = String(userInfo?.id);
            console.log('userInfo', userId)
            if (userId > 0) {
                let userEx = await CheckExist();
                console.log('userEx', userEx)
                if (userEx.id == 0) {
                    const chekBal = true;
                    if (chekBal == true) {

                        if (ethereum) {
                            try {
                                const provider = new ethers.providers.Web3Provider(ethereum);
                                const signer = provider.getSigner();
                                const busdInstance = new ethers.Contract(BUSD, BUSD_ABI, signer);
                                console.log("Instance : " + busdInstance);

                                let inc = await busdInstance.increaseAllowance(contract, '70000000000000000000', { value: ethers.utils.parseEther('0') });
                                await inc.wait();
                                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                                localStorage.setItem("viewId", accounts[0]);
                                localStorage.setItem("loginBy", 'automatic');
                                register();
                                console.log("Tr Hash : " + inc.hash);
                            }
                            catch (error) {
                                setLoading(false);
                                setMsg(<span className='text-danger'>Something Went Wrong</span>);
                            }
                        }
                        else {
                            setMsg(<span className='text-danger'>Wallet Not Exist.</span>);
                            setLoading(false);
                        }
                    } else {
                        setMsg(<span className='text-danger'>Insufficient Funds</span>);
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                    setMsg(<span className='text-danger'>User Already Exist</span>);
                }
            } else {
                setLoading(false);
                setMsg(<span className='text-danger'>Sponsor Not Exist</span>);
            }
        }
        else {
            setLoading(false);
            setMsg(<span className='text-danger'>Enter Sponsor ID</span>);
        }
    }
    async function register() {
        setLoading(true);
        try {
            const userInfo = await UserInfo(spons);
            const userId = String(userInfo?.id)
            const userDeposit = 10;
            const { ethereum } = window;
            if (ethereum) {
                if (userId > 0) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const contractinstance = new ethers.Contract(contract, contractABI, signer);
                    console.log("Instance : " + contractinstance);

                    let inc = await contractinstance.register(spons, { value: ethers.utils.parseEther('0') });

                    await inc.wait();
                    console.log("Tr Hash : " + inc.hash);

                    setMsg("Register Success.");
                    localStorage.setItem('upline', 1);
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    const useridd = await AddressToId(accounts[0]);
                    localStorage.setItem("viewId", useridd);
                    localStorage.setItem("loginBy", 'automatic');
                    navigate("/dashboard");
                    setLoading(false);
                }
                else {
                    setLoading(false);
                    setMsg(<span className='text-danger'>Sponsor Not Exist</span>);
                }
            }
        } catch (error) {
            setMsg(<span className='text-danger'>Something went wrong</span>)
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        const viewInput = document.getElementById('sponsor');
        viewInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("registerBtn").click();
            }
        });
    }, []);

    async function CheckBeforeRegister() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        let bal = await GetBalance(accounts[0]);
        let balance = parseFloat(bal / 1e18)

        console.log('balance', balance)
        if (balance >= 70) {
            increaseAllowance();
        }
        else {
            setMsg(<span className='text-danger'>Insufficient Fund</span>);
        }
    }

    return (
        <>
            {
                loading === true ? <Loader /> : ''
            }
            <span className='text-danger'>{msg}</span>
            <div className="connectRegisterLeft">

                <input type="text" placeholder="Enter Sponsor ID." value={spons} onChange={(e) => setSponsor(e.target.value)} id="sponsor" />
                <div className="registerButtons">
                    <button className="viewing bgOrange" id="registerBtn" onClick={CheckBeforeRegister}>Register</button>
                </div>

            </div>
        </>
    )
}

export default RegisterPage