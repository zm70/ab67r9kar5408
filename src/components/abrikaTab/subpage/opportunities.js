import React, { useState } from 'react';
import { TextBold, ButtonBold } from 'AppFonts';
import { View, Image, ScrollView } from 'react-native';
import { getAbrikarGuide } from 'AppServices';
import { Cards, SimplePageWrapper } from './helper';
import styles from './styles'

const Opportunities = (props) => {
  const [data, dataSetter] = useState({})
  return (
    <SimplePageWrapper
      data={data}
      dataSetter={dataSetter}
      endpoint={getAbrikarGuide}
    >
      <View style={styles.simpleContainer}>
        <Cards
          data={data}
        />
      </View>
    </SimplePageWrapper>
  );

};

export default Opportunities;
// return (
//   <View style={[styles.container]}>
//     <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 5 }}>
//       <Cards />
//       <Cards />
//     </ScrollView>
//   </View>
// );