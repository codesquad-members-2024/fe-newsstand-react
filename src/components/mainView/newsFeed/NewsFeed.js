import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
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
        <FeedMainView className='feed-main-view'>
            <LeftBtn src={leftBtn} alt='left-btn' ></LeftBtn>
            <FeedContainer>
            {isListView ? <ListView /> : <GridView newsData = {newsData}/>}
            </FeedContainer>
            <RightBtn src={rightBtn} alt='right-btn'></RightBtn>
        </FeedMainView>
    )
}

export default NewsFeed

const FeedMainView = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const FeedContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 388px;
    border: 1px solid var(--border-border-default, rgba(210, 218, 224, 1))
`

const LocationImg = styled.img`
    position: absolute;
`

const LeftBtn = styled(LocationImg)`
    left: -55px;
` 
const RightBtn = styled(LocationImg)`
    left: 975px;
` 