import React, { useEffect, useState } from "react";
import { jsonParser } from "../../utility/getNewsAPI";
import { delay } from "../../utility/utils";
import "./TopNews.css";

const TopNews = () => {
    const [leftNews, setLeftNews] = useState([])
    const [lightNews, setLightNews] = useState([])
    const [isAnimation, setIsAniMation] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const result = await jsonParser.getNewsData("latestNews");
            setLeftNews(result.news.slice(0, 5))
            setLightNews(result.news.slice(5, 10))
            
        };
        fetchData();
    }, []);

    const updateNews = () => {
        setLeftNews(prevLeftNews => {
            if (prevLeftNews.length === 0) return prevLeftNews;
            const [leftFirst, ...leftRest] = prevLeftNews;
            return [...leftRest, leftFirst];
        });
    
        setLightNews(prevLightNews => {
            if (prevLightNews.length === 0) return prevLightNews;
            const [lightFirst, ...lightRest] = prevLightNews;
            return [...lightRest, lightFirst];
        });
    };

    const startRollingInterval = () => {
        return setInterval(async () => {
            setIsAniMation(true);
            await delay(2000);
            setIsAniMation(false);
            updateNews();
        }, 5000);
    };
    

    useEffect(() => {
        let rolling = startRollingInterval()
    
        const topNewsAnimationContainer = document.querySelector(".top-news-container");
        topNewsAnimationContainer.addEventListener("mouseover", () => clearInterval(rolling));
        topNewsAnimationContainer.addEventListener("mouseleave", () => rolling = startRollingInterval());
    
    }, []);
    
    return (
        <div>
            <div className="top-news-container">
                <div className="top-news-container_board">
                    {leftNews.map((newsData, idx) => (
                        <div className={`first-top-news-view ${isAnimation ? 'animation' : ''}`} key={idx}>
                            <div className="company-name">{newsData.pressName}</div>
                            <div className="detail"><a href={newsData.headline.href}>{newsData.headline.title}</a></div>
                        </div>
                    ))}
                </div>
                <div className="top-news-container_board">
                {lightNews.map((newsData, idx) => (
                        <div className={`second-top-news-view ${isAnimation ? 'animation' : ''}`} key={idx}>
                            <div className="company-name">{newsData.pressName}</div>
                            <div className="detail"><a href={newsData.headline.href}>{newsData.headline.title}</a></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopNews;
