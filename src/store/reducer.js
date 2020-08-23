import { combineReducers } from 'redux';
import cartReducer from './cartReducer/cartReducer';
import orderReducer from './orderReducer/orderReducer';
import loginReducer from './loginReducer/loginReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'order', 'login']
};

const rootReducer = combineReducers({
    cart: cartReducer,
    order: orderReducer,
    login: loginReducer
});

export default persistReducer(persistConfig, rootReducer);