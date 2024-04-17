import React from 'react'
import "./PressViewSelector.css"
import listOnIcon from "../../../assets/img/grid-view-on.png"
import listOffIcon from "../../../assets/img/list-view-off.png"
import gridOnIcon from "../../../assets/img/grid-view-on.png"
import gridOffIcon from "../../../assets/img/grid-view-off.png"

const PressViewSelector = ({isSubscribeView, setIsSubscribeView, isListView, setIsListView}) => {
    return (
        <div>
            <nav className='main-nav'>
                <div className='subscribe-press-view'>
                    <button className={`show-all-company ${isSubscribeView ? ``: `active`} `}>전체 언론사</button>
                    <button className={`show-subscribe-company ${isSubscribeView ? `active`: ``} `}>구독한 언론사</button>
                </div>
                <div className='sort-mode-view'>
                    <img className='show-list-view' src={isListView ? listOnIcon : listOffIcon} alt="List View"></img>
                    <img className='show-grid-view' src={isListView ? gridOffIcon : gridOnIcon} alt="grid View"></img>
                </div>
            </nav>
        </div>
    )
}

export default PressViewSelector
