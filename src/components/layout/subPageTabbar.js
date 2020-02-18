import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, ButtonBold } from 'AppFonts';
import propTypes from 'prop-types';
import   {mainStyles}  from 'app-styles';
import styles from './styles';

const SubpageTabbar = (props) => (
  <View style={styles.tabbarContainer} >
    <TouchableOpacity onPress={props.popBack}
     style={{ paddingLeft: 10, paddingRight: 10 }} >
      <Icon name="back" size={20} color="#fff" />
    </TouchableOpacity>
    <ButtonBold
      containerStyle={[
        mainStyles.defaultButton,
        { flexDirection: 'row-reverse' }
      ]}
      fontSize="size7"
      color="white"
      iconColor="white"
      iconStyle={{ margin: 4 }}
      iconSize="size10"
      iconName={props.iconName}
    >
      {props.title}
    </ButtonBold>
    <Icon name="dotmenu" size={20} color="#fff" />
  </View>
);

SubpageTabbar.propTypes = {
  title: propTypes.string.isRequired,
  iconName: propTypes.string.isRequired,
  popBack: propTypes.func.isRequired
};

export default SubpageTabbar;
