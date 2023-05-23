import {USER} from 'utils/types.utils';
import {storeAction} from '../../interface/common.interface';

const initialState: any = {
  data: [],
};

const authReducer = (state = initialState, action: storeAction) => {
  switch (action.type) {
    case USER:
      return {...state, data: action.payload};
    default:
      return state;
  }
};
export default authReducer;
