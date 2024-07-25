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
        'ra-realtime': {
            notification: {
                lock: {
                    lockedBySomeoneElse:
                        'Cet enregistrement est verrouillé par un autre utilisateur',
                },
            },
        },
        pos: {
            profile: 'Profil',
            search: 'Rechercher',
            configuration: 'Configuration',
            language: 'Langue',
            change_language: 'Changer la langue',
            theme: {
                name: 'Theme',
                light: 'Clair',
                dark: 'Obscur',
                change_theme: 'Changer le thème',
            },
            filter: 'Filtré par',
            dashboard: {
                monthly_revenue: 'CA à 30 jours',
                month_history: "Chiffre d'affaire sur 30 jours",
                new_orders: 'Nouvelles commandes',
                pending_reviews: 'Commentaires à modérer',
                new_customers: 'Nouveaux clients',
                all_customers: 'Tous les clients',
                all_reviews: 'Tous les avis',
                pending_orders: 'Commandes à traiter',
                order: {
                    items: 'par %{customer_name}, un poster |||| par %{customer_name}, %{nb_items} posters',
                },
                timeline: 'Timeline',
                welcome: {
                    title: 'Bienvenue sur la démo de react-admin enterprise edition',
                    subtitle:
                        "Ceci est le back-office d'un magasin de posters imaginaire mettant en oeuvre les modules de l'édition entreprise. N'hésitez pas à explorer et à modifier les données. La démo s'exécute en local dans votre navigateur, et se remet à zéro chaque fois que vous rechargez la page.",
                    tour_button: 'Démarrer la visite guidée',
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
            events: {
                review: {
                    title: 'Commente sur "%{product}"',
                },
                order: {
                    title: 'Commande 1 poster |||| Commande %{smart_count} posters',
                },
            },
        },
        resources: {
            customers: {
                name: 'Client |||| Clients',
                fields: {
                    address: 'Rue',
                    birthday: 'Anniversaire',
                    city: 'Ville',
                    orders: 'Commandes',
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
                    nb_orders: 'Commandes',
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
            orders: {
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
                        taxes: 'TVA',
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
                section: {
                    order: 'Commande',
                    customer: 'Client',
                    shipping_address: 'Adresse de livraison',
                    items: 'Articles',
                    total: 'Total',
                },
            },
            invoices: {
                name: 'Facture |||| Factures',
                fields: {
                    id: 'Numéro',
                    date: 'Date de facture',
                    customer_id: 'Client',
                    order_id: 'Commande',
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
                    revisions: 'Versions',
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
                    order_id: 'Commande',
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
            tours: {
                name: 'Visites',
            },
            locks: {
                overlay: "En cours d'édition par %{name}",
            },
            events: {
                name: 'Événements',
            },
            visits: {
                name: 'Visites',
                event: {
                    title: 'Visiter le magasin de %{city}',
                },
                freq: {
                    repeats: 'Se répète tous les',
                    daily: 'Jours',
                    weekly: 'Semaines',
                    monthly: 'Mois',
                    yearly: 'Ans',
                    until: 'Se termine après',
                    occurrences: 'occurrences',
                },
                fields: {
                    storeId: 'Magasin',
                    start: 'Début',
                    end: 'Fin',
                    freq: 'Fréquence',
                    interval: 'Intervalle',
                    count: 'Nombre',
                    color: 'Couleur',
                },
                edit: {
                    title: 'Modifier la visite du magasin de %{city}',
                },
                create: {
                    title: 'Créer une visite',
                },
                error: {
                    start_greater_than_end:
                        'La date de fin doit être postérieure à la date de début.',
                },
            },
        },
        tours: {
            action: {
                play: 'Jouer',
            },
            message: {
                played_on: 'Visité le %{date}',
                never_played: 'Non visité',
            },
            'ra-preferences': {
                comment:
                    "Enregistre les preferences de l'utilisateur (langue, ui, filtres, colonnes affichées, etc) dans l'espace de stockage local du navigateur",
                intro: 'ra-preferences apporte de nombreux modules pré-configués, comme ce sélecteur de thème. Essayez-le: il fonctionne!',
                language_switcher: 'Ou ce sélecteur de langue...',
                persisted_queries:
                    "Il propose également des requêtes persistantes. Par exemple, enregistrons les filtres pour les visiteurs d'aujourd'hui qui ont effectivement commandé quelque chose.",
                persisted_queries_result:
                    'Elle est désormais enregistrée localement dans le navigateur !',
                list_customization:
                    'Il propose même des composants plus avancés, comme cet outil de personnalisation des listes.',
                list_customization_columns:
                    "Vous pouvez y sélectionner le mode d'affichage de la liste ou les informations que vous souhaitez voir",
                hook: "Il expose des hooks afin que vous puissiez enregistrer ce que vous voulez également. Par exemple, l'état de cette étape particulière. Essayez de recharger la page!",
            },
            'ra-search': {
                button: 'Ce bouton de recherche ouvre le panneau de recherche.',
                comment:
                    "Connectez votre moteur de recherche et permettez aux utilisateurs d'effectuer des recherches dans toutes les ressources grâce à une boîte Omnisearch intelligente.",
                intro: "La boîte Omnisearch intelligente permet aux utilisateurs d'effectuer des recherches dans toutes les ressources.",
                customize:
                    "Vous pouvez personnaliser les résultats de la recherche à volonté et rediriger vers n'importe quelle ressource. Par exemple, cliquons sur le premier client.",
                end: "Les composants de recherche permettent de trouver facilement des données dans votre application. Ils fonctionnent avec tous les serveurs de recherche. Continuez à explorer les autres visites pour découvrir d'autres fonctionnalités de l'édition entreprise !",
            },
            'ra-navigation-breadcrumb': {
                comment:
                    'Gardez une trace de votre localisation dans le site et naviguez facilement.',
                intro: 'Le breacrumb indique que nous sommes sur la page des affiches.',
                edit: "Éditons l'une de ces affiches.",
                sync: "Le breacrumb a été modifié pour nous suivre jusqu'à cette page d'édition.",
                navigate:
                    'Essayons de naviguer ailleurs en utilisant une entrée du Menu.',
                sync2: 'Le breadcrumb continue de montrer notre position exacte.',
                clickable:
                    "Les utilisateurs peuvent cliquer directement sur les éléments du breadcrumb pour naviguer. Allons à la page d'accueil.",
                dashboard:
                    "Par défaut, il n'y a pas de breadcrumb affiché sur la page d'accueil. Maintenant, c'est à vous d'utiliser le composant breadcrumb pour construire votre propre breadcrumb !",
            },
            'ra-realtime': {
                comment:
                    "Activez le temps réel sur les vues de menu, de liste, d'affichage et d'édition - ou partout où vous le souhaitez.",
                intro: "On dirait que vous venez d'avoir de nouvelles commandes, vérifions...",
                new_orders:
                    'Vos nouvelles commandes peuvent se démarquer des autres',
                newest: 'Et les commandes les plus récentes apparaissent même lorsque vous êtes sur la page.',
                locks: 'Vous pouvez verrouiller les ressources en temps réel (celle-ci sera déverrouillée dans quelques secondes).',
                end: "Voilà pour ra-realtime. Jetez un oeil aux autres visites pour découvrir d'autres fonctionnalités de la version entreprise !",
            },
            'ra-editable-datagrid': {
                comment:
                    'Modifiez rapidement vos données sans quitter votre Datagrid.',

                intro: "En passant la souris sur une ligne, une barre d'outils s'affiche, permettant de modifier ou de supprimer l'enregistrement. Voyons ce qui se passe lorsque l'on modifie une ligne en cliquant sur le bouton Modifier (ou en cliquant directement dans la ligne).",
                edit: "Vous pouvez modifier un enregistrement sans quitter la grille de données ! Changeons l'adresse.",
                save: "Après l'édition, cliquez sur le bouton Enregistrer dans la ligne.",
                create: 'Le Datagrid modifiable prend également en charge la création en ligne.',
                forms: "Un formulaire d'édition/création de ligne peut contenir des entrées de tout type (texte, date, nombre, etc.).",
                create_save:
                    'Cliquez sur le bouton Enregistrer pour soumettre le formulaire et créer un nouvel enregistrement.',
            },
            'ra-tree': {
                comment:
                    "Modifiez et visualisez des structures arborescentes. Réorganisez par glisser-déposer. S'adapte à toute structure de données sur le backend (parent_id, enfants, ensembles imbriqués, etc.)...",
                intro: 'ra-tree permet de manipuler les arbres de données avec facilité, quelle que soit la structure de données que vous utilisez en arrière-plan.',
                infinite_levels:
                    "Il prend en charge l'expansion ou la réduction des nœuds pour un nombre infini de niveaux.",
                changes:
                    'Vous pouvez même ajouter une nouvelle catégorie, ou les réorganiser, essayez-le !',
            },
            'ra-markdown': {
                comment:
                    "Lire des données Markdown et les modifier à l'aide d'un éditeur WYSIWYG dans votre administration.",
                intro: "Ceci est un poster, l'un des produits vendus par notre boutique, allons voir ses détails.",
                editor_location:
                    "L'éditeur markdown se trouve dans l'onglet description.",
                editor: 'Ici. Essayez de jouer avec son markdown, mettez-le en gras, ajoutez des titres !',
                wysiwyg: 'Par défaut, vous êtes en mode WYSIWYG.',
                raw: "Mais vous pouvez passer à l'édition brute avec ce bouton.",
                show: "Les données markdown transformées peuvent ensuite être affichées dans un aperçu ou à l'endroit de votre choix.",
            },
            'ra-calendar': {
                comment: 'Intégrez un calendrier complet à votre admin.',
                intro: 'Voici la liste de nos magasins. Le personnel de Posters Galore doit les visiter régulièrement. Allons voir les visites prévues au calendrier.',
                fullcalendar:
                    'Les voici ! Dans ce calendrier, on peut voir les différentes visites planifiées pour chaque magasin.',
                prevnext:
                    'Utilisez les flèches pour naviguer au mois précédent / suivant.',
                today: 'Cliquer sur ce bouton pour revenir au mois courant.',
                switchview:
                    "Avec ces boutons, vous pouvez basculer entre les vues. Essayez d'ouvrir la vue semaine !",
                firstevent:
                    'Voici la première visite de la semaine. Voyons voir ses détails.',
                eventedit:
                    'Comme vous pouvez le voir, cela ouvre une vue Edit dans une modale. Essayons de changer la couleur par exemple !',
                createbutton: 'Maintenant, planifions une nouvelle visite.',
                eventcreate:
                    "Créons une visite pour notre magasin à Dijon. Nous allons planifier une visite toutes les deux semaines, la première étant aujourd'hui.",
                eventcreated:
                    "Comme vous le voyez, un évènement récurrent a été créé. N'hésitez pas à utiliser les boutons précédent / suivant pour voir les autres visites.",
                conclusion:
                    'Voilà qui conclut notre tour de ra-calendar. Rendez-vous sur https://fullcalendar.io/docs/ pour découvrir les autres fonctionnalités offertes par FullCalendar, ou bien jetez un oeil aux autres tours pour découvrir plus de fonctionnalités entreprise !',
            },
            'ra-history': {
                comment:
                    'Conservez une trace de chaque modification, comparez deux versions, et revenez à une version précédente.',
                intro: 'Chaque fois que vous modifiez un contenu, ra-history crée une nouvelle révision. Modifions cette affiche pour voir comment cela fonctionne.',
                edit: 'Le titre de cette affiche est maintenant modifié. Lors du click sur le bouton Enregistrer...',
                save_dialog:
                    '...une boite de dialogue apparait pour demander un message de révision.',
                save_revision:
                    'Cliquez sur Enregistrer pour enregistrer les modifications et créer une nouvelle révision.',
                revision_list:
                    "La liste des révisions montre l'historique des modifications apportées au contenu.",
                revision_details:
                    'Pour chaque révision, vous pouvez voir le détail des modifications apportées au contenu.',
                revert: 'Vous pouvez également revenir à une version précédente.',
                revert_applied:
                    'Cela applique les modifications de la révision au formulaire, et vous pouvez toujours modifier les données avant de les enregistrer.',
                conclusion:
                    "C'est tout pour la visite du module history. Jetez un oeil aux autres visites guidées pour découvrir plus de fonctionnalités entreprise !",
            },
        },
    }
);

export default customFrenchMessages;
