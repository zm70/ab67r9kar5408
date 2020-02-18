import { GET_ACCESS_TOKEN, START_SIGN_IN } from '../actions/actionType';

const initialState = {
    token: null
};

export function authReducer(state = initialState, action) {
    // console.log('wepinweogin');
    const { value } = action
    switch (action.type) {
        case GET_ACCESS_TOKEN:
            return {
                ...state,
                token: value
            };
        case START_SIGN_IN:
            return {
                ...state,
                token: ''
            };
        default:
            return state;
    }
}
