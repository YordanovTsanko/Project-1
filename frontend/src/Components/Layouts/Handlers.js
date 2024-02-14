import { Slide } from "@mui/material";
import { forwardRef } from "react";

const handleClickOpen = (setOpenAlert) => {
    setOpenAlert(true);
};

const handleClose = (setOpenAlert) => {
    setOpenAlert(false);
};

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export {handleClickOpen, handleClose, Transition }