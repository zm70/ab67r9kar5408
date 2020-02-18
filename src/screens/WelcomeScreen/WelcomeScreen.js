// @flow

import React, { Component } from 'react';
import {
  View,
  Animated,
  Keyboard,
  AppState,
  ActivityIndicator,
  BackHandler,
  DeviceEventEmitter
} from 'react-native';
import EStyle from 'react-native-extended-stylesheet';
import { updateObject } from 'AppUtils';
import { connect } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { axios, userLogin, getAbrikarLaw } from 'AppServices';

import WelcomeStore from "../../components/welcome_screen/welcomeMobx";
import { levelLen, levelKeys } from "../../components/welcome_screen/viewModel";
import PropTypes from 'prop-types';
// import { connectData } from 'src/redux';
// import { TAB1_SCREEN } from 'src/navigation';
import { setupBackhandler } from '../../components/shared/helperFunc';
import { getAsyncData, setAccessToken, getUserData, getCatIdArrays, emptyCart } from 'AppRedux';
import { TextBold, ButtonBold } from 'AppFonts';
import strings from 'src/res/strings';
import { Actions } from 'react-native-router-flux';
import { SlideShowContainer, UserInput } from 'AppComponent';
import logo from '../../assets/images/logo.png';
import { tokenNotValid } from '../../redux/sagas/asyncKeys'

const styles = EStyle.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '$colorPrimary'
  },
  logo: {
    width: RFPercentage(25),
    height: RFPercentage(16.611),
    marginBottom: 10
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16
  },
  website: {
    position: 'absolute',
    bottom: 30,
    fontSize: 20
  },

  fakeView: {
    height: RFPercentage(10)
  }
});

const animationTime = 0;

class WelcomeScreen extends Component {
  state = {
    appState: AppState.currentState,
    level: 0,
    scale: new Animated.Value(1),

    loading: false,
    login: {
      username: '',
      password: ''
    },
    launch: Date.now(),
    accept: false,
    onImageLoad: false,
    rulesDescription: "",
    situation:""
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.level !== prevState.level) {
      if (this.state.level > 2 && !this.state.rulesDescription) {
        this.getLaws();
      }
    }

    if (this.props.token !== prevProps.token) {

      if (!this.props.token || this.props.token === tokenNotValid) {
        this.lunchSignUp();
      } else {
        this.setToken();
      }
    }

