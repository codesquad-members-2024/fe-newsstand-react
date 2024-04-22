import React, { useState } from "react";
import PressViewSelector from "./PressViewSelector/PressViewSelector";
import NewsFeed from "./NewsFeed/NewsFeed";
import styled from "styled-components";
import { SubscribeProvider } from "./SubscribeStore";

const MainView = () => {
    const [isSubscribeView, setIsSubscribeView] = useState(false);
    const [isListView, setIsListView] = useState(false);
    return (
        <SubscribeProvider>
        <Main>
            <PressViewSelector
                isSubscribeView={isSubscribeView}
                setIsSubscribeView={setIsSubscribeView}
                isListView={isListView}
                setIsListView={setIsListView}
            />
            <NewsFeed
                isSubscribeView={isSubscribeView}
                setIsSubscribeView={setIsSubscribeView}
                isListView={isListView}
            />
        </Main>
        </SubscribeProvider>
    );
};

export default MainView;

const Main = styled.div`
    margin-top: 20px;
    width: 950px;
    height: 420px;
`