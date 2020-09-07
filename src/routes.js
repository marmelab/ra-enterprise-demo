import React from 'react';
import { Route } from 'react-router-dom';
import Segments from './segments/Segments';
import TourLauncher from './tours/TourLauncher';

export default [
    <Route key="segments" exact path="/segments" render={() => <Segments />} />,
    <Route
        key="tour-launcher"
        path="/tours/:tour"
        render={() => <TourLauncher />}
    />,
];
