import './App.css';
import Enter from "./components/Middle/Main/Enter/Enter";
import Index from "./components/Middle/Main/Index/Index";
import Users from "./components/Middle/Main/Users/Users"
import React, {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Application from "./Application";
import axios from "axios";
import NotFound from "./components/Middle/Main/NotFound/NotFound";
import Register from "./components/Middle/Main/Register/Register";

function App() {

    const [login, setLogin] = useState(null)
    const [users, setUsers] = useState(null)


    useEffect(() => {
        if (localStorage.getItem("jwt")){
            axios.get("/api/jwt", {
                params: {
                    jwt: localStorage.getItem("jwt")
                }
            }).then((response)=>{
                localStorage.setItem("login", response.data.login);
                setLogin(response.data.login)
            }).catch((error)=>{
                console.log(error)
            })
        }
    }, []);


    useEffect(() => {
        axios.get("/api/users").then((response)=>{
            setUsers(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }, [users]);



    const [posts, setPosts] = useState(null)


    useEffect(() => {
        axios.get("/api/posts").then((response)=>{
            setPosts(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }, []);



    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        index={true}
                        element={<Application setLogin={setLogin} login={login} page={<Index posts={posts}/>}/>}
                    />
                    <Route
                        exact path={'/enter'}
                        element={<Application login={login} page={<Enter setLogin={setLogin}/>}/>}
                    />

                    <Route
                        exact path={'/register'}
                        element={<Application login={login} page={<Register setLogin={setLogin}/>}/>}
                    />
                    <Route
                        exact path={'/users'}
                        element={login ? (<Application setLogin={setLogin} login={login} users={users} page={<Users users={users}/>}/>) : (<Navigate to="/enter"/>) }
                    />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
