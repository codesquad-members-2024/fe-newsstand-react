import React, { useState } from "react";
import PressViewSelector from "./PressViewSelector/PressViewSelector";
import NewsFeed from "./NewsFeed/NewsFeed";
import styled from "styled-components";

const MainView = () => {
    const [isSubscribeView, setIsSubscribeView] = useState(false);
    const [isListView, setIsListView] = useState(false);
    return (
        <Main>
            <PressViewSelector
                isSubscribeView={isSubscribeView}
                setIsSubscribeView={setIsSubscribeView}
                isListView={isListView}
                setIsListView={setIsListView}
            />
            <NewsFeed
                isSubscribeView={isSubscribeView}
                isListView={isListView}
            />
        </Main>
    );
};

export default MainView;

const Main = styled.div`
    margin-top: 20px;
    width: 950px;
    height: 420px;
`