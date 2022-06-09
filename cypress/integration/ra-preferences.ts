import { signIn, startTour, waitForStepAndGoToNext } from '../support/commands';

describe('Tours', () => {
    it('Runs the ra-preferences tour correctly', () => {
        signIn();
        startTour('ra-preferences');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext('Or this language switcher...');
        waitForStepAndGoToNext(
            "It features persisted queries too. For example, let's persist the filters for today visitors who actually ordered something."
        );
        waitForStepAndGoToNext("It's persisted locally in the browser now!");
        waitForStepAndGoToNext(
            'It even has more advanced components like this list customization tool.'
        );
        waitForStepAndGoToNext(
            'Where you can select how you want the list to be displayed, or the information you want to see.'
        );
        waitForStepAndGoToNext(
            'It exposes simple hooks so that you can actually save whatever you want, too. For instance, the state of this particular step. Try to reload the page!',
            'Last'
        );
    });
});
