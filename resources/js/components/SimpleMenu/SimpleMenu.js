import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function SimpleMenu({...props}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose(item) {
        return function() {
            setAnchorEl(null);
            item.onSelect && item.onSelect();
        }
    }

    return (
        <div>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup='true'
                onClick={handleClick}
                style={{
                    color:'white'
                }}
            >
                {props.displayText || ''}
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {props.items.map(item=> <MenuItem key={item.text} onClick={handleClose(item)}>{item.text}</MenuItem>)}
            </Menu>
        </div>
    );
}

export default SimpleMenu;
