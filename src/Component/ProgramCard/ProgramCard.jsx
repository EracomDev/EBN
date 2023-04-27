import React, { useEffect, useState } from 'react'
import "./ProgramCard.css"
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaLocationArrow } from 'react-icons/fa'
import CurrentCycle from '../../Common/CurrentCycle'
const ProgramCard = (props) => {
    const acc = localStorage.getItem("viewId");
    const [cycleCount, setCycleCount] = useState();
    useEffect(() => {
        FetchData()
    }, [])
    let x = 0;
    async function FetchData() {
        if (x === 0) {
            x++;
            // setLoading(true);
            try {
                let currentCycleData = await CurrentCycle(acc);
                console.log('currentCycleData', currentCycleData);
                setCycleCount(currentCycleData);
                // setLoading(false)
            } catch (e) {
                // setLoading(false)
                alert('Something Went Wrong');
            }
        }
    }
    return (
        <>
            <div className="programCard">
                <Row className="align-items-center pb-2">
                    <Col xs="6" className="programCardHeading">Slot {props.heading}</Col>
                    <Col xs="6" className="programCardPrice">Cycles: {cycleCount} <span> </span></Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Row className="px-2">
                            <Col md="12">
                                <Row className="programCardRow">
                                    {[...Array(parseInt(10))].map((x, i) =>
                                        cycleCount <= i ?
                                            <Col xs="2" style={{ background: 'rgb(34 46 60 / 82%)' }} className="programCardInnerDiv"></Col>
                                            :
                                            <Col xs="2" className="programCardInnerDiv"></Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6" className='d-flex align-items-end'>
                        <Link to="level" className='previewBtn'><button className="btnPrimary">Preview <i><FaLocationArrow /></i></button></Link>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProgramCard