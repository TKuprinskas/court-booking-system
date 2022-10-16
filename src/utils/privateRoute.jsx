import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { getUser } from './helpers';
import styled from 'styled-components';
import background from '../assets/images/background.jpg';

const StyledContainer = styled.div`
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledBox = styled(Box)`
    background-color: rgba(255, 255, 255, 0.5);
    padding: 20px;
    border-radius: 10px;

    @media (max-width: 600px) {
        padding: 10px;
        width: 90%;
        margin: 0 auto;
    }
`;

const StyledButton = styled(Box)`
    background-color: #3b5998;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 15%;
    margin: 1rem auto 0 auto;
    border: none;
    &:hover {
        background-color: #2d4373;
    }

    @media (max-width: 600px) {
        width: 50%;
    }
`;

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [hasLoaded, setHasLoaded] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const user = getUser();
        if (user) {
            setToken(user.accessToken);
            setHasLoaded(true);
        }
    }, []);

    const onClickHandler = () => {
        navigate('/');
    };

    if (!token) {
        return (
            <StyledContainer>
                <StyledBox sx={{ textAlign: 'center' }}>
                    <Typography variant={isMobile ? 'h5' : 'h4'}>
                        Norėdami atlikti rezervaciją ar tvarkyti savo turimas rezervacijas, turite prisijungti
                    </Typography>
                    <StyledButton onClick={onClickHandler}>PRISIJUNGIMAS</StyledButton>
                </StyledBox>
            </StyledContainer>
        );
    } else if (hasLoaded) {
        return <>{children}</>;
    } else {
        return <div>Loading...</div>;
    }
};

export default PrivateRoute;
