import React from 'react';
import { FlatList, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import QRCode from 'react-native-qrcode-svg';

import Dialog, {
  DialogContent,
  SlideAnimation
} from 'react-native-popup-dialog';

import styles from './style';


class DialogBoxBarcode extends React.Component {
  state = {
    dialogType: '',
    loadingThen: false,
    visible: false,
    msg: '',
    goToOrderingPage: false
  };

  componentDidMount() {
    this.setState({ visible: true });

  }

  exitDialogbox = () => {
    this.setState({ visible: false });
    // if (this.props.dialogType !== 'loading') this.setState({ visible: false });
  };

  onDismiss = () => {
    // if (!this.state.loadingThen) {
    Actions.pop();
    // }
    this.props.popCallback && this.props.popCallback();
    this.state.goToOrderingPage && Actions.jump('tabCart');
  };

  render() {
    console.log(this.props)
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

      >
        <DialogContent style={[styles.simpleListWrapper]}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <QRCode
              value={this.props.barcode}
              size={200}
              logoBackgroundColor='transparent'
              color='black' />
          </View>
        </DialogContent>
      </Dialog>
    );
  }
}

export default DialogBoxBarcode;
