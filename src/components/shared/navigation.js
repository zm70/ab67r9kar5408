import strings from 'src/res/strings.json';
import { Actions } from 'react-native-router-flux';
import { pushSubpage, pushCatSubpage } from '../subpages/pushTabs';
import { createTicket } from 'AppServices';
import { REMOVE_CART_ITEMS_BY_ID } from '../../redux/actions/actionType';
import * as navigationKeys from './navigationKeys'

export const pushFilterPage = () => {
  pushSubpage(navigationKeys.NOT_MATTER, navigationKeys.FILTER_PAGE, strings.filter, 'filter')
}

export const pushBusinessListCategory = (shops) => {
  pushCatSubpage(navigationKeys.LIST_SUB_BUSINESS,
    navigationKeys.LIST_PAGE,
    strings.businessList, null, { shops });
};

export const pushBusinessList = (businesses) => {
  console.log(businesses);
  pushSubpage(navigationKeys.LIST_SUB_BUSINESS, navigationKeys.LIST_PAGE, strings.businessList, null, {
    shops: businesses
  });
};

export const pushProductList = (products) => {

  pushSubpage(navigationKeys.LIST_SUB_PRODUCT, navigationKeys.LIST_PAGE, strings.productList, null, {
    products
  });
};

// export const pushMyBusiness = (businesses) => {
//   pushSubpage(0, 3, null, null, {
//     shops: businesses
//   });
// };

export const pushSingleBusiness = (business, extraData) => {
  pushSubpage(navigationKeys.BUSINESS_SUB_SINGLE, navigationKeys.BUSINESS_PAGE, business.title, null, {
    id: business.id,
    title: business.title,
    extraData
  });
};

export const pushEditBusiness = (business) => {
  pushSubpage(navigationKeys.BUSINESS_SUB_EDIT, navigationKeys.BUSINESS_PAGE, strings.manageBusiness, null, {
    ...business,
    isOwner: true
  });
};

export const pushSingleProduct = (product) => {
  pushSubpage(navigationKeys.PRODUCT_SUB_SINGLE, navigationKeys.PRODUCT_PAGE, product.name  , null, {
    product
  });
};

export const pushEditProduct = (product, isCreate) => {
  pushSubpage(navigationKeys.PRODUCT_SUB_EDIT,
    navigationKeys.PRODUCT_PAGE,
    isCreate ? strings.createProductTitle : strings.manageProduct, null, {
    ...product,
    isOwner: true
  });
};


export const pushChatPage = (ticketID, title) => {
  pushSubpage(navigationKeys.NOT_MATTER, navigationKeys.CHAT_PAGE, title || strings.chat, null, {
    ticketID
  });
};

export const pushStartFromBusiness = (bId, title) => {
  pushSubpage(navigationKeys.NOT_MATTER, navigationKeys.CHAT_PAGE, title || strings.chat, null, {
    bId
  });
};

export const pushAddToProduct = (product) => {
  Actions.dialogbox({
    dialogType: 'addToCart',
    product
  });
};

export const pushConfirmChange = (
  popCallback,
  onConfirm,
  msg,
  loadingThen = false
) => {
  Actions.dialogbox({
    dialogType: 'confirm',
    popCallback,
    onConfirm,
    msg,
    loadingThen
  });
};

export const cardSelectAddress = () => {
  Actions.subCart({
    parentKey: navigationKeys.CARD_ADDRESS,
    titles: strings.selectAddress,
    iconName: 'map'
  });
}

export const cardAddAddress = () => {
  Actions.subCart({
    title: strings.addAddress,
    parentKey: navigationKeys.CARD_ADD_PROFILE,
    data: { addAddress: true }
  });
}

// export const prepareTicket = (bId) => {
//   // Actions.dialogbox({
//   //   dialogType: 'ticket'
//   // });
//   pushChatPage(bId);
// };

export const gotoChating = (exitDialog, ticketBody) => {
  Actions.refresh({
    dialogType: 'loading',
    loadingMsg: strings.loadingCreateTicket
  });
  createTicket(ticketBody)
    .then((res) => {
      exitDialog();

    })
    .catch((err) => {
      Actions.refresh({
        dialogType: 'alert',
        msg: strings.failedUpdate
      });
    });
};

export const pushDetailBusiness = (data) => {
  const formatedData = Object.keys(data).map(label => (
    { label, value: data[label] }
  ))

  Actions.dialogboxList({
    data: formatedData,
    dialogType: navigationKeys.DETAILS
  });
}

export const pushDialogBarcode = (barcode) => {
  Actions.dialogboxBarcode({
    barcode
  });
}

export const pushAllFollowers = (data) => {
  console.log("herererer")
  console.log(data)
  Actions.dialogboxList({
    data,
    dialogType: navigationKeys.FOLLOWERS
  });
}

export const pushPayBusiness = (bId) => {
  Actions.dialogboxCreateBusiness({
    bId
  });
}

export const errorUpdateDialog = (msg) => {
  if (__DEV__) {
    console.log(msg);
  }
  Actions.refresh({
    dialogType: 'alert',
    msg: strings.failedUpdate + '\n' + msg
  });
}

export const pushErrorDialog = (msg) => {
  Actions.dialogbox({
    dialogType: 'alert',
    msg
  });
}


export const noFoundDialog = (msg) => {
  if (__DEV__) {
    console.log(msg);
  }
  Actions.refresh({
    dialogType: 'alert',
    msg
  });
}

export const successUpdateDialog = (msg) => {
  if (__DEV__) {
    console.log(msg);
  }
  Actions.refresh({
    dialogType: 'alert',
    msg
  });
}

export const startLoadingDialog = (loadingMsg) => {
  Actions.dialogbox({
    dialogType: 'loading',
    loadingMsg
  });
}

export const confirmDeleteCartItem = (product_key, dispatch) => {
  Actions.dialogbox({
    dialogType: 'confirm',
    msg: strings.confirmRemoveCart,
    onConfirm: () => {
      dispatch({
        type: REMOVE_CART_ITEMS_BY_ID,
        product_key
      })
    }
  });
}

export const pushEditProfile = (childKey) => {
  Actions.subProfile({
    title: strings.editProfile,
    childKey,
    data: { editUserInfo: true }
  });
}