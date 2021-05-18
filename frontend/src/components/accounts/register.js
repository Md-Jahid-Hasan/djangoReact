import React, {useState, useEffect} from "react";
import {Button, TextField, Typography, Box, FormControl} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import {register} from "../../actions/auth";

const Register = () => {
    const [data, setData] = useState({
        username: '', email: '',
        password: '', password2: '',
    })
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const onSubmit = e => {
        e.preventDefault();
        const body={
            username: data.username,
            email: data.email,
            password: data.password
        }
        if (data.password === data.password2)
        {
            dispatch(register(body))
        }
        else{
            setError(true)
            console.log("Not Submit")
        }
    }
    if (user){
        return <Redirect to="/login"/>
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <Box mt={5} p={1} border="1px dashed gray" display="inline-block">
                <FormControl>
                    <div>
                        <Typography display="inline" variant="h6">Enter Username : </Typography>
                        <TextField id="outlined-basic" variant="outlined"
                                   size="small" value={data.username} onChange={e => setData({...data, username: e.target.value})}/>
                    </div>
                    <br/>

                    <div>
                        <Typography display="inline" variant="h6">Enter Email : </Typography>
                        <TextField id="outlined-basic" variant="outlined"
                                   size="small" type="email" value={data.email}
                                   onChange={e => setData({...data, email: e.target.value})}/>
                    </div>
                    <br/>

                    <div>
                        <Typography display="inline" variant="h6">Enter Password : </Typography>
                        <TextField id="outlined-basic" variant="outlined" type="password"
                                   size="small" value={data.password} error={error} helperText={error && "Password did not match"}
                                   onChange={e => setData({...data, password: e.target.value})}/>
                    </div>
                    <br/>

                    <div>
                        <Typography display="inline" variant="h6">Repeat Password : </Typography>
                        <TextField id="outlined-basic" variant="outlined" type="password"
                                   size="small" value={data.password2} error={error}
                                   onChange={e => setData({...data, password2: e.target.value})}/>
                    </div>
                    <br/>
                    <Button type="submit" onClick={onSubmit}>Submit</Button>
                    <p>Already Have an Account?
                        <Link to="/login">Login</Link></p>
                </FormControl>
            </Box>

        </Box>

    )
}

export default Register