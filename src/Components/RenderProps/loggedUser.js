import { connect } from 'react-redux';
import mapLoginDispatchToProps from '../../store/loginReducer/mapDispatchToProps';
import { useHistory } from 'react-router-dom';

const LoggedUser = props => {

    const history = useHistory();

    const logOut = () => {
        props.logout();
        history.push('/signin');
    }

    return (
        props.render(logOut, props.user)
    )
}

const mapLoginStateToProps = state => {
    return {
        user: state.login.user
    };
}

export default connect(mapLoginStateToProps, mapLoginDispatchToProps)(LoggedUser);