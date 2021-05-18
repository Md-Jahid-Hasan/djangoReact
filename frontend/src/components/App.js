import React, {Fragment, useEffect} from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import Header from './layouts/Header'
import Dashboard from "./leads/Dashboard";
import {Provider, useDispatch} from "react-redux";
import store from "../store";
import {Container} from "@material-ui/core";
import Login from "./accounts/login";
import Register from "./accounts/register";
import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";


const App = () => {
    useEffect(()=>(
        store.dispatch(loadUser())
    ))

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Header/>
                    <Container>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                        </Switch>
                    </Container>
                </Fragment>
            </Router>
        </Provider>
    )
}

export default App