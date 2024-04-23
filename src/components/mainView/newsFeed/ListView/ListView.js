import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { LeftButtonIMG, RightButtonIMG } from "../../../../utility/ButtonUI";
import { ViewContext } from "../../ViewStore";
import Nav from "./MainContent/Nav";
import MainContent from "./MainContent/MainContent";

const ListView = ({ newsData }) => {
    const [ViewState, ViewDispatch] = useContext(ViewContext)
    const [newsInfo, setNewsInfo] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [categoryIdx, setCategoryIdx] = useState(0);

    const initUnsubscribeData = () => {
        const categoryList = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
        const initData = [];
        categoryList.forEach((curCategory) => {
            const filteringData = newsData.filter((curData) => curData.category === curCategory);
            initData.push({ category: curCategory, data: filteringData });
        });
        setNewsInfo(initData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {if (!ViewState.isSubscribeView) initUnsubscribeData()}, []);

    return (
        <ListMainView>
            <LeftButtonIMG onClick={() => setPageNumber(prev => prev - 1)} />

            <MainContainer>
                <Nav newsInfo={newsInfo}></Nav>
                <MainContent newsInfo={newsInfo} pageNumber={pageNumber} categoryIdx={categoryIdx} newsData={newsData}></MainContent>
            </MainContainer>

            <RightButtonIMG onClick={() => setPageNumber(prev => prev + 1)} />

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
`

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
`;


