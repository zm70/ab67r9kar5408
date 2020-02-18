import React from 'react';
import { View, Image } from 'react-native';
import { TextBold } from 'AppFonts';
import propTypes from 'prop-types';
import { getJustLogoImageOrPlaceholder, getImageOrPlaceholder } from '../helperFunc';
import cardStyles from '../../style/cardStyles';
import { CustomTouchable } from "../CustomTouchable";

const SmallIconCard = ({ images, title, imageContainer, onPress }) => {
  return (
    <CustomTouchable
      onPress={onPress}
      style={{ alignItems: 'center' }}>
      <Image
        source={getImageOrPlaceholder(images.logo)}
        style={[cardStyles.smallIcon, imageContainer]}
      />
      <TextBold fontSize="size0" weight="bold" color="darkGray">
        {title}
      </TextBold>
    </CustomTouchable>
  );
}

SmallIconCard.propTypes = {
  title: propTypes.string,
  logo: propTypes.shape({}),
  onPress: propTypes.func
};
SmallIconCard.defaultProps = {
  title: '',
  logo: {},
  onPress: () => { }
};

export default SmallIconCard;
