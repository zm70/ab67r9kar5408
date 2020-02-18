import { updateObject } from 'AppUtils';
import * as actionType from '../actions/actionType';

const initialState = {
  cartItem: {},
  ticketList: [],
  myBuseinessProductList: [],
  mBusiness: [],
  newFollowedBusiness: []
};


const returnCartItem = (state, action) => {
  console.log(action);
  return updateObject(state, {
    cartItem: action.items
  });
};

const getCartItem = (state, action) => {
  const cartItem = JSON.parse(action.items);
  console.log(action);
  return updateObject(state, {
    cartItem
  });
};

const setMyBusinessProducts = (state, action) => {
  console.log(action);
  return updateObject(state, {
    myBuseinessProductList: [...action.products]
  });
};

const addnewMyBusinessProducts = (state, action) => {
  console.log(action);
  return updateObject(state, {
    myBuseinessProductList: [...action.products, ...state.myBuseinessProductList]
  });
};

const setMyBusiness = (state, action) => {
  console.log(action);
  return updateObject(state, {
    mBusiness: [...action.businesses]
  });
};

const addNewMyBusiness = (state, action) => {
  console.log(action);
  return updateObject(state, {
    mBusiness: [...action.businesses, ...state.mBusiness]
  });
};

export function shopReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {

    case actionType.ADD_USER_CART_ITEMS_SUCCESS:
      return returnCartItem(state, action);
    case actionType.GET_USER_CART_ITEMS_SUCCESS:
      return getCartItem(state, action);
    case actionType.SUB_CART_ITEMS_SUCCESS:
      return returnCartItem(state, action);
    case actionType.REMOVE_CART_ITEMS_BY_ID_SUCCESS:
      return returnCartItem(state, action);
    case actionType.EMPTY_CART_SUCCESS:
      return returnCartItem(state, action);
    case actionType.SET_PRODUCTS_OF_MY_BUSINESS:
      return setMyBusinessProducts(state, action);
    case actionType.ADD_NEW_PRODUCT_TO_LIST:
      return addnewMyBusinessProducts(state, action);
    case actionType.SETUP_MY_BUSINESS:
      return setMyBusiness(state, action);
    case actionType.ADD_NEW_TO_MY_BUSINESS:
      return addNewMyBusiness(state, action);
    case actionType.TICKET_LIST:
      return updateObject(state, {
        ticketList: [...action.ticketList, ...state.ticketList]
      });
    case actionType.SETUP_UP_TICKET_LIST:
      return updateObject(state, {
        ticketList: [...action.ticketList]
      });
    case actionType.NEW_FOLLOWED_BUSINESS:
      return updateObject(state, {
        newFollowedBusiness: [...state.newFollowedBusiness, action.id]
      });
    case actionType.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
