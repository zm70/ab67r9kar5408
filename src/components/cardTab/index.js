import React from 'react';
import {
  View,
  Animated,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { mainStyles } from 'app-styles';
import { NotFound } from 'AppComponentShared';
import { TextBold, ButtonBold, Icon } from 'AppFonts';
import strings from 'src/res/strings.json';
import propTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { getAsyncUserCart } from 'AppRedux';
import { CardWrapper } from './cartWrapper';
import { cardSelectAddress } from "../shared/navigation";

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class CartTab extends React.PureComponent {
  state = {
    structuredItemsByParent: {},
    costs: [],
    costsWithoutDiscount: [],
    postCost: []
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cartItems !== prevProps.cartItems) {
      if (this.props.cartItems) this.updateCartItems();
    }
  }


  componentDidMount() {
    this.props.getAsyncUserCart();
  }

  updateCartItems = () => {
    const cartItem = this.props.cartItems;

    const cartItemsArray = Object.keys(cartItem).map((key) => ({
      parentName: cartItem[key].parentName,
      product_key: cartItem[key].product_key,
      key,
      post_cost: cartItem[key].post_cost,
      name: cartItem[key].name,
      price: cartItem[key].price,
      count: cartItem[key].count,
      brand: cartItem[key].brand,
      images: cartItem[key].image,
      discount: cartItem[key].discount
    }));

    const structuredItemsByParent = cartItemsArray.reduce(
      (result, currentVal) => {
        (result[currentVal['parentName']] =
          result[currentVal['parentName']] || []).push(currentVal);
        return result;
      },
      {}
    );

    const costs = {};
    const costsWithoutDiscount = {};
    const postCost = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const key in structuredItemsByParent) {
      if (structuredItemsByParent.hasOwnProperty(key)) {
        costs[key] = structuredItemsByParent[key].reduce(
          (prevValue, currentValue) => {
            return (
              prevValue +
              +currentValue.count *
              currentValue.price *
              (1 - currentValue.discount / 100)
            );
          },
          0
        );
        costsWithoutDiscount[key] = structuredItemsByParent[key].reduce(
          (prevValue, currentValue) => {
            return prevValue + +currentValue.count * currentValue.price;
          },
          0
        );
        postCost[key] = structuredItemsByParent[key].reduce(
          (prevValue, currentValue) => {
            return prevValue + +currentValue.post_cost;
          },
          0
        );
      }
    }

    const totalItemsCost = Object.keys(costs).reduce(
      (prevValue, currentVal) => prevValue + +costs[currentVal],
      0
    );
    const totalPostsCost = Object.keys(postCost).reduce(
      (prevValue, currentVal) => prevValue + +postCost[currentVal],
      0
    );

   
    // console.log(structuredItemsByParent, totalCost, costs);
    // Object.keys(structuredItems).map((key) => {
    //   const cost = {};
    //   cost[key] = structuredItems[key].reduce((prevValue, currentValue) => {
    //     return prevValue + +currentValue.price;
    //   }, 0);
    //   return cost;
    // });

    this.setState({
      structuredItemsByParent,
      costsWithoutDiscount,
      costs,
      totalCost: totalItemsCost + (totalPostsCost || 0)
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {Object.keys(this.props.cartItems).length > 0 ? (
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                paddingBottom: 10
              }}
            >
              {Object.keys(this.state.structuredItemsByParent).map(
                (parentKey) => (
                  <CardWrapper
                    key={parentKey}
                    eachShopItems={
                      this.state.structuredItemsByParent[parentKey]
                    }
                    parentKey={parentKey}
                    totalShopCost={this.state.costs[parentKey]}
                    totalShopCostWithoutDiscount={
                      this.state.costsWithoutDiscount[parentKey]
                    }
                    postCost={this.state.postCost[parentKey]}
                  />
                )
              )}
            </ScrollView>

            <View style={{ padding: 10 }}>
              <TextBold
                fontSize="size7"
                weight="bold"
                textStyle={{ alignSelf: 'flex-start', margin: 5 }}
              >
                {strings.totalCost}
                {Math.floor(this.state.totalCost)}
                {strings.toman}
              </TextBold>
              <ButtonBold
                containerStyle={[mainStyles.backOrange, { padding: 10 }]}
                color="white"
                fontSize="size8"
                onPress={cardSelectAddress}
              >
                {strings.ordering}
              </ButtonBold>
            </View>
          </View>
        ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}            >
              <NotFound msg={strings.noOrder} />
            </View>
          )}
      </View>
    );
  }
}

CartTab.propTypes = {
  cartItems: propTypes.shape({}),
  getAsyncUserCart: propTypes.func
};
CartTab.defaultProps = {
  cartItems: {},
  getAsyncUserCart: () => { }
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.shop.cartItem
  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    getAsyncUserCart: () => dispatch(getAsyncUserCart())
  };
};

export default connect(
  mapStateToProps,
  dispatchMapToProps
)(CartTab);
