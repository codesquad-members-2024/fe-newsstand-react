import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { LeftButtonIMG, RightButtonIMG } from "../../../../utility/ButtonUI";
import { ViewContext } from "../../ViewStore";
import Nav from "./MainContent/Nav";
import MainContent from "./MainContent/MainContent";
import { type } from "@testing-library/user-event/dist/type";

const IS_EMPTY = 0;
const INIT_PAGE_NUM = 0;
const INTERVAL_DURATION= 19000

const ListView = ({ newsData }) => {
    const [ViewState, ViewDispatch] = useContext(ViewContext);
    const [newsInfo, setNewsInfo] = useState([]);
    const [listPageNumber, setListPageNumber] = useState(0);
    const [categoryIdx, setCategoryIdx] = useState(0);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setListPageNumber(prev => prev + 1)
        }, INTERVAL_DURATION);
        
        setToggle(!toggle);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listPageNumber]);
    

    const initUnsubscribeData = () => {
        const categoryList = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
        const initData = [];
        categoryList.forEach((curCategory) => {
            const filteringData = newsData.filter((curData) => curData.category === curCategory);
            initData.push({ category: curCategory, data: filteringData });
        });
        setNewsInfo(initData);
    };
    useEffect(() => {
        if (!ViewState.isSubscribeView) initUnsubscribeData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCategory = {
        nextCategory() {
            setListPageNumber(INIT_PAGE_NUM);
            setCategoryIdx((prev) => prev === newsInfo.length - 1 ? INIT_PAGE_NUM : prev + 1);
        },
        prevCategory() {
            setCategoryIdx((prev) => prev === INIT_PAGE_NUM ? newsInfo.length - 1 : prev - 1);
            setListPageNumber(INIT_PAGE_NUM);
        },
    }

    useEffect(() => {
        if (newsInfo.length !== IS_EMPTY && newsInfo[categoryIdx].data.length <= listPageNumber) updateCategory["nextCategory"]() 
        if (newsInfo.length !== IS_EMPTY && listPageNumber < INIT_PAGE_NUM) updateCategory["prevCategory"]()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listPageNumber]);
    

    return (
        <ListMainView>
            <LeftButtonIMG
                onClick={() => setListPageNumber((prev) => prev - 1)}
            />

            <MainContainer>
                <Nav
                    newsInfo={newsInfo}
                    listPageNumber={listPageNumber}
                    setCategoryIdx={setCategoryIdx}
                    setListPageNumber={setListPageNumber}
                    categoryIdx={categoryIdx}
                    key={toggle ? "1" : "2"}
                ></Nav>
                <MainContent
                    newsInfo={newsInfo}
                    listPageNumber={listPageNumber}
                    categoryIdx={categoryIdx}
                    newsData={newsData}
                ></MainContent>
            </MainContainer>

            <RightButtonIMG
                onClick={() => setListPageNumber((prev) => prev + 1)}
            />
        </ListMainView>
    );
};

export default ListView;

const ListMainView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
`;

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
`;
