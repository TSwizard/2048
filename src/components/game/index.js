import React, { Component } from 'react';
import Board from '../board'

class Game extends Component {
    cellsPerTurn = 1;//Потом для уровней сложности допилить механизм изменения;
    score = 0;
    moves = 0;
    constructor() {
        super();

        this.setState = (() => {
            const setState = this.setState.bind(this);
            return (...args) => {
                return new Promise(res => {
                    setState(...args, res);
                });
            }
        })()

        this.state = {
            score: 0,
            moves: 0,
            boardModel: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        }

        document.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = event => {
        const keyCode = event.keyCode;
        if ([37, 38, 39, 40].indexOf(keyCode) > -1) {
            event.preventDefault();
            switch (keyCode) {
                case 37: {
                    this.makeMove('left');
                    break;
                }
                case 38: {
                    this.makeMove('up');
                    break;
                }
                case 39: {
                    this.makeMove('right');
                    break;
                }
                case 40: {
                    this.makeMove('down');
                    break;
                }
            }
        }
        
    }

    bordClear = () => {
        return this.setState({
            boardModel: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        });
    }

    newGame = () => {
        this.score = 0;
        this.moves = 0;
        this.bordClear()
            .then(this.generateCells.bind(null, this.cellsPerTurn))
        
    }

    makeMove = direction => {
        debugger
        const maps = {
            left: (col, i, arr) => [arr[0][i], arr[1][i], arr[2][i], arr[3][i]],
            right: (col, i, arr) => [arr[3][i], arr[2][i], arr[1][i], arr[0][i]],
            up: col => [...col],
            down: col => [...col].reverse()
        };

        const reverseMaps = {
            left: maps.left,
            right: (col, i, arr) => [arr[0][3 - i], arr[1][3 - i], arr[2][3 - i], arr[3][3 - i]],
            up: maps.up,
            down: maps.down
        };

        const rows = this.state.boardModel.map(maps[direction]);
        console.log(rows);
        rows.forEach(row => {
            row.sort(this.sort);
            this.mergeRow(row).sort(this.sort);
        });
        
        const newBoard = rows.map(reverseMaps[direction]);
        console.log(this.state.boardModel);
        console.log(newBoard);
        this.moves += 1;
        this.setState({
            score: this.score,
            moves: this.moves,
            boardModel: newBoard
        }).then(this.generateCells.bind(null, this.cellsPerTurn))
    }

    sort = (a,b) => {
        if (a > 0 && b > 0) {
            return 0;
        }

        return b - a;
    };

    mergeRow = arr => {
        for (let i in arr) {
            const next = +i + 1;

            if (arr[i] === arr[next]) {
                const sum = arr[i] + arr[next];
                [arr[i], arr[next]] = [sum, 0];
                this.score += sum;
            }
        }

        return arr;
    };

    generateCells = cellsCount => {
        if (this.isGameFinished()) {
            alert('You lost');
            return Promise.resolve();
        }

        let board = this.state.boardModel;
        for (let i = cellsCount; i > 0; i -= 1) {
            board = this.insertCell(board);
        }

        return this.setState({
            boardModel: board
        });
    }

    isGameFinished = () => this.getFreeCells() < this.cellsPerTurn;

    insertCell = (board) => {
        let newBoard = [ //clone the board
            [...board[0]],
            [...board[1]],
            [...board[2]],
            [...board[3]]
        ] 
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);
        const isCellFree = newBoard[x][y] === 0;
        if (isCellFree) {
            newBoard[x][y] = 2;
        } else {
            newBoard = this.insertCell(newBoard);
        }

        return newBoard;
    }

    getFreeCells = () => 
        this.state.boardModel.reduce((prev, cur) => cur.filter(c => c === 0).length + prev, 0);

    render() {
        const boardModel = this.state.boardModel;
        return (
            <div className="row">
                <div className="info-row col-sm-12">
                    <div className="row">
                        <div className="col-sm-6">
                            Score: {this.state.score}
                        </div>
                        <div className="col-sm-6">
                            Moves: {this.state.moves}
                        </div>
                    </div>
                </div>

                <Board boardModel={boardModel} />
            </div>
        );
    }
}

export default Game;
