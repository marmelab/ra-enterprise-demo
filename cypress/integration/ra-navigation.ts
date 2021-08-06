import { signIn, startTour, waitForStepAndGoToNext } from '../support/commands';

describe('Tours', () => {
    it('Runs the ra-navigation tour correctly', () => {
        signIn();
        startTour('ra-navigation: Breadcrumb');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext("Let's edit one of these posters.");
        waitForStepAndGoToNext(
            'The breadcrumb has changed to follow us to this Edit page.'
        );
        waitForStepAndGoToNext(
            "Let's try to navigate away using the Menu entry."
        );
        waitForStepAndGoToNext(
            'The breadcrumb keeps showing our exact location.'
        );
        waitForStepAndGoToNext(
            "Users can click on the breadcrumb items directly to navigate. Let's go to the home page."
        );
        waitForStepAndGoToNext(
            "By default, there is no breacrumb displayed on the home page. Now it's your turn to use the Breadcrumb component to build you own breadcrumb path!",
            'Last'
        );
    });
});
