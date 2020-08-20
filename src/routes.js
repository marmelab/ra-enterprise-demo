import React from 'react';
import { Route } from 'react-router-dom';
import Segments from './segments/Segments';

export default [
    <Route exact path="/segments" render={() => <Segments />} />,
];
