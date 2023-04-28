import React, { useState, useEffect } from 'react'
import "./Dashboard.css"
import { Container, Row, Col } from "react-bootstrap";
import { GiStarSwirl } from 'react-icons/gi'
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
import { FaUserAlt, FaLink } from 'react-icons/fa';
import Income from '../../Common/Income';
import UserInfo from '../../Common/UserInfo';
import CurrencyName from '../../Component/CurrencyName';
import GetBalance from '../../Common/GetBalance';
import GetMaticBalance from '../../Common/GetMaticBalance';
import IdToAddress from '../../Common/IdToAddress';
import Loader from '../../Component/Loader';
import ProgramCard from '../../Component/ProgramCard/ProgramCard';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [rewardStatus, setRewardStatus] = useState([]);
    const [walletAddress, setWalletAddress] = useState();
    const [orders, setOrders] = useState();
    const [maticBalance, setMaticBalace] = useState();
    const [balance, setBalance] = useState();
    const [loading, setLoading] = useState(false)
    var x = 0;
    const [acc, setAcc] = useState(localStorage.getItem('viewId'))
    const [fetch, setFetch] = useState(true)
    useEffect(() => {
        if (fetch === true) {
            FetchData();
            setFetch(false)
        }
    }, [])

    async function FetchData() {
        try {
            setLoading(true)
            const { ethereum } = window;

            const incomeData = await Income(acc);
            setIncomes(incomeData)

            const userData = await UserInfo(acc);
            setUserDetails(userData)

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setWalletAddress(accounts[0])
            setLoading(false)

            const addr = await IdToAddress(acc);

            const balance = await GetBalance(addr);
            setBalance(balance / 1e18);

            const maticBal = await GetMaticBalance(addr);
            setMaticBalace(maticBal);
        } catch (e) {
            setLoading(false)
        }

    }

    return (
        <React.Fragment>
            {
                loading === true ? <Loader /> : ''
            }
            <div className='topColor'>
                <h4>Dashboard</h4>
            </div>
            <Row className="px-3 py-2" style={{ marginTop: "-90px" }}>
                <Col lg="12">
                    <Row>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Direct Income"
                                // price={parseFloat(incomes?.directIncome / 1e18)}
                                price={parseFloat(0).toFixed(2)}
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Pool Income"
                                price={parseFloat(incomes?.poolIncome / 1e18).toFixed(2)}
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Global Club 1"
                                price={parseFloat(incomes?.Royalty1Income / 1e18).toFixed(2)}
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Global Club 2"
                                price={parseFloat(incomes?.Royalty2Income / 1e18).toFixed(2)}
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Team Club"
                                price={parseFloat(incomes?.clubRoyaltyIncome / 1e18).toFixed(2)}
                            />
                        </Col>
                        <Col lg="2" md="2" xs="6" className="p-2">
                            <PoolCard
                                img={GiStarSwirl}
                                title="Generation Income"
                                price={parseFloat(incomes?.directIncome / 1e18).toFixed(2)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="px-2">
                <Col lg="12" md="12"><Container fluid id="detailCardContainer" className='mb20'>
                    <div className="detailCard">
                        <p><i><FaUserAlt /></i>User ID :</p>
                        <span>{String(userDetails?.id)} </span>
                    </div>
                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>Wallet :</p>
                        <span>{parseFloat(userDetails?.balance / 1e18).toFixed(2)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><TbCalendarTime /></i>Joining Time : </p>
                        <span>{TimestampToDate(String(userDetails?.timestamp))}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><BsPersonPlusFill /></i>Referrals :</p>
                        <span>{String(userDetails?.directs)} </span>
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
                        <span className='d-flex'>{parseFloat(userDetails?.totalDeposit / 1e18).toFixed(2)}<span><CurrencyName /></span></span>
                    </div>
                </Container></Col>
            </Row>

            <Container fluid className="p-2">
                <div id="detailCardContainer">
                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>BNB Balance :</p>
                        <span>{parseFloat(maticBalance / 1e18).toFixed(5)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><MdAccountBalanceWallet /></i>USDT Balance :</p>
                        <span>{parseFloat(balance).toFixed(2)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><SiOpslevel /></i>My Rank :</p>
                        <span>{String(userDetails?.openLevel)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><BsPersonPlusFill /></i>Sponsor :</p>
                        <span id="refLink">{userDetails?.referrer}</span>
                    </div>
                    <div className="detailCard">
                        <p className='d-none ' id="myLink">{userDetails?.id != 0 ? window.location.origin + '/?ref=' + userDetails?.id : 'Not Register'}</p>
                        <p><i><FaLink /></i>Referral Link :</p>
                        <span>{Change(window.location.origin + '/?ref=' + userDetails?.id)} <i><IoCopyOutline onClick={() => CopyToClipboard('myLink')} /></i></span>
                    </div>
                </div>
            </Container>
            {/* <Container fluid className='p-4 pt-0' style={{ overflowX: 'scroll' }}>
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
            </Container> */}
            <Container fluid className='px-2'>
                <section>
                    {/* <h4 className="dashboardHeading">EBN Packages</h4> */}
                    <Row className='p-0'>
                        <Col lg="6"><Link to='level' onClick={() => localStorage.setItem('slotNumber', 1)}><ProgramCard heading={1} income={10} slotCount={"10"} /></Link></Col>
                    </Row>
                </section>
            </Container>
        </React.Fragment >
    )
}
export default Dashboard