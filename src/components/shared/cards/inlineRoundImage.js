/* eslint-disable indent */
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Rating } from 'react-native-elements';
import { Icon as CustomIcon, TextBold, ButtonBold } from 'AppFonts';
import strings from 'src/res/strings';
import { useSelector } from 'react-redux'
import { mainStyles, cardStyles } from 'app-styles';
import {
  mainDetailProps,
  imageProps,
  mainDetailDefault,
  imageDefault
} from './helper/customPropTypes';
import RoundIcon from './helper/roundIcon';
import { getJustLogoImageOrPlaceholder, followBusiness } from '../helperFunc';
import { confirmDeleteCartItem } from "../navigation";
import { CustomTouchable } from '../CustomTouchable'
import { onFollowCB } from '../serviceImpl';

const followCB = async (showCautionAgain, bodyFollow, setBusinessFollowed) => {
  try {
    const res = await onFollowCB(showCautionAgain, bodyFollow)
    if (res) {
      setBusinessFollowed(1)
    }

  } catch (err) {
  }
};

export const RecommendedCard = ({
  id,
  logo,
  title,
  category,
  onItemPress,
  rating
}) => {
  const [businessFollowed, setBusinessFollowed] = useState(0)
  const followed = businessFollowed === 0
  const userId = useSelector((state) => state.user.userInfo.id);
  const bodyFollow = { bId: id, id: userId }
  return (
    <CustomTouchable
      onPress={onItemPress}
      style={cardStyles.recommendedContainer}>
      <ButtonBold
        weight="medium"
        fontSize="size6"
        containerStyle={[followed ? mainStyles.defaultButton : { backgroundColor: "#eee" },
        { borderRadius: 30 }]}
        onPress={() => followed && followBusiness('notshow', bodyFollow,
          (showCautionAgain, bodyFollow) =>
            followCB(showCautionAgain, bodyFollow, setBusinessFollowed))
        }
        color={followed ? "white" : "black"}
        forcePer
      >
        {followed ? strings.follow : strings.followed}
      </ButtonBold>

      <View style={cardStyles.recommendedDetail}>
        <TextBold weight="medium" fontSize="size4" numberOfLines={1}>
          {title}
        </TextBold>
        <TextBold weight="light" fontSize="size1" numberOfLines={1}>
          {category}
        </TextBold>
        <Rating
          imageSize={15}
          readonly
          startingValue={rating}
          style={{ backgroundColor: 'transparent', alignSelf: 'flex-end' }}
        />
      </View>
      <RoundIcon images={logo} containerStyle={{ transform: [{ scale: 0.5 }] }} />
    </CustomTouchable >
  )
};

export const ChatCard = ({ item, onItemPress, fullName }) => {
  const anotherSide = item.creator === fullName ? item.user_receiver : item.creator || '';
  return (
    <CustomTouchable style={cardStyles.chatContainer} onPress={onItemPress}>
      <View>
        <ButtonBold
          containerStyle={{
            backgroundColor: 'transparent',
            alignItems: 'center'
          }}
          iconStyle={[mainStyles.mediumIcon, { color: 'blue' }]}
          onPress={item.nextLevel}
          iconName="doublecheck"
          fontSize="size2"
          color="darkGray"
          forcePer
        >
          {item.updated_at}
        </ButtonBold>
        {/* <CustomIcon name="pin" style={{ padding: 6 }} size={15} />
      <TextBold
        fontSize="size2"
        color="white"
        textStyle={{
          textAlign: 'center',

          backgroundColor: '#BA0000'
        }}
      >
        2پیام جدید
      </TextBold> */}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View style={cardStyles.recommendedDetail}>
          <TextBold fontSize="size6" numberOfLines={1}>
            {anotherSide
              && anotherSide.slice(0, 20)}...
        </TextBold>
          {/* <TextBold
            fontSize="size5"
            weight="light"
            color="gray"
            numberOfLines={1}
          >
            {item.user_receiver
              && item.user_receiver.slice(0, 25)}...
        </TextBold> */}
        </View>
        <RoundIcon
          uri={item.uri}
          containerStyle={{ transform: [{ scale: 0.75 }] }}
        />
      </View>
    </CustomTouchable>
  );
}

