import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { bedType } = useParams();
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });
    const handleCheckInDate = (date) => {
        const newDates = {...selectedDate}
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };
    const handleCheckOutDate = (date) => {
        const newDates = {...selectedDate}
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };
    const handleBooking = () => {
        //নিচের দুটিকেই আমরা সার্ভারে পাঠাবো।
        const newBoking = {...loggedInUser, ...selectedDate};
        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBoking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    };
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Assalamu Alaikum, {loggedInUser.name}. Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            {/* make it by material ui */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check in Date"
                        // value={selectedDate}
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check out Date"
                        format="dd/MM/yyyy"
                        // value={selectedDate}
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">Book Now</Button>
            </MuiPickersUtilsProvider> 
            <Bookings></Bookings>           
        </div>
    );
};

export default Book;