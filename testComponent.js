/* eslint-disable lines-between-class-members */
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, View, Text, PanResponder, FlatList, Animated } from 'react-native';
import moment from 'moment-jalaali'
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window');
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent
} from 'react-native-popup-dialog';
import DialogAux from './src/hoc/dialogAux';

import { dateToEnglishConverter } from "AppServices";

const SWIPE_THERESHOLD = 50
const ITEM_WIDTH = 200
class Test extends React.Component {

  state = {
    animation: new Animated.ValueXY(0, 0),
    data: [5, 6, 7, 8],
    wholeData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  }
  _panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      this.state.animation.extractOffset()
      this.state.animation.setValue({ x: 0, y: 0 })
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: this.state.animation.x,
        dy: this.state.animation.y
      }
    ]),
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, { dx }) => {
      const wholeDataLen = this.state.wholeData.length
      if (Math.abs(dx) > SWIPE_THERESHOLD) {
        if (dx > 0) {
          Animated.timing(this.state.animation, {
            toValue: ITEM_WIDTH - dx,
            duration: 500,
            useNativeDriver: true
          }).start(() => {
            const lastIndex = this.state.wholeData.findIndex(d => d === this.state.data[this.state.data.length - 1])
            let data = this.state.data
            data.push(this.state.wholeData[(lastIndex + 1) % wholeDataLen])
            data = data.slice(1)
            console.log(data)
            this.setState({ data })
          })

        } else {
          Animated.timing(this.state.animation, {
            toValue: -(ITEM_WIDTH - dx),
            duration: 500,
            useNativeDriver: true
          }).start(() => {
            const firstIndex = this.state.wholeData.findIndex(d => d === this.state.data[0])
            let data = this.state.data
            data.unshift(this.state.wholeData[(firstIndex - 1) % wholeDataLen])
            data.pop()
            console.log(data)
            this.setState({ data })

          })
        }
      } else {
        Animated.timing(this.state.animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start()
      }
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  _renderItem = (item) => {
    return (
      <View style={{ width: ITEM_WIDTH, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <Text >{item}</Text>
      </View>
    );
  };
  componentDidMount() {
    // 'Wed Sep 19 1398 22:29:41 GMT+0325 (Iran Daylight Time)'
    // Tue Dec 10 2019 22:42:36 GMT+0330 (Iran Standard Time)
    // const timestamp = 1589505456
    // const remain = Math.floor(timestamp - Date.now() / 1000) / (60 * 60 * 24)
    // const date = Date(timestamp)
    // console.log(remain)
    // console.log(Date.now(), timestamp)
    // const jDate = moment(date).format('jYYYY/jMM/jDD')
    // console.log(jDate)
    // moment()
    const date = "1398-09-19 22:29:41"
    const dateFormat = new Date("1398-09-19 22:29:41")

    const converted = moment("1398-09-19 22:29:41", 'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm:ss')
    console.log(converted)
    const txt = dateToEnglishConverter(converted)
    console.log(txt)
    console.log(new Date(txt))
  }

  render() {
    const data = [1, 2, 3, 4, 5, 6, 7]

    return (
      <View {...this._panResponder.panHandlers}
        style={{
          flex: 1
        }}>
        <Animated.View

          style={{
            flex: 1,
            flexDirection: 'row',
            transform: [{ translateX: this.state.animation.x }]
          }}
        >
          {this.state.data.map(this._renderItem)}
        </Animated.View>
      </View>
    )
  }
};
export default Test;
