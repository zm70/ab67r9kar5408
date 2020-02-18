import React from 'react';
import { FlatList, View, Text, Button, Alert } from 'react-native';
import { mainStyles } from 'app-styles';
import { TextBold, ButtonBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import { pushSingleProduct } from '../../shared/navigation';
import { string } from 'prop-types';

const renderItems = ({ item, index }) => {
  const showAlert = () =>{
    Alert.alert(
      'تاییدیه دریافت کالا',
      'آیا کالای خود را با مشخصات درست دریافت کرده اید؟',
      [
        {
          text: 'خیر',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'بلی', onPress: () => ConfirmReceiveProductFunc},
      ],
      {cancelable: false},
    );
 }

 const ConfirmReceiveProductFunc = () =>{
   console.log('test');   // تایید دریافت کالا
 }
  return (
    <View
      key={item.order_key}
      style={{
        backgroundColor: '#fff',
        elevation: 4,
        margin: 5,
        paddingLeft: 5,
        paddingRight: 5
      }}
    >
      <TextBold fontSize="size7"
        textStyle={{ textAlign: 'right' }}>
        {strings.products}

      </TextBold>
      <View style={{ margin: 5 }}>
        {item.products && item.products.map((product, i) => (
          <View style={{ flexDirection: 'row-reverse' }}>
            <TextBold fontSize="size6" color="gray"> - {i + 1}  </TextBold>
           <TextBold onItemPress={() => pushSingleProduct(product)} fontSize="size6" textStyle={{ marginRight: 5 }}>
              {product.name}
            </TextBold>
            <TextBold>({product.business})</TextBold>
          </View>
        ))}
      </View>
      <Text>
        <TextBold fontSize="size7" color="gray">
          {strings.orderDate}
        </TextBold>
        <TextBold fontSize="size7">{item.created_at}</TextBold>
      </Text>
      <Text>
        <TextBold fontSize="size7" color="gray">
          {strings.orderFinalCost}
        </TextBold>
        <TextBold fontSize="size7">{item.final_price}</TextBold>
      </Text>
      <Text>
        <TextBold fontSize="size7" color="gray">
          {strings.orderState}
        </TextBold>
        <TextBold fontSize="size7">{item.status}</TextBold>
      </Text>
        
        <ButtonBold
        containerStyle={[
         
          mainStyles.backGreen,
          mainStyles.recPro,
          { width: '25%' }
        ]}
        textStyle={{ paddingBottom: 4 }}
      
        color="white"
        fontSize="size4"
        onPress = {showAlert}
        className="ConfirmReceiveProductFunc"
      >
        {strings.productIsReceived}
      </ButtonBold>
    </View>
  );
};

const MyOrders = (props) => {

  console.log(props);
  //   const data = props.data && props.data.map((key) => props.data[key]);
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={props.data}
      renderItem={renderItems}
      contentContainerStyle={mainStyles.horizontalScrollContainer}
    />
  );
};

export default MyOrders;
