import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import { getUser } from '../utils/helpers';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const StyledButton = styled(Box)`
    background-color: #3b5998;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 30%;
    margin: 0 auto;
    border: none;
    &:hover {
        background-color: #2d4373;
    }

    @media (max-width: 600px) {
        width: 80%;
        padding: 10px;
    }
`;

const MyReservations = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const user = getUser();
        const getBookedDates = async () => {
            const response = await fetch('https://backend.tenisopartneris.lt/v1/bookcourt');
            const data = await response.json();
            const filteredData = data
                .sort((a, b) => b.date - a.date)
                .filter((booking) => booking.userId === user.userID);
            setBookings(filteredData);
        };
        getBookedDates();
    }, []);

    const handleCancel = async (bookingId) => {
        const response = await fetch(`https://backend.tenisopartneris.lt/v1/bookcourt/${bookingId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (data) {
            const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
            setBookings(updatedBookings);
        }
    };

    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: '80px' }}>
                <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ textAlign: 'center' }}>
                    Mano rezervacijos
                </Typography>
                <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            margin: '5px',
                            padding: '5px',
                            justifyContent: 'space-around',
                            borderBottom: '1px solid black',
                        }}
                    >
                        <Typography
                            variant={isMobile ? 'h5' : 'h4'}
                            sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}
                        >
                            Data
                        </Typography>
                        <Typography
                            variant={isMobile ? 'h5' : 'h4'}
                            sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}
                        >
                            Aik??tel??
                        </Typography>
                        <Typography
                            variant={isMobile ? 'h5' : 'h4'}
                            sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}
                        >
                            At??aukti
                        </Typography>
                    </Box>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    margin: '5px',
                                    padding: '5px',
                                    justifyContent: 'space-around',
                                    borderBottom: '1px solid lightgray',
                                }}
                            >
                                <Typography
                                    variant={isMobile ? 'body1' : 'h5'}
                                    sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}
                                >
                                    {booking.date}
                                </Typography>
                                <Typography
                                    variant={isMobile ? 'body1' : 'h5'}
                                    sx={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    {booking.courtId} aik??tel??
                                </Typography>
                                <Box sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
                                    <StyledButton onClick={() => handleCancel(booking.id)}>AT??AUKTI</StyledButton>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography variant={isMobile ? 'h5' : 'h4'}>J??s neturite aktyvi?? rezervacij??</Typography>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default MyReservations;
