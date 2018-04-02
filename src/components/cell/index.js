import React from 'react';

const Cell = ({x, y, value, isNew}) => {
    const digits = value.toString().length;
    const seq = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536];
    const odd = seq.indexOf(+value)%2 === 1;
    return (
        <div className={`col-sm-3 game-cell d${digits} x${x + 1} y${y + 1} ${isNew ? 'new' : ''} ${odd? 'odd': 'even'}`} value={value}></div>
    );
}

export default Cell;
