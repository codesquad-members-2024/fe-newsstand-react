import React from "react";
import Header from "./components/header/Header";
import TopNews from "./components/TopNewsView/TopNews";
import MainView from "./components/mainView/MainView";

const App = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="w-1000 mx-auto">
                <Header />
                <TopNews />
                <MainView />
            </div>
        </div>
    );
};

export default App;
