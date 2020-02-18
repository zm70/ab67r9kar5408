import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { mainStyles } from 'app-styles';
import { TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import { pushSingleProduct } from '../../shared/navigation';

const renderItems = ({ item, index }) => {
  const { id, data } = item;
  return (
    <View key={id} style={{ backgroundColor: '#fff', elevation: 4, margin: 5, padding: 5, alignItems: 'flex-end' }}>
      <TextBold fontSize="size7">{strings.products}</TextBold>
      <View style={{ margin: 5 }}>
        {data.product && data.product.map((product, i) => (
          <View style={{ flexDirection: 'row-reverse' }}>
            <TextBold fontSize="size6" color="gray"> - {i + 1}  </TextBold>
            <TextBold onClick={() => pushSingleProduct(product)} fontSize="size6" textStyle={{ marginRight: 5 }}>
              {product.name}
            </TextBold>
          </View>
        ))}
      </View>
      <TextBold fontSize="size6" >
        {strings.receiverName} : {data.order.detail[0].receiver}
      </TextBold>
      <TextBold fontSize="size6" >
        {strings.mobileNum} : {data.order.detail[0].mobile}
      </TextBold>
      <TextBold fontSize="size6" >
        {strings.address} : {data.order.detail[0].address}
      </TextBold>
      <TextBold fontSize="size6" >
        {strings.postalCode} : {data.order.detail[0].postal_code}
      </TextBold>

    </View>
  );
};

const Notifications = (props) => {
  console.log(props);
  const data = props && Object.keys(props).map((key) => props[key]);
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={renderItems}
      contentContainerStyle={mainStyles.horizontalScrollContainer}
    />
  );
};

export default Notifications;
