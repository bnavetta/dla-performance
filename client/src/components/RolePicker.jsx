import React from 'react';

export default class RolePicker extends React.Component {
    handleGardener() {
        this.props.onChoose('gardener');
    }

    handleHorde() {
        this.props.onChoose('horde');
    }

    render() {
        return (
            <div>
                <p>Are you...</p>
                <div>
                    <button onClick={this.handleGardener.bind(this)}>The Gardener</button>
                    <button onClick={this.handleHorde.bind(this)}>The Rabbit Horde</button>
                </div>
            </div>
        );
    }
}
