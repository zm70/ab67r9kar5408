import * as actionType from '../actions/actionType';
import { updateObject } from 'AppUtils';
const initialState = {
  hideTopTabbar: false
};

export function commonReducers(state = initialState, action) {
  switch (action.type) {
    case actionType.HIDE_TOP_TABBAR:
      return updateObject(state, {
        hideTopTabbar: action.value
      });
    

    default:
      return state;
  }
}
