import React from 'react';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import { SRLWrapper } from 'simple-react-lightbox';
import Navbar from '../components/Navbar';
import one from '../assets/images/gallery/1-min.jpg';
import two from '../assets/images/gallery/2-min.jpg';
import three from '../assets/images/gallery/3-min.jpg';
import four from '../assets/images/gallery/4-min.jpg';
import five from '../assets/images/gallery/5-min.jpg';
import six from '../assets/images/gallery/6-min.jpg';

const Gallery = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Container sx={{ marginTop: '80px' }}>
      <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ textAlign: 'center' }}>
        Nuotraukų galerija
      </Typography>
      <Box sx={{ marginTop: '40px', height: '500px', overflowY: 'auto' }}>
        <SRLWrapper>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Box component='div' sx={{ marginRight: '5px' }}>
              <img
                src={one}
                alt='1'
                width={240}
                height={240}
                style={{ objectFit: 'scale-down' }}
              />
            </Box>
            <Box component='div' sx={{ marginRight: '5px' }}>
              <img
                src={two}
                alt='2'
                width={240}
                height={240}
                style={{ objectFit: 'scale-down' }}
              />
            </Box>
            <Box component='div' sx={{ marginRight: '5px' }}>
              <img
                src={three}
                alt='3'
                width={240}
                height={240}
                style={{ objectFit: 'scale-down' }}
              />
            </Box>
            <Box component='div' sx={{ marginRight: '5px' }}>
              <img
                src={four}
                alt='4'
                width={240}
                height={240}
                style={{ objectFit: 'scale-down' }}
              />
            </Box>
            <Box component='div' sx={{ marginRight: '5px' }}>
              <img
                src={five}
                alt='5'
                width={240}
                height={240}
                style={{ objectFit: 'scale-down' }}
              />
            </Box>
            <Box component='div' sx={{ marginRight: '5px' }}>
              <img
                src={six}
                alt='6'
                width={240}
                height={240}
                style={{ objectFit: 'scale-down' }}
              />
            </Box>
          </Box>
        </SRLWrapper>
      </Box>
    </Container>
  );
};

export default Gallery;
