import React, { useState } from "react";
import "./mainView.css";
import PressViewSelector from "./pressViewSelector/PressViewSelector";

const MainView = () => {
    const [isSubscribeView, setIsSubscribeView] = useState(false);
    const [isListView, setIsListView] = useState(false)
    return (
        <div className="main-view">
            <PressViewSelector
                isSubscribeView={isSubscribeView}
                setIsSubscribeView={setIsSubscribeView}
                isListView = {isListView}
                setIsListView = {setIsListView}
            />
        </div>
    );
};

export default MainView;

// 상태관리?
// 전체 언론사, 구독한언론사 = boolean으로 관리
// 그리드, 리스트 = boolean으로 관리
