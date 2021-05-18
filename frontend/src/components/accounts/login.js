import React, {useState, useEffect} from "react";
import {Button, TextField, Typography, FormControl, Box} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {login} from "../../actions/auth";
import {Link, Redirect} from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const [data, setData] = useState({
        username: '',
        password: '',
    })

    const onSubmit = e => {
        e.preventDefault();
        dispatch(login(data.username, data.password))
    }
    if (isAuthenticated){
        return <Redirect to="/"/>
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
                        <Typography display="inline" variant="h6">Enter Password : </Typography>
                        <TextField id="outlined-basic" variant="outlined" type="password"
                                   size="small" value={data.password}
                                   onChange={e => setData({...data, password: e.target.value})}/>
                    </div>
                    <br/>

                    <Button type="submit" onClick={onSubmit}>Submit</Button>
                    <p>Not Have an Account?
                        <Link to="/register">Login</Link></p>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Login