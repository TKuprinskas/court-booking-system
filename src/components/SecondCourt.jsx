import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { Container, Box, useMediaQuery } from '@mui/material';
import { getUser } from '../utils/helpers';
import kortas2 from '../assets/images/kortas2.jpg';
import styled from 'styled-components';

const PickerContainer = styled(Box)`
    width: 475px;
    margin: 1em auto;
    padding: 1em;
    background-color: #fff;
    color: #333;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 2px 4px #00000018;
    @media (max-width: 520px) {
        width: 100%;
    }
`;

const SecondCourt = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [isScheduling, setIsScheduling] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleErr, setScheduleErr] = useState('');
    const [bookedDates, setBookedDates] = useState([]);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        const getBookedDates = async () => {
            const response = await fetch('https://backend.tenisopartneris.lt/v1/bookcourt');
            const data = await response.json();
            const filteredData = data.filter((booking) => booking.courtId === 2);
            setBookedDates(filteredData);
            setAllBookings(data);
        };
        getBookedDates();
        const user = getUser();
        setUserId(user.userID);
        setUserName(user.name);
    }, []);

    const timeSlotValidator = (slotTime) => {
        const checkIfBooked = bookedDates.find((booking) => booking.date === slotTime.toLocaleString());
        const userBookings = allBookings.filter((booking) => {
            const fullBookingDate =
                new Date(slotTime).getFullYear() +
                '-' +
                (new Date(slotTime).getMonth() + 1) +
                '-' +
                new Date(slotTime).getDate();
            const bookingDate = booking.bookedDate.toLocaleString().split(',')[0];
            const bookingDateCheck = new Date(bookingDate);
            const fullBookingDateCheck =
                bookingDateCheck.getFullYear() +
                '-' +
                (bookingDateCheck.getMonth() + 1) +
                '-' +
                bookingDateCheck.getDate();
            return booking.userId === userId && fullBookingDateCheck === fullBookingDate;
        });
        const twoWeeksInAdvance = new Date();
        twoWeeksInAdvance.setDate(twoWeeksInAdvance.getDate() + 3);
        if (slotTime > twoWeeksInAdvance) {
            return false;
        }
        if (checkIfBooked || userBookings.length >= 2) {
            return false;
        }
        return true;
    };

    const handleScheduled = async (dateTime) => {
        setIsScheduling(true);
        setScheduleErr('');
        const localeDateTime = dateTime.toLocaleString();
        const bookedDate =
            new Date(dateTime).getFullYear() +
            '-' +
            (new Date(dateTime).getMonth() + 1) +
            '-' +
            new Date(dateTime).getDate();

        const data = await fetch('https://backend.tenisopartneris.lt/v1/bookcourt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                localeDateTime,
                duration: 1,
                courtId: 2,
                userId: userId,
                userName: userName,
                bookedDate: bookedDate,
            }),
        });

        const res = await data.json();
        if (res) {
            setTimeout(() => {
                setIsScheduling(false);
                setIsScheduled(true);
            }, 1000);
            setTimeout(() => {
                navigate('/mano-rezervacijos');
            }, 2000);
        } else {
            setScheduleErr(res.message);
        }
    };

    return (
        <Container sx={{ marginTop: isMobile ? '20px' : '50px' }}>
            <Box
                component="img"
                sx={{
                    height: 200,
                    width: 200,
                    borderRadius: '50%',
                    display: 'block',
                    margin: '0 auto',
                }}
                alt="facebook profile picture"
                src={kortas2}
            />
            <PickerContainer>
                <DayTimePicker
                    timeSlotSizeMinutes={60}
                    onConfirm={handleScheduled}
                    timeSlotValidator={timeSlotValidator}
                    isLoading={isScheduling}
                    isDone={isScheduled}
                    err={scheduleErr}
                    confirmText="Rezervuoti"
                    doneText="Rezervacija sėkminga"
                    loadingText="Rezervuojama..."
                />
            </PickerContainer>
        </Container>
    );
};

export default SecondCourt;
