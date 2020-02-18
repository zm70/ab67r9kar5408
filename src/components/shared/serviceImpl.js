/* eslint-disable indent */
import { followBusinessById } from "AppServices";
import strings from "src/res/strings.json";
import { checkCautianMsg } from "./helperFunc";
import { successUpdateDialog, errorUpdateDialog } from "./navigation";

export const onFollowCB = async (showCautionAgain, body) => {
    checkCautianMsg(showCautionAgain)
    return followBusinessById(body)
        .then((res) => {
            successUpdateDialog(strings.successMsgSubmit);
          
            return true;
        })
        .catch((err) => {
            errorUpdateDialog(err);
            throw err;
        });
};
