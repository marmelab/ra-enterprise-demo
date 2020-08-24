import React from 'react';
import { Route } from 'react-router-dom';
import Segments from './segments/Segments';

export default [
    <Route key="segments" exact path="/segments" render={() => <Segments />} />,
];
