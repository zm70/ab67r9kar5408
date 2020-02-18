import React from 'react';
import ViewPager from '@react-native-community/viewpager';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, View, Image } from 'react-native';
import propTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getJustLogoImageOrPlaceholder } from '../helperFunc';
import { CustomTouchable } from '../CustomTouchable';
import { pushSingleBusiness, pushSingleProduct } from "../../shared/navigation";

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

    height: width * 4
  },
  imageCardContainer: {
    width: width * 0.8,
    height: width * 0.4,

    backgroundColor: '#fff',
    borderRadius: 10
  },
  imageCardWrapper: {
    backgroundColor: 'red',
    width: width * 0.5,
    paddingLeft: 0.05 * width
  },
  imageCard: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
});

const SimpleImageCard = ({ logo, onItemPress, id, title }) => {
  return (
    <CustomTouchable
      onPress={() => onItemPress(id, title)}
      style={styles.imageCardContainer}
    >
      <Image
        source={getJustLogoImageOrPlaceholder(logo)}
        style={styles.imageCard}

      />
    </CustomTouchable>
  );
};

SimpleImageCard.propTypes = {
  logo: propTypes.shape({}),
  onItemPress: propTypes.func
};
SimpleImageCard.defaultProps = {
  logo: {},
  onItemPress: null
};

export default class CarouselImage extends React.PureComponent {
  state = {
    page: 0,
    animationsAreEnabled: true,
    scrollEnabled: true,
    progress: {
      position: 0,
      offset: 0
    },
    pages: []
  };

  renderCards = (itemObj) => {

    const item = itemObj.item
    // selections: (
    return (
      <CustomTouchable
        onPress={() => pushSingleBusiness(item)}
        style={styles.imageCardContainer}
      >
        <Image
          source={getJustLogoImageOrPlaceholder(item.images.banner)}
          style={styles.imageCard}
          resizeMode="cover"
        />
      </CustomTouchable>
    );
  }
  // ),

  // tops: (
  //   <TopCard
  //     containerStyle={cardStyles.smallBusinessCardContainer}
  //     {...item}
  //   />
  // ),
  // followedProduct: (
  //   <ProductCard {...item} onItemPress={() => pushSingleProduct(item)} />
  // ),
  // recommended: (
  //   <RecommendedCard {...item} onItemPress={() => pushSingleBusiness(item)} />
  // ),
  // icon: <SmallIconCard {...item} />,

  // news: (
  //   <NewsCard
  //     title={item.title}
  //     uri={{ uri: item.uri }}
  //     content={item.content}
  //   />
  // )
  // });

  componentDidMount() {
    const businesses = this.props.businesses.items
    // const pages = businesses.map((item) => ({
    //   key: index,
    //   logo: item.logo,
    //   id: item.id,
    //   business_key: item.business_key,
    //   title: item.title
    // }));
    console.log(this.props.businesses);
    this.setState({
      pages: businesses,
      renderIndex: this.props.businesses.renderIndex
    })
    //   () => {
    //     this.autoScroll = setInterval(() => {
    //       if (Actions.currentScene == 'sixth')
    //         this.go((this.state.page + 1) % this.state.pages.length);
    //     }, 4000);
    //   }
    // );
  }

  // go = (page) => {
  //   if (this.state.animationsAreEnabled) {
  //     this.viewPager && this.viewPager.setPage(page);
  //   } else {
  //     this.viewPager && this.viewPager.setPageWithoutAnimation(page);
  //   }

  //   this.setState({ page });
  // };

  onPageScrollStateChanged = (e) => {
    // console.log(e.nativeEvent.pageScrollState);
  };

  onPageSelected = (e) => {
    this.setState({ page: e.nativeEvent.position });
  };

  render() {
    const { pages, renderIndex } = this.state;
    return (
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={pages}
        renderItem={this.renderCards}
        sliderWidth={width}
        itemWidth={0.8 * width}
        layout={'default'}

      />

    );
  }
}
{
  /* <View key={key} style={styles.imageCardWrapper}>
            <SimpleImageCard
              key={key}
              {...props}
              onItemPress={this.props.onItemPress}
            />
          </View> */
}
 // <ViewPager
      //   peekEnabled
      //   pageMargin={-width * 0.2}
      //   style={styles.container}
      //   initialPage={0}
      //   ref={(viewPager) => {
      //     this.viewPager = viewPager;
      //   }}
      //   onPageScrollStateChanged={this.onPageScrollStateChanged}
      //   onPageSelected={this.onPageSelected}
      // >
      //   <View>{pages.map((item) => this.renderCards(item)[renderIndex])}</View>
      // </ViewPager>