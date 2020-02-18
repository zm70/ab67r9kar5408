import React from 'react';
import { View, Text } from 'react-native';
import { ButtonBold, TextBold, TextInputBold } from 'AppFonts';
import { mainStyles } from 'app-styles';
import { waitingForProductRequest } from "AppServices";
import cardStyles from '../../style/cardStyles';
import { pushAddToProduct, startLoadingDialog, successUpdateDialog } from '../../shared/navigation';
import strings from 'src/res/strings.json';

const requestProduct = async (productId) => {
  try {
    startLoadingDialog(strings.loadingMsgSubmit);
    const res = await waitingForProductRequest(productId)
    console.log(res)
    successUpdateDialog(strings.successMsgSubmit)
  } catch (err) {
    errorUpdateDialog(err)
  }
}

export const ProductCost = ({
  buttonStyle,
  containerStyle,
  onPress,
  cartItem,
  isOwner,
  discount,
  price,
  views,
  quantity
}) => {
  let cost = price + strings.toman;
  let lastCost;
  if (discount) {
    cost = (+price * (1 - discount / 100)) + strings.toman;
    lastCost = price + strings.toman;
  }
  const exist = quantity > 0;
  if (isOwner) {
    return <View />
  }
  return (
    <View
      style={[
        mainStyles.costContainer,
        exist ? null : mainStyles.redBackground,
        containerStyle
      ]}
    >
      <View style={[mainStyles.paddingVertically, { flexDirection: 'row', }]}>
        <TextBold fontSize="size7">
          {!exist ? strings.notExist : cost ? cost : strings.call}
        </TextBold>
        {discount && exist ? (
          <View style={[mainStyles.marginHorizotal,
          { alignItems: 'center', justifyContent: 'center' }]}>

            <TextBold fontSize="size7" color="red">
              {!exist ? strings.notExist : cost ? lastCost : strings.call}
            </TextBold>
            <View style={{
              position: 'absolute',
              width: '100%', height: 1, backgroundColor: 'red'
            }} />

          </View>
        ) : null}
      </View>
      {views ? (
        <ButtonBold
          containerStyle={buttonStyle}
          onPress={onPress}
          iconName="seen"
          fontSize="size4"
          iconSize="size4"
          color={exist ? 'blue' : 'white'}
          iconColor={exist ? 'blue' : 'white'}
        >
          {views}
        </ButtonBold>
      ) : null}
      {discount ? (
        <TextBold
          textStyle={{
            position: 'absolute',
            left: 0,
            height: '100%',
            backgroundColor: 'red',
            paddingLeft: 5,
            paddingRight: 5
          }}
          color="white"
          fontSize="size7"
        >
          {discount}%
      </TextBold>
      ) : null}
    </View>
  );
}

export const AddToCart = ({ containerStyle, ...props }) => {
  const exist = props.quantity > 0;
  return (
    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        containerStyle,
        exist ? null : mainStyles.backOrange
      ]}
      onPress={() => {
        if (exist) {
          pushAddToProduct({ ...props });
        } else {
          requestProduct(props.id);
        }
      }}
      iconColor="white"
      iconName="ic_cart"
      fontSize="size6"
      iconSize="size6"
      color="white"
    >
      {exist ? strings.addToCard : strings.callIfExist}
    </ButtonBold>
  );
}

export const EditButtons = ({ exist, onPress, containerStyle }) => (
  <ButtonBold
    containerStyle={[
      mainStyles.defaultButton,
      containerStyle,
      exist ? null : mainStyles.backOrange
    ]}
    iconColor="white"
    onPress={onPress}
    iconName="ic_cart"
    fontSize="size6"
    iconSize="size6"
    color="white"
  >
    {exist ? strings.addToCard : strings.callIfExist}
  </ButtonBold>
);

export const Costs = ({ costs, discountTextColor }) => {
  return costs.map(({ key, value, title }) => (
    <View key={key} style={cardStyles.costWrapper}>
      {title === strings.cost ? (
        <Text>
          <TextBold fontSize="size7">{value}</TextBold>
          <TextBold fontSize="size7">{strings.toman}</TextBold>
        </Text>
      ) : (
          <Text>
            <TextBold fontSize="size7" color={discountTextColor}>
              {value}
            </TextBold>
            <TextBold fontSize="size7" color={discountTextColor}>
              {title === strings.discount ? '%' : strings.toman}
            </TextBold>
          </Text>
        )}
      <Text style={{ flex: 1 }}>
        <TextBold
          fontSize="size7"
          color={title === strings.cost ? undefined : discountTextColor}
        >
          {title}
        </TextBold>
      </Text>
    </View>
  ));
};

export const CompleteCosts = ({ properties, onChangeText, newCost }) => {
  return properties.map(
    ({ key, value, title, color, unit, name, keyboardType, ...props }) => (
      <View key={key} style={[cardStyles.costWrapper, { flex: 1 }]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          {/* <TextBold fontSize="size7" color={color}>
            {unit}
          </TextBold> */}
          <TextInputBold
            keyboardType={keyboardType}
            editable={!props.notEditable}
            onChangeText={(text) => onChangeText(text, name)}
            textStyle={[mainStyles.paddingHorizontal, cardStyles.editable]}
            fontSize="size7"
            color={color}
            placeholder={unit}
          >
            {name === 'newCost' ? newCost : value}
          </TextInputBold>
        </View>
        <View style={cardStyles.horizontalDivider} />
        <Text style={{ flex: 1 }}>
          <TextInputBold fontSize="size7" color={color}>
            {title}
          </TextInputBold>
        </Text>
      </View>
    )
  );
};
