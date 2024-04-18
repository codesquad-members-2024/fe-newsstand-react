import React, { useEffect, useRef, useState } from "react";
import { jsonParser } from "../../utility/getNewsAPI";
import { delay } from "../../utility/utils";
import "./TopNews.css";
import styled from "styled-components";

const LEFT_LENGTH = {start: 0, end: 5}
const RIGHT_LENGTH = {start: 5, end: 10}
const ANIMATION_DELAY = 2000
const ROLLING_DELAY = 5000

const TopNews = () => {
    const [leftNews, setLeftNews] = useState([])
    const [lightNews, setLightNews] = useState([])
    const [isAnimation, setIsAniMation] = useState(false)
    const intervalRef = useRef()

    useEffect(() => {
        const fetchData = async () => {
            const result = await jsonParser.getNewsData("latestNews");
            setLeftNews(result.news.slice(LEFT_LENGTH.start, LEFT_LENGTH.end))
            setLightNews(result.news.slice(RIGHT_LENGTH.start, RIGHT_LENGTH.end))
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
            await delay(ANIMATION_DELAY);
            setIsAniMation(false);
            updateNews();
        }, ROLLING_DELAY);
    };
    
    const handleMouseLeave = () => {
        intervalRef.current = startRollingInterval();
    };
    
    useEffect(() => {
        intervalRef.current = startRollingInterval();
        return () => clearInterval(intervalRef.current);
    }, []);
        
        return (
        <div>
            <div className="top-news-container" onMouseOver={() => clearInterval(intervalRef.current)} onMouseLeave={handleMouseLeave}>
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
