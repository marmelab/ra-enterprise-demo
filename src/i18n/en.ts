import {
    mergeTranslations,
    TranslationMessages as BaseTranslationMessages,
} from 'react-admin';
import englishMessages from 'ra-language-english';
import { RaTreeTranslationMessages } from '@react-admin/ra-tree';

export interface TranslationMessages
    extends RaTreeTranslationMessages,
        BaseTranslationMessages {}

const customEnglishMessages: TranslationMessages = mergeTranslations(
    englishMessages,
    {
        'ra-tree': {
            action: {
                add_root: 'Add a category of products',
            },
        },
        'ra-search': {
            result: `1 result |||| %{smart_count} results`,
        },
        pos: {
            search: 'Search',
            configuration: 'Configuration',
            language: 'Language',
            theme: {
                name: 'Theme',
                light: 'Light',
                dark: 'Dark',
            },
            filter: 'Filtered by',
            dashboard: {
                monthly_revenue: 'Monthly Revenue',
                month_history: '30 Day Revenue History',
                new_orders: 'New Orders',
                pending_reviews: 'Pending Reviews',
                new_customers: 'New Customers',
                pending_orders: 'Pending Orders',
                order: {
                    items:
                        'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
                },
                welcome: {
                    title: 'Welcome to the react-admin enterprise edition demo',
                    subtitle:
                        "This is the admin of an imaginary poster shop showcasing enterprise edition private modules usage. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
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
        },
        resources: {
            customers: {
                name: 'Customer |||| Customers',
                fields: {
                    commands: 'Orders',
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
                    nb_commands: 'Orders',
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
            commands: {
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
                        total: 'Total',
                        unit_price: 'Unit Price',
                    },
                    address: 'Address',
                    customer_id: 'Customer',
                    date_gte: 'Passed Since',
                    date_lte: 'Passed Before',
                    nb_items: 'Nb articles',
                    reference: 'Référence',
                    returned: 'Returned',
                    status: 'Status',
                    total_gte: 'Min amount',
                },
            },
            invoices: {
                name: 'Invoice |||| Invoices',
                fields: {
                    date: 'Invoice date',
                    customer_id: 'Customer',
                    command_id: 'Order',
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
                    command_id: 'Order',
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
        },
    }
);

export default customEnglishMessages;
