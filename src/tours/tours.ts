import { TourType } from '@react-admin/ra-tour';
import { fireEvent } from '@testing-library/react';

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
const interval = (callback, intervalMs, expirationMs) =>
    new Promise(resolve => {
        const intervalRef = setInterval(callback, intervalMs);
        setTimeout(() => {
            clearInterval(intervalRef);
            resolve();
        }, expirationMs);
    });

const tours: { [id: string]: TourType } = {
    'ra-markdown': {
        before: async ({ notify, redirect }) => {
            notify('Taking you to the product page');
            redirect('/products');
            await timeout(1000); // would be so awesome if redirect was awaitable!
        },
        steps: [
            {
                target: `[data-tour-id='grid-line']:nth-child(${getRandomInt(
                    1,
                    5
                )})`,
                event: 'hover',
                content:
                    "This is a poster, one of the products our shop is selling, let's go to its details",
                joyrideProps: {
                    styles: {
                        beacon: {
                            marginTop: -100,
                        },
                    },
                },
                after: ({ target, redirect }) => {
                    const productUrl = target.getAttribute('href').slice(1);
                    redirect(productUrl);
                },
            },
            {
                target: "[data-tour-id='description-tab']",
                content: 'The markdown editor is in the description tab',
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                target: '.rc-md-editor ',
                content:
                    'Right here. Try playing with its markdown, make it bold, add headlines!',
            },
            {
                target: '[data-testid=product-edit-preview]',
                content:
                    'Parsed markdown can then be displayed in a preview or wherever you want.',
            },
        ],
    },
    'ra-preferences': {
        steps: [
            {
                target: "button[aria-label='Toggle Theme']",
                disableBeacon: true,
                content:
                    'ra-preferences comes with a lot of built-in modules, like this theme switcher. Try it: it works!',
            },
            {
                target: "button[aria-label='Toggle Theme'] + button",
                content: 'Or this language switcher...',
                after: ({ redirect }) => {
                    redirect('/customers');
                },
            },
            {
                target: 'button[aria-controls=user-preference-menu]',
                content:
                    'Even more advanced ones like this list customization tool.',
                disableBeacon: false,
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                target: '#user-preference-menu .MuiPaper-root',
                content:
                    'Where you can select how you want the list to be displayed, or the information you want to see.',
                joyrideProps: {
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                },
                after: () => {
                    const menuOverlay: HTMLElement | null = document.querySelector(
                        'body > .MuiPopover-root div[aria-hidden=true]'
                    );
                    if (!menuOverlay) {
                        return;
                    }
                    menuOverlay.click();
                },
            },
            {
                before: ({ setTourPreferences, state }) => {
                    setTourPreferences(state);
                },
                target: 'body',
                content:
                    'It exposes simple hooks so that you can actually save whatever you want, too. For instance, the state of this particular step. Try to reload the page!',
                joyrideProps: {
                    styles: {
                        options: {
                            arrowColor: 'transparent',
                        },
                    },
                },
                after: ({ setTourPreferences }) => {
                    setTourPreferences({});
                },
            },
        ],
    },
    'ra-tree': {
        before: async ({ redirect }) => {
            redirect('/categories/5');
            await timeout(1000); // would be so awesome if redirect was awaitable!
        },
        steps: [
            {
                target: '.rc-tree',
                content:
                    'ra-tree helps handling trees with ease, no matter the data structure you use on the backend',
                disableBeacon: true,
            },
            {
                before: ({ target }) => {
                    interval(
                        () => {
                            target
                                .querySelector(
                                    '.rc-tree-switcher.rc-tree-switcher_close'
                                )
                                .click();
                        },
                        500,
                        4000
                    );
                },
                target: '.rc-tree',
                content:
                    'It supports expanding or collapsing nodes for an infinite amount of levels',
                after: async ({ target }) => {
                    await interval(
                        () => {
                            target
                                // not the first line or it collapses all the tree
                                .querySelector(
                                    '.rc-tree-treenode:not(:nth-child(1)) .rc-tree-switcher.rc-tree-switcher_open'
                                )
                                .click();
                        },
                        500,
                        2000
                    );
                },
            },
            {
                before: ({ redirect }) => {
                    setTimeout(() => {
                        redirect('/categories/create');
                    }, 4000);
                },
                target: '[aria-label="Add root"]',
                content:
                    'You can even add a new category, or reorder them, try it!',
            },
        ],
    },
    'ra-realtime': {
        before: async () => {
            localStorage.setItem('batchLevel', '0');
        },
        steps: [
            {
                before: async ({ dataProvider }) => {
                    localStorage.setItem('batchLevel', '0');

                    await timeout(300);

                    [[1], [2, 3], [4], [5, 6]].reduce(
                        (acc, ids) =>
                            acc
                                .then(() =>
                                    dataProvider.publish('resource/commands', {
                                        type: 'created',
                                        topic: 'resource/commands',
                                        payload: { ids },
                                        date: new Date(),
                                    })
                                )
                                .then(() => timeout(300)),
                        timeout(1000)
                    );
                },
                disableBeacon: true,
                target: '[data-testid="commands-menu"]',
                content: "Seems like you just had new orders, let's check...",
                after: ({ redirect }) => {
                    redirect('/commands');
                },
            },
            {
                before: () => {
                    localStorage.setItem('batchLevel', '1');
                },
                target: '[data-testid=order-ordered-datagrid]',
                content: 'Your new orders can stand-out from others',
            },
            {
                before: ({ dataProvider }) => {
                    localStorage.setItem('batchLevel', '2');
                    dataProvider.publish('resource/commands', {
                        type: 'created',
                        topic: 'resource/commands',
                        payload: { ids: [6, 7, 8, 9] },
                        date: new Date(),
                    });
                },
                target: '[data-testid=order-ordered-datagrid]',
                content:
                    "And newest orders even appear while you're on the page",
                after: () => {
                    localStorage.setItem('batchLevel', '0');
                },
            },
        ],
    },
    'ra-editable-datagrid': {
        before: async ({ redirect }) => {
            redirect('/stores');
            await timeout(1000); // would be so awesome if redirect was awaitable!
        },
        steps: [
            {
                target:
                    '[data-testid="store-datagrid"] > tbody > tr:first-child',
                content:
                    "Hovering on a row shows a toolbar allowing to either edit or delete the record. Let's see what happens when editing a row by clicking on the Edit button (or by directly clicking inside the row)",
            },
            {
                before: ({ target }) => {
                    target.querySelector('td:nth-child(2)').click();
                },
                target:
                    '[data-testid="store-datagrid"] > tbody > tr:first-child',
                content:
                    "You can edit a record without leaving the Datagrid! Let's change the address.",
                after: ({ target }) => {
                    fireEvent.change(target.querySelector('#address'), {
                        target: { value: '10 rue de Rivoli' },
                    });
                },
            },
            {
                target:
                    '[data-testid="store-datagrid"] > tbody > tr:first-child button:first-child',
                content:
                    'After edition, just click on the Save button in the row',
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                target: '[aria-label="Create"]',
                content: 'The Editable Datagrid also supports inline creation',
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                before: ({ target }) => {
                    fireEvent.change(target.querySelector('#city'), {
                        target: { value: 'Nantes' },
                    });
                    fireEvent.change(target.querySelector('#country'), {
                        target: { value: 'France' },
                    });
                    fireEvent.change(target.querySelector('#address'), {
                        target: { value: '5 rue du château' },
                    });
                    fireEvent.change(target.querySelector('#created_at'), {
                        target: { value: '2020-08-04' },
                    });
                },
                target:
                    '[data-testid="store-datagrid"] > tbody > tr:first-child',
                content:
                    'A row edition / creation form can contain Inputs of any type (text, date, number, etc.).',
            },
            {
                target:
                    '[data-testid="store-datagrid"] > tbody > tr:first-child button:first-child',
                content:
                    'Click on the Save button to submit the form and create a new record.',
                after: ({ target }) => {
                    target.click();
                },
            },
        ],
    },
};

export default tours;
