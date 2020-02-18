import React from 'react';
import { TextBold } from 'AppFonts';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';

const ContactUs = (props) => {
  const links = [
    { key: 0, title: 'تلفن: ', value: '02155577841', onPress: () => {} },
    { key: 1, title: 'ایمیل: ', value: 'info@abrikar.com', onPress: () => {} },
    { key: 2, title: 'وب سایت: ', value: 'www.abrikar.com', onPress: () => {} }
  ];
  return (
    <View style={styles.containerCenter}>
      <TextBold color="blue" fontSize="size9" textStyle={{ marginBottom: 20 }}>
        نشانی دفتر مرکزی
      </TextBold>

      <TextBold fontSize="size8" textStyle={{ marginBottom: 40 }}>
        نشانی در این قسمت نوشته خواهد شد
      </TextBold>

      <TextBold color="blue" fontSize="size9" textStyle={{ marginBottom: 20 }}>
        راه های ارتباطی
      </TextBold>

      {links.map(({ title, value, key, onPress }) => (
        <TouchableOpacity
          key={key}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '60%'
          }}
        >
          <TextBold fontSize="size7">{value}</TextBold>
          <TextBold fontSize="size7">{title}</TextBold>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ContactUs;
