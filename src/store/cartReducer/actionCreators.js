export const addToCart = (game, amount) => {
    return {
        type: 'ADD',
        game: { ...game, amount }
    };
}

export const removeFromCart = (games, gameToRemove) => {
    const updatedGames = games.filter(game => game.gameName !== gameToRemove.gameName);
    return {
        type: 'REMOVE',
        gameToRemove,
        content: updatedGames
    };
}

export const updateCartContent = (content, amount) => {
    return {
        type: 'UPDATE',
        amount,
        content
    };
}

export const clearCart = () => {
    return {
        type: 'CLEARCART'
    };
}