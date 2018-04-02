import React, { Component } from 'react';
import Board from '../board'


class Game extends Component {
    cellsPerTurn = 1;//Потом для уровней сложности допилить механизм изменения;
    score = 0;
    moves = 0;
    cells = [];
    pointer = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    }
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
            cells: this.cells,
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

    onTouchStart = (event) => {
        this.pointer.startX = event.targetTouches[0].clientX;
        this.pointer.startY = event.targetTouches[0].clientY;
        
    }

    onTouchMove = (event) => {
        this.pointer.endX = event.targetTouches[0].clientX;
        this.pointer.endY = event.targetTouches[0].clientY;
    }

    onTouchEnd = (event) => {
        const deltaX = this.pointer.startX - this.pointer.endX;
        const deltaY = this.pointer.startY - this.pointer.endY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > absDeltaY) {
            //left or right
            if (deltaX < 0) {
                this.makeMove('right');
            } else {
                this.makeMove('left');
            }
        } else {
            if (deltaY < 0) {
                this.makeMove('down');
            } else {
                this.makeMove('up');
            }
        }

        this.pointer = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        }
    }

    bordClear = () => {
        this.cells = [];
        return this.setState({
            boardModel: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            cells: this.cells
        });
    }

    newGame = () => {
        this.score = 0;
        this.moves = 0;
        this.bordClear()
            .then(this.generateCells.bind(null, this.cellsPerTurn + 1))

        window.game = this;
        
    }

    makeMove = direction => {
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
        rows.forEach(row => {
            row.sort(this.sort);
            this.mergeRow(row).sort(this.sort);
        });
        
        const newBoard = rows.map(reverseMaps[direction]);
        newBoard.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (cell === 0) return;
                cell.x = x;
                cell.y = y;
            })
        });

        const boardNotChanged = this.boardsAreEqual(this.state.boardModel, newBoard);

        if (boardNotChanged) {
            this.score = this.state.score;
        } else {
            this.moves += 1;
            this.setState({
                score: this.score,
                moves: this.moves,
                boardModel: newBoard,
                cells: this.cells
            })
            .then(() => {
                setTimeout(() => {
                    this.generateCells(this.cellsPerTurn)
                }, 200) 
            })
        }

        

    }

    boardsAreEqual = (prevBoard, curBoard) => {
        const diffCount = prevBoard.reduce((prev, cur, i, arr) => cur.filter((item, j) => curBoard[i][j] !== item).length + prev, 0);
        return diffCount === 0;
    }

    sort = (left,right) => {
        const a = left.value || left;
        const b = right.value || right;
        if (a > 0 && b > 0) {
            return 0;
        }

        return b - a;
    };

    mergeRow = arr => {
        for (let i in arr) {
            const next = +i + 1;
            if (arr[i] && arr[next]) {
                if (arr[i].value === arr[next].value) {
                    const sum = arr[i].value + arr[next].value;
                    const cellIndex = this.cells.indexOf(arr[i]);
                    arr[next].value = sum;
                    arr[next].isNew = false;
                    [arr[i], arr[next]] = [arr[next], 0];

                    this.cells.splice(cellIndex, 1);
                    this.score += sum;
                }
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

    isGameFinished = () => this.cells.length > (16 - this.cellsPerTurn)//this.getFreeCells() < this.cellsPerTurn;

    insertCell = (board) => {
        let newBoard = [ //clone the board
            [...board[0]],
            [...board[1]],
            [...board[2]],
            [...board[3]]
        ] 
        const x = Math.floor(Math.random() * 4);
        const y = Math.floor(Math.random() * 4);
        
        const isCellFree = newBoard[x][y] === 0;
        if (isCellFree) {
            const val = (Math.floor(Math.random() * 8) < 7 ? 2 : 4);
            const square = {
                id: new Date().getTime() + `${x}${y}`,
                value: val,
                isNew: true,
                x,
                y
            }

            newBoard[x][y] = square;

            this.cells.push(square);
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
                        <div className="col-sm-6"  onTouchMove={e => console.log(e)}>
                            Score: {this.state.score}
                        </div>
                        <div className="col-sm-6">
                            Moves: {this.state.moves}
                        </div>
                    </div>
                </div>

                <Board 
                    boardModel={boardModel}
                    cells={this.state.cells}
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                    />
            </div>
        );
    }
}

export default Game;
