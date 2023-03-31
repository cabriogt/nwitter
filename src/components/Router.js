import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth"
import Home from "../routes/Home"
import Profile from "../routes/Profile"
import Navigation from "components/Navigation";


const AppRouter =({isLoggedIn ,userObj})=> {
    return(
        <Router>
            {isLoggedIn && <Navigation/>}
            <Switch>
                {isLoggedIn ? (
                <>
                <Route exact path="/" element={<Home/>}>
                    <Home userObj={userObj}/>
                </Route>
                <Route exact path="/profile" element={<Profile/>}>
                    <Profile/>
                </Route>
                </> 
                ):( 
                <>
                <Route exact path="/" element={<Auth/>}>
                    <Auth/>
                </Route>
                </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;