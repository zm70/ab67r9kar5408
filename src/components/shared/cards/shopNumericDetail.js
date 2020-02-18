import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { TextBold, ButtonBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import cardStyles from '../../style/cardStyles';
import RoundIcon from './helper/roundIcon';
import { FollowButton, ChatButton, AddProduct } from './helper/followButtons';

import {
  numericDefaults,
  numericProps,
  mainDetailProps,
  mainDetailDefault
} from './helper/customPropTypes';

const buttonType = (
  showExtras,
  followBusiness,
  addProduct,
  type,
  number,
  startChatting,
  unfollowBusiness
) => {
  switch (type) {
    case 'simple':
      return null;
    case 'follow':
      return <FollowButton onExtra={showExtras} onFollow={followBusiness} />;
    case 'chatFollow':
      return (
        <ChatButton
          onExtra={showExtras}
          number={number}
          startChatting={startChatting}
          unfollowBusiness={unfollowBusiness}
        />
      );
    case 'owner':
      return <AddProduct addProduct={addProduct} />;
    default:
      return null;
  }
};

const ShopNumericDetail = ({
  productsCount,
  discounted,
  followersCount,
  type,
  extraStyle,
  isOwner,
  images,
  logo,
  phone,
  mobile,
  showExtras,
  startChatting,
  unfollowBusiness,
  followBusiness,
  addProduct,
  chooseLogo
}) => {
  const details = [
    { index: 0, key: strings.product, value: productsCount },
    { index: 1, key: strings.disocunted, value: discounted },
    { index: 2, key: strings.follower, value: followersCount }
  ];

  const detailsContent = details.map(({ value, key, index }) => (
    <View key={index} style={{ alignItems: 'center' }}>
      <TextBold forcePer fontSize="size7" weight="bold">
        {value || 0}
      </TextBold>
      <TextBold fontSize="size4" color="gray" weight="light">
        {key}
      </TextBold>
    </View>
  ));
  const detailsContentWrapper = (
    <View style={{ width: 0, flexGrow: 1, paddingLeft: 10, paddingRight: 10 }}>
      <View style={cardStyles.cardInfoWrapper}>{detailsContent}</View>
      {buttonType(
        showExtras,
        followBusiness,
        addProduct,
        type,
        mobile || phone,
        startChatting,
        unfollowBusiness

      )}
    </View>
  );

  return (
    <View style={[cardStyles.cardInfoWrapper, extraStyle]}>
      {detailsContentWrapper}
      <View>
        <TouchableOpacity
          onPress={() => {
            if (isOwner) {
              chooseLogo();
            }
          }}
        >
          <RoundIcon images={logo && logo.id !== -1 ? logo : images} containerStyle={{ transform: [{ scale: 0.9 }] }} />
        </TouchableOpacity>
        {isOwner ? (
          <ButtonBold
            iconName="edit"
            iconColor="orange"
            iconSize="size8"
            onPress={chooseLogo}
            containerStyle={{ position: 'absolute', right: 0, top: 0 }}
          />
        ) : null}
      </View>
    </View>
  );
};

ShopNumericDetail.propTypes = {
  ...mainDetailProps,
  ...numericProps
};
ShopNumericDetail.defaultProps = {
  ...mainDetailDefault,
  ...numericDefaults
};

export default ShopNumericDetail;
