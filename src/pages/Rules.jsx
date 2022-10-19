import React from 'react';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import rulesImg from '../assets/images/rules.webp';

const Rules = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: '80px' }}>
                <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ textAlign: 'center' }}>
                    Bendros lauko teniso kortų taisyklės
                </Typography>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="body1">
                        1. Teniso kortą galima rezervuoti 2 dienas į priekį įskaitant esamą.
                    </Typography>
                    <Typography variant="body1">2. Teniso kortą galima rezervuoti daugiausiai 2 valandoms.</Typography>
                    <Typography variant="body1">
                        3. Registracija vyksta nuo 8.00 iki 24.00 val. Šviesa gesinama 24.00 val. Tačiau teniso korte
                        galima žaisti visą parą.
                    </Typography>
                    <Typography variant="body1">
                        4. Jeigu planuojate neatvykti žaisti, būtina atšaukti rezervaciją bent 1 val. prieš žaidimą.
                        Jeigu nespėjate atšaukti bent 1val. iki žaidimo pradžios, tai atšaukite, kai tik galėsite,
                        kadangi Jūsų rezervaciją gali išnaudoti kiti asmenys. Kitu atveju gali būti apribotas Jūsų
                        žaidimas kortuose.
                    </Typography>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ textAlign: 'center', marginBottom: '10px' }}>
                        Pastabos
                    </Typography>
                    <Typography variant="body1">
                        1. Būkite atsargūs sportuodami ant šlapios dangos, nes po lietaus danga būna labai slidi!
                    </Typography>
                    <Typography variant="body1">
                        2. Būtinai turite rezervuoti teniso kortą prieš žaidimą. Atkreipkite dėmesį, kad korto
                        rezervacija nesikirstų su kitomis rezervacijomis!
                    </Typography>
                    <Typography variant="body1">
                        3. Nelaužyti ir negadinti teniso kortų inventoriaus. Pamatę niokojant teniso kortus –
                        sudrausminkite asmenį ir praneškite apie tai Facebook grupės administracijai.
                    </Typography>
                    <Typography variant="body1">
                        4. Jeigu atvykę į kortus pastebėjote, kad buvo padaryta žala kortams, apie tai praneškite
                        Facebook grupės administracijai!
                    </Typography>
                    <Typography variant="body1">5. Nevartokite necenzūrinių žodžių ir nekelkite triukšmo.</Typography>
                    <Typography variant="body1">
                        6. Už saugumą ir paliktus asmeninius daiktus atsakote patys.
                    </Typography>
                    <Typography variant="body1">
                        7. Nesilaikantys sutartų taisyklių bus šalinami iš grupės ir žaisti aikštelėje –negalės!
                    </Typography>
                </Box>
                <Box
                    component="img"
                    sx={{
                        height: isMobile ? '100%' : 372,
                        width: isMobile ? '100%' : 560,
                        borderRadius: '10px',
                        display: 'block',
                        margin: '1rem auto',
                    }}
                    alt="facebook profile picture"
                    src={rulesImg}
                />
            </Container>
        </>
    );
};

export default Rules;
