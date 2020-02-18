import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import   {mainStyles}  from 'app-styles';
import { TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';

const renderItems = ({ item, index }) => {
  return (
    <View
      key={item.order_key}
      style={{ backgroundColor: '#fff', elevation: 4, margin: 5 }}
    >
      <TextBold>
        {strings.orderDate} {item.created_at}
      </TextBold>
      <TextBold>
        {strings.orderFinalCost} {item.final_price}
      </TextBold>
      <TextBold>
        {strings.orderState} {item.status}
      </TextBold>
    </View>
  );
};

const Notifications = (props) => {
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

export default Notifications;