export const UserInfo = ({
  name,
  image,
  field,
  address,
  points,
  code,
  credit,
  onEditProfile,
  logout,
  onImageSelect,
  updatedImage
}) => {
  // const userPicture = uri ? { uri } : userPlaceholder;
  return (
    <View style={{ backgroundColor: '#fff', padding: 5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ButtonBold
          containerStyle={{ alignSelf: 'flex-start' }}
          fontSize="size6"
          color="gray"
          onPress={onEditProfile}
        >
          {strings.editProfile}
        </ButtonBold>
        <ButtonBold
          containerStyle={{ alignSelf: 'flex-start' }}
          fontSize="size6"
          color="gray"
          onPress={logout}
        >
          {strings.exitprofile}
        </ButtonBold>
      </View>

      <View style={cardStyles.userCardInfo}>
        <View style={cardStyles.recommendedDetail}>
          <TextBold fontSize="size7">{name}</TextBold>
          <TextBold
            fontSize="size6"
            weight="light"
            color="gray"
            numberOfLines={1}
          >
            {field}
          </TextBold>
          <TextBold fontSize="size6" numberOfLines={1} color="gray">
            {address}
          </TextBold>
        </View>
        <TouchableOpacity
          onPress={onImageSelect}
          style={{ marginTop: 10, marginBottom: 10 }}>
          <RoundIcon images={updatedImage || (image && image.path)} />
        </TouchableOpacity>
      </View>
      <TextBold
        fontSize="size6"
        color="blue"
        textStyle={{ textAlign: 'right' }}
      >
        امتیاز : {points}
      </TextBold>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextBold fontSize="size6" color="green">
          {credit} تومان
        </TextBold>
        <TextBold fontSize="size6" color="green">
          موجودی کیف پول :{' '}
        </TextBold>
        <TextBold fontSize="size6" color="red">
          کد: {code}
        </TextBold>
      </View>
    </View>
  );
};



export const CartItemInfo = ({ name, uri, price, product_key, dispatch }) => (
  <View style={cardStyles.recommendedContainer}>
    <Icon
      name="trash"
      backgroundColor="#3b5998"
      size={20}
      style={{ padding: 10 }}
      onPress={() => confirmDeleteCartItem(product_key, dispatch)}
    />

    <View style={cardStyles.recommendedDetail}>
      <TextBold weight="medium" fontSize="size5">
        {name}
      </TextBold>
      <TextBold weight="medium" fontSize="size5">
        {strings.toman} {price}
      </TextBold>
    </View>
    <RoundIcon
      uri={{ uri: uri && uri.path }}
      containerStyle={{ transform: [{ scale: 0.8 }] }}
    />
  </View>
);

export const ChatHeader = ({ name, logo, lastSeen }) => (
  <View style={cardStyles.chatHeader}>
    <View style={{ width: 1 }} />

    <View style={cardStyles.recommendedDetail}>
      <TextBold fontSize="size7">{name}</TextBold>
      <TextBold fontSize="size5" color="gray">
        {strings.lastSeen} {lastSeen}
      </TextBold>
    </View>
    <RoundIcon
      uri={getJustLogoImageOrPlaceholder(logo)}
      containerStyle={{ transform: [{ scale: 0.8 }] }}
    />
  </View>
);

RecommendedCard.propTypes = {
  ...mainDetailProps,
  ...imageProps
};
RecommendedCard.defaultProps = {
  ...mainDetailDefault,
  ...imageDefault
};
ChatCard.propTypes = {
  ...mainDetailProps,
  ...imageProps
};
ChatCard.defaultProps = {
  ...mainDetailDefault,
  ...imageDefault
};
