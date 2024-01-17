import React, {useEffect} from 'react'

const Alert = ({type, msg, removeAlert, list}) => {
    console.log(type);
    useEffect (() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 2000);
        return () => clearTimeout(timeout);
        }, [list])
        return <p className={`alert alert-${type}`} role="alert">{msg}</p>
}

export default Alert