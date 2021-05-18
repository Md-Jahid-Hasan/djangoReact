import React, {useEffect, useState} from "react";
import {
    AppBar, Toolbar, Typography, makeStyles, Button,
    IconButton, Drawer, Link, MenuItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Link as RouterLink} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../actions/auth";

const navLink = [
    {label: "Option1", href: "#"},
    {label: "Option2", href: "#"},
    {label: "Login", href: "/login"},
    {label: "Register", href: "/register"},
]
const useStyles = makeStyles(() => ({
    header: {
        background: "#400ccc",
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        }
    },
    menuButton: {
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }
}))

const Header = () => {
    const {header, menuButton, toolbar, drawerContainer} = useStyles()
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })
    const {mobileView, drawerOpen} = state
    const dispatch = useDispatch()
    const {isAuthenticated, user}= useSelector(state1 => state1.auth)
    //const user = useSelector(state1 => state1.auth.user)

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, mobileView: true}))
                : setState((prevState) => ({...prevState, mobileView: false}));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, [])

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {logo}
                {getMenuButtons()}
                {isAuthenticated &&
                <Button onClick={makeLogout}>Logout</Button>}
                 {isAuthenticated && `Welcome ${user.username}`}
            </Toolbar>
        )
    }

    const makeLogout = () => {
        dispatch(logout())
    }
    const logo = (
        <Typography variant="h6" component="h1">
            Header
        </Typography>
    )

    const getMenuButtons = () => {
        return navLink.map(({label, href}) => {
            if (isAuthenticated){
                if (label === "Register" || label === "Login")
                    return null
            }
            return (
                <Button {...{
                    key: label,
                    color: "inherit",
                    className: menuButton,
                    to: href,
                    component: RouterLink,
                }}>
                    {label}
                </Button>
            )
        })
    }

    const getDrawerChoices = () => {
        return navLink.map(({label, href}) => {
            if (isAuthenticated){
                if (label === "Register" || label === "Login")
                    return null
            }
            return(
                <Link{...{
                    component: RouterLink,
                    to:href,
                    key: label,
                    color: "inherit",
                    style: {textDecoration: "none"},
                }}>
                    {label}
                </Link>
            )
        })
    }

    const displayMobile = () => {
        const handleDrawerOpen = () => {
            setState(prevState => ({...prevState, drawerOpen: true}))
        }

        const handleDrawerClose = () => {
            setState(prevState => ({...prevState, drawerOpen: false}))
        }
        return (
            <Toolbar>
                <IconButton {...{
                    edge: "start",
                    color: "inherit",
                    "area-label": "menu",
                    "area-haspopup": "true",
                    onClick: handleDrawerOpen,
                }}>
                    <MenuIcon/>
                </IconButton>

                <Drawer {...{
                    anchor: "left",
                    open: drawerOpen, //If drawerOpen = true then drawer will open
                    onClose: handleDrawerClose, //by clicking anything outside the drawer this function call
                }}>
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>
                <div>{logo}</div>
            </Toolbar>
        )
    }

    return (
        <header>
            <AppBar className={header} position="static">
                {mobileView ? displayMobile() : displayDesktop()}</AppBar>
        </header>
    )
}

export default Header