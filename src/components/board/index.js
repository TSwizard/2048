import React from 'react';

import Cell from '../cell'

const Board = ({boardModel}) => {
    return (
        <div className="board">
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
                {
                    boardModel.map((item, x) => (
                        item.map((cell, y) => (cell > 0 ? <Cell key={y} x={x} y={y} value={cell} /> : ''))
                    ))
                }
            </div>
        </div>
            
    );
}

export default Board;
