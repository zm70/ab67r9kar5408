import { Actions } from 'react-native-router-flux';
import strings from 'src/res/strings.json';

export const loadingErrorDialog = (positiveFunc, ...args) => {
    console.log(Actions.currentScene)
    if (Actions.currentScene != 'error') {
        console.log('Actions.currentScene')
        Actions.dialogbox({
            dialogType: 'error',
            errorMsg: strings.loadingError,
            positiveButton: strings.tryAgain,
            negativeButton: strings.reject,
            onNegativePressed: () => Actions.pop(),
            onPositivePressed: () => {
                Actions.pop();
                // positiveFunc(args);
            }
        });
    }
};