import React from 'react';
import { View, ScrollView, Image, FlatList } from 'react-native';
import { TextBold } from 'AppFonts';
import EStylesheet from 'react-native-extended-stylesheet';
import strings from 'src/res/strings.json';

const styles = EStylesheet.create({});

const MyJob = (props) => {
   return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <View style={{}}>
        <View
          style={{
            backgroundColor: 'blue',
            width: 200,
            heigth: 200
          }}
        />
        <Image
          source={require('src/assets/images/24.png')}
          style={{ width: '90%' }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
export default MyJob;
// <View style={{ flexDirection: 'row' }}>{progressBar}</View>
