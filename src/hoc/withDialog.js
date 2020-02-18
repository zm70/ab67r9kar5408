import React, { useState } from 'react';
import { View } from 'react-native';

import AlertDialog from '../components/popupDialog/alertDialog';
import ConfirmDialog from '../components/popupDialog/confirmDialog';
import LoadingDialog from '../components/popupDialog/loadDialog';
import WarningDialog from '../components/popupDialog/warningDialog';

export function withDialog(WrappedComponent, ...props) {
  return class DialogAux extends React.Component {
    state = {
      showLoading: false,
      showConfirm: false,
      showAlert: false,
      msg: '',
      type: ''
    };

    dismissAlert = () => {
      this.setState({ showAlert: false });
    };

    dismissLoading = () => {
      this.setState({ showLoading: false });
    };

    dismissConfirm = () => {
      this.setState({ confirm: false });
    };

    dismissWarning = () => {
      this.setState({ showWarning: false });
    };

    showAlert = () => {
      this.setState({ showAlert: true });
    };

    showLoading = () => {
      this.setState({ showLoading: true });
    };

    showConfirm = () => {
      this.setState({ confirm: true });
    };

    showWarning = () => {
      this.setState({ showWarning: true });
    };

    setMessage = (msg) => {
      this.setState({ msg });
    };

    setType = (msg) => {
      this.setState({ msg });
    };

    render() {
      return (
        <View style={{ flex: 1 }}>
          <AlertDialog
            msg={this.state.msg}
            visible={this.state.showAlert}
            dismiss={this.state.dismissAlert}
            type={this.state.type}
          />
          <LoadingDialog
            msg={this.state.msg}
            visible={this.state.showLoading}
            dismiss={this.state.dismissLoading}
            type={this.state.type}
          />

          <ConfirmDialog
            msg={this.state.msg}
            visible={this.state.showConfirm}
            dismiss={this.state.dismissConfirm}
            confirm={this.state.confirm}
            onDismiss={this.state.onDismiss}
          />
          <WarningDialog
            visible={this.state.showWarning}
            dismiss={this.state.dismissWarning}
          />

          <WrappedComponent
            dismissAlert={this.dismissAlert}
            dismissWarning={this.dismissWarning}
            dismissLoading={this.dismissLoading}
            dismissConfirm={this.dismissConfirm}
            showAlert={this.showAlert}
            showWarning={this.showWarning}
            showLoading={this.showLoading}
            showConfirm={this.showConfirm}
            setMessage={this.setMessage}
            setType={this.setType}
            {...props}
          />
        </View>
      );
    }
  };
}
