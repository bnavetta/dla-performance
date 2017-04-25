import React from 'react';

// 🌵🎄🌲🌳🌴🌱🌿☘️🍀🎍🎋🍃🍂🌾💐🌷🌹🥀🌻🌼🌸🌺💦🍆🥕✨🌞

import './style.css';
import { symbols } from '../../../../shared';

export default class Garden extends React.Component {
    renderCell(row, col, entry) {
        const symbol = !!entry.type ? symbols[entry.type][entry.level] : '';
        return (
            <button className="plant" onClick={() => this.props.onCellClick(row, col)}>{symbol}</button>
        )
    }

    render() {
        const { data } = this.props;
        return (
            <table>
                <tbody>
                    { data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            { row.map((entry, colIndex) => <td className="cell" key={colIndex}>{this.renderCell(rowIndex, colIndex, entry)}</td>) }
                        </tr>
                    )) }
                </tbody>
            </table>
        );
    }
}
