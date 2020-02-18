import React from 'react';
import { View } from 'react-native';
import { Icon, ButtonBold } from 'AppFonts';
import propTypes from 'prop-types';
import styles from './styles';

const MainpageTabbar = (props) => (
  <View style={styles.tabbarContainer}>
    <View style={{ width: 1 }} />
    <ButtonBold
      containerStyle={[{ flexDirection: 'row-reverse' }]}
      fontSize="size7"
      color="white"
      iconColor="white"
      iconStyle={{ marginLeft: 4, marginRight: 4 }}
      iconSize="size10"
      iconName={props.iconName}
    >
      {props.title}
    </ButtonBold>
    <Icon name="dotmenu" size={20} color="#fff" />
  </View>
);

MainpageTabbar.propTypes = {
  title: propTypes.string.isRequired,
  iconName: propTypes.string.isRequired
};

export default MainpageTabbar;
