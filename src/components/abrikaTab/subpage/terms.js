import React, { useState } from 'react';
import { View } from 'react-native'
import { getAbrikarLaw } from 'AppServices';

import { TextCardWrapper, SimplePageWrapper } from './helper';
import { TextCards } from './helper';
import styles from './styles'

const Terms = (props) => {
  const [data, dataSetter] = useState({})
  return (
    <SimplePageWrapper
      data={data}
      dataSetter={dataSetter}
      endpoint={getAbrikarLaw}
    >
      <View style={styles.simpleContainer}>
        <TextCards data={data} />
      </View>
    </SimplePageWrapper>
  );
};

export default Terms;
