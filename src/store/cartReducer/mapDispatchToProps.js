import { addToCart } from './actionCreators';
import { removeFromCart } from './actionCreators';
import { updateCartContent } from './actionCreators';
import { clearCart } from './actionCreators';

const mapCartDispatchToProps = dispatch => {
    return {
        addToCart: (game, amount) => dispatch(addToCart(game, amount)),
        removeFromCart: (games, gameToRemove) => dispatch(removeFromCart(games, gameToRemove)),
        updateCartContent: (content, amount) => dispatch(updateCartContent(content, amount)),
        clearCart: () => dispatch(clearCart())
    };
}

export default mapCartDispatchToProps;