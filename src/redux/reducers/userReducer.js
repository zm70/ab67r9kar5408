import { updateObject } from 'AppUtils';
import * as actionType from '../actions/actionType';
import * as keys from '../sagas/asyncKeys';
import { defaultUser } from '../../models/user';

const initialState = {
  retry: false,
  showCaution: 'show',
  token: '',
  userInfo: defaultUser,
  addressList: ['append'],
  selectedAddressId: -1,
  profileAsync: { shares: [], bookmarks: {} },
  catIdArrays: [],
  ticket: {
    business_id: '-1',
    title: '',
    category: '',
    message: '',
    priority: '1',
    comment: '0'
  }
};

const internalError = (state, action) => {
  return updateObject(state, {
    retry: true
  });
};

const setInvalidToken = (state, action) => {
  return updateObject(state, {
    token: keys.tokenNotValid
  });
};

const getDataSuccess = (state, action) => {
  return updateObject(state, {
    retry: false,
    showCaution: action.data[1][1],
    token: JSON.parse(action.data[0][1])
  });
};

const setTokenSuccess = (state, action) => {
  console.log(action)
  return updateObject(state, {
    token: action.token
  });
};

const setShowCaution = (state, action) => {
  return updateObject(state, {
    showCaution: action.showCaution || 'show'
  });
};

const startSignIn = (state, action) => {
  return updateObject(state, {
    retry: false,
    token: null
  });
};

const setUserInfo = (state, action) => {
  return updateObject(state, {
    userInfo: action.userInfo
  });
};

const updateUserInfo = (state, action) => {

  return updateObject(state, {
    userInfo: updateObject(state.userInfo, {
      ...action.updateInfo
    })
  });
};
const updateAddtionalUserInfo = (state, action) => {
  return updateObject(state, {
    userInfo: updateObject(state.userInfo, {
      personal_info: updateObject(state.userInfo.personal_info, {
        ...action.updateInfo
      })
    })
  });
};

const setShare = (state, action) => {
  return updateObject(state, {
    profileAsync: updateObject(state.profileAsync, {
      shares: action.shares
    })
  });
};

const getProfileAsync = (state, action) => {
  return updateObject(state, {
    profileAsync: action.profileAsync
  });
};

const setBookmark = (state, action) => {
  return updateObject(state, {
    profileAsync: updateObject(state.profileAsync, {
      bookmarks: action.bookmarks
    })
  });
};
const getBookmark = (state, action) => {
  return updateObject(state, {
    profileAsync: updateObject(state.profileAsync, {
      bookmarks: action.bookmarks
    })
  });
};

const removeBookmark = (state, action) => {
  return updateObject(state, {
    profileAsync: updateObject(state.profileAsync, {
      bookmarks: action.bookmarks
    })
  });
};

const addToAddresses = (state, action) => {
  return updateObject(state, {
    addressList: [
      ...state.addressList.slice(0, -1),
      ...action.addresses,
      'append'
    ]
  });
};

const removeFromAddresses = (state, action) => {
  const addressList = state.addressList.filter(address => (
    address.id !== action.id
  ))
  return updateObject(state, {
    addressList
  });
};

const getCatIdArrays = (state, action) => {
  return updateObject(state, {
    catIdArrays: action.catIdArrays
  });
};

const setTicket = (state, action) => {
  return updateObject(state, {
    ticket: updateObject(state.ticket, { ...action.ticket })
  });
};

export function userReducer(state = initialState, action) {
  if (__DEV__)
    console.log(action);
  switch (action.type) {
    case actionType.GET_ASYNC_DATA:
      return getDataSuccess(state, action);
    case actionType.START_SIGN_IN:
      return startSignIn(state, action);
    case actionType.SET_ACCESS_TOKEN:
      return setTokenSuccess(state, action);
    case actionType.SET_SHOW_CAUTION:
      return setShowCaution(state, action);
    case actionType.TOKEN_NOT_VALID:
      return setInvalidToken(state, action);
    case actionType.INTERNAL_ERROR:
      return internalError(state, action);
    case actionType.SET_USER_INFO_SUCCESS:
      return setUserInfo(state, action);
    case actionType.UPDATE_USER_INFO:
      return updateUserInfo(state, action);
    case actionType.UPDATE_ADDITIONAL_USER_INFO:
      return updateAddtionalUserInfo(state, action);
    case actionType.SET_USER_SHARE_SUCCESS:
      return setShare(state, action);
    case actionType.GET_USER_ASYNC_PROFILE_SUCCESS:
      return getProfileAsync(state, action);
    case actionType.SET_USER_BOOKMARK_SUCCESS:
      return setBookmark(state, action);
    case actionType.REMOVE_BOOKMARK_BY_ID_SUCCESS:
      return removeBookmark(state, action);
    case actionType.GET_USER_BOOKMARK_SUCCESS:
      return getBookmark(state, action);
    case actionType.ADD_TO_ADDRESS_LIST:
      return addToAddresses(state, action);
    case actionType.REMOVE_FROM_ADDRESS_LIST:
      return removeFromAddresses(state, action);
    case actionType.GET_RECOMMENDAR_CAT_ID_ARRAYS_SUCCESS:
      return getCatIdArrays(state, action);
    case actionType.SET_TICKET_STATE:
      return setTicket(state, action);
    case actionType.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
