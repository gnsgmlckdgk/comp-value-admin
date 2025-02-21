import React from 'react';

const ButtonColBox = ({ children, flexWrap = '', sort = 'left', gap, marginTop = '0px', marginRight = '0px', marginBottom = '0px', marginLeft = '0px' }) => {
    return (
        <div style={{
            display: 'flex',
            ...(sort === 'right' && { justifyContent: 'flex-end' }),
            ...(flexWrap !== '' && { flexWrap }),
            gap,
            marginTop,
            marginRight,
            marginBottom
        }}>
            {children}
        </div>
    )

};

export default ButtonColBox;