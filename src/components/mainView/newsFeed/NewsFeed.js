import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { jsonParser } from "../../../utility/getNewsAPI";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import { openNotification } from "../../../utility/SnackbarUI";
import { SubscribeContext } from "../SubscribeStore";
import { ViewContext } from "../ViewStore";

const NewsFeed = () => {
    const [newsData, setNewsData] = useState([]);
    const [SubState] = useContext(SubscribeContext)
    const [ViewState, ViewDispatch] = useContext(ViewContext)
    
    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await jsonParser.getNewsData("news");
            setNewsData(result.news);
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (ViewState.isSubscribeView && SubState.subscriptions.length === 0) {
            openNotification("top");
            ViewDispatch({ type: "SET_UNSUBSCRIBE_VIEW" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ViewState.isSubscribeView, SubState.subscriptions.length]);
    return (
        
            <FeedContainer>
                {ViewState.isListView ? (
                    <ListView newsData={newsData} /> ) 
                    : ( <GridView newsData={newsData}/> )}
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
