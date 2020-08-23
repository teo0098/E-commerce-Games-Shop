import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect }from 'react-redux';
import mapOrderDispatchToProps from '../../store/orderReducer/mapDispatchToProps';
import mapCartDispatchToProps from '../../store/cartReducer/mapDispatchToProps';

const GamesAmountToBuy = props => {

    const [amount, setAmount] = useState(Number(props.gameAmount));

    const history = useHistory();

    const updateCartContent = number => {
        let game = props.cartContent.find(searchedGame => searchedGame.gameName === props.game.gameName);
        const gameIndex = props.cartContent.findIndex(searchedGame => searchedGame.gameName === props.game.gameName);
        game = { ...game, amount: game.amount + number };
        props.cartContent.splice(gameIndex, 1, game);
        props.updateCartContent(props.cartContent, number);
    }

    const increaseAmount = () => {
        setAmount(prevState => prevState < props.game.itemsAmount ? ++prevState : +props.game.itemsAmount);
        if (props.cartContent && amount < props.game.itemsAmount) updateCartContent(1);
    }

    const decreaseAmount = () => {
        setAmount(prevState => prevState > 1 ? --prevState : 1);
        if (props.cartContent && amount > 1) updateCartContent(-1);
    }

    const buyGame = (game, amount) => {
        props.buyGame(game, amount);
        history.push('/order');
    }

    return (
        props.render(amount, increaseAmount, decreaseAmount, (game, amount) => buyGame(game, amount))
    );
}

export default connect(null, mapOrderDispatchToProps)(connect(null, mapCartDispatchToProps)(GamesAmountToBuy));