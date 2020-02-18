/* eslint-disable indent */
import strings from 'src/res/strings.json';

export const userInfo = {
    fname: {
        value: '',
        error: true,
        validation: ['require', 'persian'],
        label: strings.fname,
        type: 'simple'
    },
    lname: {
        value: '',
        error: true,
        validation: ['require', 'persian'],
        label: strings.lname,
        type: 'simple'
    },
    gender: {
        value: 'male',
        error: null,
        label: '',
        type: 'check'
    },
    password: {
        value: '',
        error: strings.nameEmptyValidation,
        validation: ['password', 'required'],
        label: strings.password,
        type: 'pass'
    },
    confirmPassword: {
        value: '',
        error: null,
        label: strings.confirmPass,
        validation: ['confirm'],
        type: 'pass'
    },
    phoneNumber: {
        error: true,
        value: '',
        validation: ['mobile', 'required'],
        type: 'number'
    }
}

export const levelKeys = {
    ANIMATION: "animation",
    SIGNUPLOGIN: "signup/login",
    LOGIN: "login",
    USERFULLNAME: "userFullname",
    PASSWORD: "password",
    IMAGE: "image",
    TERMS: "terms",
    PHONENUMBER: "phoneNumber",
    CONFIRMATION: "confirmation",
    FORGET: "signup/forgetPass",
}

export const levelLen = Object.keys(levelKeys).length