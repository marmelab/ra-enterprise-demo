import React, { ReactElement } from 'react';
import {
    Create,
    DateInput,
    TextInput,
    PasswordInput,
    required,
    CreateProps,
    useTranslate,
} from 'react-admin';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { WizardForm, WizardFormStep } from '@react-admin/ra-form-layout';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    password: { display: 'inline-block' },
    confirm_password: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

export const validatePasswords = ({
    password,
    confirm_password,
}: {
    password: string;
    confirm_password: string;
}): any => {
    const errors = {} as any;

    if (password && confirm_password && password !== confirm_password) {
        errors.confirm_password = [
            'resources.customers.errors.password_mismatch',
        ];
    }

    return errors;
};

const VisitorCreate = (props: CreateProps): ReactElement => {
    const classes = useStyles(props);
    useDefineAppLocation('customers.create');
    const translate = useTranslate();

    return (
        <Create {...props}>
            <WizardForm validate={validatePasswords}>
                <WizardFormStep
                    label={translate(
                        'resources.customers.fieldGroups.identity'
                    )}
                >
                    <TextInput
                        source="first_name"
                        formClassName={classes.first_name}
                        validate={requiredValidate}
                    />
                    <TextInput
                        source="last_name"
                        formClassName={classes.last_name}
                        validate={requiredValidate}
                    />
                    <TextInput
                        type="email"
                        source="email"
                        validation={{ email: true }}
                        fullWidth={true}
                        formClassName={classes.email}
                        validate={requiredValidate}
                    />
                    <DateInput source="birthday" />
                </WizardFormStep>
                <WizardFormStep
                    label={translate('resources.customers.fieldGroups.address')}
                >
                    <TextInput
                        source="address"
                        formClassName={classes.address}
                        multiline={true}
                        fullWidth={true}
                    />
                    <TextInput
                        source="zipcode"
                        formClassName={classes.zipcode}
                    />
                    <TextInput source="city" formClassName={classes.city} />
                </WizardFormStep>
                <WizardFormStep
                    label={translate(
                        'resources.customers.fieldGroups.password'
                    )}
                >
                    <PasswordInput
                        source="password"
                        formClassName={classes.password}
                    />
                    <PasswordInput
                        source="confirm_password"
                        formClassName={classes.confirm_password}
                    />
                </WizardFormStep>
            </WizardForm>
        </Create>
    );
};

const requiredValidate = [required()];

export default VisitorCreate;
