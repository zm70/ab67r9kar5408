import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TextBold } from 'AppFonts';

import styles from '../../style/inputStyle';

const BoxComponent = ({
  onChange,
  isActive,
  title,
  detail,
  index,
  textStyle,
  fontSize,
  regularBox,
  containerStyle,
  contrasted,
  yekan
}) => (
  <View style={[styles.boxComponent, containerStyle]}>
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      {yekan ? (
        <Text style={[{ fontFamily: 'yekan', color: '#222' }, textStyle]}>
          {title}
        </Text>
      ) : regularBox ? (
        <TextBold fontSize={fontSize} style={textStyle}>
          {title}
        </TextBold>
      ) : (
        <TextBold fontSize={fontSize} style={textStyle}>
          {title}
        </TextBold>
      )}

      <TouchableOpacity
        onPress={() => onChange(index)}
        style={[styles.boxContainer, contrasted ? styles.boxContainer2 : null]}
      >
        {contrasted ? (
          <View style={isActive ? styles.activeBox2 : styles.deactiveBox} />
        ) : (
          <View style={isActive ? styles.activeBox : styles.deactiveBox} />
        )}
      </TouchableOpacity>
    </View>
    {detail ? (
      <TextBold
        fontSize="size5"
        weight="light"
        color="gray"
        textStyle={styles.boxDetail}
      >
        {detail}
      </TextBold>
    ) : null}
  </View>
);

export default BoxComponent;

BoxComponent.propTypes = {
  fontSize: PropTypes.string,
  textStyle: PropTypes.shape({}),
  containerStyle: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  title: PropTypes.string,
  detail: PropTypes.string,
  isActive: PropTypes.bool,
  regularBox: PropTypes.bool,
  onChange: PropTypes.func,
  yekan: PropTypes.bool,
  contrasted: PropTypes.bool
};

BoxComponent.defaultProps = {
  fontSize: 'size7',
  textStyle: {},
  containerStyle: {},
  title: '',
  detail: '',
  isActive: false,
  regularBox: false,
  onChange: () => {},
  yekan: false,
  contrasted: false
};
