import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import filterProductReducer from './filter_product.reducer';

export default combineReducers({
  auth: authReducer,
  filterProduct: filterProductReducer,
});


