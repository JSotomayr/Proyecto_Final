import React, { useContext} from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import "../../styles/favouriteButton.scss";


const FavouriteButton = (props) => {
    const { store, actions } = useContext(Context);
    return(
        <Button
			className="btn_favourite"
			variant="danger"
			onClick={() => {
				actions.addFavourite(props.element)}
			}>
		</Button>
    );
};

FavouriteButton.propTypes = {
    element: PropTypes.object
}

export default FavouriteButton;