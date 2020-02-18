import {
  Linking,
  PermissionsAndroid,
  Platform,
  Share,
  UIManager,
  DeviceEventEmitter,
  BackHandler
} from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import { voteForBusiness } from 'AppServices'
// import RNSettings from 'react-native-settings';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import placeholder from '../../assets/images/placeholder.jpeg';
import {
  SET_USER_BOOKMARK,
  REMOVE_BOOKMARK_BY_ID,
  NEW_FOLLOWED_BUSINESS
} from '../../redux/actions/actionType';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { showCaution } from '../../redux/sagas/asyncKeys';
import { startLoadingDialog, pushErrorDialog } from "./navigation";
import strings from 'src/res/strings.json';

const baseUrl = 'http://abrikaar.com';

export function redirectToMap(lat, long) {
  let url;
  if (Platform.OS === 'android') {
    url = `google.navigation:q=${lat},${long}`;
  } else {
    url = `http://maps.apple.com/?ll=${lat},${long}`;
  }
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to go");
      }
    })
    .catch((err) => console.error('An error occurred', err));
}

// export function enableLocation() {
//   RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
//     (result) => {
//       if (result === RNSettings.ENABLED) {
//         console.log('location is enabled');
//       }
//     }
//   );
// }

export const requestPermission = async (approvedFunc, dismissFunc) => {
  await PermissionsAndroid.check(
    'android.permission.ACCESS_FINE_LOCATION'
  ).then((permit) => {
    if (permit) {
      approvedFunc();
      // this.getMyLocation();
      // if (watchPos) this.watchUserPosition();
      // else this.getMyLocation(btnPressed);
    } else {
      try {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'دسترسی به مکان یاب',
            message:
              'برای سهولت در استفاده از نرم افزار توصیه می شود مکان یاب خود را روشن نمایید'
          }
        ).then((res) => {
          if (res === 'granted') {
            approvedFunc();
            // this.getMyLocation();
            // if (watchPos) this.watchUserPosition();
            // else this.getMyLocation(btnPressed);
          } else {
            // this.setState({ gpsNotPermitted: true });
            console.log('Location permission denied');
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
};

export const imageSelect = async (onSelect) => {
  return ImagePicker.showImagePicker(
    { noData: true, mediaType: 'photo' },
    (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        onSelect(response.uri, response.fileName);
        // const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    }
  );
};

export const resizeImage = (uriPath, maxWidth = 300, maxHeight = 300) => {
  return ImageResizer.createResizedImage(
    uriPath,
    maxWidth,
    maxHeight,
    'JPEG',
    100
  )
    .then(({ uri }) => {
      return uri;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const dialCall = (number) => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};

export const onShare = async (message) => {
  const url = `http://abrikaar/${message}`;
  try {
    const result = await Share.share({
      message: url
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert('خطایی رخ داده است!');
  }
};

export const getImageOrPlaceholder = (images) => {

  if (images && images[0] && images[0].path) {
    return { uri: `${baseUrl}${images[0].path}` };
  } else if (images && images.logo && images.logo.path) {
    return { uri: `${baseUrl}${images.logo.path}` };
  } else if (images && images.logo && typeof images.logo === "string") {
    return { uri: `${baseUrl}${images.logo}` };
  } else if (images && images.path) {
    return { uri: `${baseUrl}${images.path}` };
  } else if (typeof images === 'string') {
    if (images.length < 300 && (images.includes('upload') || images.includes('.png'))) {
      return { uri: `${baseUrl}${images}` };
    }

    return { uri: `${images}` };
  }

  return placeholder;
};

export const getJustLogoImageOrPlaceholder = (logo) => {
  // if (typeof logo === 'object') {
  if (logo && logo.path) {
    return { uri: `${baseUrl}${logo.path}` };
  }
  // }
  return placeholder;
};

export const bookmarking = (dispatch, isMarked, product) => {
  if (isMarked) {
    return dispatch({
      type: REMOVE_BOOKMARK_BY_ID,
      bookmarks: { product_key: product.product_key }
    });
  }
  dispatch({
    type: SET_USER_BOOKMARK,
    bookmarks: product
  });
};

export const isMarkedFunc = (bookmarks, product_key) =>
  typeof bookmarks === 'object' && bookmarks && product_key in bookmarks;

export const setupBackhandler = (backPressSubscriptions) => {
  DeviceEventEmitter.removeAllListeners('hardwareBackPress');
  DeviceEventEmitter.addListener('hardwareBackPress', () => {
    let invokeDefault = true;
    const subscriptions = [];

    backPressSubscriptions.forEach((sub) => subscriptions.push(sub));

    for (let i = 0; i < subscriptions.reverse().length; i += 1) {
      if (subscriptions[i]()) {
        invokeDefault = false;
        break;
      }
    }

    if (invokeDefault) {
      BackHandler.exitApp();
    }
  });
};

export const androidSimpleAnimation = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
};

export const dialogboxPopInterval = (sceneKey, cb) => {
  return setInterval(() => {
    console.log(Actions.currentScene, sceneKey)
    if (Actions.currentScene != sceneKey) {
      console.log(Actions.currentScene)
      cb()
    }
  })
}

export const followBusiness = async (showCautionAgain, body, followCB, extras) => {
  const showCautionAgainStorage =
    showCautionAgain || (await AsyncStorage.getItem(showCaution));

  if (showCautionAgainStorage === 'notshow') {
    followCB(false, body);
  } else {
    Actions.dialogbox({
      visible: true,
      dialogType: 'warning',
      onConfirm: (setShowCaution) => followCB(setShowCaution, body, extras)
    });
  }
};

export const checkCautianMsg = async (showCautionAgain) => {
  if (showCautionAgain) {
    await AsyncStorage.setItem(showCaution, `${showCautionAgain}`);
  }
  // startLoadingDialog(strings.loadingMsgSubmit);
}

export const commonError = (err) => {
  if (__DEV__)
    console.log(err)
}

export const mapRegionConstraint = (coord) => {
  if ((coord[0] < 40 && coord[0] > 70)
    || (coord[1] < 20 && coord[1] > 40)) {
    return false
  }
  return true
}

export const voting = async (body) => {
  try {
    const res = await voteForBusiness(body);
  } catch (err) {
    pushErrorDialog(err);
  }
}
// export const resizingImage = async (uri, sizeW=250, sizeH=250) => {
//   const resizedImage = await resizeImage(uri, sizeW,sizeH);
//   const base64 = await ImgToBase64.getBase64String(resizedImage);
//   return `data:image/png;base64,${base64}`
// }

export const addNewFollowedBusiness = (disp, id) => {
  disp({
    type: NEW_FOLLOWED_BUSINESS,
    id
  })
  this.props.newFollowedBusiness(id)
}