// @flow

import React from 'react';

import { View } from 'react-native';
import { ProfilePage, MainpageTabbar } from 'AppComponent';
import StyleSheet from 'react-native-extended-stylesheet';
import strings from 'src/res/strings.json';
import { AnimationAux, RetryAux } from 'AppAux';
import ImgToBase64 from 'react-native-image-base64';
// import RNFS from 'react-native-fs';

import { connect } from 'react-redux';
import { httpLogout } from 'AppServices';
import { saveUserData, setAccessToken, getUserData, logout } from 'AppRedux';
import { Actions } from 'react-native-router-flux';
import {
  httpUpdateUserInfo,
  changeAvatar
} from 'AppServices';

import { imageSelect, resizeImage } from "../../components/shared/helperFunc";
import { startLoadingDialog, errorUpdateDialog, successUpdateDialog } from "../../components/shared/navigation";
import { editInfoBasicBodyRequest } from '../../components/profileTab/subpage/viewModel'
import { updateObject } from 'AppUtils';
import { editInfoBodyRequest } from "../../components/profileTab/subpage/viewModel";

const styles = StyleSheet.create({
  flex: {
    flex: 1,

    justifyContent: 'center'
  }
});

class Tab4Screen extends React.Component {
  state = {
    loading: false,
    bodyRequest: {},
    updatedImage: ""
  };

  changeUserImage = async (uri) => {

    try {
      const resizedImage = await resizeImage(uri, 250, 250);
      const base64 = await ImgToBase64.getBase64String(resizedImage);
      // const base64 = await RNFS.readFile(resizedImage, 'base64')

      // let bodyRequest = editInfoBodyRequest(this.props)
      const path = `data:image/png;base64,${base64}`;
      const bodyRequest = {
        picture: [{path}]
      };
      this.setState(prevState => ({
        updatedImage: path,
        bodyRequest
      }), this.updateHttpUserImage);
      // const images = [...this.bodyRequest.images];
      // images[imageIndex] = {
      //   file: base64
      // };
      // console.log(uri)
      // this.bodyRequest.images = images;
    } catch (err) {
      errorUpdateDialog(err)

    }
  }

  updateHttpUserImage = async () => {
    startLoadingDialog(strings.loadingMsg);
    try {
      const result = await changeAvatar(this.state.bodyRequest, this.props.userInfo.id);

      successUpdateDialog(strings.successEditImage)

    } catch (err) {
      errorUpdateDialog(err)
    }

  }


  componentDidUpdate(prevProps) {
    if (this.props.userInfo.id !== prevProps.userInfo.id) {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {

    this.fetchUserInfo();
    if (this.props.userInfo && this.props.userInfo.fname) {
      this.setState({
        bodyRequest: editInfoBasicBodyRequest(this.props)
      }, () => console.log("here we are", this.state))
    }
  }

  fetchUserInfo = () => {
    if (this.props.userInfo.id === 0) {
      this.props.getUserData();
      this.setState({ loading: true })
    }
  }

  logout = () => {
    startLoadingDialog();
    httpLogout()
      .then(({ status }) => {

        Actions.refresh({
          stillVisible: false,
          popCallback: () => {
            //reset user async storage
            this.props.saveUserData()
            this.props.setAccessToken();
            this.props.logout();

          }

        })
        Actions.reset('welcome')
      })
      .catch((err) => {
        console.log(err)
        errorUpdateDialog(err);
      });
  };

  render() {
    return (
      <AnimationAux loading={this.state.loading}>
        <RetryAux dataLoaded={this.props.userInfo.id !== 0} retry={this.fetchUserInfo}>
          <View style={styles.flex}>
            <MainpageTabbar iconName="ic_profile" title={strings.profile} />
            <ProfilePage
              updatedImage={this.state.updatedImage}
              onImageSelect={() => imageSelect(this.changeUserImage)}
              userInfo={this.props.userInfo}
              logout={this.logout} />
          </View>
        </RetryAux>
      </AnimationAux>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userInfo: state.user.userInfo
  };
};

const dispatchStateToProps = (dispath) => {
  return {
    setAccessToken: () => dispath(setAccessToken(null)),
    saveUserData: () => dispath(saveUserData(null)),
    getUserData: () => dispath(getUserData()),
    logout: () => dispath(logout()),
  };
};
export default connect(
  mapStateToProps,
  dispatchStateToProps
)(Tab4Screen);

// Navigation.push(this.props.componentId, {
//   component: {
//     name: 'demo.SingleAppScreen'
//   }
// });
