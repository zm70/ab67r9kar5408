import React from 'react';
import { View } from 'react-native';
import { ButtonBold, TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import { mainStyles } from 'app-styles';
import styles from './style';
import { defaultProps, dialogProps } from './propTypes';

const prepareProductToSave = (product) => {
  return {
    product_key: product.product_key,
    parentName: product.parentName,
    name: product.name,
    id: product.id,
    images: product.images,
    price: product.price,
    discount: product.discount
  };
};

export const IncDecButtons = ({
  subUserCartItem,
  addUserCartItem,
  count,
  product
}) => {

  return (
    <View style={[styles.addSubContainer, mainStyles.marginHorizotalDouble]}>
      <ButtonBold
        fontSize="size6"
        containerStyle={[styles.actionButton]}
        onPress={() =>
          addUserCartItem({ ...prepareProductToSave(product), count })
        }
        color="gray"
      >
        +
      </ButtonBold>
      <TextBold
        fontSize="size6"
        textStyle={[mainStyles.paddingHorizontalDouble]}
      >
        {count}
      </TextBold>
      <ButtonBold
        color="gray"
        containerStyle={[styles.actionButton]}
        fontSize="size6"
        onPress={() =>
          subUserCartItem({ ...prepareProductToSave(product), count })
        }
      >
        -
      </ButtonBold>
    </View>
  );
};

const AddToCart = ({ product, cartItem, subUserCartItem, addUserCartItem }) => {
  const count =
    (cartItem[product.product_key] && cartItem[product.product_key].count) || 0;
  return (
    <View style={styles.cartDialog}>
      {product.discount ? (
        <View
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <TextBold
            fontSize="size7"
            textStyle={{ alignSelf: 'flex-end', marginBottom: 10 }}
            color="red"
          >
            {+product.price * (1 - product.discount / 100) || 0}
          </TextBold>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                position: 'absolute',
                height: 1,
                backgroundColor: 'red',
                width: '100%'
              }}
            />

            <TextBold
              fontSize="size7"
              textStyle={{ alignSelf: 'flex-end', marginBottom: 10 }}
            >
              {+product.price || 0}
              {strings.toman}
            </TextBold>
          </View>
          <TextBold
            fontSize="size7"
            textStyle={{ alignSelf: 'flex-end', marginBottom: 10 }}
          >
            {strings.cost}
          </TextBold>
        </View>
      ) : (
          <TextBold
            fontSize="size9"
            textStyle={{ alignSelf: 'flex-end', marginBottom: 10 }}
            color="red"
          >
            {strings.cost}
            {+product.price || 0}
            {strings.toman}
          </TextBold>
        )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

        }}
      >
        <IncDecButtons
          subUserCartItem={subUserCartItem}
          addUserCartItem={addUserCartItem}
          count={count}
          product={product}
        />

        <TextBold fontSize="size9" textStyle={{ textAlign: 'right' }}>
          {strings.count}
        </TextBold>
      </View>
      <TextBold
        fontSize="size8"
        textStyle={{ alignSelf: 'flex-end', marginTop: 10 }}
      >
        {strings.sumCost}
        {+count * +product.price * (1 - product.discount / 100) || 0}
      </TextBold>
    </View>
  );
};

AddToCart.propTypes = {
  ...dialogProps
};
AddToCart.defaultProps = {
  ...defaultProps
};

export default AddToCart;
