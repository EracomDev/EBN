import React from 'react'
import "./PoolCard.css"
import dai from "./../../Images/dai.png"

const PoolCard = (props) => {
    return (
        <React.Fragment>
            <div className="poolCard d-flex position-relative" >
                {/* <div className="cardImg"><i><props.img /></i></div> */}
                <div className="cardText">
                    <p>{props.title}</p>
                    <h4>$ {props.price}</h4>
                </div>
            </div>
        </React.Fragment>
    )
}
export default PoolCard