// // @flow

// import * as React from 'react';
// import { Dimensions } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getAsyncUserCart } from 'AppRedux';
// import {
//   CustomTabbar,
//   HomePage,
//   FollowBusiness,
//   MyBusiness,
//   ChatPage,
//   BusinessAddress,
//   BarcodePage
// } from 'AppComponent';

// import { tabRoutes } from '../../components/layout/enums';
// import { Actions } from 'react-native-router-flux';
// const moment = require('moment-jalaali');
// const faLocale = require('moment/locale/fa');

// moment.locale('fa', faLocale);
// moment.loadPersian({ dialect: 'persian-modern' });
// moment.loadPersian({ usePersianDigits: false });

// const weekDays = [
//   'شنبه',
//   'یکشنبه',
//   'دوشنبه',
//   'سه شنبه',
//   'چهار شنبه',
//   'پنجشنبه',
//   'جمعه'
// ];

// class Tab1Screen extends React.PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//     index: 3,
//     routes: tabRoutes,
//     time: '00:00',
//     date: ''
//   };

//   componentDidMount() {
//     let day = moment().weekday();

//     moment.locale('fa', faLocale);
//     this.setState({
//       date: weekDays[day] + ' ' + moment().format('jYYYY/jM/jD'),
//       time: `ساعت: ${moment().format('HH:mm')}  `
//     });

//     this.props.getAsyncUserCart();
//   }

//   componentWillUnmount() {}

//   renderTabBar = (props) => (
//     <CustomTabbar {...props} time={this.state.time} date={this.state.date} />
//   );

//   render() {
//     return (
//       <TabView
//         lazy
//         renderTabBar={this.renderTabBar}
//         navigationState={this.state}
//         renderScene={SceneMap({
//           first: HomePage,
//           second: FollowBusiness,
//           third: MyBusiness,
//           forth: ChatPage,
//           fifth: BusinessAddress,
//           sixth: BarcodePage
//         })}
//         swipeEnabled={false}
//         onIndexChange={(index) => this.setState({ index })}
//         initialLayout={{ width: Dimensions.get('window').width }}
//       />
//     );
//   }
// }

// Tab1Screen.propTypes = {};

// const dispatchMapToProps = (dispatch) => {
//   return {
//     getAsyncUserCart: () => dispatch(getAsyncUserCart())
//   };
// };

// export default connect(
//   null,
//   dispatchMapToProps
// )(Tab1Screen);
