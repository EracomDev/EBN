import React from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { MdPeopleAlt, } from 'react-icons/md'
const ProgramLevelCard = (props) => {
    localStorage.setItem('levelDetailIncome', parseFloat(props.income / 1e18).toFixed(2));
    localStorage.setItem('levelDetailCycle', props.cycleNum);
    // localStorage.setItem('levelDetailUsers', props?.users);
    // localStorage.setItem('levelDetailCycle', props.cycle)
    return (
        <div className='programLevelMainDiv'>
            <div id='programLevelDiv1'>
                <p>Cycle {props.cycleNum}</p>
                <h5><i><RiMoneyDollarCircleFill /></i>{parseFloat(props.income / 1e18).toFixed(2)}</h5>
            </div>
            <div id='programLevelDiv2'>
                <div id='LevelTree0'>
                    <span></span>
                </div>
                <div id='LevelTree1'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div id='LevelTree2'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div id='LevelTree3'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div id='programLevelDiv3'>
                <p><i><MdPeopleAlt /></i>{String(props?.users)}</p>
            </div>
        </div>
    )
}

export default ProgramLevelCard