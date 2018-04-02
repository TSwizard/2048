import React, { Component } from 'react';

import Cell from '../cell'

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boardModel: this.props.boardModel
        }

        this.onTouchStart = this.props.onTouchStart;
        this.onTouchMove = this.props.onTouchMove;
        this.onTouchEnd = this.props.onTouchEnd;

    }
    render() {
        const boardModel = this.props.boardModel;

        const cells = this.props.cells;
        return (
            <div 
                className="board"
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                >
                <div className="row">
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                </div>
                <div className="row">
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                </div>
                <div className="row">
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                </div>
                <div className="row">
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                    <div className="col-sm-3 game-cell"></div>
                </div>
    
                <div className="overlay col-sm-12">
                    {cells.map((cell, i) => <Cell 
                                                key={cell.id}
                                                x={cell.x}
                                                y={cell.y}
                                                value={cell.value}
                                                isNew={cell.isNew}
                                            />)}
                </div>
            </div>
                
        );
    }
}

export default Board;
