import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        // fetch('http://localhost:5000/bookings?email='+loggedInUser.email) //এখানথেকে পাঠালে বেকেন্ড থেকে রিড করা যায়।
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])
    return (
        <div>
            <h2>You have: {bookings.length} {bookings.length === 1 ? 'room' : 'rooms'} booking</h2>
            <ul>
                {
                    bookings.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/mm/yyyy'))} to: {book.checkOut}</li>)
                }
            </ul>
        </div>
    );
};

export default Bookings;