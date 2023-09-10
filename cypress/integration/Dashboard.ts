import { signIn } from '../support/commands';

describe('Dashboard', () => {
    it('Displays', () => {
        signIn();

        cy.findByText('Monthly Revenue')
            // Targets the container
            .parent()
            // Can check the exact value as the data is generated
            .contains(/\d+/);

        cy.findByText('New Orders')
            // Targets the container
            .parent()
            // Can check the exact value as the data is generated
            .contains(/\d+/);
        cy.findByText('30 Day Revenue History');

        cy.findByText('Pending Orders')
            // Targets the container
            .parent()
            .parent()
            .parent()
            // We can only check there are links in it as the data is generated
            .find('a')
            .should('have.length.above', 0);

        /* TODO: restore
        cy.findByText('Timeline')
            // Targets the container
            .parent()
            .parent()
            .parent()
            // We can only check there are links in it as the data is generated
            .find('a')
            .should('have.length.above', 0);
        */
        cy.findByLabelText('Profile').click();
        cy.findByText('Français').click();
        cy.findByText(
            'Bienvenue sur la démo de react-admin enterprise edition'
        );
        cy.findByText('CA à 30 jours');
        cy.findByText('Nouvelles commandes');
        cy.findByText("Chiffre d'affaire sur 30 jours");
        cy.findByText('Commandes à traiter');
    });
});
