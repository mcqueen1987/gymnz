import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function SimpleMenu({...props}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose(item) {
        return function () {
            setAnchorEl(null);
            item && item.onSelect && item.onSelect();
        }
    }

    return (
        <div>
            <ClickAwayListener onClickAway={handleClose()}>
                <div>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup='true'
                        onClick={handleClick}
                        style={{
                            color: 'white'
                        }}
                    >
                        {props.displayText || ''}
                    </Button>

                    <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        {props.items.map(item => <MenuItem key={item.text}
                                                           onClick={handleClose(item)}>{item.text}</MenuItem>)}
                    </Menu>
                </div>
            </ClickAwayListener>
        </div>
    );
}

export default SimpleMenu;
