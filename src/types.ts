import { ReactChildren } from 'react';
import {
    Identifier,
    ListControllerProps,
    Record as RaRecord,
    RedirectionSideEffect,
    ReduxState,
    useListController,
    usePermissions,
} from 'react-admin';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { LocationState } from 'history';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { FormRenderProps } from 'react-final-form';

export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface Category extends RaRecord {
    name: string;
}

export interface Product extends RaRecord {
    category_id: Identifier;
    description: string;
    height: number;
    image: string;
    price: number;
    reference: string;
    stock: number;
    thumbnail: string;
    width: number;
}

export interface Customer extends RaRecord {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    zipcode: string;
    avatar: string;
    birthday: string;
    first_seen: string;
    last_seen: string;
    has_ordered: boolean;
    latest_purchase: string;
    has_newsletter: boolean;
    groups: string[];
    nb_commands: number;
    total_spent: number;
}

export type OrderStatus = 'ordered' | 'delivered' | 'cancelled';

export interface Order extends RaRecord {
    status: OrderStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
}

export interface BasketItem {
    product_id: Identifier;
    quantity: number;
}

/**
 * Types to eventually add in react-admin
 */
export interface FieldProps<T extends RaRecord = RaRecord> {
    addLabel?: boolean;
    label?: string;
    record?: T;
    source?: string;
    resource?: string;
    basePath?: string;
    formClassName?: string;
}

export interface ReferenceFieldProps<T extends RaRecord = RaRecord>
    extends FieldProps<T> {
    reference: string;
    children: ReactChildren;
    link?: string | false;
    sortBy?: string;
}

export type ReviewStatus = 'accepted' | 'pending' | 'rejected';

export interface Review extends RaRecord {
    date: Date;
    status: ReviewStatus;
    customer_id: Identifier;
    product_id: Identifier;
}

export interface ResourceMatch {
    id: string;
    [k: string]: string;
}

type FilterClassKey = 'button' | 'form';

export interface ToolbarProps<RecordType extends RaRecord = RaRecord> {
    handleSubmitWithRedirect?: (redirect: RedirectionSideEffect) => void;
    handleSubmit?: FormRenderProps['handleSubmit'];
    invalid?: boolean;
    pristine?: boolean;
    saving?: boolean;
    submitOnEnter?: boolean;
    redirect?: RedirectionSideEffect;
    basePath?: string;
    record?: RecordType;
    resource?: string;
    undoable?: boolean;
}

export interface BulkActionProps<Params = unknown> {
    basePath?: string;
    filterValues?: Params;
    resource?: string;
    selectedIds?: Identifier[];
}

export interface FilterProps<Params = unknown> {
    classes?: ClassNameMap<FilterClassKey>;
    context?: 'form' | 'button';
    displayedFilters?: { [K in keyof Params]?: boolean };
    filterValues?: Params;
    hideFilter?: ReturnType<typeof useListController>['hideFilter'];
    setFilters?: ReturnType<typeof useListController>['setFilters'];
    showFilter?: ReturnType<typeof useListController>['showFilter'];
    resource?: string;
}

export interface DatagridProps<RecordType extends RaRecord = RaRecord>
    extends Partial<ListControllerProps<RecordType>> {
    hasBulkActions?: boolean;
}

export interface ResourceComponentProps<
    Params extends { [K in keyof Params]?: string } = any,
    C extends StaticContext = StaticContext,
    S = LocationState
> extends RouteComponentProps<Params, C, S> {
    basePath: string;
    resource: string;
    options: Record<string, unknown>;
    hasList: boolean;
    hasEdit: boolean;
    hasShow: boolean;
    hasCreate: boolean;
    permissions: ReturnType<typeof usePermissions>['permissions'];
    filter: any;
    exporter: any;
}

export interface ListComponentProps<Params = unknown>
    extends ResourceComponentProps<Params> {
    title?: string;
    aside?: boolean;
    actions?: any;
}

export interface EditComponentProps<
    Params extends ResourceMatch = { id: string },
    C extends StaticContext = StaticContext,
    S = LocationState
> extends ResourceComponentProps<Params, C, S> {
    id: string;
}

export interface ShowComponentProps<
    Params extends ResourceMatch = { id: string },
    C extends StaticContext = StaticContext,
    S = LocationState
> extends ResourceComponentProps<Params, C, S> {
    id: string;
}

export interface CreateComponentProps<
    Params extends ResourceMatch = { id: string },
    C extends StaticContext = StaticContext,
    S = LocationState
> extends ResourceComponentProps<Params, C, S> {
    id: string;
}

declare global {
    interface Window {
        restServer: any;
    }
}
