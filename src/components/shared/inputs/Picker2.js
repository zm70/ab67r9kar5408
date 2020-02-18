// import React from 'react';
// import { View, TouchableOpacity, Picker, Animated } from 'react-native';
// import { Icon, TextBold } from 'AppFonts';
// import propTypes from 'prop-types';
// import styles from './inputStyle';
// import { mainStyles } from 'AppComponent';

// class CustomPicker extends React.Component {
//   state = {
//     itemKey: 'key0',
//     selectedIndex: 0
//   };

//   componentDidMount() {}

//   onValueChange = () => {};

//   render() {
//     return (
//       <View
//         style={[
//           styles.inputWrapper,
//           styles.inputBoxContainer,
//           { alignSelf: 'center', alignItems: 'center' },
//           this.props.containerStyle
//         ]}
//       >
//         <TextBold fontSize="size8" textStyle={{ position: 'absolute' }}>
//           {this.props.listItems && this.props.listItems[this.state.selectedIndex] && this.props.listItems[this.state.selectedIndex].label}
//         </TextBold>
//         <Picker
//           selectedValue={this.state.itemKey}
//           style={[
//             styles.inputWrapper,
//             mainStyles.pickerContainer,
//             mainStyles.picker
//           ]}
//           onValueChange={(itemValue, itemIndex) => {
//             this.props.onSelect(this.props.pickerIndex, itemValue,this.props.listItems[itemIndex].label);
//             this.setState({ itemKey: itemValue, selectedIndex: itemIndex });
//           }}
//         >
//           {this.props.listItems.map(({ value, label }) => {
//             return <Picker.Item label={label} value={value} />;
//           })}
//         </Picker>
//         <Icon
//           name="drop-down"
//           iconSize="size10"
//           style={{ position: 'absolute', left: 5 }}
//         />
//       </View>
//     );
//   }
// }
// export default CustomPicker;

// CustomPicker.propTypes = {
//   listItems: propTypes.arrayOf(propTypes.shape({}))
// };

// CustomPicker.defaultProps = {
//   listItems: [{ label: '', value: 'key0' }]
// };
