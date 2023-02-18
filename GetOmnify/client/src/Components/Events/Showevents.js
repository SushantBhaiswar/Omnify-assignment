import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import "./Showevents.css"
import 'bootstrap/dist/css/bootstrap.css';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'


function Showevents() {
    const redirect = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Redirect = useNavigate()
    const [data, setData] = useState([])
    const [time, setTime] = useState({
        starttime: "",
        endtime: ""
    })
    const Userid = localStorage.getItem("Userid")
    // const { state } = useLocation()
    // if (state) {
    //     setData(state.data.events)
    //     setTime({
    //         starttime: state.data.StartTime,
    //         endtime: state.data.EndTime
    //     })
    // }
    const getdata = () => {
        axios.get(`http://localhost:3001/getevent/${Userid}`)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setData(res.data.events)
                    setTime({
                        starttime: res.data.StartTime,
                        endtime: res.data.EndTime
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const DeleteEvent = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`http://localhost:3001/delete/${Userid}`)
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            setData([])
                            setTime({
                                starttime: "",
                                endtime: ""
                            })
                            redirect("/showevents")
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            }
        })
    }
    const logout = () => {
      localStorage.clear()
      redirect("/")
    }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <div className='showevents-bg'>
            <div className="showevent-heading">
                <h2>Omnify Event scheduler</h2>
                <div className="avatar">
                    <Avatar style={{ background: "blue" }} onClick={handleClick} />
                </div>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}

                    id="basic-menu"
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}>
                    <MenuItem onClick={() => {
                        logout()
                        handleClose()
                    }} >Logout</MenuItem>
                    <MenuItem onClick={() => {
                        DeleteEvent()
                        handleClose()
                    }} >Delete Event</MenuItem>
                </Menu>

            </div>
            {

                (data) ?
                    <>
                        <h3 style={{ color: "white" }}>Scheduled Events For next 90 Days...</h3>
                        <Row className='mx-2 my-4'>
                            {data.map((elm) => {
                                return (
                                    <Col className='col-md-3 my-3'>
                                        <div className="event-bx">
                                            <h4>Event</h4>
                                            <span className='date'> Date : {elm}</span>
                                            <span className='date'> Timing : {time.starttime} - {time.endtime}</span>
                                        </div>
                                    </Col>)
                            })}
                        </Row>
                    </> :
                    <div className='event-button'>
                        <span>CREATE EVENT</span>
                        <button onClick={() => {
                            Redirect("/event", { state: { Userid } })
                        }}>CREATE</button>
                    </div>
            }
        </div >
    )
}

export default Showevents