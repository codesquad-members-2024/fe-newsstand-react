import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getImages } from '../apis/getImages';

export function PressItem() {
	const [images, setImages] = useState([]);
	useEffect(() => {
		getImages().then((data) => {
			setImages(data);
		});
	}, []);
	console.log(images);
	return <StyledDiv></StyledDiv>;
}

const StyledDiv = styled.div``;
