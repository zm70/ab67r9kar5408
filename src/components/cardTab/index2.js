// import React from 'react';
// import {
//   View,
//   Animated,
//   ScrollView,
//   Platform,
//   UIManager,
//   LayoutAnimation
// } from 'react-native';

// import propTypes from 'prop-types';
// import EStyleSheet from 'react-native-extended-stylesheet';

// import { CardItem } from './cardItem';

// if (Platform.OS === 'android') {
//   if (UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }
// }

// const styles = EStyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',

//     backgroundColor: '#fff'
//   },
//   cartWrapper: {
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     width: '95%',
//     alignItems: 'center',
//     backgroundColor: '$colorLightGray'
//   },
//   mainButton: {
//     width: '100%',
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     marginTop: 4,
//     padding: 10,
//     elevation: 4
//   }
// });

// class CartTab extends React.PureComponent {
//   state = { expanded: false };

//   componentDidMount() {}

//   expand = () => {
//     LayoutAnimation.spring();
//     this.setState((prevState) => ({ expanded: !prevState.expanded }));
//   };

//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 10 }}
//         >
//           <CardItem expand={this.expand} expanded={this.state.expanded} />
//         </ScrollView>
//       </View>
//     );
//   }
// }

// CartTab.propTypes = {
//   uri: propTypes.shape({})
// };
// CartTab.defaultProps = {
//   uri: {}
// };

// export default CartTab;
