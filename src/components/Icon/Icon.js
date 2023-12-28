import React from 'react';
import * as icons from '../../theme/icons/index'

const Icon = React.memo((props) => {
    const {type, color, width, height, click} = props;
    const icon = icons[type];


    return (
        // <span onClick={(e) => callClick(e)} style={{width: width, height: height}}>
        <span style={{width: width, height: height}}>
            {icon(width, height, color)}
        </span>
    );
})

export default Icon;