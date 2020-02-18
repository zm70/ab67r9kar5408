import React, { useState } from 'react';
import ViewPager from '@react-native-community/viewpager';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import PropsTypes from 'prop-types';
import { ButtonBold, TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import { getImageOrPlaceholder } from '../helperFunc';
import EStyleSheet from 'react-native-extended-stylesheet';

const heart = require("src/assets/images/heart.png")
const like = require("src/assets/images/like.png")

const styles = EStyleSheet.create({
  indicatorDeactive: {
    backgroundColor: '$colorChatGray'
  },
  indicatorActive: {
    backgroundColor: '$colorPrimary'
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 1
  }
});

const LikeActivity = ({
  iconColor,
  iconName,
  iconSize,
  iconStyle,
  num,
  color,
  colorBold,
  likeOrDislikeAProduct,
  isLiked
}) => {
  const [liked, setLiked] = useState(isLiked)
  const [numLike, setNum] = useState(num)
  console.log(isLiked, liked)
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row-reverse' }}>

      <TouchableOpacity onPress={async () => {
        const succeed = await likeOrDislikeAProduct(liked);
        if (succeed) {
          setLiked(!liked)
          if (liked) {
            setNum(numLike - 1)
          } else {
            setNum(numLike + 1)
          }
        }
      }} >
        <Image
          source={liked ? like : heart} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>

      <Text>
        <TextBold color={color}>
          {numLike}
          {strings.men}
        </TextBold>
        <TextBold color={colorBold}>
          {strings.ilikeit}
        </TextBold>
        <TextBold color={color}>{strings.and}</TextBold>
      </Text>
    </View>
  )
};

class CustomViewPager extends React.Component {
  state = {
    page: 0,
    animationsAreEnabled: true,
    scrollEnabled: true,
    progress: {
      position: 0,
      offset: 0
    }
  };

  setupAutoScroll = () => {
    clearInterval(this.autoScroll);

    this.autoScroll = setInterval(() => {

      // console.log(this.state.page);
      this.go((this.state.page + 1) % this.props.images.length);
    }, 5000);

  };

  componentDidUpdate(prevProps, prevState) {

    // if (this.props.images !== prevProps.images) {
    //   if (this.props.images.length > 1) {
    //     this.setupAutoScroll();
    //   }
    // }
  }

  componentDidMount() {
    if (this.props.images.length > 1) {
      this.setupAutoScroll();
    }
  }

  componentWillUnmount() {
    clearInterval(this.autoScroll);
  }

  renderIndicator = (i, page) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          margin: 2
        }}
      >
        {this.props.images &&
          this.props.images.map(({ key }, index) => {
            
            // console.log(page, index);
            return (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === page
                    ? styles.indicatorActive
                    : styles.indicatorDeactive
                ]}
              />
            );
          })}
      </View>
    );
  };

  go = (page) => {
    if (this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }

    this.setState({ page });
  };

  onPageScrollStateChanged = (e) => {
    // console.log(e.nativeEvent.pageScrollState);
  };

  onPageSelected = (e) => {
    // console.log(e.nativeEvent.position);
    this.setState({ page: e.nativeEvent.position });
  };

  render() {
    const { page } = this.state;
    const { views, likeCount, isLiked } = this.props;
    console.log(this.props)
    return (
      <View>
        <ViewPager
          style={{ width: '100%', aspectRatio: 1 / 1 }}
          initialPage={0}
          ref={(viewPager) => {
            this.viewPager = viewPager;
          }}
          onPageScrollStateChanged={this.onPageScrollStateChanged}
          onPageSelected={this.onPageSelected}
        >
          {this.props.images.map(({ id, path }) => (
            <Image
              source={getImageOrPlaceholder(path)}
              key={id}
              style={{ width: null, height: null, backgroundColor: '#fff' }}
              resizeMode="contain"
            />
          ))}

        </ViewPager>



        <View style={{ width: '100%', alignItems: 'center' }}>
          {this.renderIndicator(this.props.images, page)}
        </View>
        {!this.props.simpleView ? (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10
            }}
          >

            <ButtonBold
              containerStyle={[{}]}
              iconColor="blue"
              iconSize="size8"
              onPress={() => { }}
              iconName="seen"
              fontSize="size7"
              color="blue"
            >
              {views} {strings.views}
            </ButtonBold>



            <LikeActivity
              iconName="ilikeit"
              iconColor={'red'}
              isLiked={isLiked == 1}
              iconSize="size11"
              num={likeCount}
              color="gray"
              colorBold="lightGreen"
              likeOrDislikeAProduct={this.props.likeOrDislikeAProduct}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default CustomViewPager;

CustomViewPager.propTypes = {
  images: PropsTypes.arrayOf(
    PropsTypes.shape({ id: PropsTypes.number, path: PropsTypes.string })
  )
};

CustomViewPager.defaultProps = {
  images: [{ id: -1, path: '' }]
};
