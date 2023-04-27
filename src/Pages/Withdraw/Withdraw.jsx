import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import UserInfo from '../../Common/UserInfo';
import { BigNumber, ethers } from 'ethers';
import Loader from '../../Component/Loader';
import "./Withdraw.css"
import DaiIcon from '../../Component/DaiIcon';
import CurrencyName from '../../Component/CurrencyName';
import ContractDetails from '../../Contracts/ContractDetails';
const Withdraw = () => {

    const [userinfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawError, setWithdrawError] = useState('');
    const [acc, setAcc] = useState(localStorage.getItem('viewId'))
    const { BigInt } = window;
    useEffect(() => {
        FetchData();
    }, [])

    async function FetchData() {
        try {
            setLoading(true)
            const userData = await UserInfo(acc);
            console.log('userDatawith', userData);
            setUserInfo(userData)

            setLoading(false)
        } catch (e) {
            setLoading(false)
        }

    }
    function Withdraw() {
        console.log(withdrawAmount);
        if (withdrawAmount > 0) {
            let val = BigInt(withdrawAmount * 1e18);
            WithdrawlFun(val);
        }
    }


    async function WithdrawlFun(withVal) {
        setLoading(true);
        let inc;
        try {
            const { ethereum } = window;
            if (ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const contractinstance = new ethers.Contract(ContractDetails.contract, ContractDetails.contractABI, signer);
                    console.log("Instance : " + contractinstance);
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    {
                        console.log('value70', withVal)
                    }
                    let fee = await contractinstance.estimateGas.withdraw(withVal);
                    const overrides = {
                        gasLimit: fee,
                        gasPrice: ethers.utils.parseUnits('5', 'gwei'),
                        value: ethers.utils.parseEther('0')
                    };
                    inc = await contractinstance.withdraw(withVal, { value: ethers.utils.parseEther('0') });
                } catch (e) {
                    alert('Something Went Wrong')
                    console.log(e);
                    setLoading(false);
                }
                await inc.wait();
                alert("Withdrawal Success");
                setLoading(false);
                FetchData();
            }
        } catch (error) {
            console.log(error)
            alert('Something Went Wrong')
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            {
                loading === true ? <Loader /> : ''
            }
            <Container className='p-4'>
                <h4 className='dashboardHeading'>Withdraw</h4>
                <Row>
                    <Col lg="6" className='mt-4'>
                        <div className="card card-body">
                            <div className='withdrawHeading'>
                                <p className=''>Withdrawal</p>
                                <h5 className='d-flex'>{parseFloat(userinfo?.balance / 1e18).toFixed(2)} <CurrencyName /></h5>
                            </div>
                            <div className="form-group">
                                <label htmlFor="FreezeAmount">Amount*</label>
                                <input type="number" id='FreezeAmount' value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className='inputMoney' placeholder='Enter Amount' />
                                <p id="error">{withdrawError}</p>
                            </div>
                            <div className="form-group">
                                <center><button onClick={Withdraw} className='btn btn-warning depositBtn'>Withdraw</button></center>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </React.Fragment>
    )
}
export default Withdraw



