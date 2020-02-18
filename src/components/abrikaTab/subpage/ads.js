import React, { useState } from 'react';
import { TextBold } from 'AppFonts';
import { View, Image, ScrollView } from 'react-native';
import { getAbrikarAdv } from 'AppServices';
import { SingleCart, SimplePageWrapper } from './helper';
import styles from './styles'

const AbrikaAds = (props) => {
  const [data, dataSetter] = useState({})
  return (
    <SimplePageWrapper
      data={data}
      dataSetter={dataSetter}
      endpoint={getAbrikarAdv}
    >
      <View style={styles.simpleContainer}>
        <SingleCart
          data={data}
        />
      </View>
    </SimplePageWrapper>
  );
};

export default AbrikaAds;
