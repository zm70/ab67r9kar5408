import React, { useState } from 'react';
import { TextBold, ButtonBold } from 'AppFonts';
import { View, Image, ScrollView} from 'react-native';
import { WebView} from 'react-native-webview';
import strings from 'src/res/strings.json';
import styles from './styles';
import { getJustLogoImageOrPlaceholder } from '../../shared/helperFunc';
import { RetryAux, AnimationAux } from "AppAux";

export const handleEndPoints = async (endpoint, dataSetter, setLoading, setDataLoaded) => {
  try {
    setLoading(true)
    const data = await endpoint()
    console.log(data)
    if (data) {
      setDataLoaded(200);
      dataSetter(data)
    } else {

      setDataLoaded(400);
    }
    setLoading(false)
  } catch (err) {
    console.log(err)
    setLoading(false)
    setDataLoaded(400);
  }
}

export const SimplePageWrapper =
  ({ children, endpoint, dataSetter }) => {
    const [loading, setLoading] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(0)

    if (dataLoaded === 0 && !loading) {

      handleEndPoints(endpoint, dataSetter, setLoading, setDataLoaded)
    }
    return (
      <AnimationAux loading={loading}>
        <RetryAux
          dataLoaded={dataLoaded === 200}
          retry={() => handleEndPoints(endpoint, dataSetter, setLoading, setDataLoaded)}
        >

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {children}
          </ScrollView>

        </RetryAux>
      </AnimationAux >
    )
  }

const ReadMoreBtn = ({ isReadMore, setReadMore }) => (
  <ButtonBold
    onPress={() => setReadMore(!isReadMore)}
    color="blue" containerStyle={{ alignSelf: 'flex-start' }}>
    {isReadMore ? strings.readLess : strings.readMore}
  </ButtonBold>
)

const Description = ({ isReadMore, description, numberOfLines }) => (
  <TextBold
    numberOfLines={isReadMore ? 99999 : numberOfLines}
    textStyle={{ textAlign: 'right' }}
    fontSize="size7"
    multiline={true}
  >
    {isReadMore ? description : description && `${description.slice(0, 20)}...`}
  </TextBold>
)

export const Cards = ({ data }) => {
  const [isReadMore, setReadMore] = useState(false)
  return (
    <View
      style={{
        backgroundColor: '#fff',
        margin: 10,
        padding: 4
      }}
    >
      <TextBold color="blue" fontSize="size8" textStyle={{ textAlign: 'right' }}>
        {data.abstract}
      </TextBold>

      <Image
        srouce={getJustLogoImageOrPlaceholder(data.image)}
        style={{ width: '100%', aspectRatio: 2 / 1 }}
        resizeMode="cover"
      />
      <Description numberOfLines={2} description={data.description} isReadMore={isReadMore} />

      <ReadMoreBtn setReadMore={setReadMore} isReadMore={isReadMore}/>
    </View>
  );
}

export const FlatCards = (props) => {
  const [isReadMore, setReadMore] = useState(false)
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: 'gray',
        padding: 4
      }}
    >
      <TextBold color="blue" fontSize="size7" textStyle={{ textAlign: 'right' }}>
        آموزش خرید و پرداخت
    </TextBold>

      <Image
        srouce={getJustLogoImageOrPlaceholder({})}
        style={{ width: '100%', aspectRatio: 2 / 1 }}
        resizeMode="cover"
      />
      <Description numberOfLines={2} description={data.content} isReadMore={isReadMore} />

      <ReadMoreBtn setReadMore={setReadMore} isReadMore={isReadMore}/>

      {/* <TextBold
      numberOfLines={2}
      textStyle={{ textAlign: 'right' }}
      fontSize="size7"
    >
      {props.content}
    </TextBold>
    <ButtonBold color="blue" containerStyle={{ alignSelf: 'flex-start' }}>
      {strings.readMore}
    </ButtonBold> */}
    </View>
  );
}

export const SingleCart = ({ data }) => {
  const [isReadMore, setReadMore] = useState(false)
  return (
    // <View
    //   style={{
    //     backgroundColor: '#fff',
    //     borderTopWidth: 1,
    //     borderColor: 'gray',
    //     padding: 4
    //   }}
    // >
    //   {/* <Image
    //     srouce={getJustLogoImageOrPlaceholder(data.image)}
    //     style={{ width: '100%', aspectRatio: 2 / 1 }}
    //     resizeMode="cover"
    //   /> */}
    
    //   <Description numberOfLines={5} description={data.description} isReadMore={true} />
    //   <Image
    //     srouce="/src/assets/images/about1.jpg"
    //     style={{ width: '100%', aspectRatio: 2 / 1 }}
    //     resizeMode="center"
    //   />
    //   <Image
    //     srouce="/src/assets/images/about2.jpg"
    //     style={{ width: '100%', aspectRatio: 2 / 1 }}
    //     resizeMode="center"
    //   />
    //   {/* <ReadMoreBtn setReadMore={setReadMore} isReadMore={isReadMore}/> */}
    // </View>

<View style={{flex: 1}}>
    <WebView
        source={{ html: "<p style='text-align: justify;'>Justified text here</p>" }}
    />
</View>

  );
}

export const SimpleFlatCards = (props) => (
  <View
    style={{
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: 'gray',
      padding: 4
    }}
  >
    <TextBold color="blue" fontSize="size7" textStyle={{ textAlign: 'right' }}>
      آموزش افزودن به علاقه مندی ها
    </TextBold>

    <TextBold
      numberOfLines={2}
      textStyle={{ textAlign: 'right' }}
      fontSize="size7"
    >
      توضیحات در موردآموزش افزودن به علاقه مندی ها در اینجا نمایش داده میشود
      توضیحات در مورد توضیحات آموزش افزودن به علاقه مندی ها در اینجا نمایش داده
      میشود
    </TextBold>
    <ButtonBold color="blue" containerStyle={{ alignSelf: 'flex-start' }}>
      {strings.readMore}
    </ButtonBold>
  </View>
);

export const TextCards = ({ data }) => (
  <View style={{ marginBottom: 20 }}>
    <TextBold
      color="blue"
      fontSize="size9"
      textStyle={{ alignSelf: 'flex-end' }}
    >
      {data.abstract}
    </TextBold>

    <TextBold fontSize="size7" textStyle={{ textAlign: 'right' }}>
      {data.description}
    </TextBold>
  </View>
);


export const TextCardWrapper = (props) => (
  <View style={styles.container}>
    <TextCards />
    <TextCards />
    <TextCards />
  </View>
);
