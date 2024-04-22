import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LeftButtonIMG, RightButtonIMG } from "../../../../utility/ButtonUI";

const ListView = ({ newsData, isSubscribeView }) => {
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

    useEffect(() => {if (!isSubscribeView) initUnsubscribeData()}, []);

    return (
        <ListMainView>

            <LeftButtonIMG/>

            <MainContainer>
                <Nav>{newsInfo.length === 0 ? (<div>Loading...</div>) : (
                        newsInfo.map((curCategory, idx) => (
                        <Item key={idx}><span>{curCategory.category}</span>
                                <TotalPage>{isSubscribeView ? `>` : `1/${curCategory.data.length}`} </TotalPage>
                                <div></div>
                            </Item>
                        ))
                    )}
                </Nav>
                <MainNewsTemplate>

                </MainNewsTemplate>
            </MainContainer>

            <RightButtonIMG/>

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

const Nav = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    border-bottom: 1px solid
        var(--border-border-default, rgba(210, 218, 224, 1));
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

const MainNewsTemplate = styled.div`
    width: 100%;
    height: 90%;
`;

const TotalPage = styled.div`
    margin-left: 20px;
`;
