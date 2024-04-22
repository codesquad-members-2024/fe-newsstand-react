import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { LeftButtonIMG, RightButtonIMG } from "../../../../utility/ButtonUI";
import { ViewContext } from "../../ViewStore";
import { SubscribeContext } from "../../SubscribeStore";

const ListView = ({ newsData }) => {
    const [ViewState, ViewDispatch] = useContext(ViewContext)
    const [SubState, SubDispatch] = useContext(SubscribeContext)
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
                <Nav>{newsInfo.length === 0 ? (<div>Loading...</div>) : (
                        newsInfo.map((curCategory, idx) => (
                        <Item key={idx}><span>{curCategory.category}</span>
                                <TotalPage>{ViewState.isSubscribeView ? `>` : `1/${curCategory.data.length}`} </TotalPage>
                                <div></div>
                            </Item>
                        ))
                    )}
                </Nav>
                <MainNewsTemplate>
                    {newsInfo.length === 0 ? (<div>Loading...</div>) : (
                        <>
                        <MainNewsHeader>
                            <LogoImg src={newsInfo[categoryIdx].data[pageNumber].logoImageSrc}/>
                            <EditDateText>{newsInfo[categoryIdx].data[pageNumber].editedTime}</EditDateText>
                            {SubState.subscriptions.includes(newsInfo[categoryIdx].data[pageNumber]) ? 
                            <SubScribeButton name = {newsInfo[categoryIdx].data[pageNumber].pressName} onClick={() => SubDispatch({ type: "UNSUBSCRIBE", payLoad: newsInfo[categoryIdx].data[pageNumber].pressName})}> + 해지하기</SubScribeButton> : 
                            <SubScribeButton name = {newsInfo[categoryIdx].data[pageNumber].pressName} onClick={() => SubDispatch({ type: "SUBSCRIBE", payLoad: newsData.find((data) => data.pressName === newsInfo[categoryIdx].data[pageNumber].pressName)})}> + 구독하기</SubScribeButton>}
                        </MainNewsHeader>
                        <MainNewsContent>
                                <MainContent>
                                    <a href={newsInfo[categoryIdx].data[pageNumber].headline.href}>
                                        <MainContentImg src={newsInfo[categoryIdx].data[pageNumber].headline.thumbnailSrc}></MainContentImg>
                                        <MainContentText>{newsInfo[categoryIdx].data[pageNumber].headline.title}</MainContentText>
                                    </a>
                                </MainContent>
                                <SubContent>
                                {newsInfo[categoryIdx].data[pageNumber].sideNews.map(sideData => (
                                    <a href = {sideData.href}><div>{sideData.title}</div></a>
                                ))}
                                <EditPressText>
                                    {newsInfo[categoryIdx].data[pageNumber].pressName} 언론사에서 직접 편집한 뉴스입니다.
                                </EditPressText>
                                </SubContent>
                        </MainNewsContent>
                        </>
                      // newsInfo[categoryIdx].data[pageNumber]
                    )}
                </MainNewsTemplate>
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

// 여기서부터 Nav
const Nav = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    border-bottom: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
    background: var(--surface-surface-alt, rgba(245, 247, 249, 1));
`;

const Item = styled.div`
    display: flex;
    position: relative;
    padding: 9px 10px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    transition: padding 0.5s ease;
    span {
        position: relative;
        z-index: 2;
    }
    &:hover {
        padding-right: 60px;
        background: rgba(196, 211, 255, 0.735);
        span {
            color: #fff;
        }
    }
`;

const TotalPage = styled.div`
    margin-left: 20px;
`;

// 여기서부터 nav아래 템플릿
const MainNewsTemplate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
`;

// 여기서부터 헤더
const MainNewsHeader = styled.div`
    width: 95%;
    height: 24px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const LogoImg = styled.img`
    height: 100%;
    object-fit:cover;
    margin-right: 10px;
`

const EditDateText = styled.div`
    width: 150px; 
    height: 14px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`
const SubScribeButton = styled.button`
    border: 1px solid gray;
    border-radius: 13px;
    color: #8b8989;
    background-color: white;
    padding: 0 10px;
    height: 24px;
    font-size: 14px
    background: var(--surface-surface-alt, rgba(245, 247, 249, 1));
`

// 여기서부터 mainContent
const MainNewsContent = styled.div`
    width: 95%;
    height: 260px;
    display: flex;
    justify-content: space-between;
`

const MainContent = styled.div`
    width: 35%;
    height: 100%;
`

const MainContentImg = styled.img`
    width: 100%;
    height: 80%;
    object-fit: cover;
`

const MainContentText = styled.div`
    font-size: 15px;
`

// 여기서부터 SubNews
const SubContent = styled.div`
    width: 60%;
    height: 100%;
    display: grid;
`

const EditPressText = styled.div`
    opacity: 0.5;
    font-size: 14px;
`