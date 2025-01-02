import { useState } from 'react';
import { Dialog, Paper, IconButton } from '@mui/material'
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

const FeedTableDialog = (props) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false)
        props.windowState()
    };
    return (
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
            {/* Optionally you can use DialogTitle, DialoContent and DialogAction passed as a children in here */}

            {props.children}

        </Dialog>

    )
}

export default FeedTableDialog