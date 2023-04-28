import React, { useEffect, useState } from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import './LevelDetail.css'
import { MdPeopleAlt, } from 'react-icons/md'
import Change from '../../Common/StringToSub'
import Loader from '../../Component/Loader'
import { Container } from 'react-bootstrap'
import GetPoolUser from '../../Common/GetPoolUser'
import CycleIds from '../../Common/CycleIds'
const LevelDetails = () => {
    const cycleInc = localStorage.getItem('levelDetailIncome');
    const cycleNum = localStorage.getItem('levelDetailCycle');
    const usersCount = localStorage.getItem('levelDetailUsers');
    const slotNumber = localStorage.getItem('slotNumber');
    const acc = localStorage.getItem("viewId");
    const [poolUserData, setPoolUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cycleId, setCycelId] = useState();
    useEffect(() => {
        FetchData();
    }, [])

    async function FetchData() {
        try {
            setLoading(true)
            const poolUserD = await GetPoolUser(acc, 1, cycleNum)
            console.log('poolUserD', poolUserD);
            setPoolUserData(poolUserD)
            const cycleData = await CycleIds(acc, (cycleNum - 1));
            setCycelId(cycleData)
            console.log('cycleData', cycleData);
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    return (
        <>
            {
                loading === true ? <Loader /> : ""
            }
            <Container fluid >
                <section className="dashboard">
                    <p className='topId'><span>
                        ID: {Change(acc)} / Slot {slotNumber} / </span>Cycle {cycleNum}</p>

                    <div className='programTopHeading'>
                        <h1>Cycle {cycleNum}</h1>
                    </div>

                    <div className="levelDetailCard">
                        <div id='levelDetailCardHeadings'>
                            {/* <h5>ID: {Change(acc)}</h5> */}
                        </div>
                        <div className="levelDetailCardTree">
                            <div id='programLevelDiv2'>
                                <div id='LevelDetailTree0' className='levelDetailTreeMain'>
                                    {
                                        cycleId ? <span title={cycleId} className='bgColor'>{cycleId}</span> :
                                            <span>Null</span>
                                    }
                                </div>
                                <div id='LevelDetailTree1' className='levelDetailTreeMain'>
                                    {
                                        [...Array(3)].map((x, i) =>
                                            poolUserData[0]?.[i] ? <span className='bgColor' title={poolUserData[0]?.[i]}>{poolUserData[0]?.[i]}</span> :
                                                <span>Null</span>
                                        )
                                    }
                                </div>
                                <div id='LevelDetailTree2' className='levelDetailTreeMain'>
                                    {
                                        [...Array(9)].map((x, i) =>
                                            poolUserData[1]?.[i] ? <span className='bgColor' title={poolUserData[1]?.[i]}>{poolUserData[1]?.[i]}</span> :
                                                <span>Null</span>
                                        )
                                    }
                                </div>
                                <div id='LevelDetailTree3' className='levelDetailTreeMain'>
                                    {
                                        [...Array(27)].map((x, i) =>
                                            poolUserData[2]?.[i] ? <span className='bgColor' title={poolUserData[2]?.[i]}>{poolUserData[2]?.[i]}</span> :
                                                <span>Null</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div id='programLevelDiv3'>
                            <div>
                                <p style={{ marginBottom: "5px" }}>Partners</p>
                                <p><i><MdPeopleAlt /></i>{usersCount}</p>
                            </div>
                            <div >
                                <p style={{ marginBottom: "5px" }}>Total level revenue</p>
                                <p className='justify-content-end'><i><RiMoneyDollarCircleFill /> </i>{cycleInc}</p>
                            </div>
                        </div>
                        <div>

                        </div>

                    </div>
                </section>
            </Container>
        </>
    )
}

export default LevelDetails