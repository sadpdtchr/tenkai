import React, { Component } from "react";
import {
    ButtonToolbar
} from "react-bootstrap";

import Button from "components/CustomButton/CustomButton.jsx";

export class HelmCard extends Component {
    render() {
        return (
            <div className={"card"} style={{ backgroundColor: "#FCFFEC" }}>
                <div className={"header"}>

                    <h4 className="title"><b>{this.props.item.name} = {this.props.item.value} </b></h4>
                    <p className="category">{this.props.item.scope}</p>
                </div>
                <div className={"content"}>
                    <p>{this.props.item.description}</p>
                    <div className="footer">
                        <hr />
                    </div>

                    <ButtonToolbar>

                        <Button className="btn btn-primary" size="sm"
                            onClick={this.props.navigateToEditEnvironment.bind(this, this.props.item)}>
                            <i className="pe-7s-edit" />{" "}Edit</Button>

                        <Button className="btn btn-danger" size="sm"
                            onClick={this.props.onDelete.bind(this, this.props.item)}><i className="pe-7s-trash" />
                            {" "}Delete</Button>

                    </ButtonToolbar>

                </div>
            </div>
        );
    }
}

export default HelmCard;