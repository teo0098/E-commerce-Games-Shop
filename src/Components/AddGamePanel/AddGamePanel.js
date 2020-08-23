import React from 'react';
import AddGame from './AddGame/AddGame';
import withAuth from '../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';

const AddGamePanel = () => {
    return (
        <AddGame
            success="New game has been added to the shop successfully."
            url='/addGame.php'
            errorMSG='Unable to add new game... Please try again soon.'
            action="Add game"
            values=''
        />
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(AddGamePanel, "Employee"));