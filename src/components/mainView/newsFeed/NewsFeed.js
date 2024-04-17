import React from 'react'
import "./NewsFeed.css"
import leftBtn from "../../../assets/img/LeftButton.png"
import rightBtn from "../../../assets/img/RightButton.png"

const NewsFeed = ({ isSubscribeView, isListView}) => {

    // 여기서 구독 관리?
    return (
        <div className='feed-main-view'>
            <img src={leftBtn} alt='left-btn' className='left-btn'></img>
            <div className='news-feed-container'>
            {/* {isListView ? <ListView /> : <GridView /> */}
            </div>
            <img src={rightBtn} alt='right-btn' className='right-btn'></img>
        </div>
    )
}

export default NewsFeed