import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { MdAccountBalance } from "react-icons/md"
import "./Deposit.css"
import { ethers } from 'ethers';
import ContractDetails from '../../Contracts/ContractDetails';
import Loader from '../../Component/Loader';
import GetBalance from '../../Common/GetBalance';
import GetMaticBalance from '../../Common/GetMaticBalance';
import UserInfo from '../../Common/UserInfo';
const Deposit = () => {
    const [DAI, setDAI] = useState(0);
    const [daiAmount, setDaiAmount] = useState(0);
    const [maticAmount, setMaticAmount] = useState(0);
    const [depositError, setDepositError] = useState();
    const [depositValue, setDepositValue] = useState();
    const [totalDAI, setTotalDAI] = useState(0);
    const [walletAddress, setWalletAddress] = useState();
    return (
        <React.Fragment>
            <Container className=" p-4">
                <Row>
                    <Col lg="2"></Col>
                    <Col lg="8">
                        <div className="depositContainer p-4 ">
                            <h5 className="text-center depositHeading">Deposit</h5>
                            <Row>
                                <Col md='6'>
                                    <div className="depositCard mb10">
                                        <i><MdAccountBalance /></i>
                                        <div>
                                            <p>DAI Balance</p>
                                            <p>{parseFloat(daiAmount).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <div className="depositCard">
                                        <i><MdAccountBalance /></i>
                                        <div>
                                            <p>MATIC Balance</p>
                                            <p>{parseFloat(maticAmount / 1e18).toFixed(4)}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="inputBusd">
                                <p><i><MdAccountBalance /></i>DAI</p>
                                <input min={0} max={2000} className="d-block" type="number" placeholder='Enter Amount' value={depositValue}></input>
                            </div>
                            <p id="error" style={{ marginTop: '-8px' }}>{depositError}</p>
                            <p style={{ color: "orange" }}>Minimum deposit 25 DAI. A ratio of 25 max 2500</p>
                            <div>
                                <Row>
                                    <Col xs="4">
                                        <p>Deposit</p>
                                        <p>{DAI}<span> DAI</span></p>
                                    </Col>
                                    <Col xs="4">
                                        <p>Each Cycle</p>
                                        <p>10<span>%</span></p>
                                    </Col>
                                    <Col xs="4">
                                        <p>Deposit & interest</p>
                                        <p>{totalDAI}<span> DAI</span></p>
                                    </Col>
                                </Row>
                            </div>
                            {
                                walletAddress !== null ?
                                    <p className='text-success'>{`Connected : ${walletAddress}`}</p> :
                                    <p style={{ color: "red", letterSpacing: "1px" }}>Wallet Not Connected</p>
                            }

                            <p>10 days per cycle. 10% per cycle <br />
                                You will have to redeposit every time after each cycle. It will have to be either the same amount or bigger amount. Every 1 cycle you deposit 1 extra days will be added without extra rewards. Maximum 45 days.</p>

                            <button className="btnDeposit" onClick={Deposit}>Confirm</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Deposit