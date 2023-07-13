import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Field, useField } from 'formik';
import Select from 'react-select';
import styled from 'styled-components';
import {
  Container,
  Button,
  TextField,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { getUser, TournamentLevel } from '../utils/helpers';
import Navbar from '../components/Navbar';

const StyledSelect = styled(Select)`
  width: 30%;
  margin: 0 0.5rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  text-indent: 0.5rem;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
  @media ((max-width: 1080px) and (min-width: 769px)) {
    width: 50%;
  }
`;

const TourRegister = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [tournaments, setTournaments] = useState();
  const [profile, setProfile] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const user = getUser();
    setProfile(user);
    // const tournaments = await getTournamentsListAsync();
    // setTournaments(tournaments);
    setLoaded(true);
  }, []);

  const onSubmitHandler = async (values) => {
    // await tournamentRegisterAsync(values);
    console.log(values);
    // setSubmitting(false);
    // setTimeout(() => {
    //     navigate('/');
    // }, 3500);
  };

  const FormSelect = ({ name, options, placeholder }) => {
    const [field, meta, helpers] = useField(name);
    return (
      <StyledSelect
        name={name}
        value={field.value}
        onChange={(option) => {
          helpers.setValue(option);
        }}
        options={options}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
      />
    );
  };

  const formik = useFormik({
    initialValues: {
      full_name: getUser().name,
      email: getUser().email,
      tournament_id: '',
      tournament_level: '',
      comment: '',
    },
    onSubmit: onSubmitHandler,
  });

  if (!loaded) {
    return '';
  } else {
    return (
      <Container sx={{ marginTop: '80px' }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{ textAlign: 'center', marginBottom: '50px' }}>
          Registracija į turnyrą
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name='full_name'
            id='full_name'
            label='Vardas, Pavardė'
            value={formik.values.full_name}
            variant='outlined'
            margin='normal'
            disabled
          />
          <TextField
            fullWidth
            name='email'
            id='email'
            label='El.paštas'
            value={formik.values.email}
            variant='outlined'
            margin='normal'
            disabled
          />
          {/* <S.SelectWrapper>
                                    <S.Label>Turnyras</S.Label>
                                    <FormSelect
                                        name="tournament_id"
                                        options={tournaments
                                            .filter((tournament) => tournament.isRegON === 1)
                                            .map(({ id, tournament_name }) => {
                                                return {
                                                    value: id,
                                                    label: tournament_name,
                                                };
                                            })}
                                        placeholder="Pasirinkite turnyrą"
                                    />
                                </S.SelectWrapper> */}
          <TextField
            id='tournament_level'
            name='tournament_level'
            label='Lygis (NTRP)'
            variant='outlined'
            margin='normal'
            value={formik.values.tournament_level}
            onChange={formik.handleChange}
            fullWidth
            select>
            {TournamentLevel.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            name='comment'
            id='comment'
            label='Komentaras'
            variant='outlined'
            margin='normal'
            multiline
            rows={4}
            value={formik.values.comment}
            onChange={formik.handleChange}
          />
          <Button type='submit'>REGISTRUOTIS</Button>
        </form>
      </Container>
    );
  }
};

export default TourRegister;
