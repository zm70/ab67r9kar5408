import React, { PureComponent } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { mainStyles } from 'app-styles';
import { Icon } from 'AppFonts';
import ImgToBase64 from 'react-native-image-base64';
import { imageSelect, resizeImage } from '../shared/helperFunc';
// import RNFS from 'react-native-fs';

class ImagePick extends PureComponent {
  state = {
    avatarSource: null
  };

  onSelect = async (uri) => {
    this.setState({
      avatarSource: { uri }
    });
    try {
      const resizedImage = await resizeImage(uri, 250, 250);
      const base64 = await ImgToBase64.getBase64String(resizedImage);
      // const base64 = await RNFS.readFile(resizedImage, 'base64')

      this.props.setImagePath(base64);
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    console.log(this.state.avatarSource)
    return (
      <TouchableOpacity
        onPress={() => {
          imageSelect(this.onSelect);
        }}
        style={{ margin: 10 }}
      >
        {this.state.avatarSource ? (
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={this.state.avatarSource}
          />
        ) : (
            <Icon
              name="imagepicker"
              style={mainStyles.giganticIcon}
              color="#FFF"
            />
          )}
      </TouchableOpacity>
    );
  }
}

export default ImagePick;
