/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React, { PureComponent } from 'react';

import {
    View,
    Platform,
    UIManager
} from 'react-native';

import Animation from 'lottie-react-native'

import { mainStyles } from 'app-styles';
import strings from 'src/res/strings';
import { ButtonBold, TextBold, ValidationTextInput } from 'AppFonts';
import UserInput from './userInput';
import logoText from '../../assets/animation/welcomeAnimation2.json';


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


const ForgetPass = (props) => {
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
           
            <ButtonBold
                fontSize="size7"
                containerStyle={[mainStyles.nextButton, { alignSelf: 'center' }]}
                color="white"
                onPress={props.sendNewPass}
            >
                ارسال
            </ButtonBold>
        </View>
    );
};

const RetryValidation = (props) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextBold color="white" fontSize="size6">
                    {props.remainTime}
                </TextBold>
                <ButtonBold
                    key={100}
                    containerStyle={{
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        margin: 10,
                        marginTop: 20,
                        opacity: props.remainTime === 0 ? 1 : 0.6
                    }}
                    onPress={() => {
                        if (props.remainTime === 0) {
                            props.requestCodeAgain(0);
                        }
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

export const renderChildView = (level) => {
    let topInput;
    let type;
    let btnTitle = strings.continue;
    let nextLevel = this.props.nextLevel;
    let value;
    let onValueChange;
    let bottomDetails = null;
    let deactive;
    let title;
    switch (level) {
        case 0:
            return (
                <Animation
                    source={logoText}
                    style={{ width: '60%' }}
                    progress={this.state.animate}
                />
            );
        case 1:
            return (
                <>
                    <ButtonBold
                        color="white"
                        fontSize="size9"
                        textStyle={{ margin: 5 }}
                        onPress={this.props.goToLogin}
                    >
                        {strings.login}
                    </ButtonBold>
                    <ButtonBold
                        color="white"
                        fontSize="size9"
                        textStyle={{ margin: 5 }}
                        onPress={this.props.goToRegister}
                    >
                        {strings.register}
                    </ButtonBold>
                </>
            );
        case 2:
            return (
                <Login setLogin={this.props.store.setLogin}
                    login={() => this.props.store.login(this.props.setToken)} />
            );
        case 3:
            topInput = strings.nameInput;
            value = this.props.store.userInfo;
            onValueChange = this.props.store.setUserInfo;
            type = 'textSimple';
            title = 'basicInfo';
            break;
        case 4:
            topInput = strings.nameInput;
            value = this.props.store.userInfo;
            onValueChange = this.props.store.setUserInfo;
            type = 'textSimple';
            title = 'basicInfo';
            break;
        case 5:
            topInput = strings.nameInput;
            value = this.props.store.userInfo;
            onValueChange = this.props.store.setUserInfo;
            title = 'pass';
            type = 'textSimple';
            break;
        case 6:
            value = this.state.avatarSource;
            onValueChange = this.props.setImage;
            topInput = strings.imageInput;
            type = 'imgInput';
            break;
        case 7:
            type = 'acceptRulesInput';
            onValueChange = this.props.onAccept;
            value = this.props.accept;
            deactive = !this.props.accept;
            btnTitle = strings.confirm;
            title = strings.acceptRules;
            break;

        case 8:
            topInput = strings.enterPhoneNum;
            type = 'numSimple';
            value = this.props.store.userInfo;
            onValueChange = this.props.store.setUserInfo;
            break;
        case 9:
            this.resenCodeTimer();
            topInput = strings.enterConfirmCode;
            type = 'numCode';
            onValueChange = this.props.onFullFill;
            bottomDetails = (
                <RetryValidation
                    remainTime={this.state.remainTime}
                    requestCodeAgain={this.props.requestCodeAgain}
                    reEnterPhone={this.props.reEnterPhone}
                />
            );
            break;
            case 10:
                return (
                    <ForgetPass setLogin={this.props.store.setLogin}
                        login={() => this.props.store.forgetPass(this.props.setToken)} />
                );

        default:
            null;
    }

    return (
        <UserInput
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
        />
    );
}