import React from 'react'
import LoggedUser from '../../RenderProps/loggedUser';
import Heading from '../Heading/Heading';
import Option from '../Option/Option';
import withAuth from '../../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../../store/loginReducer/mapjwtTokenStateToProps';
import styles from '../Profile.module.scss';

const Employee = () => {
    return (
        <div className={styles.Profile}>
            <LoggedUser render={(logout, user) => (
                <Heading mode={user[1]} name={user[0].name} lastname={user[0].lastname} logout={logout} />
            )} />
            <div className={styles.Profile__options}>
                <Option url="/games/add" title="Add new game" function="ADD">
                    A new game has arrived to our shop?
                    Let's add it.
                </Option>
                <Option url="/games" title="View or edit any game" function="EDIT">
                    Need to update informations about a specific game or just want to see what games does our shop have?
                    Have a look.
                </Option>
                <Option url="/orders" title="View or edit any order" function="EDIT">
                    Want to take a peek what order have been made from our shop?
                    Go for it.
                </Option>
            </div>
        </div>
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(Employee, "Employee"));