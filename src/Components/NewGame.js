import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from "reactstrap";
import axios from 'axios';
import { ROOT_API } from '../static';

export default class NewGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player1: '',
            player2: '',
            player3: '',
            player4: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit = (event) => {
    event.preventDefault();

    const { toggleLoading } = this.props;
    toggleLoading(true);

    const newGame = {
        players: Object.keys(this.state).map(key => this.state[key]),
        scores: [[], [], [], []]
    }
    axios({
        url: `${ROOT_API}/api/game`,
        method: "POST",
        data: newGame
    }).then(response => {
        if (response.data.success) {
            window.location.href = `/game/${response.data.game._id}`
        }
    })
        .catch(err => { console.error(err) }
        )
}

handleInputChange(event) {
    // console.log(event.target);
    this.setState({ [event.target.name]: event.target.value })

}

render() {
    return (
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Input
                    name="player1"
                    placeholder="P1 name"
                    onChange={this.handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name="player2"
                    placeholder="P2 name"
                    onChange={this.handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name="player3"
                    placeholder="P3 name"
                    onChange={this.handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name="player4"
                    placeholder="P4 name"
                    onChange={this.handleInputChange}
                />
            </FormGroup>
            <Button>Create New Game</Button>
        </Form>
    )
}
}
