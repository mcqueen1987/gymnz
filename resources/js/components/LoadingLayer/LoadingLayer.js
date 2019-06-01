import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import "./LoadingLayer.scss"

export default ()=>{
    return <div className='loading-layer'><CircularProgress size={100} className='loading-spinner' color="primary"/></div>;
}