import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropsTypes from 'prop-types';
import { ButtonBold, TextBold } from 'AppFonts';
import { subUserCartItem, addUserCartItem } from 'AppRedux';
import { mainStyles } from 'app-styles';
import { connect } from 'react-redux';
import Dialog, {
  DialogFooter,
  DialogContent,
  SlideAnimation
} from 'react-native-popup-dialog';
import colors from 'src/res/colors.json';
import strings from 'src/res/strings.json';
import styles from './style';
import Warning from './warning';
import AddToCart from './addToCart';

class DialogBox extends React.Component {
  state = {
    dialogType: 'loading',
    loadingThen: false,
    visible: false,
    msg: '',
    goToOrderingPage: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dialogType !== this.props.dialogType) {
    }
  }

  componentDidMount() {
    this.setState({ visible: true });

    if (this.props.dialogType === "addToCart") {
      this.props.addUserCartItem(this.props.product)
    }
  }

  exitDialogbox = (cancle) => {
    if (!this.props.loadingThen || cancle) {
      this.setState({ visible: false });
    }
    // if (this.props.dialogType !== 'loading') this.setState({ visible: false });
  };

  popInterval;

  onDismiss = () => {

    this.popInterval = setInterval(() => {
      if (Actions.currentScene == "dialogbox") {
        Actions.pop();
      }
    }, 10)


    this.props.popCallback && this.props.popCallback();
    // this.state.goToOrderingPage && Actions.jump('tabCart');
  };

  componentWillUnmount() {
    if (this.popInterval) {
      clearInterval(this.popInterval)
    }
  }

  orderingProduct = () => {
    this.setState({ goToOrderingPage: true }, this.exitDialogbox);
  };

  render() {
    const { dialogType, msg, stillVisible = true, product } = this.props;

    return (
      <Dialog
        animationDuration={50}
        dialogStyle={
          dialogType === 'warning'
            ? styles.warningDialogWrapper
            : styles.commonDialogWrapper
        }
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
        onDismiss={this.onDismiss}
        visible={this.state.visible && stillVisible}
        onTouchOutside={this.exitDialogbox}

        dialogTitle={
          dialogType === 'addToCart' ? (
            <TextBold fontSize="size9" textStyle={{ alignSelf: 'center' }}>
              {strings.order}
              {product.name}
            </TextBold>
          ) : null
        }
        footer={
          dialogType === 'confirm' ? (
            <DialogFooter>
              <ButtonBold
                fontSize="size8"
                color="green"
                onPress={() => {
                  this.exitDialogbox();
                  this.props.onConfirm();
                }}
                containerStyle={styles.button}
              >
                {strings.confirm}
              </ButtonBold>
              <ButtonBold
                fontSize="size8"
                color="red"
                onPress={() => this.exitDialogbox(true)}
                containerStyle={styles.button}
              >
                {strings.negativeError}
              </ButtonBold>
            </DialogFooter>
          ) : dialogType === 'addToCart' ? (
            <DialogFooter>
              <ButtonBold
                fontSize="size8"
                color="white"
                containerStyle={[
                  mainStyles.backOrange,
                  { padding: 10, flex: 1 }
                ]}
                onPress={this.orderingProduct}
              >
                {strings.order}
              </ButtonBold>
            </DialogFooter>
          ) : null
        }
      >
        {dialogType === 'warning' ? (
          <DialogContent style={[styles.warningBackground]}>
            <Warning {...this.props} />
          </DialogContent>
        ) : (
            <DialogContent style={[styles.dialogWrapper]}>
              {msg ? <TextBold fontSize="size7">{msg}</TextBold> : null}
              {dialogType === 'addToCart' ? (
                <AddToCart
                  product={product}
                  cartItem={this.props.cartItem}
                  subUserCartItem={this.props.subUserCartItem}
                  addUserCartItem={this.props.addUserCartItem}
                />
              ) : null}

              {dialogType === 'loading' ? (
                <>
                  <TextBold fontSize="size8">
                    {this.props.loadingMsg || strings.loading}
                  </TextBold>
                  <ActivityIndicator color={colors.blue} />
                </>
              ) : null}

            </DialogContent>
          )}
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItem: state.shop.cartItem
  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    subUserCartItem: (product) => dispatch(subUserCartItem(product)),
    addUserCartItem: (product) => dispatch(addUserCartItem(product))
  };
};
export default connect(
  mapStateToProps,
  dispatchMapToProps
)(DialogBox);

DialogBox.propTypes = {
  cartItem: PropsTypes.shape({}),
  subUserCartItem: PropsTypes.func,
  addUserCartItem: PropsTypes.func
};

DialogBox.defaultProps = {
  cartItem: {},
  subUserCartItem: () => { },
  addUserCartItem: () => { }
};
