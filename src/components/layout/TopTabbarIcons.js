import React from 'react';
import { View, TouchableOpacity, Animated, Dimensions, LayoutAnimation } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, TextBold } from 'AppFonts';
import EStylesSheet from 'react-native-extended-stylesheet';
import strings from 'src/res/strings.json';
import TopTabbar from './toptabbar';
import { tabRoutes } from './enums';
import { connect } from "react-redux";
import { androidSimpleAnimation } from "../shared/helperFunc";

const { width } = Dimensions.get('window');
const moment = require('moment-jalaali');
const faLocale = require('moment/locale/fa');

const weekDays = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه شنبه',
  'چهار شنبه',
  'پنجشنبه',
  'جمعه'
];

androidSimpleAnimation()

const styles = EStylesSheet.create({
  wrapper: {},
  container: {
    backgroundColor: '#fff',

    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%'
  },
  activeText: {
    color: '$colorPrimary'
  },
  deactiveText: {
    color: '#222',
    opacity: 0.7
  },
  tabContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  seprator: {
    width: '100%',
    height: 5,
    backgroundColor: '$colorPrimary'
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  pageIndicatorWrapper: {
    backgroundColor: 'rgba(90,90,90,0.15)',
    height: '85%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',

    width: '16.3%',
    bottom: 0
  },
  titleContainer: { backgroundColor: '$colorLightGray' }
});
class TopTabbarIcon extends React.Component {
  state = {
    indicatorLeft: false,
    time: '00:00',
    date: '',
    indicatorAnim: new Animated.Value(0)
  };

  init = true;

  tabPressed = (pageKey) => {
    console.log(pageKey)
    this.props.navigation.jumpTo(pageKey);
    this.setState({ selectedTab: pageKey });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hideTopTabbar !== this.props.hideTopTabbar) {
      LayoutAnimation.linear()
    }

  }

  componentWillUnmount() {
    this.timeInterval && clearInterval(this.timeInterval)
  }

  timeInterval;

  componentDidMount() {
    const day = moment().weekday();

    moment.locale('fa', faLocale);
    this.setState({
      date: weekDays[day] + ' ' + moment().format('jYYYY/jM/jD'),
      time: `ساعت: ${moment().format('HH:mm')}  `
    });
    this.timeInterval = setInterval(() => {
      this.setState({
        time: `ساعت: ${moment().format('HH:mm')}  `
      })
    }, 60 * 1000)
    const a = new Animated.Value(-0.166);
    const c = new Animated.Value(-0.166);

    this.setState(
      {
        indicatorAnim: Animated.add(
          Animated.multiply(this.props.navigation.panX, a),
          Animated.multiply(this.props.navigation.offsetX, a)
        )
      },
      () => this.setState({ indicatorLeft: true })
    );
  }

  render() {
    const navigationIndex =
      tabRoutes.length - this.props.navigation.navigation.state.index - 1;


    if (!this.props.hideTopTabbar) {
      return (
        <View style={[styles.wrapper]}>
          <TopTabbar />
          <View style={{ width: '100%' }}>
            <View style={styles.container}>
              {tabRoutes.map(({ key, iconName, index }) => {
                const acitvate = navigationIndex === index;

                return (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    key={key}
                    style={styles.tabContainer}
                    onPress={() => this.tabPressed(key)}
                  >
                    <Icon
                      name={iconName}
                      iconSize={'size10'}
                      iconColor={'blue'}
                      style={{
                        textAlign: 'center',

                        opacity: acitvate ? 1 : 0.8
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <Animated.View
              style={[
                this.state.indicatorLeft ? styles.pageIndicatorWrapper : null,
                {
                  transform: [{ translateX: this.state.indicatorAnim }]
                }
              ]}
            />
          </View>

          <View style={styles.titleContainer}>
            <TextBold
              textStyle={{ alignSelf: 'center' }}
              color="blue"
              fontSize="size8"
              weight="bold"
            >
              {tabRoutes[navigationIndex].title}
            </TextBold>

            <View style={styles.seprator} />
            {this.props.navigation.navigation.state.index == 5 ? (
              <View style={styles.dateContainer}>
                <TextBold fontSize="size3" color="blue" weight="bold">
                  {this.state.time}
                </TextBold>
                <TextBold color="blue" fontSize="size3" weight="bold">
                  {this.state.date}
                </TextBold>
              </View>
            ) : null}
          </View>
        </View>)
    }
    return null


  }
}

const mapStateToProps = state => {
  return {
    hideTopTabbar: state.commonReducers.hideTopTabbar
  }
}

export default connect(mapStateToProps)(TopTabbarIcon);
