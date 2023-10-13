import { LocksDataProvider } from '@react-admin/ra-realtime';
import { TourType } from '@react-admin/ra-tour';
import { fireEvent, screen } from '@testing-library/react';
import { endOfYesterday, addHours } from 'date-fns';
import { QueryClient } from 'react-query';
import randomCommandBuilder from './randomCommandBuilder';
import { generateIdentity } from './randomLockBuilder';

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const interval = (
    callback: () => void,
    intervalMs: number,
    expirationMs: number
) =>
    new Promise(resolve => {
        const intervalRef = setInterval(callback, intervalMs);
        setTimeout(() => {
            clearInterval(intervalRef);
            resolve(undefined);
        }, expirationMs);
    });

let newCommandsIds: number[] = [];

const clearStorage = () => {
    Object.keys(localStorage).forEach(key => {
        if (key === 'username') return;
        localStorage.removeItem(key);
    });
};

const tours: { [id: string]: TourType } = {
    'ra-calendar': {
        before: async ({ redirect }) => {
            redirect('/stores');
            await timeout(1000);
        },
        steps: [
            {
                target: `.RaDatagrid-root`,
                content: 'tours.ra-calendar.intro',
                disableBeacon: true,
                after: async ({ target, redirect }) => {
                    redirect('/visits');
                    await timeout(1000);
                },
            },
            {
                target: '.RaList-main .MuiBox-root',
                content: 'tours.ra-calendar.fullcalendar',
            },
            {
                target: '.fc-toolbar-chunk .fc-button-group',
                content: 'tours.ra-calendar.prevnext',
            },
            {
                target: '.fc-today-button',
                content: 'tours.ra-calendar.today',
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                target: '.fc-toolbar-chunk:nth-of-type(3) .fc-button-group',
                content: 'tours.ra-calendar.switchview',
                after: ({ target }) => {
                    // Click the Week button
                    target.querySelector('.fc-button:nth-of-type(2)').click();
                    // Also click the Today button, to make sure we are in the current week
                    // and not in the first week of the month
                    document
                        .querySelector<HTMLButtonElement>('.fc-today-button')
                        ?.click();
                },
            },
            {
                target: '.fc-event',
                content: 'tours.ra-calendar.firstevent',
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                target: "[role='dialog']",
                joyrideProps: {
                    styles: {
                        options: {
                            zIndex: 9999,
                        },
                    },
                },
                content: 'tours.ra-calendar.eventedit',
                after: async ({ target }) => {
                    fireEvent.mouseDown(
                        await screen.findByLabelText(/Color|Couleur/)
                    );
                    fireEvent.click(await screen.findByText('#189ab4'));
                    await timeout(1000);
                    // Click the Save button
                    target.querySelector("button[type='submit']").click();
                    await timeout(1000);
                },
            },
            {
                target: '.RaCreateButton-root',
                content: 'tours.ra-calendar.createbutton',
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                target: "[role='dialog']",
                joyrideProps: {
                    styles: {
                        options: {
                            zIndex: 9999,
                        },
                    },
                },
                content: 'tours.ra-calendar.eventcreate',
                after: async ({ target }) => {
                    fireEvent.mouseDown(
                        await screen.findByLabelText(/Store \*|Magasin \*/)
                    );
                    fireEvent.click(await screen.findByText('Dijon'));
                    const start = new Date();
                    const end = addHours(start, 2);
                    fireEvent.change(await screen.findByTestId('start-input'), {
                        target: {
                            value: start.toISOString().replace('Z', ''),
                        },
                    });
                    fireEvent.change(await screen.findByTestId('end-input'), {
                        target: { value: end.toISOString().replace('Z', '') },
                    });
                    fireEvent.change(
                        await screen.findByTestId('interval-input'),
                        {
                            target: { value: '2' },
                        }
                    );
                    fireEvent.change(await screen.findByTestId('freq-input'), {
                        target: { value: 'weekly' },
                    });
                    fireEvent.change(await screen.findByTestId('count-input'), {
                        target: { value: '4' },
                    });
                    fireEvent.mouseDown(
                        await screen.findByLabelText(/Color|Couleur/)
                    );
                    fireEvent.click(await screen.findByText('#d6ad60'));
                    await timeout(1000);
                    // Click the Save button
                    target.querySelector("button[type='submit']").click();
                    await timeout(1000);
                },
            },
            {
                target: '.RaList-main .MuiBox-root',
                content: 'tours.ra-calendar.eventcreated',
            },
            {
                target: '.RaList-main .MuiBox-root',
                content: 'tours.ra-calendar.conclusion',
            },
        ],
    },
    'ra-markdown': {
        before: async ({ redirect }) => {
            clearStorage(); // clear the storage to avoid other tours changed to alter this tour
            redirect('/products');
            await timeout(1000); // would be so awesome if redirect was awaitable!
        },
        steps: [
            {
                target: `[data-tour-id='grid-line'] > a:nth-child(1)`,
                disableBeacon: true,
                content: 'tours.ra-markdown.intro',
                joyrideProps: {
                    styles: {
                        beacon: {
                            marginTop: -100,
                        },
                    },
                },
                after: async ({ target, redirect }) => {
                    target.click();
                    await screen.findAllByText('Description');
                },
            },
            {
                target: "[data-tour-id='description-tab']",
                content: 'tours.ra-markdown.editor_location',
                after: async ({ target }) => {
                    target.children[0] && target.children[0].click();
                    await screen.findByLabelText('Headings');
                    await new Promise(resolve => setTimeout(resolve, 500));
                },
            },
            {
                target: '.toastui-editor-main-container',
                content: 'tours.ra-markdown.editor',
            },
            {
                target: '.toastui-editor-mode-switch .tab-item.active',
                content: 'tours.ra-markdown.wysiwyg',
            },
            {
                target: '.toastui-editor-mode-switch .tab-item',
                content: 'tours.ra-markdown.raw',
            },
            {
                target: '[data-testid=product-edit-preview]',
                content: 'tours.ra-markdown.show',
            },
        ],
    },
    'ra-preferences': {
        before: async () => {
            clearStorage(); // clear the storage to avoid other tours changed to alter this tour
        },
        steps: [
            {
                target: "button[aria-label='Toggle Theme']",
                disableBeacon: true,
                content: 'tours.ra-preferences.intro',
            },
            {
                target: "button[aria-label='Toggle Theme'] + button",
                content: 'tours.ra-preferences.language_switcher',
                after: ({ redirect }) => {
                    const params = JSON.stringify({
                        last_seen_gte: endOfYesterday().toISOString(),
                        nb_commands_gte: 1,
                    });

                    redirect(
                        `/customers?filter=${encodeURIComponent(
                            params
                        )}&order=DESC&page=1&perPage=25&sort=last_seen`
                    );
                },
            },
            {
                target: "button[aria-label='Save current query...']",
                content: 'tours.ra-preferences.persisted_queries',
                after: async ({ target }) => {
                    target.click();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    const nameInput = document.querySelector(
                        'body > .MuiDialog-root #name'
                    );

                    if (!nameInput) {
                        return;
                    }

                    fireEvent.change(nameInput, {
                        target: { value: 'Today customers' },
                    });
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const saveButton: HTMLButtonElement | null =
                        document.querySelector(
                            'body > .MuiDialog-root button:nth-child(2)'
                        );
                    if (!saveButton) {
                        return;
                    }
                    fireEvent.click(saveButton);
                },
            },
            {
                target: '#persisted-queries ul',
                content: 'tours.ra-preferences.persisted_queries_result',
                after: ({ redirect }) => {
                    redirect('/customers');
                },
            },
            {
                target: 'button[aria-controls=user-preference-menu]',
                content: 'tours.ra-preferences.list_customization',
                disableBeacon: false,
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                target: '#user-preference-menu .MuiPaper-root',
                content: 'tours.ra-preferences.list_customization_columns',
                joyrideProps: {
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                },
                after: () => {
                    const menuOverlay: HTMLElement | null =
                        document.querySelector(
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
                content: 'tours.ra-preferences.hook',
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
            clearStorage(); // clear the storage to avoid other tours changed to alter this tour
            redirect('/categories/5');
            await timeout(1000); // would be so awesome if redirect was awaitable!
        },
        steps: [
            {
                target: '.rc-tree',
                content: 'tours.ra-tree.intro',
                disableBeacon: true,
            },
            {
                before: ({ target }) => {
                    interval(
                        () => {
                            const switcher = target.querySelector(
                                '.rc-tree-switcher.rc-tree-switcher_close'
                            );

                            if (switcher) {
                                switcher.click();
                            }
                        },
                        500,
                        4000
                    );
                },
                target: '.rc-tree',
                content: 'tours.ra-tree.infinite_levels',
                after: async ({ target }) => {
                    await interval(
                        () => {
                            const switcher = target
                                // not the first line or it collapses all the tree
                                .querySelector(
                                    '.rc-tree-treenode:not(:nth-child(1)) .rc-tree-switcher.rc-tree-switcher_open'
                                );

                            if (switcher) {
                                switcher.click();
                            }
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
                target: '[href="#/categories/create"]',
                content: 'tours.ra-tree.changes',
            },
        ],
    },
    'ra-realtime': {
        before: async () => {
            clearStorage(); // clear the storage to avoid other tours changed to alter this tour
            localStorage.setItem('batchLevel', '0');
        },
        steps: [
            {
                before: async ({ dataProvider }) => {
                    localStorage.setItem('batchLevel', '0');

                    [[1], [2], [3], [4]].reduce(
                        acc =>
                            acc.then(async () => {
                                const { data: customers } =
                                    await dataProvider.getList('customers', {
                                        filter: { has_ordered: true },
                                        pagination: { page: 1, perPage: 100 },
                                        sort: { field: 'id', order: 'ASC' },
                                    });
                                // Add a new Order
                                const { data: newCommand } =
                                    await dataProvider.create('commands', {
                                        data: randomCommandBuilder(
                                            1,
                                            customers
                                        ),
                                    });

                                newCommandsIds.push(newCommand.id);
                                // Then notify the Real-time dataProvider
                                const topic = 'resource/commands';
                                dataProvider.publish(topic, {
                                    type: 'created',
                                    payload: { ids: [newCommand.id] },
                                    date: new Date(),
                                });
                            }),
                        timeout(1)
                    );
                    await timeout(1500); // would be so awesome if redirect was awaitable!
                },
                target: '[data-testid="commands-menu"]',
                content: 'tours.ra-realtime.intro',
                disableBeacon: true,
                joyrideProps: {
                    hideBackButton: true,
                },
                after: async ({ redirect }) => {
                    localStorage.setItem('batchLevel', '1');
                    await timeout(500);
                    redirect('/commands');
                },
            },
            {
                target: '[data-testid=order-ordered-datagrid]',
                content: 'tours.ra-realtime.new_orders',
                joyrideProps: {
                    hideBackButton: true,
                },
            },
            {
                before: async ({ dataProvider }) => {
                    localStorage.setItem('batchLevel', '2');
                    const { data: customers } = await dataProvider.getList(
                        'customers',
                        {
                            filter: { has_ordered: true },
                            pagination: { page: 1, perPage: 100 },
                            sort: { field: 'id', order: 'ASC' },
                        }
                    );
                    // Add a new Order
                    const { data: newCommand1 } = await dataProvider.create(
                        'commands',
                        {
                            data: randomCommandBuilder(2, customers),
                        }
                    );
                    newCommandsIds.push(newCommand1.id);
                    const { data: newCommand2 } = await dataProvider.create(
                        'commands',
                        {
                            data: randomCommandBuilder(2, customers),
                        }
                    );
                    newCommandsIds.push(newCommand2.id);
                    // Then notify the Real-time dataProvider
                    const topic = 'resource/commands';
                    dataProvider.publish(topic, {
                        type: 'created',
                        payload: { ids: [newCommand1.id, newCommand2.id] },
                        date: new Date(),
                    });
                    await timeout(1000);
                },
                target: '[data-testid=order-ordered-datagrid]',
                content: 'tours.ra-realtime.newest',
                joyrideProps: {
                    hideBackButton: true,
                },
                after: async ({ dataProvider, redirect }) => {
                    // Generate a lock on Products #1, #2 and #5
                    await Promise.all(
                        [1, 2, 5].map(recordId => {
                            return (dataProvider as LocksDataProvider).lock(
                                'products',
                                {
                                    id: recordId,
                                    identity: generateIdentity(),
                                }
                            );
                        })
                    );

                    // Sort by id because the locked product has the id #0
                    redirect('/products?order=ASC&page=1&perPage=20&sort=id');
                },
            },
            {
                before: async ({ dataProvider, queryClient }) => {
                    await timeout(100);

                    // Unlock the Products #1 after a few seconds

                    const lockTile = global.document.querySelector(
                        '[data-productid="1"]'
                    );

                    if (lockTile instanceof HTMLElement) {
                        const recordId = parseInt(
                            lockTile.dataset.productid + '',
                            10
                        );

                        const identity = lockTile.dataset
                            .lockidentity as string;

                        setTimeout(() => {
                            (dataProvider as LocksDataProvider)
                                .unlock('products', {
                                    id: recordId,
                                    identity,
                                })
                                .then(() => {
                                    (queryClient as QueryClient).refetchQueries(
                                        ['products', 'getLocks']
                                    );
                                });
                        }, 4000);
                    }
                },
                target: '[data-testid=productlocktile]',
                content: 'tours.ra-realtime.locks',

                joyrideProps: {
                    hideBackButton: true,
                },
                after: async ({ dataProvider, queryClient, redirect }) => {
                    // Reset the locks on Products #2 and #5
                    // The lock on Procuct #1 has been deleted during the scenario
                    await Promise.all(
                        [2, 5].map(recordId => {
                            const lockTile = global.document.querySelector(
                                `[data-productid="${recordId}"]`
                            );
                            if (lockTile instanceof HTMLElement) {
                                const identity = lockTile.dataset
                                    .lockidentity as string;

                                return (dataProvider as LocksDataProvider)
                                    .unlock('products', {
                                        id: recordId,
                                        identity,
                                    })
                                    .then(() => {
                                        (
                                            queryClient as QueryClient
                                        ).refetchQueries([
                                            'products',
                                            'getLocks',
                                        ]);
                                    });
                            }
                            return Promise.resolve();
                        })
                    );
                    redirect('/tours');
                },
            },
            {
                target: '[data-testid=tourlist]',
                content: 'tours.ra-realtime.end',
                joyrideProps: {
                    hideBackButton: true,
                },
            },
        ],
        after: async ({ dataProvider, refresh }) => {
            localStorage.setItem('batchLevel', '0');
            // Reset new Orders
            // We have to delete them to avoid having them reappear if the tour is restarted
            await dataProvider.deleteMany('commands', {
                ids: newCommandsIds,
            });

            refresh();
            newCommandsIds = [];
        },
    },
    'ra-editable-datagrid': {
        before: async ({ redirect }) => {
            clearStorage(); // clear the storage to avoid other tours changed to alter this tour
            redirect('/stores');
            await timeout(1000); // would be so awesome if redirect was awaitable!
        },
        steps: [
            {
                target: '[data-testid="store-datagrid"] > tbody > tr:nth-child(3)',
                content: 'tours.ra-editable-datagrid.intro',
            },
            {
                before: ({ target }) => {
                    target.querySelector('td:nth-child(3)').click();
                },
                target: '[data-testid="store-datagrid"] > tbody > tr:nth-child(3)',
                content: 'tours.ra-editable-datagrid.edit',
                after: ({ target }) => {
                    fireEvent.change(target.querySelector('#address'), {
                        target: { value: '10 rue de Rivoli' },
                    });
                },
            },
            {
                target: '[data-testid="store-datagrid"] > tbody > tr:nth-child(3) button:first-child',
                content: 'tours.ra-editable-datagrid.save',
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                target: '[href="#/stores/create"]',
                content: 'tours.ra-editable-datagrid.create',
                after: ({ target }) => {
                    target.click();
                },
            },
            {
                after: ({ target }) => {
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
                target: '[data-testid="store-datagrid"] > tbody > tr:first-child',
                content: 'tours.ra-editable-datagrid.forms',
            },
            {
                target: '[data-testid="store-datagrid"] > tbody > tr:first-child button:first-child',
                content: 'tours.ra-editable-datagrid.create_save',
                after: ({ target }) => {
                    target.click();
                },
            },
        ],
    },
    'ra-navigation-breadcrumb': {
        before: async ({ redirect }) => {
            clearStorage(); // clear the storage to avoid other tours changed to alter this tour
            redirect('/products');
            await timeout(1000); // would be so awesome if redirect was awaitable!
        },
        steps: [
            {
                target: "[aria-label='Breadcrumb'] li:nth-child(3)",
                content: 'tours.ra-navigation-breadcrumb.intro',
                disableBeacon: true,
                joyrideProps: {
                    disableScrolling: true,
                },
            },
            {
                target: `[data-tour-id='grid-line'] > a:nth-child(${getRandomInt(
                    1,
                    5
                )})`,
                disableBeacon: true,
                content: 'tours.ra-navigation-breadcrumb.edit',
                after: ({ target, redirect }) => {
                    const productUrl = target.getAttribute('href').slice(1);
                    redirect(productUrl);
                },
            },
            {
                target: "[aria-label='Breadcrumb'] li:nth-child(4)",
                content: 'tours.ra-navigation-breadcrumb.sync',
                disableBeacon: true,
                joyrideProps: {
                    scrollOffset: 50,
                },
            },
            {
                target: '[data-testid="commands-menu"]',
                content: 'tours.ra-navigation-breadcrumb.navigate',
                disableBeacon: true,
                joyrideProps: {
                    disableScrolling: true,
                },
                after: ({ redirect }) => {
                    redirect('/commands');
                },
            },
            {
                target: "[aria-label='Breadcrumb'] ",
                disableBeacon: true,
                content: 'tours.ra-navigation-breadcrumb.sync2',
                joyrideProps: {
                    disableScrolling: true,
                },
            },
            {
                target: "[aria-label='Breadcrumb'] li:nth-child(1)",
                content: 'tours.ra-navigation-breadcrumb.clickable',
                disableBeacon: true,
                joyrideProps: {
                    disableScrolling: true,
                },
                after: ({ redirect }) => {
                    redirect('/');
                },
            },
            {
                target: '#main-content',
                content: 'tours.ra-navigation-breadcrumb.dashboard',
                disableBeacon: true,
                joyrideProps: {
                    disableScrolling: true,
                },
            },
        ],
    },
    'ra-search': {
        before: async () => {
            clearStorage(); // clear the storage to avoid other tours changed to alter this tour
            window.scrollTo(0, 0);
        },
        steps: [
            {
                disableBeacon: true,
                target: '[data-testid="search-button"]',
                content: 'tours.ra-search.button',
                after: ({ target }) => {
                    fireEvent.click(target);
                    return new Promise(resolve => setTimeout(resolve, 1000));
                },
            },
            {
                disableBeacon: true,
                target: '[data-testid="search"]',
                content: 'tours.ra-search.intro',
                after: ({ target }) => {
                    fireEvent.change(target.querySelector('input'), {
                        target: { value: 'B' },
                    });
                    return new Promise(resolve => setTimeout(resolve, 1000));
                },
            },
            {
                target: '[data-testid="search-panel"]',
                content: 'tours.ra-search.customize',
                after: ({ target }) => {
                    fireEvent.click(
                        target.querySelector('[data-testid="customer"]')
                    );
                },
            },
            {
                target: '#main-content',
                content: 'tours.ra-search.end',
                disableBeacon: true,
                joyrideProps: {
                    disableScrolling: true,
                },
            },
        ],
    },
};

export default tours;
