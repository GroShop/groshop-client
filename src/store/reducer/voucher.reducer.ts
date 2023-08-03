import {VOUCHER} from 'utils/types.utils';
import {storeAction} from '../../interface/common.interface';

const initialState: any = {
  data: [],
};

const voucherReducer = (state = initialState, action: storeAction) => {
  switch (action.type) {
    case VOUCHER:
      return {...state, data: action.payload};
    default:
      return state;
  }
};
export default voucherReducer;
