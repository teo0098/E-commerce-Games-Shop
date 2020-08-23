import React from 'react'
import LoggedUser from '../../RenderProps/loggedUser';
import Heading from '../Heading/Heading';
import Option from '../Option/Option';
import withAuth from '../../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../../store/loginReducer/mapjwtTokenStateToProps';
import styles from '../Profile.module.scss';

const Customer = () => {
    return (
        <div className={styles.Profile}>
            <LoggedUser render={(logout, user) => (
                <Heading mode={user[1]} name={user[0].name} lastname={user[0].lastname} logout={logout} />
            )} />
            <div className={styles.Profile__options}>
                <Option url='/my-profile/edit' title="Update my informations" function="UPDATE">
                    Want to update your personal informations?
                    Go ahead.
                </Option>
                <Option url='/my-profile/settings' title="Manage my account" function="MANAGE">
                    Are you thinking of doing some settings of your account?
                    Go for it.
                </Option>
                <Option url="/orders/history" title="View my shopping history" function="VIEW">
                    You don't remember what you buy but you want to own larger control of your shopping?
                    Take control.
                </Option>
            </div>
        </div>
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(Customer, "Customer"));