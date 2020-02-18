import React, { useState } from 'react';
import { View, Dimensions, Platform, Linking } from 'react-native';
import { ButtonBold } from 'AppFonts';
import colors from 'src/res/colors.json';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import strings from 'src/res/strings.json';
import NumericDetail from './shopNumericDetail';
import cardStyles from '../../style/cardStyles';
import { MainDetail } from './shopMainDetail';
import { redirectToMap, dialCall, followBusiness } from '../helperFunc';
import { onFollowCB } from '../serviceImpl';
import { pushSingleBusiness } from '../../shared/navigation';

const { width } = Dimensions.get('window');

const followCB = async (showCautionAgain, bodyFollow, setBusinessFollowed) => {
  try {
    const res = await onFollowCB(showCautionAgain, bodyFollow)
    if (res) {
      setBusinessFollowed(1)
    }

  } catch (err) {
  }
};

export const ShopScanCard = ({
  id,
  title,
  lat,
  long,
  containerStyle,
  isFollowed,
  ...props
}) => {

  const [businessFollowed, setBusinessFollowed] = useState(0)
  const showCautionAgain = useSelector((state) => state.user.showCaution);
  const userId = useSelector((state) => state.user.userInfo.id);
  const bodyFollow = { bId: id, id: userId }
  const buttons = [
    {
      key: 0,
      label: strings.tracking,
      color: 'red',
      backColor: 'red',
      borderColor: colors.red,
      onClick: () => redirectToMap(lat, long)
    },
    {
      key: 1,
      label: strings.follow,
      color: 'orange',
      backColor: 'orange',
      borderColor: colors.orange,
      onClick: () => followBusiness(showCautionAgain, bodyFollow,
        (showCautionAgain, bodyFollow) =>
          followCB(showCautionAgain, bodyFollow, setBusinessFollowed))
    },
    {
      key: 2,
      label: strings.watch,
      color: 'blue',
      borderColor: colors.blue,
      onClick: () => pushSingleBusiness({ id, title })
    },
    {
      key: 3,
      label: strings.thecall,
      color: 'green',
      borderColor: colors.green,
      onClick: () => dialCall(props.mobile)
    }
  ];
  if (isFollowed === 1 || businessFollowed) {
    buttons.splice(1, 1)
  }
  
  return (
    <View style={[cardStyles.snapShotWrapper, containerStyle, { width }]}>
      <View style={cardStyles.snapShotContainer}>
        <NumericDetail {...props} />
        <MainDetail
          containerStyle={cardStyles.businessDetail}
          {...props}
          description={null}
          phone={null}
          address={null}
        />
        <View style={cardStyles.followBtns}>
          {buttons.map(
            ({ label, color, backColor, key, borderColor, onClick }) => (
              <ButtonBold
                key={key}
                containerStyle={[
                  cardStyles.followBtnWrapper,
                  {
                    borderRadius: 2,
                    borderColor,
                    backgroundColor: backColor,
                    flexDirection: 'row-reverse'
                  }
                ]}
                iconStyle={{ color }}
                textStyle={{
                  textAlign: 'center',
                  margin: 1
                }}
                color={backColor ? 'white' : color}
                onPress={onClick}
                fontSize="size7"
              >
                {label}
              </ButtonBold>
            )
          )}
        </View>
      </View>
    </View>
  );
};

ShopScanCard.propTypes = {
  children: propTypes.element,
  title: propTypes.string,
  marker: propTypes.shape({
    latitude: propTypes.number,
    longitude: propTypes.number
  }).isRequired,
  containerStyle: propTypes.shape({})
};
ShopScanCard.defaultProps = {
  containerStyle: {},
  title: '',
  children: null
};
