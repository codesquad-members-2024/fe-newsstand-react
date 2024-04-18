import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { jsonParser } from "../../../utility/getNewsAPI";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";

const NewsFeed = ({ isSubscribeView, isListView }) => {
    const [subscribeList, setSubscribeList] = useState([]);
    const [newsData, setNewsData] = useState([]);

    const fetchInitialData = async () => {
        const result = await jsonParser.getNewsData("news");
        setNewsData(result.news);
    };
    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <FeedContainer>
            {isListView ? (
                <ListView />
            ) : (
                <GridView
                    newsData={newsData}
                    subscribeList={subscribeList}
                    setSubscribeList={setSubscribeList}
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
