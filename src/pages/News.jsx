import React from 'react';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import { NewsCard } from '../components/Card';
import one from '../assets/images/gallery/4-min.jpg';
import two from '../assets/images/gallery/3-min.jpg';
import three from '../assets/images/gallery/5-min.jpg';

const News = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Container sx={{ marginTop: '80px' }}>
      <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ textAlign: 'center' }}>
        Naujienos
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '50px',
        }}>
        <NewsCard
          maxWidth={isMobile ? '100%' : '50%'}
          height={140}
          imgSrc={one}
          alt='1'
          title='Naujiena 1'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl.'
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}>
        <NewsCard
          maxWidth={isMobile ? '100%' : '50%'}
          height={140}
          imgSrc={two}
          alt='1'
          title='Naujiena 2'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl.'
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '20px',
        }}>
        <NewsCard
          maxWidth={isMobile ? '100%' : '50%'}
          height={140}
          imgSrc={three}
          alt='1'
          title='Naujiena 3'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nisl sit amet nisl.'
        />
      </Box>
    </Container>
  );
};

export default News;
