const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			baseUrl: `${PROTOCOL}://${PORT}-${HOST}`,
			beers: [], 
			wishlist: [],
			favourite: []
		},
		actions: {
			getBeer: () => {
				fetch(getStore().baseUrl.concat("/beer"))
					.then(response => {
						if (response.ok) {
							return response.json();
						}
						throw new Error("FAIL DOWNLOADING BEER");
					})
					.then(responseAsJSON => {
						console.log("A ver que tiene este RESPONSE", responseAsJSON);
						setStore({ beers: [...getStore().beers, ...responseAsJSON] });
					})
					.catch(error => {
						console.log(error.message);
					});
			},

			addWishlist: (beer) => {
				setStore({wishlist = [...getStore().wishlist, beer]})
			},

			addFavourite: (beer) => {
				setStore({favourite = [...getStore().favourite, beer]})
			}
		}
	};
};

export default getState;
