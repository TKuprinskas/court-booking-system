import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { getUser } from '../utils/helpers';
import Navbar from '../components/Navbar';
import background from '../assets/images/background.jpg';
import styled from 'styled-components';

const StyledContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
`;

const StyledBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 10px;
    width: 90%;
    margin: 0 auto;
  }
`;

const StyledBoxButton = styled(Box)`
  background-color: #3b5998;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  width: 20%;
  align-self: center;
  border: none;
  &:hover {
    background-color: #2d4373;
  }

  @media (max-width: 600px) {
    width: 40%;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [logOut, setLogOut] = useState('ATSIJUNGTI');

  useEffect(() => {
    const user = getUser();
    if (user.accessToken) {
      setLogin(true);
      setData(user);
      setPicture(user.picture.data.url);
    }
  }, []);

  const handleLogOut = () => {
    setLogOut('ATSIJUNGIAMA...');
    setTimeout(() => {
      localStorage.removeItem('user');
      setLogin(false);
      setData({});
      setPicture('');
      window.location.reload();
    }, 1500);
  };

  const responseFacebook = (response) => {
    setData(response);
    setPicture(response.picture.data.url);
    window.localStorage.setItem('user', JSON.stringify(response));
    if (response.accessToken) {
      setLogin(true);
      navigate('/rezervacijos');
    } else {
      setLogin(false);
    }
  };

  return (
    <StyledContainer>
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        {!login && (
          <StyledBox>
            <FacebookLogin
              appId='512677813681670' // test app id 1154706082139619 // prod app id 512677813681670
              autoLoad={false}
              fields='name,email,picture'
              scope='public_profile,email'
              callback={responseFacebook}
              icon='fa-facebook'
              disableMobileRedirect={true}
            />
          </StyledBox>
        )}

        {login && (
          <StyledBox>
            <Typography variant={isMobile ? 'h5' : 'h3'}>
              Jūs esate prisijungęs kaip, {data.name}!
            </Typography>
            <Box
              component='img'
              sx={{
                height: 50,
                width: 50,
                marginTop: 2,
                alignSelf: 'center',
                borderRadius: '50%',
              }}
              alt='facebook profile picture'
              src={picture}
            />
            <StyledBoxButton component='button' onClick={handleLogOut}>
              {logOut}
            </StyledBoxButton>
          </StyledBox>
        )}
      </Box>
    </StyledContainer>
  );
};

export default Home;
