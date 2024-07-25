import * as React from 'react';
import DollarIcon from '@mui/icons-material/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';
import { formatNumberAsUSD } from '../formatUtils';

interface Props {
    value?: number;
}

const MonthlyRevenue = (props: Props) => {
    const { value } = props;
    const translate = useTranslate();

    return (
        <CardWithIcon
            to="/orders"
            icon={DollarIcon}
            title={translate('pos.dashboard.monthly_revenue')}
            subtitle={!!value ? formatNumberAsUSD(value, 2) : '-'}
        />
    );
};

export default MonthlyRevenue;
