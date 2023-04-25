import React, { useEffect, useState } from 'react'
import "./MyTeam.css"
import { Container, Row, Col } from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { ImLocation2 } from 'react-icons/im'
import { ImConnection } from 'react-icons/im'
import { ethers } from 'ethers';
import { useSelector } from 'react-redux'
import UserInfo from "./../../Common/UserInfo"
import ContractBasicInfo from '../../Common/ContractBasicInfo'
import Loader from "./../../Component/Loader"
import TimestampToDate from '../../Common/TimestampToDate'
import Income from '../../Common/Income'
const MyTeam = () => {
    const [contract, setContract] = useState(useSelector((state) => state.contract.value.contract));
    const [planInfo, setPlanInfo] = useState('');
    const [userInformation, setUserInformation] = useState([]);
    const [walletAddress, setWalletAddress] = useState('');
    const [loading, setLoading] = useState(false)
    const [minor, setMinor] = useState(0)
    const [acc, setAccount] = useState(localStorage.getItem("viewId"));

    return (
        <React.Fragment>
            {
                loading === true ? <Loader /> : null
            }
            <div className='LatestDepositDiv'>
                <h4 className="dashboardHeading">my team</h4>
                <Container id="detailCardContainer">
                    <div className="detailCard">
                        <p><i><ImLocation2 /></i>Contract Address :</p>
                        <span>{contract}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><BiTime /></i>Platform Running time :</p>
                        <span>{TimestampToDate(String(planInfo?.startTime), 1)}</span>
                    </div>
                    <div className="detailCard">
                        <p><i><ImConnection /></i>Connection status :</p>
                        {
                            walletAddress !== null ?
                                <span style={{ color: "green" }}>{walletAddress}</span> :
                                <span style={{ color: "red" }}>Wallet not Connected.</span>
                        }
                    </div>
                </Container>
                <Container>
                    <Row id="myTeamRow">
                        {
                            console.log('userInformation', userInformation)
                        }
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "#1f818b" }}>{String(userInformation?.userInfo?.directs)}</h1>
                            <p>Direct Referrals</p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "green" }}>{parseFloat(userInformation?.userInfo?.directBusiness / 1e18).toFixed(2)}</h1>
                            <p>Direct Business </p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "rebeccapurple" }}>{parseFloat(userInformation?.userInfo?.balance / 1e18).toFixed(2)}</h1>
                            <p>My Income </p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "orange" }}>{String(userInformation?.userInfo?.teamNum)}</h1>
                            <p>Downline</p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "blue" }}>{parseFloat(userInformation?.userInfo?.teamBusiness / 1e18).toFixed(2)}</h1>
                            <p>Sales</p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "orange" }}>{String(userInformation?.userInfo?.maxDeposit / 1e18)}</h1>
                            <p>Major Performance</p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "orange" }}>{minor}</h1>
                            <p>Miner Performance</p>
                        </Col>
                    </Row>
                </Container>

            </div >
        </React.Fragment >
    )
}

export default MyTeam