const mapLoginStateToProps = state => {
    return {
        jwtToken: state.login.user[0] === undefined ? '' : state.login.user[2]
    }
}

export default mapLoginStateToProps;