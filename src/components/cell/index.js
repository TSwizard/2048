import React from 'react';

const Cell = ({x, y, value}) => {
    const digits = value.toString().length;
    return (
        <div className={`col-sm-3 game-cell d${digits} x${x + 1} y${y + 1}`} value={value}></div>
    );
}

export default Cell;
