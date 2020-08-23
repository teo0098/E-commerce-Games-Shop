import React from 'react';
import AddGame from '../AddGamePanel/AddGame/AddGame';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import withAuth from '../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';
import useEditGamePanel from '../useHooks/useEditGamePanel';

const EditGamePanel = props => {

    const state = useEditGamePanel(props);

    return (
        <React.Fragment>
            {state.error ?
                <Error>
                    {state.errorMsg}
                </Error>
                :
                null
            }
            {state.loading ?
                <div style={{ textAlign: 'center' }}>
                    <Spinner />
                </div>
                :
                !state.error ?
                    <AddGame 
                        success="Game has been updated in the shop successfully."
                        url='/updateGame.php'
                        errorMSG='Unable to update a game... Please try again soon.'
                        action="Update game"
                        values={state.data}
                    />
                    :
                    null
            }
        </React.Fragment>
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(EditGamePanel, "Employee"));