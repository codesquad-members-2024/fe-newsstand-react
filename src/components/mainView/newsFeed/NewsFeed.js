import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { jsonParser } from "../../../utility/getNewsAPI";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import { showSubscribeModal, openNotification } from "./SnackbarUI";

const NewsFeed = ({ isSubscribeView, setIsSubscribeView, isListView }) => {
    const [subscribeList, setSubscribeList] = useState([]);
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await jsonParser.getNewsData("news");
            setNewsData(result.news);
        };
        fetchInitialData();
    }, []);

    const subscribeHandler = (pressName) => {
        const selectNewsData = newsData.find((data) => data.pressName === pressName);
        setSubscribeList((prevData) => [...prevData, selectNewsData]);
        showSubscribeModal(pressName);
    };

    const unsubscribeHandler = (pressName) =>
        setSubscribeList((prevData) => prevData.filter((newsData) => newsData.pressName !== pressName));

    if (isSubscribeView && subscribeList.length === 0) {
        openNotification("top");
        setIsSubscribeView(false);
    }
    return (
        <FeedContainer>
            {isListView ? (
                <ListView
                    newsData={newsData}
                    isSubscribeView={isSubscribeView}
                />
            ) : (
                <GridView
                    newsData={newsData}
                    isSubscribeView={isSubscribeView}
                    subscribeList={subscribeList}
                    subscribeHandler={subscribeHandler}
                    unsubscribeHandler={unsubscribeHandler}
                />
            )}
        </FeedContainer>
    );
};

export default NewsFeed;

const FeedContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 388px;
    border: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
`;
