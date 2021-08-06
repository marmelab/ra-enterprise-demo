import { signIn, startTour, waitForStepAndGoToNext } from '../support/commands';

describe('Tours', () => {
    it('Runs the ra-tree tour correctly', () => {
        signIn();
        startTour('ra-tree');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext(
            'It supports expanding or collapsing nodes for an infinite amount of levels.'
        );
        // wait for expanding animations to complete
        cy.findByText('solid');
        waitForStepAndGoToNext(
            'You can even add a new category, or reorder them, try it!',
            'Last'
        );
        cy.window().then($win => {
            cy.stub($win, 'prompt').returns('New Node');
            cy.findByText('New Node', { timeout: 10000 });
        });
    });
});
