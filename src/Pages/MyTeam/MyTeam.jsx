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
    const { ethereum } = window
    useEffect(() => {
        FetchData();
    }, [])

    async function FetchData() {
        try {
            setLoading(true)
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setWalletAddress(accounts[0])

            const userData = await UserInfo(acc);
            setUserInformation(userData)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e);
        }
    }
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
                        <p><i><ImConnection /></i>Connection status :</p>
                        {
                            walletAddress !== null ?
                                <span style={{ color: "rgb(26, 247, 104)" }}>{walletAddress}</span> :
                                <span style={{ color: "red" }}>Wallet not Connected.</span>
                        }
                    </div>
                </Container>
                <Container>
                    <Row id="myTeamRow">
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "#1f818b" }}>{String(userInformation?.directs)}</h1>
                            <p>Direct Referrals</p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 >{userInformation?.club_royalty_status === true ? 'Archive' : 'Pending'}</h1>
                            <p>Club Royalty Status</p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 >{userInformation?.global_club1_status === true ? 'Archive' : 'Pending'}</h1>
                            <p>Global Club1 Status</p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 >{userInformation?.global_club2_status === true ? 'Archive' : 'Pending'}</h1>
                            <p>Global Club2 Status</p>
                        </Col>
                        <Col xs="6" lg="3" id="myTeamCol">
                            <h1 style={{ color: "blue" }}>{parseFloat(userInformation?.totalDeposit / 1e18).toFixed(2)}</h1>
                            <p>Sales</p>
                        </Col>
                    </Row>
                </Container>

            </div >
        </React.Fragment >
    )
}

export default MyTeam