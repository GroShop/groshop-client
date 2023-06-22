import {FILTERPRODUCT} from 'utils/types.utils';
import {storeAction} from '../../interface/common.interface';

const initialState: any = {
  data: [],
};

const filterProductReducer = (state = initialState, action: storeAction) => {
  switch (action.type) {
    case FILTERPRODUCT:
      return {...state, data: action.payload};
    default:
      return state;
  }
};
export default filterProductReducer;
