import React from 'react';
import {
  Picker
} from 'AppComponentShared';
import { View } from 'react-native';
import { TextBold, TextInputBold, ButtonBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import styles from './style';
// ticket: {
//   business_id: '-1',
//   title: '',
//   category: '',
//   message: '',
//   priority: '1',
//   comment: '0'
// }


export const CreateBusinessDialogContent = (props) => {

  return (
    <View style={{ padding: 5, alignItems: 'center' }}>
      <View style={{ marginBottom: 10 }}>
        <TextBold
          textStyle={{ marginBottom: 2, textAlign: 'right' }}
          fontSize="size6"
        >
          {strings.introducerCode}
        </TextBold>
        <TextInputBold
          onChangeText={props.setReagentCode}
          fontSize="size7"
          textStyle={[{ backgroundColor: 'white' }, styles.inputs]}
        />
      </View>
      {props.accounts ?
        <View>
          <TextBold
            textStyle={{ marginBottom: 2, textAlign: 'right' }}
            fontSize="size6"
          >
            {strings.chooseShopCredit}
          </TextBold>
          <Picker
            initValue={1}
            containerStyle={[styles.pickerContainer]}
            listItems={props.accounts}
            onSelect={(name, value) => props.onPickerSelect(value)}
          />



        </View> : null
      }
    </View>
  );
};
