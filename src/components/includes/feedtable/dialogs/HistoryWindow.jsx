import React, { useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { List, ListItemText, ListItem, Divider } from '@material-ui/core'
import { Paper, Grid, Box, IconButton } from '@mui/material'
import Draggable from 'react-draggable';
import CloseIcon from '@mui/icons-material/Close';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function ScoreWindow(props) {
    const { orderDetail, windowState } = props;
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false)
        windowState()
    };

    return (
        <>
            <Dialog
                open={open}
                fullWidth="lg"
                maxWidth="md"
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                {handleClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}

                {/* TITLE */}

                <DialogTitle style={{ cursor: 'move' }} sx={{ bgcolor: "WhiteSmoke" }} id="Dialog-Score" >

                </DialogTitle>

                {/* CONTENT */}
                <DialogContent sx={{ bgcolor: "WhiteSmoke" }} >
                    <DialogContentText>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
