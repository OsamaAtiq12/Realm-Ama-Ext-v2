


import React from 'react';

const ProgressBar = ({ start, end }) => {
    const filledWidth = `${end - start}%`;
    const emptyStart = `${start}%`;
    return (
        <div className="w-full h-4 bg-[#D2CECF] rounded-full relative">
            <div
                style={{ 
                    left: emptyStart, 
                    width: filledWidth,
                    background: 'linear-gradient(to right, #5C1EDF, #B085DC)'
                }}
                className="h-full text-xs text-white rounded-full absolute"
            ></div>
        </div>
    );
};

export default ProgressBar;