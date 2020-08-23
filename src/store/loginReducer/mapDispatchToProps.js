import { logging } from './actionCreators';
import { loggedOut } from './actionCreators';
import { clear } from './actionCreators';
import { updateAccount } from './actionCreators';

const mapLoginDispatchToProps = dispatch => {
    return {
        logging: (login, password, mode) => dispatch(logging(login, password, mode)),
        logout: () => dispatch(loggedOut()),
        clear: () => dispatch(clear()),
        updateAccount: user => dispatch(updateAccount(user))
    };
}

export default mapLoginDispatchToProps;