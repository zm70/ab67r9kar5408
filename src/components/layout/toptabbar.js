import React from 'react';
import { View } from 'react-native';
import { TopSearchbar } from 'AppComponentShared';
import { ButtonBold } from 'AppFonts';
import { pushFilterPage } from '../shared/navigation';

import strings from 'src/res/strings.json';
import   {mainStyles}  from 'app-styles';

const TopTabbar = (props) => (
  <View style={mainStyles.topbarContainer}>
    <ButtonBold
      containerStyle={[mainStyles.defaultButton, mainStyles.filterButton]}
      color="white"
      fontSize="size6"
      iconSize="size7"
      iconStyle={mainStyles.defaultButtonText}
      onPress={pushFilterPage}
      iconName="filter"
    >
      {strings.filter}
    </ButtonBold>
    <TopSearchbar
      placeholder={strings.filterHolder}
      searchingBusiness={props.searchingBusiness}
    />
  </View>
);

export default TopTabbar;
