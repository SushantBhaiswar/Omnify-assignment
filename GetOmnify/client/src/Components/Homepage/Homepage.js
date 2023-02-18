import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Homepage.css"

function Homepage() {
    const Redirect = useNavigate()
    const Userid = localStorage.getItem("Userid")

    return (

        <div className="background">
            <div className="header-box">
                <h1>Omnify</h1>
                <button onClick={() => {
                    Redirect("/register")
                }} >Register</button>
            </div>

            {
                <div className="main-box">
                    <div className="box">
                        <h1>Event Sheduler</h1>
                        {!Userid ?
                            <button onClick={() => {
                                Redirect("/login")
                            }}>Login</button>
                            : <button onClick={() => {
                                Redirect("/event", { state: { Userid } })
                            }}>CreateEvent</button>}
                    </div>
                </div>
            }
        </div >
    )
}

export default Homepage