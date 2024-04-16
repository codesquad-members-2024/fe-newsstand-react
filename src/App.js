import React from "react";
import Header from "./components/header/Header";
import TopNews from "./components/TopNewsView/TopNews";

const App = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="w-1000 mx-auto">
                <Header />
                <TopNews />
            </div>
        </div>
    );
};

export default App;
