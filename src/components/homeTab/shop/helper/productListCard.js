import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ButtonBold, TextBold, Icon } from 'AppFonts';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_CART_ITEMS } from '../../../../redux/actions/actionType';

import { Picker, ProductCost, AddToCart } from 'AppComponentShared';
import strings from 'src/res/strings.json';
import { mainStyles } from 'app-styles';
import { EditGroupButton } from './singleBusinessItems';
import { productProptypes, productDefaults } from '../../../../models/product';

import {
  getImageOrPlaceholder,
  bookmarking,
  isMarkedFunc
} from '../../../shared/helperFunc';
import { pushSingleProduct } from '../../../shared/navigation';

const styles = EStyleSheet.create({
  container: { backgroundColor: '#fff', margin: 5, paddingTop: 5 },
  topImage: {
    width: '80%',
    aspectRatio: 1 / 1,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    flex: 1
  },
  bookmarkBtn: {
    flexDirection: 'row-reverse',

    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  topIcon: { position: 'absolute', left: 5, top: 5, padding: 5 },
  cartBtn: {
    flexDirection: 'row-reverse',
    width: '50%',
    alignSelf: 'center',
    margin: 10
  },
  absoluteSeenIcon: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  seenIcon: {
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  smallWrapper: {
    flexDirection: 'row',
    paddingLeft: 3,
    paddingRight: 3,
    justifyContent: 'space-between'
  },
  smallTextWrapper: {
    width: '55%',
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },
  multiListContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  }
});

const CartWrapper = (props) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={[props.containerStyle]}
    onPress={() => {
      if (!props.isOwner) pushSingleProduct(props.product);
    }}
  >
    {props.children}
  </TouchableOpacity>
);

const BookmarkIcon = ({
  isMarked,
  dispatch,
  product,
  justIcon,
  containerStyle,
  iconStyle
}) => (
    <ButtonBold
      iconStyle={iconStyle}
      containerStyle={containerStyle}
      externalIconName={isMarked ? 'bookmark' : null}
      iconColor={isMarked ? 'red' : 'costGray'}
      iconName={isMarked ? null : 'bookmark'}
      fontSize="size7"
      iconSize="size10"
      color={isMarked ? 'red' : 'costGray'}
      onPress={() => bookmarking(dispatch, isMarked, product)}
    >
      {justIcon ? null : isMarked ? strings.bookmarked : strings.bookmark}
    </ButtonBold>
  );

export const ProductMultipleListCard = ({ ...props }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => {
    return state.user.profileAsync.bookmarks;
  });

  const isMarked = isMarkedFunc(bookmarks, props.product_key);

  return (
    <CartWrapper
      product={props}
      containerStyle={[
        mainStyles.productListContainer,
        mainStyles.halfScreenCard,
        { margin: 3 }
      ]}
    >
      <View style={styles.multiListContainer}>
        <BookmarkIcon
          isMarked={isMarked}
          dispatch={dispatch}
          product={props}
          justIcon
          containerStyle={{ marginTop: 5, marginLeft: 5 }}

        />

        <Image
          source={getImageOrPlaceholder(props.images)}
          style={styles.topImage}
          resizeMode="contain"
        />
        <View />
      </View>

      <View style={{ marginBottom: 15, justifyContent: 'center' }}>
        <TextBold fontSize="size4">{props.name}</TextBold>
      </View>
      {props.isOwner ? (
        <EditGroupButton
          {...props}
          removeProduct={() => props.removeProduct(props.id)}
        />
      ) : (
          <AddToCart
            {...props}
            containerStyle={[styles.cartBtn, { width: '90%' }]}
          />

        )}

      {/* {props.isOverview ? ( */}
      <ProductCost

        {...props}
        onPress={() => { }}
        containerStyle={{ width: '100%', padding: 4, justifyContent: 'space-between' }}
        buttonStyle={styles.seenIcon}
      />
      {/* ) : null} */}
    </CartWrapper>
  );
};

