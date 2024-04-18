import React, { useEffect, useState } from "react";
import styled from "styled-components";

const DATA_SIZE = 24;
const TOTAL_PAGES = 4;

const GridView = ({ newsData }) => {
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

    return (
        <GridContainer>
            {sliceNewsData.length === 0 ? (<div>Loading...</div>) : (
            sliceNewsData[pageNumber].map((pageData, index) => (
                <List key={index} className={index}>
                    <PressImg src={pageData.logoImageSrc} alt={pageData.pressName}></PressImg>
                    <SubScribeButton id = "subscribe" name = {pageData.pressName}> + 구독하기</SubScribeButton>
                </List>
            )))}
        </GridContainer>
    );
};

export default GridView;

const GridContainer = styled.ul`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 0;
`;

const PressImg = styled.img`
    width: 70%;
    height: 50%;
`

const SubScribeButton = styled.button`
    display: none;
    border: 1px solid gray;
    border-radius: 10px;
    color: #8b8989;
    background-color: white;
    padding: 0 10px;
`

const List = styled.li`
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