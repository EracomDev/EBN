import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import UserInfo from '../../Common/UserInfo';

import { BigNumber, ethers } from 'ethers';
import Loader from '../../Component/Loader';
import "./Withdraw.css"
import ContractDetails from '../../Contracts/ContractDetails';
import { useSelector } from 'react-redux';
import DaiIcon from '../../Component/DaiIcon';
import Income from '../../Common/Income';
const Withdraw = () => {

    const [userinfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [incomes, setIncomes] = useState([]);
    const [depositAmount, setdepositAmount] = useState();
    const [withdrawAmount70, setWithdrawAmount70] = useState();
    const [depositError, setdepositError] = useState('');
    const [withdrawError70, setWithdrawError70] = useState();
    const [inputAddress, setInputAddress] = useState('');
    const [freezeAmount, setFreezeAmount] = useState('');
    const [freezeError, setFreezeError] = useState('');

    return (
        <React.Fragment>
            <Container className='p-4'>
                <h4 className='dashboardHeading'>Withdraw</h4>
                <Row>
                    <Col lg="6">
                        <div className="card card-body mb20">
                            <div className='withdrawHeading'>
                                <p className=''>Working Wallet</p>
                                <h5><DaiIcon width="17px" />{String(userinfo?.wallet30 / 1e18)}</h5>
                            </div>
                            <div className="form-group">
                                <label htmlFor="depositAmount">Amount*</label>
                                <input type="text" id='depositAmount' value={depositAmount} onChange={(e) => setdepositAmount(e.target.value)} className='inputMoney' placeholder='Enter Amount' />
                                <p id="error">{depositError}</p>
                                <label htmlFor="DepositAddress">Address*</label>
                                <input type="text" id='DepositAddress' className='inputMoney' placeholder='Enter Address'
                                    value={inputAddress} onChange={(e) => setInputAddress(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col sm="6"><button className='btn btn-warning  depositBtn'>Deposit</button></Col>
                                    <Col sm="6"><button className='btn btn-warning colSky depositBtn'>Transfer</button></Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="card card-body">
                            <div className='withdrawHeading'>
                                <p className=''>Non Working Wallet</p>
                                <h5><DaiIcon width="17px" />{String(userinfo?.wallet70 / 1e18)}</h5>
                            </div>
                            <div className="form-group">
                                <label htmlFor="depositAmount">Amount*</label>
                                <input type="text" id='depositAmount' value={withdrawAmount70} onChange={(e) => setWithdrawAmount70(e.target.value)} className='inputMoney' placeholder='Enter Amount' />
                                <p id="error">{withdrawError70}</p>
                            </div>
                            <div className="form-group">
                                <center><button style={{ backgroundColor: '#0eed0eeb' }} className='btn btn-warning depositBtn'>Withdraw</button></center>
                            </div>
                        </div>
                    </Col>
                    <Col lg="6" className='mt-4'>
                        <div className="card card-body">
                            <div className='withdrawHeading'>
                                <p className=''>Freeze Wallet</p>
                                <h5><DaiIcon width="17px" />{parseFloat(incomes?.freeze / 1e18).toFixed(2)}</h5>
                            </div>
                            <div className="form-group">
                                <label htmlFor="FreezeAmount">Amount*</label>
                                <input type="text" id='FreezeAmount' value={freezeAmount} onChange={(e) => setFreezeAmount(e.target.value)} className='inputMoney' placeholder='Enter Amount' />
                                <p id="error">{freezeError}</p>
                                <p id="note">Note: The deposit Value Should Be Greater Or Equal Then Your Previous Deposit</p>
                            </div>
                            <div className="form-group">
                                <center><button className='btn btn-warning depositBtn'>Deposit From Freeze</button></center>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </React.Fragment>
    )
}
export default Withdraw



