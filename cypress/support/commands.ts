import '@testing-library/cypress/add-commands';

export const signIn = () => {
    cy.visit('http://localhost:3000/');
    cy.findByLabelText(/Username/).type('demo');
    cy.findByLabelText(/Password/).type('demo');
    cy.findByText('Sign in').click();
    cy.findByText('Welcome to the react-admin enterprise edition demo');
};

export const startTour = (tour: string) => {
    cy.findByText('Take the tour').click();
    cy.findByText(tour).click();
};

export const waitForStepAndGoToNext = (
    text?: string | RegExp,
    buttonLabel: 'Next' | 'Last' = 'Next',
    timeout = 10000
) => {
    if (text) {
        cy.findByText(text, { timeout });
    }

    cy.findByLabelText(buttonLabel).click();
};
