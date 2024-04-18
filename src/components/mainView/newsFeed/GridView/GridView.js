import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {LeftButtonIMG, RightButtonIMG} from "../ButtonUI"

const DATA_SIZE = 24;
const TOTAL_PAGES = 4;

const GridView = ({ newsData, subscribeList, setSubscribeList}) => {
    const [sliceNewsData, setSliceNewsData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    useEffect(() => {
        const initData = () => {
            const copiedData = [...newsData].sort(() => Math.random() - 0.5);
            const slicedData = Array.from({ length: TOTAL_PAGES }, (_, idx) => {
                const startIndex = idx * DATA_SIZE;
                const endIndex = startIndex + DATA_SIZE;
                return copiedData.slice(startIndex, endIndex);
            });
            setSliceNewsData(slicedData);
        };
        initData();
    }, [newsData]);
    
    const subscribeHandler = (pressName) => {
        const selectNewsData = newsData.find(data => data.pressName === pressName)
        setSubscribeList(prevData => [...prevData, selectNewsData])
    }

    return (
        <GridMainView>

            <LeftButtonIMG isHidden={pageNumber === 0} onClick={() => setPageNumber(prev => prev - 1)} />

                <GridContainer>
                    {sliceNewsData.length === 0 ? (<div>Loading...</div>) : (
                    sliceNewsData[pageNumber].map((pageData, index) => (
                        <List key={index} className={index}>
                            <PressImg src={pageData.logoImageSrc} alt={pageData.pressName}></PressImg>
                            <SubScribeButton id = "subscribe" name = {pageData.pressName} onClick={() => subscribeHandler(pageData.pressName)}> + 구독하기</SubScribeButton>
                        </List>
                    )))}
                </GridContainer>

                <RightButtonIMG isHidden={pageNumber === TOTAL_PAGES - 1} onClick={() => setPageNumber(prev => prev + 1)} />

        </GridMainView>
    );
};

export default GridView;

const GridMainView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
`

const GridContainer = styled.ul`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 0;
`;

const PressImg = styled.img`
    width: 60%;
    height: 60%;
    height: 2rem;
`

const SubScribeButton = styled.button`
    display: none;
    border: 1px solid gray;
    border-radius: 13px;
    color: #8b8989;
    background-color: white;
    padding: 0 10px;
`

const List = styled.li`
width: 100%;
height: 100%;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
    border-bottom: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
    ${({ className }) =>
        [5, 11, 17, 23].includes(Number(className)) &&
        `border-right: none;`
    }
    ${({ className }) =>
        [18, 19, 20, 21, 22, 23].includes(Number(className)) &&
        `border-bottom: none;`
    }
    &:hover {
        ${PressImg} {
            display: none;
        }
        ${SubScribeButton} {
            display: inline;
        }
    }
`