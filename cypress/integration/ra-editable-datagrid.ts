import { signIn, startTour, waitForStepAndGoToNext } from '../support/commands';

describe('Tours', () => {
    it('Runs the ra-editable-datagrid tour correctly', () => {
        signIn();
        startTour('ra-editable-datagrid');
        cy.findAllByLabelText('Open the dialog').click();
        waitForStepAndGoToNext();
        waitForStepAndGoToNext(
            "You can edit a record without leaving the Datagrid! Let's change the address."
        );
        waitForStepAndGoToNext(
            'After edition, just click on the Save button in the row.'
        );
        waitForStepAndGoToNext(
            'The Editable Datagrid also supports inline creation.'
        );
        waitForStepAndGoToNext(
            'A row edition / creation form can contain Inputs of any type (text, date, number, etc.).'
        );
        waitForStepAndGoToNext(
            'Click on the Save button to submit the form and create a new record.',
            'Last'
        );
    });
});
