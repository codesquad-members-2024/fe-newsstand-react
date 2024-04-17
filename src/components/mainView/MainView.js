import React, { useState } from "react";
import "./mainView.css";
import PressViewSelector from "./pressViewSelector/PressViewSelector";
import NewsFeed from "./newsFeed/NewsFeed";

const MainView = () => {
    const [isSubscribeView, setIsSubscribeView] = useState(false);
    const [isListView, setIsListView] = useState(false);
    return (
        <div className="main-view">
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
        </div>
    );
};

export default MainView;