    if (this.props.userInfo) {
      if (this.props.userInfo !== prevProps.userInfo) {
        console.log(this.props.userInfo)
        if (this.props.userInfo && this.props.userInfo.id !== 0) {

          this.goToApp();
        } else {
          this.lunchSignUp();
        }
      }
    }
  }

  backPressSubscriptions = new Set();

  setToken = (data) => {
    let token;
    if (data) {
      this.props.setAccessToken(data);
      this.props.emptyCart();
      token = `${data.token_type} ${data.access_token}`
    } else {
      token = `${this.props.token.token_type} ${this.props.token.access_token}`
    }
    axios.defaults.headers.common[
      'Authorization'
    ] = token;

    this.props.getUserData();
    this.props.getCatIdArrays(-100);

  }

  lunchSignUp = () => {
    setTimeout(() => {
      // Actions.pop();
      this.setState({ level: 1, loading: false, signup: true });
      // Actions.dialogbox({ visible: true, dialogType: 'warning' });
    }, animationTime - (Date.now() - this.state.launch - 500));
  };

  goToApp = () => {
    Actions.reset('tabs');
    // setTimeout(() => {
    //   // Actions.pop();
    //   Actions.reset('tabs');
    //   // Actions.dialogbox({ visible: true, dialogType: 'warning' });
    // }, animationTime - (Date.now() - this.state.launch - 500));
  };

  handleBackPress = () => {
    if (this.state.level === 2 || this.state.level === 3) {
      this.setState({ level: 1 });
      return true;
    } else if (this.state.level > 3) {
      this.setState((prevState) => ({ level: prevState.level - 1 }));
      return true;
    }
    BackHandler.exitApp();

    return false;
  };

  getLaws = async () => {
    if (this.state.rulesDescription) {
      return;
    }
    try {

      const lawData = await getAbrikarLaw();

      this.setState({ rulesDescription: lawData.description })

    } catch (err) {
      console.log(err)

    }
  }

  _handleAppStateChange = (nextAppState) => {

    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (this.state.signup) {
        // this.setState({ onImageLoad: false })
      } else if (Actions.currentScene == 'welcome') {
        this.props.getAsyncData();
        if (!this.props.token) {
          this.lunchSignUp();
        } else {
          this.setToken();
        }
      }
    }
    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide
    );
    AppState.addEventListener('change', this._handleAppStateChange);
    setupBackhandler(this.backPressSubscriptions);

    this.backPressSubscriptions.add(this.handleBackPress);

    this.props.getAsyncData();

    // if (__DEV__) {
    // this.props.saveUserData(null)
    // this.props.setAccessToken(null);
    //   this.props.setAccessToken({
    //     access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlNTkxYTk5N2I4MTBmYzYxZmM0M2E3YmY4YmE5N2RkOTlmYzFlNzBjYzU1MWY3NzVkYTYzMDA1Njc2YzJmOTVkMmJiZWVkYTQ3NDQ4NTNiIn0.eyJhdWQiOiIxIiwianRpIjoiNWU1OTFhOTk3YjgxMGZjNjFmYzQzYTdiZjhiYTk3ZGQ5OWZjMWU3MGNjNTUxZjc3NWRhNjMwMDU2NzZjMmY5NWQyYmJlZWRhNDc0NDg1M2IiLCJpYXQiOjE1NzU4OTI1ODUsIm5iZiI6MTU3NTg5MjU4NSwiZXhwIjoxNjA3NTE0OTg1LCJzdWIiOiIyNiIsInNjb3BlcyI6WyIqIl19.Cu2Bb3RXiOZtvLUNvZK6bT93keCCKTQzdEZdULFpGJA2W3EGlIvChUAqCvMAk8BHtf7kQ9deNk3Kb0ZpCOlFpbDEGfyHEtSNSoAcKdyNDObaxXS1KcCFC_CfQmJ3YX4R0Nxco2SG1lw7eRIAB05dD2XypglmvVC53gs-9XlrXvIU7WNWCFES9gyTnsesPIwmCwtUE2q5NJWb8OYt3LyY8VUbXRt1c4Mp3X5KKz-I2mDF2ASCK9n43ehcmTpFHfJ0C8JS_6JH9GWPQZtAwYiSRvLc7JHUZ1hAsiG5ABlydxzeKBzIsNIBDiOj778ydSA9CCiz-ASc2ES-wUvZxKJNPq72g60VbP2hp_2t5LaumgN83b_ooKNWpYtqd16mm9gQUY_aEswn4W9Kwqi9PSjcTuhwkSyLkb62lO6UKnx617PPiNXdIyGxJTt7tIGiBbUQT-6hyEsHmeQFLHFkwjklB3hWRlIz_PFdBspBhowRbsjltCN9e4lvh8ukx_rFAVznpQq74sYQKEo44ukPST_nc8WWdgB5SsRUfus-xiyB_QJyxq27qhFVnqGpmLIzKwlhosyDPQPl8DQW6rXPYALiGF0-O6LBDAwVXijVfYcHjazZwoLXw7oHnyzhuRB3SXWPAYRJPzLGlwMjogPxpHmnI65mup-AxwVWFWVRphMkksM",
    //     expires_in: "31622397",
    //     refresh_token: "def50200f8323e475f96439bd0bdc3626fd394b7ffc977173c67e43686a53a06957d8de9dc570f140b917c765b84013c61949865998d2ff4e2a6aceb68921d8a1e72b4627765712a753b834b0d4910a1d2f9da76f24326fc57260e40dc314d84bdbccf1b13a8266527e257d0a0ab91d4659186cbcbfc711c7d8a0292c18319745e276ba574778c24b0237dbb6e59dd55ff339a255ba7ebf57b64f01ea716235fc596eb6ce88f6161313bf978d5a503cfcc4db4068b9dcec9f3a8360146d5d01e76eb346475ed2fd1579f6ea30c9e717f0ddcde6ec08d3a7e37f6a5b9aa88b13d7caac7f58b3ae751f36972b663304b6fb13fd92b17f60057a939e7d0e63cb4e3174e7ada7d08e676d36d5badf31a1e2c6b7a5a31f7d1651e4ff8166eea3ad232962d4e16bbbb241974dfdba2078f7f5f8d3999f36915993da494067f7f320392d6d805440f07c8d175b7b24ab6ef960c4ef5b73e2e6492b28e8a392d54a3f6f2bbc30f6dca",
    //     token_type: "Bearer"
    //   });
    //   setTimeout(()=>{
    //     this.props.getAsyncData();

    //   },1000)
    // }

  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    AppState.removeEventListener('change', this._handleAppStateChange);
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    this.backPressSubscriptions.clear();
  }

  keyboardWillShow = (event) => {
    Animated.spring(this.state.scale, {
      toValue: 0.8,
      friction: 4,
      useNativeDriver: true
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.spring(this.state.scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  };



  // registerationApi = (value, again) => {
  //   switch (this.state.level) {
  //     case 8 || again:
  //       return this.requestRegCode('phone');
  //     case 9:
  //       return this.requestRegCode('validation', value);
  //     default:
  //       return true;
  //   }
  // };

  nextLevel = (value, again) => {
    //check mobile correction
    // if (!this.registerationApi(value, again)) {
    //   return;
    // }
    console.log(this.state.level, levelLen)

    if (this.state.level < levelLen - 1) {
      this.setState((prevState) => ({ level: prevState.level + 1 }), () => {
        // const currentLevelKey = Object.keys(levelKeys)[this.state.level]
        // console.log(levelKeys[currentLevelKey], levelKeys.IMAGE)

        // if (levelKeys[currentLevelKey] === levelKeys.IMAGE) {
        //   this.setState({ onImageLoad: true })
        // }
      });
    }

  };

  // requestCodeAgain = () => {
  //   axios({
  //     method: 'POST',
  //     url: '/forgot_password/request_confirmation_code',
  //     data: JSON.stringify({ mobile: this.state.phoneNumber }),
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  // onFullFill = (isValid, code) => {
  //   console.log(code);
  //   console.log(isValid);
  //   this.nextLevel(code);
  // };

  render() {
    const translateYScale = this.state.scale.interpolate({
      inputRange: [0, 1],
      outputRange: [-250, 0]
    });
    const translateYImage = this.state.scale.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0]
    });
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: translateYScale }] }
        ]}
      >
        <Animated.Image
          style={[
            styles.logo,
            {
              transform: [
                {
                  scale: this.state.scale
                },
                { translateY: translateYImage }
              ]
            }
          ]}
          source={logo}
        />

        <SlideShowContainer
          store={WelcomeStore}
          loading={this.state.loading}
          setToken={this.setToken}
          reEnterPhone={() => this.setState({ level: 8 })}
          requestCodeAgain={() => this.requestRegCode('phone')}
          onFullFill={this.onFullFill}
          nextLevel={this.nextLevel}
          level={this.state.level}
          setLogin={this.setLogin}
          login={this.login}
          accept={this.state.accept}
          animationTime={animationTime}
          rulesDescription={this.state.rulesDescription}
          goToLogin={() => {
            this.setState({ level: 2 });
          }}
          goToRegister={() => {
            this.setState({ level: 3 });
          }}
          goToForgetPass={() => {
            this.setState({ level: 7, situation:'forget' });
          }}
          onAccept={() =>
            this.setState((prevState) => ({ accept: !prevState.accept }))
          }
          onAnimationFinished={() => this.setState({ loading: true })}
        />
        {this.state.loading ? <ActivityIndicator color="#fff" /> : null}
        <TextBold
          weight="light"
          fontSize="size9"
          color="white"
          textStyle={styles.website}
        >
          {strings.website}
        </TextBold>
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAsyncData: () => dispatch(getAsyncData()),
    setAccessToken: (token) => dispatch(setAccessToken(token)),
    getUserData: () => dispatch(getUserData()),
    getCatIdArrays: (id) => dispatch(getCatIdArrays(id)),
    emptyCart: () => dispatch(emptyCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen);

WelcomeScreen.propTypes = {
  setAccessToken: PropTypes.func.isRequired,
  getAsyncData: PropTypes.func.isRequired,
  token: PropTypes.shape({})
};

WelcomeScreen.defaultProps = {
  token: null
};
