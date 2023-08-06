import {Snackbar, Button, Alert, AlertProps} from '@mui/material'
import { useState,forwardRef } from 'react'

const SnackbarAlert = forwardRef<HTMLDivElement,AlertProps>(
    function SnackbarALert(props, ref){
        return <Alert elevation={6} ref={ref} {...props} />
    }
)