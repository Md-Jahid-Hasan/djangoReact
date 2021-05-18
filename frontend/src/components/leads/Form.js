import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {TextField, Button, Typography, FormControl, Box} from "@material-ui/core";
import {addLeads} from "../../actions/leads";

const Form = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const formSubmit =(e) => {
        e.preventDefault()
        console.log(name, email, message)
        const lead = {
            name, email, message
        }
        dispatch(addLeads(lead))
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <Box mt={5} p={1} border="1px dashed gray" display="inline-block">
        <FormControl>
            <div>
                <Typography display="inline" variant="h6">Enter name : </Typography>
                <TextField id="outlined-basic" label="name" variant="outlined"
                size="small" value={name} onChange={e => setName(e.target.value)}/>
            </div><br/>
            <div>
                <Typography display="inline"  variant="h6">Enter Email : </Typography>
                <TextField id="outlined-basic" label="name" variant="outlined"
                size="small" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div><br/>
            <div>
                <Typography display="inline" variant="h6">Enter Message : </Typography>
                <TextField id="outlined-basic" label="name" variant="outlined"
                size="small" value={message} onChange={e => setMessage(e.target.value)}/>
            </div><br/>
            <Button type="submit" onClick={formSubmit}>Submit</Button>
        </FormControl>
            </Box></Box>
    )
}

export default Form