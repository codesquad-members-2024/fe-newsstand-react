import React, { useEffect, useState } from 'react'
import "./GridView.css"

const GridView = ({newsData}) => {
    const [sliceNewsData, setSliceNewsData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    return (
        <ul className='grid-view-container'>
            gridView
        </ul>
    )
}

export default GridView