export const ProductListCard = ({ ...props }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.user.profileAsync.bookmarks);

  const isMarked = isMarkedFunc(bookmarks, props.product_key);

  console.log(props)
  return (
    <CartWrapper
      product={props}
      containerStyle={[styles.container, mainStyles.fullScreenCard]}
    >
      <Image
        source={getImageOrPlaceholder(props.images)}
        style={styles.topImage}
        resizeresizeMode="contain"
        className="pro_img"
      />

      <BookmarkIcon
        containerStyle={[styles.bookmarkBtn, { alignSelf: 'flex-end' }]}
        isMarked={isMarked}
        dispatch={dispatch}
        product={props}
      />

      <TextBold fontSize="size6" textStyle={{ textAlign: 'right', margin: 5 }}>
        {props.name}
      </TextBold>

      {props.isOwner ? (
        <EditGroupButton
          {...props}
          containerStyle={{ width: '50%', alignSelf: 'center', margin: 10 }}
          removeProduct={() => props.removeProduct(props.id)}
        />
      ) : (
          <AddToCart
            {...props}
            containerStyle={[styles.cartBtn]}
          />
        )}


      <ProductCost

        {...props}
        onPress={() => { }}
        buttonStyle={styles.absoluteSeenIcon}
      />

    </CartWrapper>
  );
};

export const ProductSmallListCard = ({ ...props }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => {
    return state.user.profileAsync.bookmarks;
  });

  const isMarked = isMarkedFunc(bookmarks, props.product_key);

  return (
    <CartWrapper
      product={props}
      containerStyle={[styles.container, mainStyles.fullScreenCard]}
    >
      <View style={styles.smallWrapper}>
        <Image
          source={getImageOrPlaceholder(props.images)}
          style={{ width: '40%', aspectRatio: 1 / 1, marginBottom: 5 }}
          resizeMode="contain"
        />

        <View style={styles.smallTextWrapper}>
          <TextBold fontSize="size7">{props.name}</TextBold>
          <BookmarkIcon
            containerStyle={styles.bookmarkBtn}
            isMarked={isMarked}
            dispatch={dispatch}
            product={props}
          />

          {props.isOwner ? (
            <EditGroupButton
              {...props}
              removeProduct={() => props.removeProduct(props.id)}
            />
          ) : (
              <AddToCart
                {...props}
                containerStyle={[styles.cartBtn, { width: '90%' }]}
              />
            )}
        </View>
      </View>
      <ProductCost
        {...props}
        onPress={() => { }}
        buttonStyle={styles.absoluteSeenIcon}
      />
    </CartWrapper>
  );
};

export const CartProductSmallCard = ({
  id,
  product_key,
  name,
  quantity,
  brand,
  price,
  images,
  edit,
  seenCount,
  onPress
}) => (
    <View
      style={[
        styles.container,
        {
          width: '90%',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          alignItems: 'center'
        }
      ]}
    >
      <View style={styles.smallWrapper}>
        <Image
          source={getImageOrPlaceholder(images)}
          style={{ width: '40%', aspectRatio: 1 / 1 }}
          resizeMode="contain"
        />

        <View style={styles.smallTextWrapper}>
          <TextBold fontSize="size7">{name}</TextBold>

          <EditGroupButton />
        </View>
      </View>
      <ProductCost

        cart
        onPress={() => { }}
        buttonStyle={styles.absoluteSeenIcon}
        containerStyle={{ justifyContent: 'center', width: '100%', padding: 0 }}
      />

      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          width: '100%'
        }}
      >
        <Picker onOpen={() => { }} />
      </View>
    </View>
  );

ProductListCard.propTypes = {
  ...productProptypes
};

ProductListCard.defaultProps = {
  ...productDefaults
};
ProductSmallListCard.propTypes = {
  ...productProptypes
};

ProductSmallListCard.defaultProps = {
  ...productDefaults
};
ProductMultipleListCard.propTypes = {
  ...productProptypes
};

ProductMultipleListCard.defaultProps = {
  ...productDefaults
};
