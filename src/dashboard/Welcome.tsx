import * as React from 'react';
import {
    Badge,
    Box,
    Card,
    CardActions,
    Button,
    Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import FlagIcon from '@mui/icons-material/Flag';
import { useTranslate } from 'react-admin';

import publishArticleImage from './welcome_illustration.svg';
import { Link } from 'react-router-dom';
import { useTourStates } from '../tours/useTourState';

const Welcome = () => {
    const translate = useTranslate();
    const [tourStates] = useTourStates();
    let numberOfTours = 0;
    if (tourStates) {
        numberOfTours = Object.keys(tourStates).reduce((acc, tourId) => {
            if (!tourStates[tourId]) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }

    return (
        <Card
            sx={{
                background: theme =>
                    `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 50%, ${theme.palette.primary.dark} 100%)`,
                color: theme => theme.palette.primary.contrastText,
                padding: '20px',
            }}
        >
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {translate('pos.dashboard.welcome.title')}
                    </Typography>
                    <Box maxWidth="40em">
                        <Typography variant="body1" component="p" gutterBottom>
                            {translate('pos.dashboard.welcome.subtitle')}
                        </Typography>
                    </Box>
                    <CardActions
                        sx={{
                            px: 0,
                            flexWrap: 'wrap',
                            gap: 2,
                        }}
                    >
                        <Badge badgeContent={numberOfTours} color="error">
                            <Button
                                variant="contained"
                                component={Link}
                                to="/tours"
                                startIcon={<FlagIcon />}
                            >
                                {translate('pos.dashboard.welcome.tour_button')}
                            </Button>
                        </Badge>
                        <Button
                            variant="contained"
                            href="https://marmelab.com/ra-enterprise"
                            startIcon={<HomeIcon />}
                        >
                            {translate('pos.dashboard.welcome.ra_button')}
                        </Button>
                        <Button
                            variant="contained"
                            href="https://github.com/marmelab/ra-enterprise-demo"
                            startIcon={<CodeIcon />}
                        >
                            {translate('pos.dashboard.welcome.github_button')}
                        </Button>
                    </CardActions>
                </Box>
                <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    sx={{
                        background: `url(${publishArticleImage}) top right / cover`,
                        marginLeft: 'auto',
                        alignSelf: 'center',
                    }}
                    width="16em"
                    height="9em"
                    overflow="hidden"
                />
            </Box>
        </Card>
    );
};

export default Welcome;
