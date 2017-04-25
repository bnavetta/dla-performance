import React from 'react';
import classNames from 'classnames';

import './style.css';

import Garden from '../Garden';

import { ops } from '../../../../shared';

/*
[
    [{type: 'cactus', level: 0}, {}, {type: 'eggplant', level: 1}],
    [{}, {type: 'flower', level: 3}, {type: 'carrot', level: 0}],
    [{type: 'tree', level: 2}, {}, {}]
]*/

export default class Gardener extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            garden: [],
            op: 'eggplant',
            score: 0,
        };

        this.handleCellClick = this.handleCellClick.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('update', ({ garden, score }) => this.setState({ garden, score }));
    }

    handleCellClick(row, col) {
        console.log('Clicked', row, col);
        this.props.socket.emit('cellClick', { row, col, op: this.state.op });
    }

    setOp(op) {
        this.setState({ op });
    }

    render() {
        const opButtons = Object.keys(ops).map(op => (
            <button key={op} className={classNames('op', op === this.state.op && 'active')} onClick={this.setOp.bind(this, op)}>{`${ops[op]} ${op}`}</button>
        ));

        return (
            <div>
                <div>
                    Gardener score: <span className="score">{this.state.score}</span>
                </div>
                <div>
                    { opButtons }
                </div>
                <div>
                    <Garden data={this.state.garden} onCellClick={this.handleCellClick} />
                </div>
            </div>
        );
    }
}
