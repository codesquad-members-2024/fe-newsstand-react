import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import news from './News.module.scss';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';
import { NewsContext } from '../../context/NewsContext';
import { useContext } from 'react';
import { insertSubscribeData, selectAllSubscribeData, deleteSubscribeData } from '../../api/subscribeData';

export default function GridNews({ newsData, page, setPage }) {
    const { gridCol, gridMaxPage, subscribes, setSubscribes } = useContext(NewsContext);

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCol}, 1fr)`,
        height: '100%',
    };

    const prevArrowClick = () => setPage((prev) => ({ ...prev, grid: prev.grid - 1 }));
    const nextArrowClick = () => setPage((prev) => ({ ...prev, grid: prev.grid + 1 }));
    const isSubscribed = (pressNameToCheck) => !!subscribes.find(({ pressName }) => pressName === pressNameToCheck);

    const unSubscribe = async (idToDelete) => {
        await deleteSubscribeData(idToDelete);
    };

    const subscribe = async (subscribeObj) => {
        const insertResult = await insertSubscribeData(subscribeObj);
        if (insertResult.result) {
            const selectAllResult = await selectAllSubscribeData();
            if (selectAllResult.result) setSubscribes(selectAllResult.data);
        }
    };

    const setSubscribe = async ({ target }) => {
        const id = target.parentNode.id;
        const imgTarget = target.parentNode.children[0].children[0];
        const pressName = imgTarget.alt;
        const logoImageSrc = imgTarget.src;

        const subscribeObj = { id, pressName, logoImageSrc };

        //구독하기
        if (target.getAttribute('subscribe') === 'false') subscribe(subscribeObj);
        //해지하기
        if (target.getAttribute('subscribe') === 'true') unSubscribe(id);
    };

    return (
        <div className={styles.gridContainer}>
            <GridLine />
            <div className={styles.media__grid_type__container} style={gridStyle}>
                {newsData[page].map((press) => (
                    <div key={press.id} id={press.id}>
                        <a href="#" className={styles['media__subscription-news-view']}>
                            <img src={press.logoImageSrc} alt={press.pressName} className={styles['media__grid_type__news_logo']}></img>
                        </a>
                        <button
                            className={styles['media__grid_type__subscribe_btn']}
                            onClick={setSubscribe}
                            subscribe={isSubscribed(press.pressName) ? 'true' : 'false'}
                        >
                            {isSubscribed(press.pressName) ? '😥해지하기' : ' 💙구독하기'}
                        </button>
                    </div>
                ))}
            </div>

            {page > 0 && <LeftOutlined className={news.angle_left} onClick={prevArrowClick} />}
            {page < gridMaxPage - 1 && <RightOutlined className={news.angle_right} onClick={nextArrowClick} />}
        </div>
    );
}
