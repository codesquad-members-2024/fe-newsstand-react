import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { jsonParser } from "../../../utility/getNewsAPI";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import { openNotification } from "../../../utility/SnackbarUI";
import { SubscribeContext } from "../SubscribeStore";

const NewsFeed = ({ isSubscribeView, setIsSubscribeView, isListView }) => {
    const [newsData, setNewsData] = useState([]);
    const [state] = useContext(SubscribeContext)
    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await jsonParser.getNewsData("news");
            setNewsData(result.news);
        };
        fetchInitialData();
    }, []);

    if (isSubscribeView && state.subscriptions.length === 0) {
        openNotification("top");
        setIsSubscribeView(false);
    }
    return (
        
            <FeedContainer>
                {isListView ? (
                    <ListView
                        // newsData={newsData}
                        // isSubscribeView={isSubscribeView}
                    />
                ) : (
                    <GridView
                        newsData={newsData}
                        isSubscribeView={isSubscribeView}
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
