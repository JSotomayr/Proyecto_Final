
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import DefaultCard from "../component/defaultCard.jsx";
import "../../styles/allBeers.scss";


const AllBeers = () => {
	const { store, actions } = useContext(Context);
	const [beerList, setBeerList] = useState([]);

	useEffect(() => {
		if(store.beers.length != 0){
			setBeerList(JSON.parse(localStorage.getItem('beers')))
		}else{
			actions.getBeer();
		}
	}, [])

	useEffect(() => {
		if (store.beers.length != 0) {
			setBeerList(
				store.beers.map((beer, index) => {
					return <DefaultCard key={index.toString()} element={beer} />;
				})
			);
		}
	}, [store.beers]);

	return (
		<div>
			<h1 className="title mt-4">Las protagonistas</h1>
			<div className="allBeers">{beerList}</div>
		</div>);

}

export default AllBeers;