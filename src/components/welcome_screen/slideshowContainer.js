/* eslint-disable indent */
import React, { PureComponent } from 'react';
import {
  View,
  Platform,
  Animated,
  UIManager,
  LayoutAnimation
} from 'react-native';

import Animation from 'lottie-react-native'
import { observer } from 'mobx-react';
import { mainStyles } from 'app-styles';
import strings from 'src/res/strings';
import { ButtonBold, TextBold, ValidationTextInput } from 'AppFonts';
import UserInput from './userInput';
import logoText from '../../assets/animation/welcomeAnimation2.json';
import { levelKeys } from "./viewModel";
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Login = (props) => {
  return (
    <View style={mainStyles.inputFieldContainer}>
      <ValidationTextInput
        validation={['mobile']}
        dark
        label={strings.mobileNum}
        containerStyle={{ marginBottom: 10 }}
        fontSize="size7"
        keyboardType="numeric"
        textStyle={[mainStyles.inputFieldText, { textAlign: 'left' }]}
        onChangeText={(text) => props.setLogin(text, 'username')}
      />
      <ValidationTextInput
        label={strings.password}
        dark
        secureTextEntry={true}
        fontSize="size7"
        containerStyle={{ marginBottom: 10 }}
        textStyle={[mainStyles.inputFieldText, { textAlign: 'left' }]}
        onChangeText={(text) => props.setLogin(text, 'password')}
      />
      <ButtonBold
        fontSize="size7"
        containerStyle={[mainStyles.nextButton, { alignSelf: 'center' }]}
        color="white"
        onPress={props.login}
      >
        {strings.login}
      </ButtonBold>
    </View>
  );
};

const RetryValidation = (props) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <TextBold color="white" fontSize="size6">
          {props.remainTime}
        </TextBold> */}
        <ButtonBold
          key={100}
          containerStyle={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            margin: 10,
            marginTop: 20,
            // opacity: props.remainTime === 0 ? 1 : 0.6
          }}
          onPress={() => {
            // if (props.remainTime === 0) {
            props.requestCodeAgain(0);
            // }
          }}
          iconStyle={{ margin: 2, color: '#fff' }}
          color="white"
          iconName="redo"
          fontSize="size5"
          weight="light"
        >
          {strings.resendCode}
        </ButtonBold>
      </View>
      <ButtonBold
        key={101}
        containerStyle={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          margin: 10
        }}
        onPress={props.reEnterPhone}
        iconStyle={{ margin: 2, color: '#fff' }}
        color="white"
        iconName="mobile"
        fontSize="size5"
        weight="light"
      >
        {strings.changePhoneNum}
      </ButtonBold>
    </View>
  );
};

@observer
class SlideShowContainer extends PureComponent {
  state = {
    animate: new Animated.Value(0),
    show: true,
    // remainTime: 60
  };

