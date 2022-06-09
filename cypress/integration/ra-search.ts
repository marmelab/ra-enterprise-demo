import { signIn, startTour, waitForStepAndGoToNext } from '../support/commands';

describe('Tours', () => {
    it('Runs the ra-search tour correctly', () => {
        signIn();
        startTour('ra-search');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext(
            "You can customize the search results at will and redirect to any resource. For example, let's click on the first customer."
        );
        waitForStepAndGoToNext(
            'The search query and results are preserved after navigation.',
            'Last'
        );
    });
});
