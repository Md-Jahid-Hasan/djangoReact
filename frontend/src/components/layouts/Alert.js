import React, {useState, useEffect, useRef} from "react";
import Alert from '@material-ui/lab/Alert';
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles(() => ({
    alert: {
        margin: "20px"
    }
}))


const ShowAlert = () => {
    const loaded = useRef(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState([])
    const [msg, setMsg] = useState([])
    const messages = useSelector(state => state.alert)
    const alertStyle = useStyle()

    useEffect(() => {
        if (loaded.current){
            setShow(true)
            if (messages.msg){
                setMsg([messages.msg])
            } else {
                let e = []
                for (const prop in messages.error){
                    e.push(`${prop.toUpperCase()} : ${messages.error[prop]}`)
                    setMsg(e)
                }
            }

            const timer = setInterval(() => setShow(false), 3000)
            return () => clearInterval(timer)
        } else {
            loaded.current = true
        }
    },[messages])

    const alertBoxes = () => msg.map((m, index) => (
        <Alert key={index} severity={messages.status===200 ? "success" : "error"}
        variant="filled" className={alertStyle.alert}>{m}</Alert>
    ))

    return(
        <div>
            {show && alertBoxes()}
        </div>
    )
}

export default ShowAlert