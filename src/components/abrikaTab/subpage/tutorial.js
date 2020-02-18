import React, { useState } from 'react';
import { TextBold } from 'AppFonts';
import { View, Image, ScrollView } from 'react-native';
import { getAbrikarGuide } from 'AppServices';
import { SingleCart, SimplePageWrapper } from './helper';
import styles from './styles'

const Tutorial = (props) => {
  const [data, dataSetter] = useState({})
  return (
    <SimplePageWrapper
      data={data}
      dataSetter={dataSetter}
      endpoint={getAbrikarGuide}
    >
      <View style={styles.simpleContainer}>
        <SingleCart
          data={data}
        />
      </View>
    </SimplePageWrapper>
  );
};

export default Tutorial;

{/* <View style={{ flex: 1, backgroundColor: '#fff' }}>
<ScrollView contentContainerStyle={{ flexGrow: 1, padding: 15 }}>
  <TextBold
    fontSize="size7"
    color="blue"
    textStyle={{ alignSelf: 'flex-end' }}
  >
    فیلم آموزش ایجاد کسب و کار
  </TextBold>
  <Image
    source={getJustLogoImageOrPlaceholder({ logo: {} })}
    style={{ width: '100%', aspectRatio: 2 / 1 }}
    resizeMode="cover"
  />
  <TextBold fontSize="size7" textStyle={{ alignSelf: 'flex-end' }}>
    توضیحات در مورد فیلم آموزشی اینجا نمایش داده میشود
  </TextBold>

  <FlatCards
    content={
      ' توضیحات در مورد آموزش خرید و پرداخت در اینجا نمایش داده میشود توضیحات در مورد توضیحات آموزش خرید و پرداخت در اینجا نمایش داده میشود'
    }
  />
  <SimpleFlatCards />
</ScrollView>
</View> */}