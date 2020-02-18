import React from 'react';
import { View, Image } from 'react-native';
import { Rating } from 'react-native-elements';
import { Icon, TextBold } from 'AppFonts';
import PropTypes from 'prop-types';
import strings from 'src/res/strings.json';
import CustomViewPager from './viewpager';

import cardStyles from '../../style/cardStyles';
import Comments from './comments';

const ProductDetailCard = (props) => (
  <View style={cardStyles.productFullContainer}>
    <View style={cardStyles.productDetailHeader}>
      <View style={{ alignItems: 'flex-end' }}>
        <TextBold>فروشگاه قهوه استارباکس</TextBold>
        <Rating
          type="custom"
          imageSize={15}
          readonly
          startingValue={3}
          ratingImage={require('../../../assets/icons/star.png')}
          ratingBackgroundColor="transparent"
        />
      </View>

      <Image
        source={{
          uri:
            'https://previews.123rf.com/images/vectorgift/vectorgift1608/vectorgift160800109/61622829-sale-discount-background-for-the-online-store-shop-promotional-leaflet-promotion-poster-banner-vecto.jpg'
        }}
        style={[cardStyles.roundImage, { transform: [{ scale: 0.7 }] }]}
      />
    </View>
    <CustomViewPager simpleView/>

    <TextBold style={cardStyles.detailItemContainer}>
      هات چاکلت مولتی کافه مقدار ۶۲۵ گرم بسته ۲۵ عددی
    </TextBold>
    <View style={cardStyles.costContainer}>
      <TextBold>49/500تومان</TextBold>
      <TextBold>قیمت</TextBold>
    </View>
    <View style={cardStyles.itemSelectWrapper}>
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <Icon name="share" color="#000" size={25} style={{ margin: 5 }} />
        <Icon name="bookmark" color="#000" size={25} style={{ margin: 5 }} />
        <Icon name="ic_cart" color="#000" size={25} style={{ margin: 5 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <TextBold weight="light" color="gray">
          ۹۸۰۰ نفر پسندیده اند
        </TextBold>
        <Icon name="thumb-up" color="#000" size={25} style={{ margin: 5 }} />
      </View>
    </View>
    <TextBold textStyle={{ textAlign: 'left' }} fontSize="size5">
      {strings.allComments}{' '}
    </TextBold>
    <Comments />
  </View>
);

ProductDetailCard.propTypes = {
  itemDetail1: PropTypes.string,
  itemDetail2: PropTypes.string,
  name: PropTypes.string,
  uri: PropTypes.shape({})
};

ProductDetailCard.defaultProps = {
  itemDetail1: '',
  itemDetail2: '',
  name: '',
  uri: {}
};

export default ProductDetailCard;
