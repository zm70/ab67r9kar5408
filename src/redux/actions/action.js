import * as actionType from './actionType';

export function internalErorr() {
  return {
    type: actionType.INTERNAL_ERROR
  };
}

export function getAsyncData() {
  return {
    type: actionType.INITIATE_GET_ASYNC_DATA
  };
}

export function getDataSuccess(data) {
  return {
    type: actionType.GET_ASYNC_DATA,
    data
  };
}

export function setAccessToken(token) {
  return {
    type: actionType.INITIATE_SET_ACCESS_TOKEN,
    token
  };
}

export function setTokenSuccess(token) {
  return {
    type: actionType.SET_ACCESS_TOKEN,
    token
  };
}

export function setShowCaution(showCaution) {
  return {
    type: actionType.INITIATE_SET_SHOW_CAUTION,
    showCaution
  };
}

export function setCautionSuccess(showCaution) {
  console.log(showCaution);
  return {
    type: actionType.SET_SHOW_CAUTION,
    showCaution
  };
}

export const startSignIn = () => {
  return {
    type: actionType.START_SIGN_IN
  };
};

// export const setUserInfo = (userInfo) => {
//   return {
//     type: actionType.SET_USER_INFO,
//     userInfo
//   };
// };

export function getUserData() {
  return {
    type: actionType.GET_USER_DATA
  };
}

export function saveUserData(userInfo) {
  return {
    type: actionType.SAVE_USER_DATA,
    userInfo
  };
}

export function saveUserDataSuccess(userInfo) {
  console.log(userInfo)
  return {
    type: actionType.SET_USER_INFO_SUCCESS,
    userInfo
  };
}

export const updateUserInfo = (updateInfo) => {
  return {
    type: actionType.UPDATE_USER_INFO,
    updateInfo
  };
};
export const updateAdditionalUserInfo = (updateInfo) => {
  return {
    type: actionType.UPDATE_ADDITIONAL_USER_INFO,
    updateInfo
  };
};

export const setShare = ({ share }) => {
  return {
    type: actionType.SET_USER_SHARE,
    share
  };
};

export const setShareSuccess = (shares) => {
  return {
    type: actionType.SET_USER_SHARE_SUCCESS,
    shares
  };
};

export const getAsyncProfile = () => {
  return {
    type: actionType.GET_USER_ASYNC_PROFILE
  };
};

export const getAsyncProfileSuccess = (profileAsync) => {
  return {
    type: actionType.GET_USER_ASYNC_PROFILE_SUCCESS,
    profileAsync
  };
};

export const setBookmark = ({ bookmarks }) => {
  return {
    type: actionType.SET_USER_BOOKMARK,
    bookmarks
  };
};

export const setBookmarkSuccess = (bookmarks) => {
  return {
    type: actionType.SET_USER_BOOKMARK_SUCCESS,
    bookmarks
  };
};

export const getAsyncBookmark = () => {
  return {
    type: actionType.GET_USER_BOOKMARK
  };
};

export const getAsyncBookmarkSuccess = (bookmarks) => {
  return {
    type: actionType.GET_USER_BOOKMARK_SUCCESS,
    bookmarks
  };
};

export const removeBookmarkById = ({ bookmarks }) => {
  return {
    type: actionType.REMOVE_BOOKMARK_BY_ID,
    bookmarks
  };
};

export const removeBookmarkByIdSuccess = (bookmarks) => {
  return {
    type: actionType.REMOVE_BOOKMARK_BY_ID_SUCCESS,
    bookmarks
  };
};

export const addUserCartItem = (product) => {
  return {
    type: actionType.ADD_USER_CART_ITEMS,
    product
  };
};

export const addUserCartSuccess = (items) => {
  return {
    type: actionType.ADD_USER_CART_ITEMS_SUCCESS,
    items
  };
};

export const subUserCartItem = (product) => {
  return {
    type: actionType.SUB_CART_ITEMS,
    product
  };
};

export const subUserCartSuccess = (items) => {
  return {
    type: actionType.SUB_CART_ITEMS_SUCCESS,
    items
  };
};

export const removeUserCartItem = (item) => {
  return {
    type: actionType.REMOVE_CART_ITEMS_BY_ID,
    item
  };
};

export const removeUserCartSuccess = (items) => {
  return {
    type: actionType.REMOVE_CART_ITEMS_BY_ID_SUCCESS,
    items
  };
};

export const emptyCart = () => {
  return {
    type: actionType.EMPTY_CART
  };
};

export const emptyCartSuccess = () => {
  return {
    type: actionType.EMPTY_CART_SUCCESS,
    items: {}
  };
};

export const getAsyncUserCart = () => {
  return {
    type: actionType.GET_USER_CART_ITEMS
  };
};

export const getAsyncUserCartSuccess = (items) => {
  return {
    type: actionType.GET_USER_CART_ITEMS_SUCCESS,
    items
  };
};

export const addCurrentUserToChannel = (value) => {
  console.log(value);
  return {
    type: actionType.SHARE_URL,
    value
  };
};

export const addToAddressList = (addresses) => {
  console.log(addresses);
  return {
    type: actionType.ADD_TO_ADDRESS_LIST,
    addresses
  };
};

export const removeFromAddressList = (id) => {
  console.log(id);
  return {
    type: actionType.REMOVE_FROM_ADDRESS_LIST,
    id
  };
};

export const getCatIdArrays = (catIdArray) => {
  return {
    type: actionType.GET_RECOMMENDAR_CAT_ID_ARRAYS,
    catIdArray
  };
};

export const getCatIdArraysSuccess = (catIdArrays) => {
  return {
    type: actionType.GET_RECOMMENDAR_CAT_ID_ARRAYS_SUCCESS,
    catIdArrays
  };
};

export const setTicketState = (ticket) => {
  return {
    type: actionType.SET_TICKET_STATE,
    ticket
  };
};

export const setHideTopTabbar = (value) => {
  return {
    type: actionType.HIDE_TOP_TABBAR,
    value
  };
};

export const dipatchTokenNotValid = () => {
  return {
    type: actionType.TOKEN_NOT_VALID,
  };
}

export const addTicketToList = (ticketList) => {
  return {
    type: actionType.TICKET_LIST,
    ticketList
  };
}

export const setupTicketList = (ticketList) => {
  return {
    type: actionType.SETUP_UP_TICKET_LIST,
    ticketList
  };
}

//to handle new created product without need to get from server
export const setupProductsOfMyBusiness = (products) => {
  return {
    type: actionType.SET_PRODUCTS_OF_MY_BUSINESS,
    products
  };
}

export const addCreatedProductsToMyBusiness = (products) => {
  return {
    type: actionType.ADD_NEW_PRODUCT_TO_LIST,
    products
  };
}

export const setupMyBusiness = (businesses) => {
  return {
    type: actionType.SETUP_MY_BUSINESS,
    businesses
  };
}

export const addNewToMyBusiness = (businesses) => {
  return {
    type: actionType.ADD_NEW_TO_MY_BUSINESS,
    businesses
  };
}

export const logout = () => {
  return {
    type: actionType.LOGOUT
  }
}


export const newFollowedBusiness = (id) => {
  return {
    type: actionType.NEW_FOLLOWED_BUSINESS,
    id
  }
}