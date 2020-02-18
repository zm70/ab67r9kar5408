import React, { useState } from 'react';

import { View } from 'react-native';
import { getAbrikarAbout } from 'AppServices';
import { SingleCart, SimplePageWrapper } from './helper';
import styles from './styles'


const AboutUs = (props) => {

  const [data, dataSetter] = useState({})
  return (
    <SimplePageWrapper
      data={data}
      dataSetter={dataSetter}
      endpoint={getAbrikarAbout}
    >
      <View style={styles.simpleContainer}>
        <SingleCart
          data={data}
        />
      </View>
    </SimplePageWrapper>
  )
};

export default AboutUs;