  resenCodeTimer = () => {
    this.timer = setInterval(() => {
      if (this.state.remainTime > 0) {
        this.setState((prevState) => ({
          remainTime: prevState.remainTime - 1
        }));
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  };

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  renderChild = (level) => {
    // if (this.timer) {
    //   clearInterval(this.timer);
    //   this.setState({ remainTime: 60 });
    // }

    let topInput = strings.nameInput;
    let type;
    let btnTitle = strings.continue;
    let nextLevel = this.props.nextLevel;
    let value;
    let onValueChange;
    let bottomDetails = null;
    let deactive;

    let title;
    const currentLevelKey = Object.keys(levelKeys)[level]
    console.log(levelKeys[currentLevelKey])
    switch (levelKeys[currentLevelKey]) {
      case levelKeys.ANIMATION:
        return (
          <Animation
            source={logoText}
            style={{ width: '60%' }}
            progress={this.state.animate}
          />
        );
      case levelKeys.SIGNUPLOGIN:
        return (
          <>
            <ButtonBold
              color="white"
              fontSize="size9"
              border={{border:1}}
              textStyle={{ width:100, margin: 3, borderRadius: 10, borderWidth: 1, borderColor: '#fff', padding:7}}
              onPress={this.props.goToLogin}
            >
              {strings.login}
            </ButtonBold>
            <ButtonBold
              color="white"
              fontSize="size9"
              textStyle={{ width:100,margin: 3, borderRadius: 10, borderWidth: 1, borderColor: '#fff', padding:7}}
              onPress={this.props.goToRegister}
            >
              {strings.register}
            </ButtonBold>
            <ButtonBold
              color="white"
              fontSize="size7"
              textStyle={{ margin: 5}}
              onPress={this.props.goToForgetPass}
            >
              {strings.forgetPass}
            </ButtonBold>
          </>
        );
      case levelKeys.LOGIN:
        return (
          <Login setLogin={this.props.store.setLogin}
            login={() => this.props.store.login(this.props.setToken)} />
        );

        case levelKeys.FORGET:
          return (
            <Login setLogin={this.props.store.setLogin}
              login={() => this.props.store.login(this.props.setToken)} />
          );

      case levelKeys.USERFULLNAME:
        value = this.props.store.userInfo;
        onValueChange = this.props.store.setUserInfo;
        type = 'textSimple';
        title = 'basicInfo';
        break;
      case levelKeys.PASSWORD:
        value = this.props.store.userInfo;
        onValueChange = this.props.store.setUserInfo;
        title = 'pass';
        type = 'textSimple';
        break;
      case levelKeys.IMAGE:
        topInput = strings.imageInput;
        value = this.state.avatarSource;

        onValueChange = this.props.store.setImagePath;
        type = 'imgInput';
        break;
      case levelKeys.TERMS:
        type = 'acceptRulesInput';
        onValueChange = this.props.onAccept;
        value = this.props.accept;
        deactive = !this.props.accept;

        btnTitle = strings.confirm;
        title = strings.acceptRules;
        break;

      case levelKeys.PHONENUMBER:
        topInput = strings.enterPhoneNum;
        type = 'numSimple';
        value = this.props.store.userInfo;
        onValueChange = this.props.store.setUserInfo;
        const nextLevelTemp = nextLevel;
        nextLevel = () => {
          this.props.store.registration(null, null, null, nextLevelTemp);

        }
        break;
      case levelKeys.CONFIRMATION:
        // this.resenCodeTimer();
        topInput = strings.enterConfirmCode;
        type = 'numCode';
        onValueChange = (isMatching, activationCode) => {
          console.log(activationCode)
          this.props.store.registration(null, activationCode, this.props.setToken)
          // this.props.onFullFill
        }
        bottomDetails = (
          <RetryValidation
            // remainTime={this.state.remainTime}
            requestCodeAgain={this.props.requestCodeAgain}
            reEnterPhone={this.props.reEnterPhone}
          />
        );
        break;

      default:
        null;
    }

    return (
      <UserInput
        gender={this.props.store.gender}
        topInput={topInput}
        type={type}
        btnTitle={btnTitle}
        nextLevel={nextLevel}
        value={value}
        onValueChange={onValueChange}
        bottomDetails={bottomDetails}
        title={title}
        deactive={deactive}
        error={this.props.store.error}
        loading={this.props.loading}
        description={this.props.rulesDescription}
      />
    );
  };

  componentDidMount() {
    Animated.timing(this.state.animate, {
      toValue: 1,
      duration: this.props.animationTime
    }).start(() => {
      this.props.onAnimationFinished();
    });

  }

  sweepAnimation = () => {
    LayoutAnimation.linear();
    this.setState({ show: false }, () => {
      setTimeout(() => {
        LayoutAnimation.linear();
        this.setState({
          show: true
        });
      }, 2500);
    });
  };

  render() {
    return (
      <>
        {this.state.show ? this.renderChild(this.props.level) : null}
      </>
    );
  }
}

export default SlideShowContainer;
