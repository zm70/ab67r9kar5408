/* eslint-disable prettier/prettier */
import React from 'react';
import { Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ButtonBold, TextBold } from 'AppFonts'
import Dialog, {
  DialogContent,
  SlideAnimation,
  DialogFooter
} from 'react-native-popup-dialog';
import { mainStyles } from "app-styles";
import strings from 'src/res/strings.json'
import { AnimationAux, RetryAux } from "AppAux";
import { CreateBusinessDialogContent } from "./createBusinessDialogContent";
import { paymentForBusiness, getAccounts, toEnglishConverter } from "AppServices";
import styles from './style';
import { startLoadingDialog, errorUpdateDialog } from '../shared/navigation';


class DialogCreateBusiness extends React.Component {
  state = {
    reagent_code: 0,
    account_id: null,
    loadingThen: false,
    visible: false,
    loading: false,
    accounts: [{ label: '', value: '' }],
    msg: '',
    goToOrderingPage: false,
    resultMsg: null,
    linkingPay: ''
  };


  fetchAccounts = async () => {
    this.setState({ loading: true });
    try {
      const labels = await getAccounts();

      const accounts = labels.map((item) => ({
        label: ` ${item.duration}  ${item.label} ${item.cost} ${strings.hezarToman}`,
        value: item.id
      }));
      // console.log(accounts);
      this.setState({ accounts, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  componentDidMount() {
    this.setState({ visible: true });
    this.fetchAccounts()
  }

  componentWillUnmount() {
    if (this.setInitialAccount) {
      clearInterval(this.setInitialAccount)
    }
  }

  setInitialAccount = () => {
    console.log(this.props.accounts[0].value);

  };

  exitDialogbox = () => {
    this.setState({ visible: false, stillVisible: false });

  };

  onDismiss = () => {
    // if (!this.state.loadingThen) {
    Actions.pop();
    // }
    this.props.popCallback && this.props.popCallback();
    if (this.finalStateInterval) {
      clearInterval(this.finalStateInterval);
    }
  };

  onPickerSelect = (value) => {
    this.setState({ account_id: value }, () => console.log(this.state))
  }

  finalStateInterval;


  createBusiness = async () => {
    const { reagent_code, account_id } = this.state;
    if (!account_id) {
      // Actions.dialogbox({
      //   dialogType: 'alert',
      //   msg:strings.
      // })
      return;
    }
    try {
      this.setState({ loading: true })
      const data = await paymentForBusiness({
        business_id: this.props.bId,
        reagent_code,
        account_id
      })
      // this.setState({ visible: false, })
      if (data.link) {
        // Actions.refresh({ stillVisible: false })
        // this.finalStateInterval = setInterval(() => {
        // if (!("" + Actions.currentScene).includes('dialogbox')) {
        this.setState({ loading: false, linkingPay: data.link }, () => {
          Linking.openURL(data.link).catch((err) =>
            console.error('An error occurred', err)
          );
        });
        //   }
        // }, 20)


      }

    } catch (err) {
      console.log(err)
      this.setState({ loading: false, resultMsg: strings.failedUpdate })
      // errorUpdateDialog(err)
    }

  }

  setReagentCode = (text) => {
    const reagent_code = toEnglishConverter(text)
    this.setState({ reagent_code })
  }

  render() {
    const { stillVisible = true } = this.props;


    return (
      <Dialog
      animationDuration={100}
        dialogStyle={styles.commonDialogWrapper}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
        onDismiss={this.onDismiss}
        visible={this.state.visible && stillVisible}
        onTouchOutside={this.exitDialogbox}
        onHardwareBackPress={() => {
          this.exitDialogbox();
          return true;
        }}
        footer={
          <DialogFooter>
            <ButtonBold
              fontSize="size8"
              color="white"
              onPress={() => {
                if (this.state.account_id) {
                  this.createBusiness()
                }

              }}
              containerStyle={[
                styles.button,
                mainStyles.backOrange,
                { borderRadius: 10 }
              ]}
            >
              {strings.pay}
            </ButtonBold>
          </DialogFooter>
        }
      >
        <DialogContent style={[styles.simpleListWrapper]}>
          <AnimationAux loading={this.state.loading}>
            <RetryAux
              dataLoaded={this.state.accounts[0].label}
              retry={this.fetchAccounts}
            >
              {this.state.resultMsg ?
                <TextBold color="red" fontSize="size6">
                  {this.state.resultMsg}
                </TextBold> : null}
              <CreateBusinessDialogContent
                accounts={this.state.accounts}
                onPickerSelect={this.onPickerSelect}
                setReagentCode={this.setReagentCode} />
            </RetryAux>
          </AnimationAux>
        </DialogContent>

      </Dialog>
    );
  }
}

export default DialogCreateBusiness;
