/* eslint-disable indent */
import strings from 'src/res/strings.json';
import { observable, toJS } from "mobx";
import { axios, userLogin, userSignup, askRegistrationCode } from 'AppServices';
import { updateObject } from 'AppUtils';
import { Actions } from "react-native-router-flux";
import { userInfo } from "./viewModel";
import {
    checkmobile,
    checkIsPersian,
    checkpassword
} from '../../services/validation';
import { startLoadingDialog, errorUpdateDialog } from "../shared/navigation";

class ObservableWelcome {


    @observable gender = "male"

    @observable userInfo = userInfo;

    @observable error = true;

    @observable loading = false;

    @observable loginInfo = {
        username: '',
        password: ''
    }

    @observable level = 0;

    registration = async (state, activationCode, setToken, nextLevel) => {
        console.log(activationCode)
        startLoadingDialog(strings.loadingLogin);
        try {
            let res;
            if (activationCode) {
                this.loading = true;
                const body = {
                    'mobile': `${this.userInfo.phoneNumber.value}`,
                    'activation_code': `${activationCode}`,
                    'fname': `${this.userInfo.fname.value}`,
                    'lname': `${this.userInfo.lname.value}`,
                    'gender': `${this.userInfo.gender.value}`,
                    'password': `${this.userInfo.password.value}`,
                    'password_confirmation': `${this.userInfo.confirmPassword.value}`
                };

                res = await userSignup(body);

            } else {
                res = await askRegistrationCode(this.userInfo.phoneNumber.value);

            }
            console.log(res)
            Actions.refresh({ stillVisible: false })
            if (res.status == 200 || res.status == 201 || res.status === 'success') {
                if (res.data.access_token || res.data.data.access_token) {
                    if (res.data.data) {
                        setToken(res.data.data);
                    } else {
                        setToken(res.data);
                    }
                    return true;
                } else {
                    nextLevel()
                    return true
                }

            }

        } catch (err) {
            this.loading = false;
            errorUpdateDialog(err)
        }

        return true;
    };

    setUserInfo = (text, error, name) => {

        if (name === "gender") {
            this.gender = text
        }
        this.userInfo[name].value = text;
        this.userInfo[name].error = error;
        let anyError = true;

        if (name === 'gender') {
            anyError =
                this.userInfo.lname.error && this.userInfo.fname.error;
        }
        if (name === 'phoneNumber') {
            if (!checkmobile(text)) {
            } else { anyError = false; }
        }

        if (name === 'fname' || name === 'lname') {
            if (!checkIsPersian(text)) { anyError = true; } else {
                anyError =
                    name === 'fname'
                        ? this.userInfo.lname.error
                        : this.userInfo.fname.error;
            }
        }

        if (name === 'password') {
            if (!checkpassword(text)) {
            } else {
                anyError = this.userInfo.confirmPassword.error;
            }
        }
        if (name === 'confirmPassword') {
            if (text !== this.userInfo.password.value) {
            } else {
                anyError = this.userInfo.password.error;
            }
        }

        this.error = anyError;
        console.log(toJS(this.userInfo))
    };

    setLogin = (text, name) => {
        this.loginInfo[name] = text;
    };


    login = (setToken) => {
        startLoadingDialog(strings.loadingLogin);
        userLogin(toJS(this.loginInfo))
            .then(({ data, status }) => {
                if (data.access_token) {
                    Actions.refresh({
                        stillVisible: false,
                        popCallback: () => setToken(data)
                    })

                }
                if (status === 'success') {
                    return true;
                }
            })
            .catch((err) => {
                errorUpdateDialog()
            });
    };

    setImagePath = (base64Img) => {
        this.userInfo.picture = [{ path: base64Img }]
        //no image exist in endpoint and no answer recieved yet
        console.log(base64Img)
    }

}

const WelcomeStore = new ObservableWelcome();

export default WelcomeStore;
