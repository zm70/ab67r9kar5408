// import React from 'react';
// import { View } from 'react-native';
// import { TabBar } from 'react-native-tab-view';
// import { TextBold } from 'AppFonts';
// import { pushSubpage } from '../homeTab/subpages/pushTabs';

// import TopTabbar from './toptabbar';
// import styles from './styles';
// import { icons } from './enums';

// const renderIcon = ({ route }) => {
//   return icons(route.key)[route.key];
// };

// const CustomTabbar = (props) => (
//   <View>
//     <TopTabbar onPress={pushSubpage} />
//     <TabBar
//       onTabLongPress={(scene) => {
//         const { route } = scene;
//         props.jumpTo(route.key);
//       }}
//       onTabPress={(scene) => {
//         const { route } = scene;
//         props.jumpTo(route.key);
//       }}
//       {...props}
//       indicatorContainerStyle={{ backgroundColor: '#FFF' }}
//       indicatorStyle={[styles.pageIndicatorWrapper]}
//       renderIcon={renderIcon}
//     />
//     <View style={{ elevation: 10 }}>
//       <TextBold
//         textStyle={styles.titleText}
//         color="blue"
//         fontSize="size8"
//         weight="bold"
//       >
//         {props.navigationState.routes[props.navigationState.index].route}
//       </TextBold>

//       <View style={styles.seprator} />
//       {props.navigationState.index == 5 ? (
//         <View style={styles.dateContainer}>
//           <TextBold fontSize="size3" color="blue" weight="bold">
//             {props.time}
//           </TextBold>
//           <TextBold color="blue" fontSize="size3" weight="bold">
//             {props.date}
//           </TextBold>
//         </View>
//       ) : null}
//     </View>
//   </View>
// );
// export default CustomTabbar;
