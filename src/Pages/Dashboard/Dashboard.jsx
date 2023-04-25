import React, { useState, useEffect } from 'react'
import "./Dashboard.css"
import { Container, Row, Col } from "react-bootstrap";
import { GiStarSwirl } from 'react-icons/gi'
import { BiTime } from 'react-icons/bi'
import { TbCalendarTime } from 'react-icons/tb'
import { BsPersonPlusFill } from 'react-icons/bs'
import { ImConnection } from 'react-icons/im'
import { SiOpslevel } from 'react-icons/si'
import { GiTakeMyMoney } from 'react-icons/gi'
import { MdAccountBalanceWallet } from 'react-icons/md'
import PoolCard from '../../Component/PoolCard/PoolCard';
import CopyToClipboard from '../../Common/CopyToClipboard';
import Change from '../../Common/StringToSub';
import { IoCopyOutline } from 'react-icons/io5';
import TimestampToDate from '../../Common/TimestampToDate';
import DaiIcon from '../../Component/DaiIcon';
import Tree from './../../Images/tree3.png'
import { FaUserAlt, FaLink } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
const Dashboard = () => {
    const [userDetails, setUser] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [planInfo, setPlanInfo] = useState([]);
    const [rewardStatus, setRewardStatus] = useState([]);
    const [depositValue, setDepositValue] = useState();
    const [walletAddress, setWalletAddress] = useState();
    const [orders, setOrders] = useState();
    const [maticBalance, setMaticBalace] = useState();
    const [balance, setBalance] = useState();
    const [depositError, setDepositError] = useState("");
    const [userAddress, setUserAddress] = useState("");
    var x = 0;
    const [userId, setUserId] = useState(0);

    return (
        <React.Fragment>
            <div className='topColor'>
                <h4>Dashboard</h4>
            </div>
            <Row className="p-4 " style={{ marginTop: "-90px" }}>
                <Col lg="12">
                    <Row>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Cycle Income"
                                price={parseFloat(incomes?.roi / 1e18)}
                                bgColor="#AB47BC"
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Level"
                                price={parseFloat(incomes?.level / 1e18)}
                                bgColor="#9FCC2E"
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Top Leader"
                                price={parseFloat(incomes?.leader / 1e18)}
                                bgColor="#FA9F1B"
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Grand Leader"
                                price={parseFloat(incomes?.grand / 1e18)}
                                bgColor="#03A9F4"
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Dynamic Leader"
                                price={parseFloat(incomes?.DLeader / 1e18)}
                                bgColor="#AB47BC"
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="1000 Club"
                                price={parseFloat(incomes?.thclub / 1e18)}
                                bgColor="#9FCC2E"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="px-4">
                <Col lg="12" md="12"><Container id="detailCardContainer" className='mb20'>
                    <div className="detailCard">
                        <p><i><FaUserAlt /></i>User ID :</p>
                        <span>{parseInt(userDetails?.id)} </span>
                    </div>
                    <div className="detailCard">
                        <p><i><BiTime /></i>Platform Running time :</p>
                        {
                            console.log('first', parseInt(planInfo?.startTime))
                        }
                        <span>{TimestampToDate(String(planInfo?.startTime))}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>Working Wallet :</p>
                        <span>{parseFloat(userDetails?.wallet30 / 1e18).toFixed(2)} (30%)</span>
                    </div>
                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>Non-Working Wallet :</p>
                        <span>{parseFloat(userDetails?.wallet70 / 1e18).toFixed(2)} (70%)</span>
                    </div>
                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>Freeze Wallet :</p>
                        <span>{parseFloat(incomes?.freeze / 1e18).toFixed(2)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><TbCalendarTime /></i>Joining Time : </p>
                        <span>{TimestampToDate(String(rewardStatus?.timestamp, 16))}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><BsPersonPlusFill /></i>Referrals :</p>
                        <span>{parseInt(userDetails?.directs, 16)} </span>
                    </div>
                    <div className="detailCard">
                        <p><i><ImConnection /></i>Connection Status :</p>
                        {
                            walletAddress != null ?
                                <div>
                                    <span className='d-none' id="dashboardWalletAddress">{walletAddress}</span>
                                    <span style={{ color: '#1af768 ' }}>{Change(walletAddress)} <i onClick={() => CopyToClipboard('dashboardWalletAddress')}><IoCopyOutline /></i></span>
                                </div> :
                                <span style={{ color: '#c94bdb' }}>Not Connected</span>
                        }
                    </div>
                    <div className="detailCard">
                        <p><i><GiTakeMyMoney /></i>My Deposit :</p>
                        <span><DaiIcon width="15px" />{parseFloat(userDetails?.totalDeposit / 1e18).toFixed(2)}</span>
                    </div>
                </Container></Col>
                {/* <Col lg="4" md="4" className='d-grid gap-20'>
                    <div className="card card-body">
                        <img src={Tree} id='tree'></img>
                        <center><span className='depositHeading' style={{ fontSize: '20px' }}>Make Deposit</span></center>
                        <div className="form-group">
                            <label htmlFor="depositAmount">Amount*</label>
                            <input type="text" id='depositAmount' value={depositValue} onChange={(e) => setDepositValue(e.target.value)} className='inputMoney' placeholder='Enter Amount' />
                            <p id="error">{depositError}</p>
                        </div>
                        <div className="form-group">
                            <p id="note">Note: The deposit Value Should Be Greater Or Equal Then Your Previous Deposit</p>
                            <center><button className='btn btn-warning depositBtn'>Deposit</button></center>
                        </div>
                    </div>
                </Col> */}
            </Row>

            <Container fluid className="p-4">
                <div id="detailCardContainer">

                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>MATIC Balance :</p>
                        <span>{parseFloat(maticBalance / 1e18).toFixed(5)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>DAI Balance :</p>
                        <span>{parseFloat(balance).toFixed(2)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><SiOpslevel /></i>My Rank :</p>
                        <span>{String(userDetails?.openLevel)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><IoIosPeople /></i>My Team :</p>
                        <span>{String(userDetails?.teamNum)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>My Orders :</p>
                        <span>{parseInt(userDetails?.orderCount, 16)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><BsPersonPlusFill /></i>Referral :</p>
                        <span className='d-none' id="refLink">{userDetails?.sponsor}</span>
                        <span>{Change(userDetails?.sponsor)} <i onClick={() => CopyToClipboard('refLink')}><IoCopyOutline /></i></span>
                    </div>
                    <div className="detailCard">
                        <p><i><BsPersonPlusFill /></i>My Directs :</p>
                        <span className='d-none' id="refLink">{userDetails?.sponsor}</span>
                        <span>{String(userDetails?.directs)} </span>
                    </div>
                    {/* <div className="detailCard">
                        <p><i><GiTakeMyMoney /></i>My Deposit :</p>
                        <span>{parseFloat(userDetails?.totalDeposit / 1e18).toFixed(2)}</span>
                    </div> */}
                    <div className="detailCard">
                        <p className='d-none ' id="myLink">{userId != 0 ? window.location.origin + '/?ref=' + userAddress : 'Not Register'}</p>
                        <p><i><FaLink /></i>Referral Link :</p>
                        <span>{Change(window.location.origin + '/?ref=' + userAddress)} <i><IoCopyOutline onClick={() => CopyToClipboard('myLink')} /></i></span>
                    </div>
                </div>
            </Container>
            <Container fluid className='p-4 pt-0' style={{ overflowX: 'scroll' }}>
                <table className="tableSection">
                    <thead>
                        <tr>
                            <th>Sno.</th>
                            <th>Amount</th>
                            <th>Claimed</th>
                            <th>Cycles</th>
                            <th>Last Claim</th>
                            <th>Next Claim</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                        }
                        {orders?.map((x, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{String(x.amount / 1e18)}</td>
                                <td>{String(x.claimed / 1e18)}</td>
                                <td>{String(x.cycle)}</td>

                                {
                                    console.log('cycle', x.cycle)
                                }
                                {
                                    console.log('last', x.lastClaim)
                                }
                                <td>{x.lastClaim == 0 ? 'Not Claimed Yet' : TimestampToDate(x.lastClaim)}</td>
                                <td>{TimestampToDate(String(x.nextClaim))}</td>

                                {
                                    <td><button style={{ background: "#5c3f09" }} className="actionBtn">Claim</button></td>
                                }

                            </tr>
                        )}
                    </tbody>
                </table>
            </Container>
        </React.Fragment >
    )
}
export default Dashboard