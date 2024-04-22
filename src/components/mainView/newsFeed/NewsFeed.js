import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { jsonParser } from "../../../utility/getNewsAPI";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import { openNotification } from "../../../utility/SnackbarUI";
import { SubscribeContext } from "../SubscribeStore";
import { ViewContext } from "../ViewStore";
import { type } from "@testing-library/user-event/dist/type";

const NewsFeed = () => {
    const [newsData, setNewsData] = useState([]);
    const [state] = useContext(SubscribeContext)
    const [ViewState, ViewDispatch] = useContext(ViewContext)
    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await jsonParser.getNewsData("news");
            setNewsData(result.news);
        };
        fetchInitialData();
    }, []);

    if (ViewState.isSubscribeView && state.subscriptions.length === 0) {
        openNotification("top");
        ViewDispatch({type: "SET_UNSUBSCRIBE_VIEW"})
    }
    return (
        
            <FeedContainer>
                {ViewState.isListView ? (
                    <ListView newsData={newsData} /> ) 
                    : ( <GridView newsData={newsData}/>
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
