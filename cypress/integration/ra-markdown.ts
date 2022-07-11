import { signIn, startTour, waitForStepAndGoToNext } from '../support/commands';

describe('Tours', () => {
    it('Runs the ra-markdown tour correctly', () => {
        signIn();
        startTour('ra-markdown');
        waitForStepAndGoToNext();
        cy.url().should('match', /.+\/products\/\d+/);
        cy.findAllByText('Description').should('have.length', 2);
        waitForStepAndGoToNext(
            'The markdown editor is in the description tab.'
        );
        waitForStepAndGoToNext(
            'Right here. Try playing with its markdown, make it bold, add headlines!'
        );
        waitForStepAndGoToNext('By default, you are in WYSIWYG mode.');
        waitForStepAndGoToNext(
            'But you can switch to raw markdown edition with this button.'
        );
        waitForStepAndGoToNext(
            'Parsed markdown can then be displayed in a preview or wherever you want.',
            'Last'
        );
    });
});
