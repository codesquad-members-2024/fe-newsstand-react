import { useContext, useEffect, useState } from 'react';
import styles from './News.module.scss';
import useNewsData from '../../hooks/useNewsdata';
import NavTab from './NavTab';
import GridNews from './GridNews';
import ListNews from './ListNews';
import { NewsContext } from '../../context/NewsContext';
import { selectAllSubscribeData } from '../../api/subscribeData';

export default function News() {
    const { gridRow, gridCol, gridMaxPage, subscribes, setSubscribes } = useContext(NewsContext);

    const [newsData, error] = useNewsData({ type: 'news' });
    const [tabType, setTabType] = useState({ subscribe: 'ALL_PRESS', view: 'GRID_VIEW_TYPE' });
    const [gridData, setGridData] = useState([]);
    const [page, setPage] = useState({ grid: 0, list: 0 });

    const changeTabType = {
        'all-press-tab': () => {
            setTabType((prev) => ({ ...prev, subscribe: 'ALL_PRESS' }));
            setPage({ grid: 0, list: 0 });
        },
        'my-press-tab': () => {
            setTabType((prev) => ({ ...prev, subscribe: 'SUBSCRIBED_PRESS' }));
            setPage({ grid: 0, list: 0 });
        },
        'list-view-tab': () => {
            setTabType((prev) => ({ ...prev, view: 'LIST_VIEW_TYPE' }));
            setPage({ grid: 0, list: 0 });
        },
        'grid-view-tab': () => {
            setTabType((prev) => ({ ...prev, view: 'GRID_VIEW_TYPE' }));
            setPage({ grid: 0, list: 0 });
        },
    };

    const setOnClick = (e) => {
        const type = e.target.id;

        if (changeTabType[type]) changeTabType[type]();
    };

    const sliceData = (elementCount, data) => {
        let totalPage = Math.ceil(data.length / elementCount);
        return Array.from({ length: totalPage }, (_, idx) => data.slice(idx * elementCount, (idx + 1) * elementCount));
    };

    /**
     * @param {String} type - 데이터의 유형을 지정한다.
     *      "ALL_PRESS" : 전체 데이터
     *      "SUBSCRIBED_PRESS" : 사용자가 구독한 데이터
     */
    const getgridData = (type) => {
        const data = type === 'SUBSCRIBED_PRESS' ? newsData.subscribe : newsData.news;

        if (data.length <= 0) return;

        const filterData = data.map((e) => {
            return { id: e.id, pressName: e.pressName, logoImageSrc: e.logoImageSrc };
        });
        const elementCount = gridRow * gridCol;
        const slicedData = sliceData(elementCount, filterData);
        const maxPageData = slicedData.slice(0, gridMaxPage);

        setGridData(maxPageData);
    };

    const setSubscribedData = async () => {
        const selectAllResult = await selectAllSubscribeData();
        if (selectAllResult.result) setSubscribes(selectAllResult.data);
    };

    useEffect(() => {
        setSubscribedData();

        // 전체 언론사 && 그리드뷰(뷰타입state는 백로그)

        if (newsData && !error) {
            if (tabType.subscribe === 'ALL_PRESS' && tabType.view === 'GRID_VIEW_TYPE') {
                getgridData('ALL_PRESS');
            }
            if (tabType.subscribe === 'SUBSCRIBED_PRESS' && tabType.view === 'GRID_VIEW_TYPE') {
                getgridData('SUBSCRIBED_PRESS');
            }
        }
    }, [newsData, error, subscribes, tabType]);

    return (
        <div>
            <NavTab setOnClick={setOnClick} tabType={tabType} />
            <div className={styles.media__container}>
                {tabType.view === 'GRID_VIEW_TYPE' && gridData[page.grid] ? (
                    <GridNews newsData={gridData} page={page.grid} setPage={setPage} tabType={tabType} />
                ) : (
                    ''
                )}
                {tabType.view === 'LIST_VIEW_TYPE' ? <ListNews /> : ''}
            </div>
        </div>
    );
}
