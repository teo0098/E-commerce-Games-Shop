import { buyGame } from './actionCreators';
import { cancelOrder } from './actionCreators';
import { changeDelivery } from './actionCreators';
import { buyAllGames } from './actionCreators';

const mapOrderDispatchToProps = dispatch => {
    return {
        buyGame: (game, amount) => dispatch(buyGame(game, amount)),
        cancelOrder: () => dispatch(cancelOrder()),
        changeDelivery: (type, price, totalPrice) => dispatch(changeDelivery(type, price, totalPrice)),
        buyAllGames: (games, totalPrice) => dispatch(buyAllGames(games, totalPrice))
    };
}

export default mapOrderDispatchToProps;