import React from 'react'
import LoggedUser from '../../RenderProps/loggedUser';
import Heading from '../Heading/Heading';
import styles from '../Profile.module.scss';
import Option from '../Option/Option';
import withAuth from '../../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../../store/loginReducer/mapjwtTokenStateToProps';

const Admin = () => {
    return (
        <div className={styles.Profile}>
            <LoggedUser render={(logout, user) => (
                    <Heading mode={user[1]} name={user[0].name} lastname={user[0].lastname} logout={logout} />
            )} />
            <div className={styles.Profile__options}>
                <Option url="/employees/add" title="Add new employee" function="ADD">
                    A new employee joined our crew?
                    Don't waste time and add employee to the database.
                </Option>
                <Option url="/employees" title="View or edit any employee" function="EDIT">
                    Need to update information about any employee or maybe want to have a look at your employees?
                    Just do it.
                </Option>
            </div>
        </div>
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(Admin, "Administrator"));