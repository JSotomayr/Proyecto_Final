import React, { useContext} from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";

const GenericButton = (props) => {
    const { store, actions } = useContext(Context);
    return(
        <Button
			className="btn"
			variant="danger"
			onClick={() => {
				{props.add}
			}}>
				{props.name}
		</Button>
    )
};

GenericButton.propTypes = {
    name: PropTypes.string,
    add: PropTypes.func
}

export default GenericButton;