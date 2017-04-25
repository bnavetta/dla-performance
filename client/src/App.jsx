import React from 'react';
import io from 'socket.io-client';

import './App.css';

import RolePicker from './components/RolePicker';
import Horde from './components/Horde';
import Gardener from './components/Gardener';

const socket = io();

export default class App extends React.Component {
    constructor() {
        super();
        this.state = { role: null };
    }

    handleRole(role) {
        this.setState({ role });
        socket.emit('chooseRole', { role });
    }

    componentDidMount() {
        socket.on('userError', ({ message }) => {
            this.setState({ error: message });
        });
    }

    renderBody() {
        if (this.state.error) {
            return <div className="error">{this.state.error}</div>;
        } else if (!this.state.role) {
            return <RolePicker onChoose={this.handleRole.bind(this)} />;
        } else if (this.state.role === 'horde') {
            return <Horde socket={socket} />;
        } else if (this.state.role === 'gardener') {
            return <Gardener socket={socket} />;
        } else {
            return <p>What in the world is a <span>{this.state.role}</span>?</p>;
        }
    }

    render() {
        return (
            <div className="App">
                <div className="AppContent">
                    { this.renderBody() }
                </div>
            </div>
        );
    }
}
