import React, { useEffect, useState } from 'react'
import './ProgramLevel.css'
import { Col, Row } from 'react-bootstrap'
import ProgramLevelCard from './ProgramLevelCard'
import { Link } from 'react-router-dom'
// import GetMatrix from '../../Common/GetMatrix'
import Loader from './../../Component/Loader'
import Nodata from "./../../Images/nodata.png"
import Change from '../../Common/StringToSub'
import CurrentCycle from '../../Common/CurrentCycle'
import CycleInfo from '../../Common/CycleInfo'
import Income from '../../Common/Income'
const ProgramLevel = () => {
    const acc = localStorage.getItem("viewId");
    const slotNumber = localStorage.getItem("slotNumber");
    const [cycleCount, setCycleCount] = useState();
    const [cycleInfo, setCycleInfo] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
        FetchData()
    }, [])
    let x = 0;
    async function FetchData() {
        if (x === 0) {
            x++;
            setLoading(true);
            try {
                let currentCycleData = await CurrentCycle(acc);
                setCycleCount(currentCycleData);

                let cycleData = await CycleInfo(acc);
                setCycleInfo(cycleData);

                const incomeData = await Income(acc);
                setIncomes(incomeData);

                setLoading(false)
            } catch (e) {
                setLoading(false)
                alert('Something Went Wrong');
            }
        }
    }

    return (
        <>
            {
                loading === true ? <Loader /> : ""
            }
            <section className="dashboard px-4" >
                <p className='topId'><span>ID {Change(acc)} / </span>EBN Slot {slotNumber}</p>

                <div className='programTopHeading'>
                    <h4 className='dashboardHeading'>EBN Slot {slotNumber}</h4>
                    <h1>{parseFloat(incomes?.poolIncome).toFixed(2)} <span>USDT</span></h1>
                </div>
                <div>
                    <Row className='prCard'>
                        {
                            cycleCount > 0 ?
                                [...Array(cycleCount)].map((x, i) =>
                                    <Col lg='3' md="4" sm="6" xs="12"><Link to="/dashboard/level_details"><ProgramLevelCard
                                        cycleNum={i + 1} income={cycleInfo[0]?.[i]} users={cycleInfo[1]?.[i]} /></Link></Col>
                                ) :
                                <div id="nodata" >
                                    <img src={Nodata} alt='No Data'></img>
                                    <h1 id="noCycle">No Cycle To Show</h1>
                                </div>
                        }
                    </Row>
                </div>
            </section>
        </>
    )
}

export default ProgramLevel