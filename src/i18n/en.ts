import {
    mergeTranslations,
    TranslationMessages as BaseTranslationMessages,
} from 'react-admin';
import englishMessages from 'ra-language-english';
import { RaTreeTranslationMessages } from '@react-admin/ra-tree';
import { raAuditLogLanguageEnglish } from '@react-admin/ra-audit-log';

export interface TranslationMessages
    extends RaTreeTranslationMessages,
        BaseTranslationMessages {}

const customEnglishMessages: TranslationMessages = mergeTranslations(
    englishMessages,
    raAuditLogLanguageEnglish,
    {
        'ra-tree': {
            action: {
                add_root: 'Add a category of products',
            },
        },
        'ra-search': {
            result: `1 result |||| %{smart_count} results`,
        },
        'ra-realtime': {
            notification: {
                lock: {
                    lockedBySomeoneElse: 'The record is locked by someone else',
                },
            },
        },
        pos: {
            profile: 'Profile',
            search: 'Search',
            configuration: 'Configuration',
            language: 'Language',
            change_language: 'Change language',
            theme: {
                name: 'Theme',
                light: 'Light',
                dark: 'Dark',
                change_theme: 'Change theme',
            },
            filter: 'Filtered by',
            dashboard: {
                monthly_revenue: 'Monthly Revenue',
                month_history: '30 Day Revenue History',
                new_orders: 'New Orders',
                pending_reviews: 'Pending Reviews',
                new_customers: 'New Customers',
                pending_orders: 'Pending Orders',
                all_customers: 'All Customers',
                all_reviews: 'All reviews',
                order: {
                    items: 'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
                },
                timeline: 'Timeline',
                welcome: {
                    title: 'Welcome to the react-admin enterprise edition demo',
                    subtitle:
                        "This is the admin of an imaginary poster shop showcasing enterprise edition private modules usage. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
                    tour_button: 'Take the tour',
                    ra_button: 'react-admin enterprise edition site',
                    demo_button: 'See the showcase',
                    github_button: 'See the source code',
                },
            },
            menu: {
                sales: 'Sales',
                catalog: 'Catalog',
                my_queries: 'My queries',
                customers: 'Customers',
                new_customers: 'New Customers',
                all_customers: 'All Customers',
                visitors: 'Visitors',
                all_reviews: 'All reviews',
                pending_reviews: 'Pending reviews',
                bad_reviews: 'Bad reviews',
            },
            reviews: {
                accepted: 'Accepted',
                rejected: 'Rejected',
                pending: 'Pending',
            },
            events: {
                review: {
                    title: 'Posted review on "%{product}"',
                },
                order: {
                    title: 'Ordered 1 poster |||| Ordered %{smart_count} posters',
                },
            },
        },
        resources: {
            customers: {
                name: 'Customer |||| Customers',
                fields: {
                    orders: 'Orders',
                    first_seen: 'First seen',
                    groups: 'Segments',
                    last_seen: 'Last seen',
                    last_seen_gte: 'Visited Since',
                    name: 'Name',
                    total_spent: 'Total spent',
                    password: 'Password',
                    confirm_password: 'Confirm password',
                    address: 'Address',
                    birthday: 'Birthday',
                    city: 'City',
                    first_name: 'First name',
                    has_newsletter: 'Has Newsletter',
                    has_ordered: 'Has ordered',
                    last_name: 'Last name',
                    latest_purchase: 'Latest purchase',
                    zipcode: 'Postal code',
                    nb_orders: 'Orders',
                },
                filters: {
                    last_visited: 'Last visited',
                    today: 'Today',
                    this_week: 'This week',
                    last_week: 'Last week',
                    this_month: 'This month',
                    last_month: 'Last month',
                    earlier: 'Earlier',
                    has_ordered: 'Has ordered',
                    has_newsletter: 'Has newsletter',
                    group: 'Segment',
                },
                fieldGroups: {
                    identity: 'Identity',
                    address: 'Address',
                    stats: 'Stats',
                    history: 'History',
                    password: 'Password',
                    change_password: 'Change Password',
                },
                page: {
                    delete: 'Delete Customer',
                },
                errors: {
                    password_mismatch:
                        'The password confirmation is not the same as the password.',
                },
            },
            orders: {
                name: 'Order |||| Orders',
                amount: '1 order |||| %{smart_count} orders',
                title: 'Order %{reference}',
                fields: {
                    basket: {
                        delivery: 'Delivery',
                        reference: 'Reference',
                        quantity: 'Quantity',
                        sum: 'Sum',
                        tax_rate: 'Tax Rate',
                        taxes: 'Tax',
                        total: 'Total',
                        unit_price: 'Unit Price',
                    },
                    address: 'Address',
                    customer_id: 'Customer',
                    date_gte: 'Passed Since',
                    date_lte: 'Passed Before',
                    nb_items: 'Nb items',
                    reference: 'Reference',
                    returned: 'Returned',
                    status: 'Status',
                    total_gte: 'Min amount',
                },
                section: {
                    order: 'Order',
                    customer: 'Customer',
                    shipping_address: 'Shipping Address',
                    items: 'Items',
                    total: 'Totals',
                },
            },
            invoices: {
                name: 'Invoice |||| Invoices',
                fields: {
                    date: 'Invoice date',
                    customer_id: 'Customer',
                    order_id: 'Order',
                    date_gte: 'Passed Since',
                    date_lte: 'Passed Before',
                    total_gte: 'Min amount',
                    address: 'Address',
                },
            },
            products: {
                name: 'Poster |||| Posters',
                fields: {
                    id: 'Identifier',
                    category_id: 'Category',
                    height_gte: 'Min height',
                    height_lte: 'Max height',
                    height: 'Height',
                    image: 'Image',
                    price: 'Price',
                    reference: 'Reference',
                    sales: 'Sales',
                    stock_lte: 'Low Stock',
                    stock: 'Stock',
                    thumbnail: 'Thumbnail',
                    width_gte: 'Min width',
                    width_lte: 'Max width',
                    width: 'Width',
                },
                tabs: {
                    image: 'Image',
                    details: 'Details',
                    description: 'Description',
                    reviews: 'Reviews',
                    revisions: 'Revisions',
                },
                filters: {
                    categories: 'Categories',
                    stock: 'Stock',
                    no_stock: 'Out of stock',
                    low_stock: '1 - 9 items',
                    average_stock: '10 - 49 items',
                    enough_stock: '50 items & more',
                    sales: 'Sales',
                    best_sellers: 'Best sellers',
                    average_sellers: 'Average',
                    low_sellers: 'Low',
                    never_sold: 'Never sold',
                },
            },
            categories: {
                name: 'Category |||| Categories',
                fields: {
                    products: 'Products',
                },
                actions: {
                    create_product: 'Create Poster',
                },
            },
            reviews: {
                name: 'Review |||| Reviews',
                amount: '1 review |||| %{smart_count} reviews',
                relative_to_poster: 'Review on poster',
                detail: 'Review detail',
                fields: {
                    customer_id: 'Customer',
                    order_id: 'Order',
                    product_id: 'Product',
                    date_gte: 'Posted since',
                    date_lte: 'Posted before',
                    date: 'Date',
                    comment: 'Comment',
                    rating: 'Rating',
                },
                action: {
                    accept: 'Accept',
                    reject: 'Reject',
                },
                notification: {
                    approved_success: 'Review approved',
                    approved_error: 'Error: Review not approved',
                    rejected_success: 'Review rejected',
                    rejected_error: 'Error: Review not rejected',
                },
            },
            segments: {
                name: 'Segments',
                fields: {
                    customers: 'Customers',
                    name: 'Name',
                },
                data: {
                    compulsive: 'Compulsive',
                    collector: 'Collector',
                    ordered_once: 'Ordered once',
                    regular: 'Regular',
                    returns: 'Returns',
                    reviewer: 'Reviewer',
                },
            },
            stores: {
                name: 'Stores',
                fields: {
                    city: 'City',
                    country: 'Country',
                    address: 'Address',
                    created_at: 'Created at',
                },
            },
            tours: {
                name: 'Tours',
            },
            locks: {
                overlay: 'Currently Edited by %{name}',
            },
            events: {
                name: 'Events',
            },
            visits: {
                name: 'Visits',
                event: {
                    title: 'Visit store in %{city}',
                },
                freq: {
                    repeats: 'Repeats all',
                    daily: 'Days',
                    weekly: 'Weeks',
                    monthly: 'Months',
                    yearly: 'Years',
                    until: 'Recurrence ends after',
                    occurrences: 'occurrences',
                },
                fields: {
                    storeId: 'Store',
                    start: 'Start',
                    end: 'End',
                    freq: 'Frequency',
                    interval: 'Interval',
                    count: 'Count',
                    color: 'Color',
                },
                edit: {
                    title: 'Edit visit to %{city} store',
                },
                create: {
                    title: 'Create visit',
                },
                error: {
                    start_greater_than_end:
                        'The end date must be later than the start date',
                },
            },
        },
        tours: {
            action: {
                play: 'Play',
            },
            message: {
                played_on: 'Last played on %{date}',
                never_played: 'Never played before',
            },
            'ra-preferences': {
                comment:
                    'Persist user preferences (language, ui, filters, displayed columns, etc) in local storage',
                intro: 'ra-preferences comes with a lot of built-in modules, like this theme switcher. Try it: it works!',
                language_switcher: 'Or this language switcher...',
                persisted_queries:
                    "It features persisted queries too. For example, let's persist the filters for today visitors who actually ordered something.",
                persisted_queries_result:
                    "It's persisted locally in the browser now!",
                list_customization:
                    'It even has more advanced components like this list customization tool.',
                list_customization_columns:
                    'Where you can select how you want the list to be displayed, or the information you want to see.',
                hook: 'It exposes simple hooks so that you can actually save whatever you want, too. For instance, the state of this particular step. Try to reload the page!',
            },
            'ra-search': {
                button: 'This is the search button. It opens the search panel.',
                comment:
                    'Plug your search engine and let users search across all resources via a smart Omnisearch box',
                intro: 'The smart Omnisearch box allows users to search across all resources.',
                customize:
                    "You can customize the search results at will and redirect to any resource. For example, let's click on the first customer.",
                end: 'The search components let users search across all resources, work with all search backends, and can be customized to fit your needs.',
            },
            'ra-navigation-breadcrumb': {
                comment:
                    'Keep a track of your location in the site and navigate easily.',
                intro: 'The breadcrumb indicates that we are on the posters page.',
                edit: "Let's edit one of these posters.",
                sync: 'The breadcrumb has changed to follow us to this Edit page.',
                navigate: "Let's try to navigate away using the Menu entry.",
                sync2: 'The breadcrumb keeps showing our exact location.',
                clickable:
                    "Users can click on the breadcrumb items directly to navigate.\nLet's go to the home page.",
                dashboard:
                    "By default, there is no breacrumb displayed on the home page.\n Now it's your turn to use the Breadcrumb component to build you own breadcrumb path!",
            },
            'ra-realtime': {
                comment:
                    'Enable realtime on menu, list, show and edit views - or anywhere you want.',
                intro: "Seems like you just had new orders, let's check...",
                new_orders: 'Your new orders can stand-out from others.',
                newest: "And newest orders even appear while you're on the page.",
                locks: 'You can lock resources in realtime (this one will be unlocked in a few seconds).',
                end: "That's it for ra-realtime. Have a look at the other tours to discover more enterprise features!",
            },
            'ra-editable-datagrid': {
                comment:
                    'Quickly edit your data without leaving your datagrid.',
                intro: "Hovering on a row shows a toolbar allowing to either edit or delete the record. Let's see what happens when editing a row by clicking on the Edit button (or by directly clicking inside the row).",
                edit: "You can edit a record without leaving the Datagrid! Let's change the address.",
                save: 'After edition, just click on the Save button in the row.',
                create: 'The Editable Datagrid also supports inline creation.',
                forms: 'A row edition / creation form can contain Inputs of any type (text, date, number, etc.).',
                create_save:
                    'Click on the Save button to submit the form and create a new record.',
            },
            'ra-tree': {
                comment:
                    'Edit and visualize tree structures. Reorganize by drag and drop. Adapts to any data structure on the backend (parent_id, children, nested sets, etc)...',
                intro: 'ra-tree helps handling trees with ease, no matter the data structure you use on the backend.',
                infinite_levels:
                    'It supports expanding or collapsing nodes for an infinite amount of levels.',
                changes:
                    'You can even add a new category, or reorder them, try it!',
            },
            'ra-markdown': {
                comment:
                    'Read Markdown data, and edit it using a WYSIWYG editor in your admin.',
                intro: "This is a poster, one of the products our shop is selling, let's go to its details.",
                editor_location:
                    'The markdown editor is in the description tab.',
                editor: 'Right here. Try playing with its markdown, make it bold, add headlines!',
                wysiwyg: 'By default, you are in WYSIWYG mode.',
                raw: 'But you can switch to raw markdown edition with this button.',
                show: 'Parsed markdown can then be displayed in a preview or wherever you want.',
            },
            'ra-calendar': {
                comment: 'Embed a fully featured calendar in your admin.',
                intro: "Here is the list of our stores. The Posters Galore central staff is visiting them regularly. Let's see the visits on a calendar.",
                fullcalendar:
                    'Here it is! In this calendar, we can see the visits of our stores.',
                prevnext: 'Use these arrows to show the previous / next month.',
                today: 'Click on this button to go back to the current month.',
                switchview:
                    'With these buttons, you can switch between views. Try switching to the week view!',
                firstevent:
                    'Here is the first event of the week. Let’s go see its details.',
                eventedit:
                    'As you can see, this opens a dialog with an Edit view. Let’s change the color for instance!',
                createbutton: 'Now, let’s create a new visit.',
                eventcreate:
                    'Let’s create a visit for the store in Dijon. The store will be visited every 2 weeks, starting today.',
                eventcreated:
                    'As you can see, a recurring event has been created. Feel free to use the previous / next buttons to see the next visits.',
                conclusion:
                    'That wraps it up for the calendar tour. Have a look at https://fullcalendar.io/docs/ to discover all the features supported by FullCalendar, or at the other tours to discover more enterprise features!',
            },
            'ra-history': {
                comment:
                    'Keep track of changes on content, compare revisions, and revert to a previous version.',
                intro: "Each time you change a record, ra-history creates a new revision. Let's edit this poster to see how it works.",
                edit: 'The image path was changed. Now when you save the form....',
                save_dialog:
                    '...you have to provide a message and a description for this revision.',
                save_revision:
                    'When you press Save, the form changes are saved, and a new revision is created.',
                revision_list:
                    'The list of revisions shows all the changes made to the record.',
                revision_details:
                    'For each revision, you can see the changes made to the record.',
                revert: 'You can revert to any revision by clicking on the Revert button.',
                revert_applied:
                    'This applies the changes from the revision to the form, and you can still modify the data before saving it.',
                conclusion:
                    "That's it for the ra-history tour. Have a look at the other tours to discover more enterprise features!",
            },
        },
    }
);

export default customEnglishMessages;
