import React from 'react';
import { View } from 'react-native';
import { ButtonBold } from 'AppFonts';
import { AddToCart } from '../productCost';
import { useDispatch, useSelector } from 'react-redux';
import strings from 'src/res/strings.json';
import { mainStyles } from 'app-styles';
import { pushAddToProduct } from '../../../shared/navigation';
import {
  onShare,
  bookmarking,
  isMarkedFunc,
  dialCall
} from '../../../shared/helperFunc';

export const ChatButton = ({ onExtra, number, startChatting, unfollowBusiness }) => (
  <View style={mainStyles.rowWrappers}>
    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        mainStyles.marginHorizotal,
        mainStyles.borderedButtton,
        { height: '100%', aspectRatio: 1 / 1 }
      ]}
      iconStyle={[mainStyles.defaultButtonText, { color: '#000' }]}
      onPress={onExtra}
      iconName="drop-down"
    />

    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        mainStyles.marginHorizotal,
        mainStyles.borderedButtton,
        { width: '30%', height: '100%', }
      ]}
      textStyle={[mainStyles.defaultButtonText, { color: '#000' }]}
      onPress={() => dialCall(number)}
    >
      {strings.calling}
    </ButtonBold>
    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        mainStyles.marginHorizotal,
        mainStyles.borderedButtton,
        { width: '25%', height: '100%', }
      ]}
      textStyle={[mainStyles.defaultButtonText, { color: '#000' }]}
      onPress={startChatting}
    >
      {strings.chating}
    </ButtonBold>
    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        mainStyles.marginHorizotal,
        mainStyles.borderedButtton,
        { width: '25%', height: '100%', }
      ]}
      textStyle={[mainStyles.defaultButtonText, { color: '#000' }]}
      onPress={unfollowBusiness}
    >
      {strings.followed}
    </ButtonBold>
  </View>
);

export const SingleProductButton = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => {
    return state.user.profileAsync.bookmarks;
  });

  const isMarked = isMarkedFunc(bookmarks, props.product_key);
  const exist = props.quantity > 0;
  return (
    <View style={mainStyles.rowWrappers}>
      <ButtonBold
        containerStyle={[
          mainStyles.defaultButton,
          mainStyles.borderedButtton,

          { height: '100%', aspectRatio: 1 / 1 }
        ]}
        fontSize="size7"
        iconSize="size9"
        color="black"
        iconColor="black"
        onPress={() =>
          onShare(`product/${props.id}/${encodeURIComponent(props.name)}`)
        }
        iconName="share"
      />

      <ButtonBold
        containerStyle={[
          mainStyles.defaultButton,
          mainStyles.borderedButtton,
          mainStyles.paddingHorizontal,
          mainStyles.marginHorizotal,
          isMarked ? mainStyles.backRed : null
        ]}
        textStyle={[mainStyles.defaultButtonText]}
        color={isMarked ? 'white' : 'black'}
        iconColor={isMarked ? 'white' : 'black'}
        externalIconName={isMarked ? 'bookmark' : null}
        onPress={() => bookmarking(dispatch, isMarked, props)}
        iconName={isMarked ? null : 'bookmark'}
        fontSize="size7"
        iconSize="size10"
      >
        {isMarked ? strings.bookmarked : strings.bookmark}
      </ButtonBold>

      <AddToCart
        exist={exist}
        containerStyle={[mainStyles.defaultButton, { flex: 1, height: '100%' }]}
      />
    </View>
  );
};

export const SingleProductCompare = (props) => (
  <View
    style={[
      mainStyles.rowWrappers,
      { marginTop: 15, marginBottom: 15, width: '100%' }
    ]}
  >
    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        mainStyles.grayButton,
        mainStyles.paddingHorizontal,
        { marginLeft: 5 }
      ]}
      onPress={props.nextLevel}
      iconName="chart"
      fontSize="size7"
      iconColor="black"
      iconSize="size9"
    >
      {strings.chart}
    </ButtonBold>

    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        mainStyles.grayButton,
        { flex: 1 }
      ]}
      iconColor="black"
      iconSize="size9"
      onPress={props.nextLevel}
      iconName="compare"
      fontSize="size7"
    >
      {strings.compare}
    </ButtonBold>
  </View>
);

export const FollowButton = ({ onFollow, onExtra }) => (
  <View style={mainStyles.rowWrappers}>
    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        { height: '100%', aspectRatio: 1 / 1 }
      ]}
      iconColor="white"
      iconSize="size9"
      onPress={onExtra}
      iconName="drop-down"
    />

    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        mainStyles.marginHorizotal,
        { height: '100%', width: '85%' }
      ]}
      fontSize="size7"
      color="white"
      onPress={onFollow}
    >
      {strings.follow}
    </ButtonBold>
  </View>
);

export const AddProduct = (props) => (
  <View style={mainStyles.rowWrappers}>
    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        mainStyles.backOrange,
        { width: '100%' }
      ]}
      fontSize="size7"
      color="white"
      onPress={props.addProduct}
    >
      {strings.addNewItem}
    </ButtonBold>
  </View>
);
