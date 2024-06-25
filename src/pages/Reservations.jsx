import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import FirstCourt from '../components/FirstCourt';
import SecondCourt from '../components/SecondCourt';
import moment from 'moment';

const Reservations = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const user = JSON.parse(localStorage.getItem('user'));
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedUser, setBlockedUser] = useState(false);
  const [blockEndTime, setBlockEndTime] = useState('');

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      const response = await fetch('https://backend.tenisopartneris.lt/v1/blocked-users');
      const data = await response.json();
      setBlockedUsers(data);
    };
    fetchBlockedUsers();
  }, []);

  useEffect(() => {
    if (user) {
      // Filter blockedUsers for the current user
      const userBlockedRecords = blockedUsers.filter((blockedUser) => blockedUser.userId === user.userID);

      // Sort by addedAt date to find the newest row
      const sortedUserBlockedRecords = userBlockedRecords.sort((a, b) => moment(b.addedAt).diff(moment(a.addedAt)));

      // Check the count to determine the duration to add
      const blockDuration = userBlockedRecords.length === 1 ? 28 : userBlockedRecords.length === 2 ? 60 : 365;

      // Process only the newest record
      if (sortedUserBlockedRecords.length > 0) {
        const newestBlockedUser = sortedUserBlockedRecords[0];
        const blockEndTime = moment(newestBlockedUser.addedAt).add(blockDuration, 'days');
        const currentTime = moment();

        if (blockEndTime > currentTime) {
          setBlockedUser(true);
          setBlockEndTime(blockEndTime.format('YYYY-MM-DD HH:mm:ss'));
        } else {
          setBlockedUser(false);
        }
      }
    }
  }, [user, blockedUsers]);

  return (
    <Container sx={{ marginTop: '80px', minHeight: '90vh' }}>
      <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ textAlign: 'center' }}>
        Teniso aikštelių rezervacijos
      </Typography>
      {blockedUser && (
        <Typography variant='h6' sx={{ textAlign: 'center', marginTop: '20px' }}>
          Dėl taisyklių pažeidimo rezervacijos užblokuotos iki {blockEndTime}
        </Typography>
      )}
      {!blockedUser && (
        <Box
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <FirstCourt />
          <SecondCourt />
        </Box>
      )}
    </Container>
  );
};

export default Reservations;
