import { CART } from './../../utils/types.utils';
import {storeAction} from '../../interface/common.interface';

const initialState: any = {
  data: [],
};

const cartReducer = (state = initialState, action: storeAction) => {
  switch (action.type) {
    case CART:
      return {...state, data: action.payload};
    default:
      return state;
  }
};
export default cartReducer;
