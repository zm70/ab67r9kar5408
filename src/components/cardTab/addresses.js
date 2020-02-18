import React, { useState } from 'react';
import { FlatList, View, LayoutAnimation, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { mainStyles } from 'app-styles';
import { BoxComponents } from "AppComponentShared";
import { getUserAddress, completeOrder, deleteAddress } from 'AppServices';
import { ButtonBold } from 'AppFonts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addToAddressList, emptyCart, removeFromAddressList } from 'AppRedux';
import { connect } from 'react-redux';
import { AnimationAux, RetryAux } from 'AppAux';
import strings from 'src/res/strings.json';
import { startLoadingDialog, errorUpdateDialog, successUpdateDialog, pushErrorDialog } from "../shared/navigation";
import { cardAddAddress } from "../shared/navigation";
import { androidSimpleAnimation } from "../shared/helperFunc";

androidSimpleAnimation();

class Addresses extends React.Component {
  state = { selectedAddressId: -1, loading: false, linkingPay:'' };

  onBoxSelect = (index, id) => {
    const addresses = this.state.addresses.map((address, addressIndex) => ({
      ...address,
      activated: addressIndex === index
    }));

    this.setState((prevState) => ({
      id,
      addresses
    }));
  };

  deleteAddress = (id) => {
    // Actions.refresh({ dialogType: "loading", loadingThen: false })
    deleteAddress(id)
      .then(res => {
        // successUpdateDialog(strings.successDeleteAddress);
        LayoutAnimation.linear();
        this.props.removeFromAddressList(id)

      })
      .catch(err => {
        pushErrorDialog(err)
        // Actions.dialogbox({ msg: err, dialogType: 'alert' })
        // errorUpdateDialog(err)
      })
  }

  deleteAddressConfirm = (id) => {
    Actions.dialogbox({
      dialogType: 'confirm',
      msg: strings.confirmDeleteAddress,
      onConfirm: () => {
        this.deleteAddress(id)
      }
    });
  }

  renderItem = ({ item, index }) => {
    if (item === 'append') {
      return (
        <ButtonBold
          containerStyle={[
            mainStyles.backOrange,
            {
              paddingBottom: 6,
              width: 100,
              height: 58,
              borderRadius: 5,
              alignSelf: 'flex-end',
              flexDirection: 'row'
            }
          ]}
          textStyle={{ alignSelf: 'center' }}
          fontSize="size6"
          color="white"
          onPress={cardAddAddress}
        >
          + افزودن آدرس
        </ButtonBold>
        
      );
    }
    return (
      <View
        style={{ opacity: item.id === this.state.selectedAddressId ? 1 : 0.7 }}
      >
        <BoxComponents
          key={item.id}
          index={item.id}
          title={item.full_name}
          detail={item.address}
          onChange={() => this.setState({ selectedAddressId: item.id })}
          isActive={item.id === this.state.selectedAddressId}
          name={item.name}
          containerStyle={{ justifyContent: 'flex-end' }}
        />
        <Icon
          name="trash"
          backgroundColor="#3b5998"
          size={20}
          style={{ padding: 10 }}
          onPress={() => this.deleteAddressConfirm(item.id)}
        />

      </View>
    );
  };

  fetchAddresses = () => {
    this.setState({ loading: true });
    getUserAddress()
      .then((data) => {
        console.log(data);
        const addresses = data.map((address) => ({
          ...address,
          activated: false
        }));
        this.props.addToAddressList(addresses);

        this.setState({
          loading: false
        });
      })
      .catch((err) => console.log(err));
  };

  popInterval;

  popupcallback = () => [
    this.popInterval = setInterval(() => {
      if (!("" + Actions.currentScene).includes('dialogbox')) {
        clearInterval(this.popInterval)
        Actions.popTo("tabCartMain");
      }
    }, 50)
  ]

  completingOrder = () => {
    startLoadingDialog(strings.loadingMsgSubmit)
    const body = {};
    body['products'] = Object.keys(this.props.cartItems).map((key) => ({
      id: this.props.cartItems[key].id,
      quantity: this.props.cartItems[key].count
    }));
    body['address_id'] = this.state.selectedAddressId;
    body['description'] = '';
    body['status_payment'] = 0;
    completeOrder(body)
      .then(( res ) => {
        // this.props.emptyCart();
        // Actions.refresh({
        //   dialogType: 'alert',
        //   msg: strings.successMsgOrder,
        //   popCallback: this.popupcallback
        // });
        console.log(res);

        this.setState({ loading: false, linkingPay: res.data.link }, () => {
          Linking.openURL(res.data.link).catch((err) =>
            console.error('An error occurred', err)
          );
        });

       
        // if (res.link) {
          // Actions.refresh({ stillVisible: false })
          // this.finalStateInterval = setInterval(() => {
          // if (!("" + Actions.currentScene).includes('dialogbox')) {
          // this.setState({ loading: false, linkingPay: res.link }, () => {
          //   Linking.openURL(res.link).catch((err) =>
          //     console.error('An error occurred', err)
          //   );
          // });
          //   }
          // }, 20)
  
  
        // }

      })
      .catch((err) => {
        errorUpdateDialog(err)
      });
  };

  componentDidMount() {
    // length 1 because there is an append fake Item to render last item in list and 1 means no address fetched
    if (this.props.addressList.length === 1) {
      this.fetchAddresses();
    }
  }

  render() {
    return (
      <AnimationAux loading={this.state.loading}>
        <RetryAux
          dataLoaded={this.props.addressList.length > 0}
          retry={this.fetchAddresses}
        >
          <FlatList
            data={this.props.addressList}
            renderItem={this.renderItem}
            contentContainerStyle={{ padding: 15 }}
          />

          <ButtonBold
            containerStyle={[
              mainStyles.defaultButton,
              mainStyles.backOrange,
              { width: '100%', padding: 10, alignSelf: 'center' }
            ]}
            color="white"
            fontSize="size9"
            onPress={this.completingOrder}
          >
            {strings.confirm}
          </ButtonBold>
        </RetryAux>
      </AnimationAux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addressList: state.user.addressList,
    selectedAddressId: state.user.selectedAddressId,
    cartItems: state.shop.cartItem
  };
};

const mapPropsToState = (dispatch) => {
  return {
    addToAddressList: (addresses) => dispatch(addToAddressList(addresses)),
    removeFromAddressList: (addresses) => dispatch(removeFromAddressList(addresses)),
    emptyCart: () => dispatch(emptyCart())
  };
};

export default connect(
  mapStateToProps,
  mapPropsToState
)(Addresses);
