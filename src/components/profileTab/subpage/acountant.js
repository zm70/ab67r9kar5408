import React from 'react';

import { View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { mainStyles } from 'app-styles';
import { ButtonBold, TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import { InputHeader} from 'AppComponentShared';

const MoneyRequestFunc = () => {
  startLoadingDialog(strings.loadingMsgSubmit)
  const body = {};
  body['amount'] = 0;
  moneyRequest(body)
    .then((res) => {
      // this.props.emptyCart();
      // Actions.refresh({
      //   dialogType: 'alert',
      //   msg: strings.successMsgOrder,
      //   popCallback: this.popupcallback
      // });
        return data;
      // مرادي

    })
    .catch((err) => {
      errorUpdateDialog(err)
    });
};

const renderItems = ({ item, index }) => {
  const { id, data } = item;
  return (
    <View key={id} style={{ backgroundColor: '#fff', elevation: 4, margin: 5, padding: 5, alignItems: 'flex-end' }}>
      <TextBold fontSize="size7">{strings.products}</TextBold>
      <View style={{ margin: 5 }}>
        {data && data.map((product, i) => (
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

const Acountant = (props) => {
  const data = props && Object.keys(props).map((key) => props[key]);
  var remainMoney = 1001;
  return (
    <View
      style={[
        mainStyles.mainContainer,
        { alignItems: 'center', justifyContent: 'space-around' }
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '70%',
          justifyContent: 'space-between'
        }}
      >
        <TextBold color="green" fontSize="size7">
        45000{strings.toman}
        </TextBold>
        <TextBold color="green" fontSize="size7">
          {strings.remainMoney}
        </TextBold>
      </View>


      <TextInput style={mainStyles.inputFieldTextReq}  placeholder="مبلغ درخواستي (تومان)"></TextInput>
      {remainMoney>1000?<ButtonBold
        containerStyle={[
          mainStyles.nextButton,
          mainStyles.backGreen,
          mainStyles.verticalScrollContainer,
          { width: '70%' }
        ]}
        textStyle={{ paddingBottom: 4 }}
        onPress={() => { }}
        color="white"
        fontSize="size9"
      >
        {strings.getYourMoney}
      </ButtonBold>:<ButtonBold
        containerStyle={[
          mainStyles.nextButton,
          mainStyles.backGray,
          mainStyles.verticalScrollContainer,
          { width: '70%' }
        ]}
        textStyle={{ paddingBottom: 4 }}
        onPress={MoneyRequestFunc}
        color="white"
        fontSize="size9"
      >
        {strings.getYourMoney}
      </ButtonBold>}

      {/* <ButtonBold
        containerStyle={[
          mainStyles.nextButton,
          mainStyles.backOrange,
          mainStyles.verticalScrollContainer,
          { width: '70%' }
        ]}
        textStyle={{ paddingBottom: 4 }}
        onPress={() => { }}
        color="white"
        fontSize="size9"
      >
        {strings.moneyHistory}
      </ButtonBold> */}

<View style={mainStyles.divider} />

      <TextBold style={mainStyles.titleAcc}>{strings.moneyHistory}</TextBold>
     
      <FlatList
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={renderItems}
      contentContainerStyle={mainStyles.horizontalScrollContainer}
    />

{/* 
      <TextBold color="red" fontSize="size10">
        {strings.attention}
      </TextBold>
      <TextBold color="red" fontSize="size7">
        {strings.closeAccountCaution}
      </TextBold>

      <ButtonBold
        containerStyle={[
          mainStyles.nextButton,
          mainStyles.backRed,
          mainStyles.verticalScrollContainer,
          { width: '70%' }
        ]}
        textStyle={{ paddingBottom: 4 }}
        onPress={() => { }}
        color="white"
        fontSize="size9"
      >
        {strings.closeAccount}
      </ButtonBold> */}
    </View>
  );
};
export default Acountant;
