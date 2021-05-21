import '@testing-library/cypress/add-commands';

export const signIn = () => {
    cy.visit('http://localhost:3000/');
    cy.findByLabelText('Username').type('demo');
    cy.findByLabelText('Password').type('demo');
    cy.findByText('Sign in').click();
    cy.findByText('Jane Doe');
    cy.findByText('Welcome to the react-admin enterprise edition demo');
};
