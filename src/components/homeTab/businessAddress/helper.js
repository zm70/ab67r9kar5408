import React from 'react';
import { View, Image } from 'react-native';
import { Icon } from 'AppFonts';
import { styles } from './styles';
import { getImageOrPlaceholder } from '../../shared/helperFunc';

export const UserMarker = (props) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Icon
      name="simplecircle"
      iconSize="size13"
      style={{ color: '#0e85c733' }}
    />
    <Icon
      name="simplecircle"
      iconColor="white"
      iconSize="size105"
      style={{ position: 'absolute' }}
    />
    <Icon
      name="simplecircle"
      iconColor="blue"
      iconSize="size10"
      style={{ position: 'absolute' }}
    />
  </View>
);

export const ShopMarker = ({ showDetail, uri }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Icon
      name="marker"
      style={[
        styles.iconWrapper,
        showDetail ? styles.activeIcon : styles.deactiveIcon
      ]}
    />
    <Icon name="marker" style={styles.iconContainer} />

    <Image source={getImageOrPlaceholder(uri)} style={[styles.shopSmallImage, { backgroundColor: '#fff' }]} />
  </View>
);
