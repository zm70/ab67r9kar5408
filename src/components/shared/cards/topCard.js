import React, { useState } from 'react';
import { View, Linking } from 'react-native';
import strings from 'src/res/strings';
import colors from 'src/res/colors';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { ButtonBold, TextBold } from 'AppFonts';
import { useSelector, useDispatch } from 'react-redux';
import {
  defaultTopCard,
  topCardPropTypes
} from '../../../models/business';
import { CustomTouchable } from '../CustomTouchable';
import NumericDetail from './shopNumericDetail';
import { MainDetail } from './shopMainDetail';
import cardStyles from '../../style/cardStyles';
import { dialCall, onShare, followBusiness, voting, addNewFollowedBusiness } from '../helperFunc';
import { pushSingleBusiness } from '../../shared/navigation';



const TopCard = ({ onFollowCB, followed, containerStyle, ...props }) => {

  const showCautionAgain = useSelector((state) => state.user.showCaution);
  const userId = useSelector((state) => state.user.userInfo.id);
  const isBusinessFollowed = (followed || props.isFollowed) || false;

  // console.log(setFollowed, isBusinessFollowed, followed)
  let bottomBtn = null;
  if (!isBusinessFollowed) {
    bottomBtn = (
      <ButtonBold
        containerStyle={cardStyles.bigFollowBtn}
        textStyle={{ textAlign: 'center' }}
        color="white"
        fontSize="size6"
        weight="bold"
        onPress={() => {
          followBusiness(showCautionAgain, { bId: props.id, id: userId }, onFollowCB);
        }}
      >
        {strings.follow}
      </ButtonBold>
    );
  } else {
    const texts = [
      {
        key: 0,
        title: `${props.newProductsCount || 0} محصول جدید`,
        color: 'red',
        backColor: colors.red,
        borderColor: colors.red,
        onPress: () => { }
      },
      {
        key: 1,
        title: 'اشتراک گذاری',
        borderColor: colors.gray,
        color: 'gray',
        icon: 'share',
        onPress: () => {
          onShare(`business/${props.id}/${encodeURIComponent(props.title)}`);
        }
      },
      {
        key: 2,
        title: 'تماس',
        color: 'green',
        icon: 'phone',
        borderColor: colors.green,
        onPress: () => dialCall(props.phone || props.mobile)
      }
    ];
    bottomBtn = (
      <View style={cardStyles.followBtns}>
        {texts.map(
          ({ title, color, icon, backColor, borderColor, key, onPress }) => (
            <ButtonBold
              key={key}
              onPress={onPress}
              containerStyle={[
                cardStyles.followBtnWrapper,
                {
                  borderColor,
                  backgroundColor: backColor,
                  flexDirection: 'row-reverse',
                  padding: 1,
                  borderRadius: 2
                }
              ]}
              iconColor={color}
              color={backColor ? 'white' : color}
              textStyle={{
                textAlign: 'center'
              }}
              fontSize="size8"
              iconName={icon ? icon : undefined}
              isMedium
            >
              {title}
            </ButtonBold>
          )
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        cardStyles.businessCardContainer,
        isBusinessFollowed ? cardStyles.businessFollow : cardStyles.businessNotFollow,
        containerStyle
      ]}
    >
      <CustomTouchable
        style={{ padding: 10, paddingBottom: 3 }}
        onPress={() => pushSingleBusiness(props.item || props)}
      >
        <NumericDetail {...props} />
        <MainDetail
          voteBusiness={(vote) => voting({ bId: props.id, id: userId, vote })}
          containerStyle={cardStyles.businessDetail}
          {...props} />
      </CustomTouchable>
      {bottomBtn}
    </View>
  );
};

TopCard.propTypes = {
  ...topCardPropTypes,
  onFollowCB: PropTypes.func
};
TopCard.defaultProps = {
  ...defaultTopCard,
  onFollowCB: () => { }
};

export default TopCard;
