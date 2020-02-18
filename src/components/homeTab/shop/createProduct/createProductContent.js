import React from 'react';
import { TouchableOpacity, View, Image, ScrollView, Platform } from 'react-native';
import { mainStyles } from 'app-styles';
import { CompleteCosts, BoxComponents } from 'AppComponentShared';
import { observer } from 'mobx-react';
import strings from 'src/res/strings.json';

import EStyleSheet from 'react-native-extended-stylesheet';
import { TextBold, ButtonBold } from 'AppFonts';
import { ProductFeature } from '../helper/singleBusinessItems';
import { imageSelect, resizeImage, getImageOrPlaceholder } from '../../../shared/helperFunc';

const marginTop = 10;

const styles = EStyleSheet.create({
  imageConatainer: {
    borderRadius: 10,
    backgroundColor: '$colorChatGray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainImage: {
    width: '100%',
    aspectRatio: 2 / 1
  },
  extraImage: {
    width: '22%',
    aspectRatio: 1 / 1
  }
});

const ImageContainer = ({ uri, isMain, index, onImageSelect }) => {
  return (
    <TouchableOpacity
      key={index}
      style={[
        styles.imageConatainer,
        isMain ? styles.mainImage : styles.extraImage
      ]}
      onPress={() =>
        imageSelect((selectedUri) => onImageSelect(selectedUri, index, isMain))
      }
    >
      {uri ? (


        <Image
          style={[
            styles.imageConatainer,
            isMain ? styles.mainImage : { width: '100%', aspectRatio: 1 / 1 }
          ]}
          source={getImageOrPlaceholder(uri)}
        />



      ) : (
          <View style={{ flexDirection: 'row' }}>
            <TextBold
              fontSize="size9"
              color="white"
              textStyle={{ marginBottom: Platform.OS === 'android' ? 10 : 0, height: '100%', alignSelf: 'center' }}
            >
              +
        </TextBold>
          </View>
        )}
    </TouchableOpacity>
  );
};

@observer
export default class CreateProduct extends React.PureComponent {
  state = {
    productImages: Array(4).fill(''),
    productMainImage: '',
    couldComment: true
  };


  componentDidMount() {
    console.log(this.props);
    // this.props.store.setupProductValues('Abrk-1572346', 'فروشگاه خلیلی');
    // console.log(this.props);
    if (this.props.product_key) {
      this.props.store.setupProductValues(this.props.id, this.props.name);
    } else {
      this.props.store.setupBusinessId(this.props.id);
    }
  }

  getImageSafty = (index) => {

    return (
      this.props.store.bodyRequest.images &&
      this.props.store.bodyRequest.images[index] &&
      this.props.store.bodyRequest.images[index].file
    );
  };

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
          <TextBold
            textStyle={{ textAlign: 'right', marginTop }}
            fontSize="size7"
          >
            {strings.chooseMainImg}
          </TextBold>

          <ImageContainer
            uri={this.getImageSafty(0)}
            isMain
            index={0}
            onImageSelect={this.props.store.onSelect}
          />
          <TextBold
            textStyle={{ textAlign: 'right', marginTop }}
            fontSize="size7"
          >
            {' '}
            {strings.chooseOtherImg}
          </TextBold>
          <View
            style={{
              marginTop,
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row'
            }}
          >
            {this.state.productImages.map((uri, index) => (
              <ImageContainer
                uri={this.getImageSafty(index + 1)}
                index={index}
                onImageSelect={this.props.store.onSelect}
              />
            ))}
          </View>
          <CompleteCosts
            properties={this.props.store.properties}
            onChangeText={this.props.store.setBodyRequest}
            newCost={this.props.store.newCost}
          />
          <ProductFeature
            isOwner
            description={this.props.store.bodyRequest.description}
            onChangeText={this.props.store.setDescription}
            containerStyle={{ marginTop }}
          />
          <View style={{ alignSelf: 'center', marginTop }}>
            <BoxComponents
              detail={strings.closeCommentsDetail}
              title={strings.closeComments}
              onChange={this.props.store.seBoxValue}
              fontSize="size7"
              isActive={this.props.store.bodyRequest.have_post_cost === 1}
            />
          </View>
          <ButtonBold
            fontSize="size7"
            color="white"
            containerStyle={[mainStyles.nextButton, { alignSelf: 'center', marginTop: 5 }]}
            onPress={() =>
              this.props.store.onCreateProduct(
                this.props.addNewProduct,
                this.props.editProduct)
            }
          >
            {strings.createProduct}
          </ButtonBold>
        </ScrollView>
      </View>
    );
  }
}
