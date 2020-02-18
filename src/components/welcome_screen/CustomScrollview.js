import React, { PureComponent } from 'react';
import { ScrollView, View, Animated } from 'react-native';

import { TextInputBold } from 'AppFonts';
import styles from './styles';

class CustomScrollview extends PureComponent {
  state = {
    indicator: new Animated.Value(0),
    checked: true,
    wholeHeight: 1,
    visibleHeight: 0
  };

  render() {
    const indicatorSize =
      this.state.wholeHeight > this.state.visibleHeight
        ? (this.state.visibleHeight * this.state.visibleHeight) /
        this.state.wholeHeight
        : this.state.visibleHeight;

    const difference =
      this.state.visibleHeight > indicatorSize
        ? this.state.visibleHeight - indicatorSize
        : 1;
    return (
      <View style={{ height: '85%' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(width, height) => {
            this.setState({ wholeHeight: height });
          }}
          onLayout={({
            nativeEvent: {
              layout: { x, y, width, height }
            }
          }) => this.setState({ visibleHeight: height })}
          style={{ width: '90%' }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.indicator } } }
          ])}
          contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
        >
          <TextInputBold
            fontSize="size8"
            lineHeight={25}
            textStyle={{ fontFamily: 'yekan', color: '#222' }}
            multiline
            editable={false}
          >
            {this.props.description}
          </TextInputBold>
        </ScrollView>

        <View style={styles.indicatorWrapper} />
        <Animated.View
          style={[
            styles.indicator,
            {
              height: indicatorSize,
              transform: [
                {
                  translateY: Animated.multiply(
                    this.state.indicator,
                    this.state.visibleHeight / this.state.wholeHeight
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: 'clamp'
                  })
                }
              ]
            }
          ]}
        />
      </View>
    );
  }
}

export default CustomScrollview;
