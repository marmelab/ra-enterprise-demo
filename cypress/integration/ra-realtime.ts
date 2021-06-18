import { signIn, startTour, waitForStepAndGoToNext } from '../support/commands';

describe('Tours', () => {
    it('Runs the ra-realtime tour correctly', () => {
        signIn();
        startTour('ra-realtime');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext('Your new orders can stand-out from others');
        cy.findByText(/List refreshed with \d order created by another user/);
        waitForStepAndGoToNext(
            "And newest orders even appear while you're on the page"
        );
        waitForStepAndGoToNext(
            'You can lock resources in realtime (this one will be unlocked in a few seconds)',
            'Last'
        );
    });
});
