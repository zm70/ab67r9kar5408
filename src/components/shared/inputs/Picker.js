import React from 'react';
import { View, TouchableOpacity, Picker, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Icon, TextBold } from 'AppFonts';
import propTypes from 'prop-types';
import styles from '../../style/inputStyle';
import { mainStyles } from 'app-styles';

const defaultPicker = [{ label: '', value: 'key0' }];

class CustomPicker extends React.Component {
  state = {
    value: 'key0'
  };

  componentDidMount() {
    if (this.props.initValue)
      this.setState({
        value: this.props.listItems[this.props.initValue].value
      });
  }

  onValueChange = () => { };

  render() {

    return (
      <View
        style={[
          styles.inputBoxContainer,
          { alignSelf: 'center', padding: 0, alignItems: 'center' },
          this.props.containerStyle
        ]}
      >
        <RNPickerSelect
          value={
            this.state.value ? this.state.value : this.props.listItems[0].value
          }
          style={{
            inputAndroid: mainStyles.pickerContainer,
            inputIOS: [mainStyles.pickerContainer, { textAlign: 'center' }]
          }}
          placeholder={{}}
          onValueChange={(value, index) => {
            // value = value || this.props.listItems[0].value
            this.setState({ value });
            if (!value) {
              return;
            }
            this.props.onSelect(
              this.props.pickerIndex,
              value,
              this.props.listItems[index].label
            );
          }}
          items={this.props.listItems}
        />
      </View>
    );
  }
}
export default CustomPicker;

CustomPicker.propTypes = {
  listItems: propTypes.arrayOf(propTypes.shape({}))
};

CustomPicker.defaultProps = {
  listItems: defaultPicker
};

{
  /* <TextBold fontSize="size8" textStyle={{ position: 'absolute' }}>
          {this.props.listItems && this.props.listItems[this.state.selectedIndex] && this.props.listItems[this.state.selectedIndex].label}
        </TextBold>
        <Picker
          selectedValue={this.state.itemKey}
          style={[
            styles.inputWrapper,
            mainStyles.pickerContainer,
            mainStyles.picker
          ]}
         
        >
          {this.props.listItems.map(({ value, label }) => {
            return <Picker.Item label={label} value={value} />;
          })}
        </Picker>
        <Icon
          name="drop-down"
          iconSize="size10"
          style={{ position: 'absolute', left: 5 }}
        /> */
}
