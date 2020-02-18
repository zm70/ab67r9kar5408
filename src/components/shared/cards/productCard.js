import React from 'react';
import { View, Image } from 'react-native';
import { TextBold, TextInputBold } from 'AppFonts';
import { CustomTouchable } from "../CustomTouchable";
import propTypes from 'prop-types';
import RoundIcon from './helper/roundIcon';
import cardStyles from '../../style/cardStyles';
import { getImageOrPlaceholder } from '../helperFunc';


const ProductCard = ({ onItemPress, name, images, description }) => {
  console.log(images)
  return (
    <CustomTouchable style={cardStyles.productContainer} onPress={onItemPress}>
      <View style={cardStyles.itemHeaderWrapper}>
        <TextBold
          weight="medium"
          size="size5"
          numberOfLines={1}
          textStyle={cardStyles.itemShopTitle}
        >
          {name}
        </TextBold>

        <View style={cardStyles.imageOutsideWrapper}>
          <RoundIcon
            images={images}
            containerStyle={[
              cardStyles.imageOutsideWrapper,
              { transform: [{ scale: 0.8 }] }
            ]}
          />
        </View>
      </View>
      <Image
        source={getImageOrPlaceholder(images)}
        style={{
          width: '100%',
          aspectRatio: 1 / 1
        }}
        resizeMode="cover"
      />
      <View style={cardStyles.itemDetailContainer}>
        <TextBold weight="bold" size="size5"
          textStyle={{ padding: 5 }}>
          {description}
        </TextBold>
      </View>
    </CustomTouchable>
  );
};

ProductCard.propTypes = {
  description: propTypes.string,
  name: propTypes.string,
  images: propTypes.shape({})
};

ProductCard.defaultProps = {
  description: '',
  name: '',
  images: {}
};

export default ProductCard;
/* <Image
source={props.uri}
style={[cardStyles.imageOutside, cardStyles.roundImage]}
/> */
