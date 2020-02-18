import React from 'react';
import { View, Text } from 'react-native';

import { ButtonBold, TextBold } from 'AppFonts';
import { useDispatch, useSelector } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { CartItemInfo } from 'AppComponentShared';
import strings from 'src/res/strings.json';
import { IncDecButtons } from '../dialogbox/addToCart';
import {
  ADD_USER_CART_ITEMS,
  SUB_CART_ITEMS
} from '../../redux/actions/actionType';
import { confirmDeleteCartItem } from "../shared/navigation";

const styles = EStyleSheet.create({
  cartWrapper: {
    padding: 10,
    elevation: 4,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5
  },
  mainButton: {
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 4,
    padding: 10
  },
  seprator: {
    width: '100%',
    height: 2,
    backgroundColor: '$colorLightGray',
    margin: 5
  },
  cartItemWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '$colorLightGray',
    flex: 1,
    margin: 5
  },
  countWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10
  }
});

const Auxillary = props => props.children;

const calcFinalCost = (listProducts) => {
  const count = useSelector(
    (state) =>
      (state.shop.cartItem[props.product_key] &&
        state.shop.cartItem[props.product_key].count) ||
      0
  );
  return;
};

const subUserCartItem = (dispatch, product, count) => {
  if (count === 1) {
    confirmDeleteCartItem(product.product_key, dispatch)
    return
  }
  dispatch({
    type: SUB_CART_ITEMS,
    product
  })
}

const addUserCartItem = (dispatch, product) => {
  dispatch({
    type: ADD_USER_CART_ITEMS,
    product
  })
}

const CardItem = (props) => {
  const dispatch = useDispatch();
  // const count = useSelector(
  //   (state) =>
  //     (state.shop.cartItem[props.product_key] &&
  //       state.shop.cartItem[props.product_key].count) ||
  //     0
  // );

  return (
    <View style={styles.cartItemWrapper}>
      <CartItemInfo
        name={props.name}
        price={Math.floor(props.price)}
        uri={props.images}
        dispatch={dispatch}
        product_key={props.product_key}
      />
      <View style={styles.countWrapper}>
        <IncDecButtons
          dispatch={dispatch}
          count={props.count}
          addUserCartItem={(product) => addUserCartItem(dispatch, product)}
          subUserCartItem={(product) => subUserCartItem(dispatch, product, props.count)}
          product={props}
        />
        <TextBold fontSize="size8" textStyle={{ margin: 5 }}>
          {strings.count}
        </TextBold>
      </View>
    </View>
  );
};

export const CardWrapper = ({
  parentKey,
  eachShopItems,
  totalShopCost,
  totalShopCostWithoutDiscount
}) => {
  console.log(totalShopCost, eachShopItems);
  const post_cost = eachShopItems.reduce(
    (prevValue, currentValue) => {
      return prevValue + +currentValue.post_cost;
    },
    0
  );

  return (
    <View style={styles.cartWrapper}>
      <TextBold
        textStyle={{ padding: 10, alignSelf: 'flex-end' }}
        fontSize="size7"
      >
        {strings.shopWord}
        {parentKey}
      </TextBold>
      {eachShopItems.map((cartItem) => (
        <Auxillary key={cartItem.product_key}>
          <CardItem {...cartItem} />
        </Auxillary>
      ))}
      <TextBold fontSize="size5" textStyle={{ alignSelf: 'flex-end' }}>
        این کالا حداکثر تا ۸ روز کاری ارسال خواهد شد
          </TextBold>

      <Text style={{  alignSelf: 'flex-start' }}>
        <TextBold fontSize="size6">{strings.productCosts}</TextBold>
        <Text>
          <TextBold fontSize="size6" weight="bold">
            {Math.floor(totalShopCostWithoutDiscount)}
          </TextBold>
          <TextBold fontSize="size6" weight="bold">
            {strings.toman}
          </TextBold>
        </Text>
      </Text>
      <Text style={{  alignSelf: 'flex-start' }}>
        <TextBold fontSize="size6">{strings.discounValue}</TextBold>
        <Text>
          <TextBold fontSize="size6" weight="bold">
            {Math.floor(totalShopCostWithoutDiscount - totalShopCost)}
          </TextBold>
          <TextBold fontSize="size6" weight="bold">
            {strings.toman}
          </TextBold>
        </Text>
      </Text>
      <Text style={{  alignSelf: 'flex-start' }}>
        <TextBold fontSize="size6">{strings.postCostWord}</TextBold>
        <TextBold fontSize="size6" weight="bold">
          {post_cost || strings.free}
        </TextBold>
      </Text>

      <View style={styles.seprator} />
      <TextBold fontSize="size7" textStyle={{ alignSelf: 'flex-start' }}>
        {strings.orderCost}
        {Math.floor(totalShopCost + (post_cost || 0))}
        {strings.toman}
      </TextBold>

    </View>
  );
};
