export const buyGame = (game, amount) => {
    const alteredGame = {
        ...game,
        amount
    };
    return {
        type: 'BUY',
        alteredGame,
        ordered: true
    };
}

export const cancelOrder = () => {
    return {
        type: 'CANCEL'
    };
}

export const changeDelivery = (type, price, totalPrice) => {
    return {
        type: 'DELIVERY',
        deliveryType: type,
        deliveryPrice: price,
        totalPrice
    };
}

export const buyAllGames = (games, totalPrice) => {
    return {
        type: 'BUYALL',
        games,
        totalPrice
    };
}