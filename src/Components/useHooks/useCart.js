import { useHistory } from 'react-router-dom';

const useCart = props => {

    const history = useHistory();

    const totalCart = () => {
        const total = props.cartContent.reduce((prevValue, currentValue) => {
            return prevValue + (currentValue.gamePrice * currentValue.amount);
        }, 0);
        return Number(total).toFixed(2);
    }

    const buyAll = () => {
        const totalPrice = totalCart();
        props.buyAllGames(props.cartContent, totalPrice);
        history.push('/order');
    }

    return { totalCart, buyAll }
}

export default useCart;