import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import   {mainStyles}  from 'app-styles';
import EStylesSheet from 'react-native-extended-stylesheet';
import { TextBold, Icon } from 'AppFonts';
import strings from 'src/res/strings.json';

const RetryAux = (props) => {
  if (!props.dataLoaded) {
    return (
      <>
        {props.retry ?
          <View
            style={[mainStyles.flex, { paddingTop: '10%', paddingBottom: '10%' }]}
          >

            <TouchableOpacity
              style={{ alignItems: 'center', justifyContent: 'center' }}
              onPress={props.retry}
            >

              <Icon name="notfound" iconColor="blue" iconSize="size13" />
              <TextBold fontSize="size8" color="gray">
                {strings.notNetError}
              </TextBold>
              <Icon name="redo" iconColor="gray" iconSize="size11" />
            </TouchableOpacity>

          </View>
          : null}
      </>

    );
  }
  return props.children;
};

export default RetryAux;
