import {
    mergeTranslations,
    TranslationMessages as BaseTranslationMessages,
} from 'react-admin';
import frenchMessages from 'ra-language-french';
import { RaTreeTranslationMessages } from '@react-admin/ra-tree';
import { raAuditLogLanguageFrench } from '@react-admin/ra-audit-log';

export interface TranslationMessages
    extends RaTreeTranslationMessages,
        BaseTranslationMessages {}

const customFrenchMessages: TranslationMessages = mergeTranslations(
    frenchMessages,
    raAuditLogLanguageFrench,
    {
        'ra-tree': {
            action: {
                add_root: 'Ajouter une catégorie de produits',
            },
        },
        'ra-search': {
            result: `1 résultat |||| %{smart_count} résultats`,
        },
        pos: {
            search: 'Rechercher',
            configuration: 'Configuration',
            language: 'Langue',
            theme: {
                name: 'Theme',
                light: 'Clair',
                dark: 'Obscur',
            },
            filter: 'Filtré par',
            dashboard: {
                monthly_revenue: 'CA à 30 jours',
                month_history: "Chiffre d'affaire sur 30 jours",
                new_orders: 'Nouvelles commandes',
                pending_reviews: 'Commentaires à modérer',
                new_customers: 'Nouveaux clients',
                pending_orders: 'Commandes à traiter',
                order: {
                    items:
                        'par %{customer_name}, un poster |||| par %{customer_name}, %{nb_items} posters',
                },
                timeline: 'Timeline',
                welcome: {
                    title:
                        'Bienvenue sur la démo de react-admin enterprise edition',
                    subtitle:
                        "Ceci est le back-office d'un magasin de posters imaginaire mettant en oeuvre les modules de l'édition entreprise. N'hésitez pas à explorer et à modifier les données. La démo s'exécute en local dans votre navigateur, et se remet à zéro chaque fois que vous rechargez la page.",
                    ra_button: 'Site web de react-admin entreprise',
                    demo_button: 'Voir tous les modules',
                    github_button: 'Voir le code source',
                },
            },
            menu: {
                sales: 'Ventes',
                catalog: 'Catalogue',
                my_queries: 'Mes recherches',
                customers: 'Clients',
                new_customers: 'Nouveaux clients',
                all_customers: 'Tous les clients',
                visitors: 'Visiteurs',
                all_reviews: 'Tous les avis',
                pending_reviews: 'Avis en attende de validation',
                bad_reviews: 'Mauvais avis',
            },
            reviews: {
                accepted: 'Acceptés',
                rejected: 'Rejetés',
                pending: 'En attente',
            },
        },
        resources: {
            customers: {
                name: 'Client |||| Clients',
                fields: {
                    address: 'Rue',
                    birthday: 'Anniversaire',
                    city: 'Ville',
                    commands: 'Commandes',
                    first_name: 'Prénom',
                    first_seen: 'Première visite',
                    groups: 'Segments',
                    has_newsletter: 'Abonné à la newsletter',
                    has_ordered: 'A commandé',
                    last_name: 'Nom',
                    last_seen: 'Vu le',
                    last_seen_gte: 'Vu depuis',
                    latest_purchase: 'Dernier achat',
                    name: 'Nom',
                    total_spent: 'Dépenses',
                    zipcode: 'Code postal',
                    password: 'Mot de passe',
                    confirm_password: 'Confirmez le mot de passe',
                    nb_commands: 'Commandes',
                },
                filters: {
                    last_visited: 'Dernière visite',
                    today: "Aujourd'hui",
                    this_week: 'Cette semaine',
                    last_week: 'La semaine dernière',
                    this_month: 'Ce mois-ci',
                    last_month: 'Le mois dernier',
                    earlier: 'Plus tôt',
                    has_ordered: 'A déjà commandé',
                    has_newsletter: 'Abonné newsletter',
                    group: 'Segment',
                },
                fieldGroups: {
                    identity: 'Identité',
                    address: 'Adresse',
                    stats: 'Statistiques',
                    history: 'Historique',
                    password: 'Mot de passe',
                    change_password: 'Changer le mot de passe',
                },
                page: {
                    delete: 'Supprimer le client',
                },
                errors: {
                    password_mismatch:
                        'La confirmation du mot de passe est différent du mot de passe.',
                },
            },
            commands: {
                name: 'Commande |||| Commandes',
                amount: '1 commande |||| %{smart_count} commandes',
                title: 'Commande n°%{reference}',
                fields: {
                    basket: {
                        delivery: 'Frais de livraison',
                        reference: 'Référence',
                        quantity: 'Quantité',
                        sum: 'Sous-total',
                        tax_rate: 'TVA',
                        total: 'Total',
                        unit_price: 'P.U.',
                    },
                    address: 'Adresse',
                    customer_id: 'Client',
                    date_gte: 'Emises depuis',
                    date_lte: 'Emises avant',
                    nb_items: 'Nb articles',
                    reference: 'Référence',
                    returned: 'Annulée',
                    status: 'Etat',
                    total_gte: 'Montant minimum',
                },
            },
            invoices: {
                name: 'Facture |||| Factures',
                fields: {
                    id: 'Numéro',
                    date: 'Date de facture',
                    customer_id: 'Client',
                    command_id: 'Commande',
                    date_gte: 'Emises depuis',
                    date_lte: 'Emises avant',
                    address: 'Adresse',
                    total_ex_taxes: 'Montant HT',
                    delivery_fees: 'Frais de livraison',
                    taxes: 'TVA',
                },
            },
            products: {
                name: 'Poster |||| Posters',
                fields: {
                    id: 'Identifiant',
                    category_id: 'Catégorie',
                    height_gte: 'Hauteur mini',
                    height_lte: 'Hauteur maxi',
                    height: 'Hauteur',
                    image: 'Photo',
                    price: 'Prix',
                    reference: 'Référence',
                    sales: 'Ventes',
                    stock_lte: 'Stock faible',
                    stock: 'Stock',
                    thumbnail: 'Aperçu',
                    width_gte: 'Largeur mini',
                    width_lte: 'Margeur maxi',
                    width: 'Largeur',
                },
                tabs: {
                    image: 'Image',
                    details: 'Détails',
                    description: 'Description',
                    reviews: 'Commentaires',
                },
                filters: {
                    categories: 'Catégories',
                    stock: 'Stock',
                    no_stock: 'En rupture',
                    low_stock: '1 - 9 unités',
                    average_stock: '10 - 49 unités',
                    enough_stock: '50 unités et plus',
                    sales: 'Ventes',
                    best_sellers: 'Meilleures ventes',
                    average_sellers: 'Moyennes',
                    low_sellers: 'Peu vendu',
                    never_sold: 'Jamais vendu',
                },
            },
            categories: {
                name: 'Catégorie |||| Catégories',
                fields: {
                    name: 'Nom',
                    products: 'Produits',
                },
                actions: {
                    create_product: 'Créer un Poster',
                },
            },
            reviews: {
                name: 'Commentaire |||| Commentaires',
                amount: '1 commentaire |||| %{smart_count} commentaires',
                relative_to_poster: 'Commentaire sur',
                detail: 'Détail du commentaire',
                fields: {
                    customer_id: 'Client',
                    command_id: 'Commande',
                    product_id: 'Produit',
                    date_gte: 'Publié depuis',
                    date_lte: 'Publié avant',
                    date: 'Date',
                    comment: 'Texte',
                    status: 'Statut',
                    rating: 'Classement',
                },
                action: {
                    accept: 'Accepter',
                    reject: 'Rejeter',
                },
                notification: {
                    approved_success: 'Commentaire approuvé',
                    approved_error: 'Erreur: Commentaire non approuvé',
                    rejected_success: 'Commentaire rejeté',
                    rejected_error: 'Erreur: Commentaire non rejeté',
                },
            },
            segments: {
                name: 'Segments',
                fields: {
                    customers: 'Clients',
                    name: 'Nom',
                },
                data: {
                    compulsive: 'Compulsif',
                    collector: 'Collectionneur',
                    ordered_once: 'A commandé',
                    regular: 'Régulier',
                    returns: 'A renvoyé',
                    reviewer: 'Commentateur',
                },
            },
            stores: {
                name: 'Magasins',
                fields: {
                    city: 'Ville',
                    country: 'Pays',
                    address: 'Adresse',
                    created_at: 'Ouvert le',
                },
            },
            locks: {
                overlay: "En cours d'édition par %{name}",
            },
            events: {
                name: 'Événements',
            },
        },
    }
);

export default customFrenchMessages;
