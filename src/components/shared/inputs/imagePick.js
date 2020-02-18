import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, TextBold } from 'AppFonts';
import styles from '../../style/inputStyle';
// import RNFS from 'react-native-fs';
import { imageSelect, resizeImage } from '../../shared/helperFunc';
import ImgToBase64 from 'react-native-image-base64';

import strings from 'src/res/strings.json';

class ImagePick extends PureComponent {
  state = {
    avatarSource: { uri: '' }
  };

  onSelect = async (uri, fileName) => {
    this.setState({
      avatarSource: { uri: fileName }
    });
    try {
      const resizedImage = await resizeImage(uri, 250, 250);
      const base64Raw = await ImgToBase64.getBase64String(resizedImage);
      // const base64Raw = await RNFS.readFile(resizedImage, 'base64')

      const base64 = `data:image/png;base64,${base64Raw}`

      this.props.onImageSelect(this.props.name, base64);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          imageSelect(this.onSelect);
        }}
        style={[
          styles.inputWrapper,
          styles.inputBoxContainer,
          { flexDirection: 'row', justifyContent: 'space-between' }
        ]}
      >
        <Icon name="filepath" color="#FFF" size={25} style={styles.dirText} />
        <TextBold textStyle={{ flex: 1 }}>
          {this.state.avatarSource.uri}
        </TextBold>
      </TouchableOpacity>
    );
  }
}

export default ImagePick;
