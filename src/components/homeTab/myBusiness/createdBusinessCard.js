import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { TextBold, ButtonBold, Icon } from 'AppFonts';
import { NumericDetail, MainDetail } from 'AppComponentShared';
import strings from 'src/res/strings.json';
import { pushPayBusiness } from "../../shared/navigation";
import { mainStyles, cardStyles } from 'app-styles';
import * as asyncKeys from '../../../redux/sagas/asyncKeys'
import moment from 'moment-jalaali'

export const MyJobCard = ({
  payments,
  sell_count,
  onDelete,
  onManage,
  id,
  status,
  isOwner,
  ...props
}) => {

  let remainDay = 0;

  const activated = status === asyncKeys.ACTIVE
  if (payments && payments[0] && payments[0].deadline) {
    const timestamp = payments[0].deadline
    remainDay = Math.floor((timestamp - Date.now() / 1000) / (60 * 60 * 24))
    const date = new Date(timestamp)
    const jDate = moment(date).format('jYYYY/jMM/jDD')
  }

  return (
    <View style={{ margin: 5 }}>
      <View style={[
        cardStyles.myBusinessTopWrapper,
        activated ? null : cardStyles.myBusinessDeactive
      ]}>
        <TextBold

          fontSize="size3"
          color={activated ? 'white' : 'mediumDarkGray'}
        >
          {activated
            ? strings.validDue + remainDay + strings.remainDay
            : strings.invalid}
        </TextBold>
      </View>
      <View style={[cardStyles.myBusinessCardContainer, { padding: 4 }]}>
        <NumericDetail {...props} />
        <MainDetail containerStyle={cardStyles.businessDetail} {...props} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 5
          }}
        >
          <ButtonBold
            color="white"
            fontSize="size7"
            containerStyle={[
              mainStyles.defaultButton,
              {
                backgroundColor: 'red',
                paddingLeft: 20,
                paddingRight: 20,
                width: '30%'
              }
            ]}
            onPress={onDelete}
          >
            {strings.delete}
          </ButtonBold>
          <ButtonBold
            color="white"
            fontSize="size7"
            containerStyle={[
              mainStyles.defaultButton,
              mainStyles.backOrange,
              {
                paddingLeft: 20,
                paddingRight: 20,
                width: '60%'
              }
            ]}
            onPress={() => {
              if (activated) {
                onManage();
              } else {
                pushPayBusiness(id);
              }
            }}
          >
            {activated ? strings.manageBusiness : strings.extendCredit}
          </ButtonBold>
        </View>
        {
          <TextBold weight="light" color="red">
            {activated ? null : strings.invalidCaution}
          </TextBold>
        }
      </View>
      <View style={[
        cardStyles.myBusinessBottomWrapper,
        sell_count > 0 ? null : cardStyles.myBusinessDeactive
      ]}>
        <TextBold
          fontSize="size7"
          color="white"
        >
          {sell_count > 0 ? strings.newCard + sell_count : strings.nocardExist}
        </TextBold>
      </View>
    </View>
  );
};
