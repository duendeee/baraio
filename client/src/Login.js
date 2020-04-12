import React, { Component } from "react";
import io from "socket.io-client";
import {Link} from 'react-router-dom';

export const socket = io.connect("http://localhost:8080");
socket.on('connect', () => console.log('Nova conexão iniciada!'))

class Login extends Component {
    constructor() {
        super();
        this.state = {
            nickname: "",
        };
    }

    onTextChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onTextSubmit = e =>{
        //console.log(this.state.nickname);
        socket.emit("set user", this.state.nickname);
    };

    render() {
        return (
            <div>
                <div>
                    <span>Nickname</span>
                    <input
                        name="nickname"
                        onChange={e => this.onTextChange(e)}
                        value={this.state.nickname}
                        type="text"
                        maxLength="12"
                    />
                </div>

                <div>
                    <Link to="/salas">
                        <button onClick={this.onTextSubmit}>Send</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;
