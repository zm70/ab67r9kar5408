import React, { useState } from 'react';
import { TextBold } from 'AppFonts';
import { View, TouchableOpacity } from 'react-native';
import { getAbrikarFAQ } from 'AppServices'
import styles from './styles';
import { SimplePageWrapper, SingleCart } from './helper';

const FAQ = (props) => {
  const [data, dataSetter] = useState({})
  return (
    <SimplePageWrapper
      data={data}
      dataSetter={dataSetter}
      endpoint={getAbrikarFAQ}
    >
      <View style={styles.simpleContainer}>
        <SingleCart
          data={data}
        />
      </View>
    </SimplePageWrapper>
  )
};

export default FAQ;
