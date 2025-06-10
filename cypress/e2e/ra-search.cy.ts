import { signIn, startTour, waitForStepAndGoToNext } from '../support/commands';

describe('Tours', () => {
    it('Runs the ra-search tour correctly', () => {
        signIn();
        startTour('ra-search');
        waitForStepAndGoToNext(
            'This is the search button. It opens the search panel.'
        );
        waitForStepAndGoToNext(
            'The smart Omnisearch box allows users to search across all resources.'
        );
        waitForStepAndGoToNext(
            "You can customize the search results at will and redirect to any resource. For example, let's click on the first customer."
        );
    });
});
