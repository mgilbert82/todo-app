import React from 'react';
import { Button, Tooltip } from 'antd';


export default function MyButton(props) {
    return(
        <Tooltip
            title={props.tooltip}
            placement="bottom">
            <Button
                type="primary"
                shape="round"
                icon={props.icon}
                onClick={props.onClick}
                >{props.children}
            </Button>
        </Tooltip>
    )
}
