import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const GridView = ({newsData}) => {
    const [sliceNewsData, setSliceNewsData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    return (
        <GridContainer>
            gridView
        </GridContainer>
    )
}

export default GridView

const GridContainer = styled.ul`
    width: 100%;
    height: 100%;
`