import React, { useEffect, useState } from 'react'
import "./NewsFeed.css"
import { jsonParser } from '../../../utility/getNewsAPI'
import leftBtn from "../../../assets/img/LeftButton.png"
import rightBtn from "../../../assets/img/RightButton.png"
import GridView from './GridView/GridView'
import ListView from './ListView/ListView'

const NewsFeed = ({ isSubscribeView, isListView}) => {
    const [subscribeList ,setSubscribeList] = useState([])
    const [newsData, setNewsData] = useState([])

    const fetchInitialData = async () => {
        const result = await jsonParser.getNewsData("news");
        setNewsData(result.news)
        setSubscribeList(result.subscribe)
        
    };
    useEffect(() => {
        fetchInitialData()
    }, [])
    return (
        <div className='feed-main-view'>
            <img src={leftBtn} alt='left-btn' className='left-btn'></img>
            <div className='news-feed-container'>
            {isListView ? <ListView /> : <GridView newsData = {newsData}/>}
            </div>
            <img src={rightBtn} alt='right-btn' className='right-btn'></img>
        </div>
    )
}

export default NewsFeed