import { signIn } from '../support/commands';

describe('Tours', () => {
    const startTour = (tour: string) => {
        cy.findByLabelText('Tours').click();
        cy.findByText(tour).click();
    };

    const waitForStepAndGoToNext = (
        text?: string | RegExp,
        buttonLabel: 'Next' | 'Last' = 'Next'
    ) => {
        if (text) {
            cy.findByText(text);
        }
        cy.findByLabelText(buttonLabel).click();
    };

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
    it('Runs the ra-search tour correctly', () => {
        signIn();
        startTour('ra-search');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext(
            "You can customize the search results at will and redirect to any resource. For example, let's click on the first customer"
        );
        waitForStepAndGoToNext(
            'The search query and results are preserved after navigation',
            'Last'
        );
    });
    it('Runs the ra-navigation tour correctly', () => {
        signIn();
        startTour('ra-navigation: Breadcrumb');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext("Let's edit one of these posters");
        waitForStepAndGoToNext(
            'The breadcrumb has changed to follow us to this Edit page'
        );
        waitForStepAndGoToNext(
            "Let's try to navigate away using the Menu entry"
        );
        waitForStepAndGoToNext(
            'The breadcrumb keeps showing our exact location.'
        );
        waitForStepAndGoToNext(
            "Users can click on the breadcrumb items directly to navigate. Let's go to the home page"
        );
        waitForStepAndGoToNext(
            "By default, there is no breacrumb displayed on the home page. Now it's your turn to use the Breadcrumb component to build you own breadcrumb path!",
            'Last'
        );
    });
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
    it('Runs the ra-editable-datagrid tour correctly', () => {
        signIn();
        startTour('ra-editable-datagrid');
        cy.findAllByLabelText('Open the dialog').click();
        waitForStepAndGoToNext();
        waitForStepAndGoToNext(
            "You can edit a record without leaving the Datagrid! Let's change the address."
        );
        waitForStepAndGoToNext(
            'After edition, just click on the Save button in the row'
        );
        waitForStepAndGoToNext(
            'The Editable Datagrid also supports inline creation'
        );
        waitForStepAndGoToNext(
            'A row edition / creation form can contain Inputs of any type (text, date, number, etc.).'
        );
        waitForStepAndGoToNext(
            'Click on the Save button to submit the form and create a new record.',
            'Last'
        );
    });
    it('Runs the ra-tree tour correctly', () => {
        signIn();
        startTour('ra-tree');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext(
            'It supports expanding or collapsing nodes for an infinite amount of levels'
        );
        waitForStepAndGoToNext(
            'You can even add a new category, or reorder them, try it!',
            'Last'
        );
        cy.window().then($win => {
            cy.stub($win, 'prompt').returns('New Node');
            cy.findByText('New Node', { timeout: 10000 });
        });
    });
    it('Runs the ra-markdown tour correctly', () => {
        signIn();
        startTour('ra-markdown');
        waitForStepAndGoToNext();
        waitForStepAndGoToNext('The markdown editor is in the description tab');
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
