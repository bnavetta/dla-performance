import React from 'react';

import Garden from '../Garden';

export default class Horde extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            garden: [],
            score: 0
        };

        this.handleCellClick = this.handleCellClick.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('update', ({ score, garden }) => this.setState({ garden, score }));
    }

    handleCellClick(row, col) {
        console.log('Clicked', row, col);
        this.props.socket.emit('cellClick', { row, col });
    }

    render() {
        return (
            <div>
                <div>
                    Gardener score: <span className="score">{this.state.score}</span>
                </div>
                <div>
                    <Garden data={this.state.garden} onCellClick={this.handleCellClick} />
                </div>
            </div>
        );
    }
}
