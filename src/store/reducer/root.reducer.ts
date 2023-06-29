import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import filterProductReducer from './filter_product.reducer';
import voucherReducer from './voucher.reducer';
import cartReducer from './cart.reducer';

export default combineReducers({
  auth: authReducer,
  filterProduct: filterProductReducer,
  voucher: voucherReducer,
  cart: cartReducer,
});


