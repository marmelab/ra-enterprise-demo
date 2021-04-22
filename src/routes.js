import React from 'react';
import { Route } from 'react-router-dom';
import Segments from './segments/Segments';
import TourLauncher from './tours/TourLauncher';
import TourList from './tours/TourList';

export default [
    <Route key="segments" exact path="/segments" render={() => <Segments />} />,
    <Route key="tours" path="/tours" render={() => <TourList />} />,
    <Route
        key="tour-launcher"
        path="/tours/:tour"
        render={() => <TourLauncher />}
    />,
];
