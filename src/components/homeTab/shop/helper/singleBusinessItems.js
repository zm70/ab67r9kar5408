import React from 'react';
import { View, Image } from 'react-native';
import { ButtonBold, TextBold, TextInputBold } from 'AppFonts';
import { AirbnbRating } from 'react-native-elements';
import { inputStyle } from "app-styles";
import strings from 'src/res/strings';
import { mainStyles } from 'app-styles';
import { getImageOrPlaceholder } from '../../../shared/helperFunc';
import { pushEditProduct, pushConfirmChange, pushDetailBusiness, pushDialogBarcode } from '../../../shared/navigation';

export const BusinessGroupButton = ({
  containerStyle,
  isOwner,
  detailData,
  submitEditBusiness,
  barcode
}) => (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        },
        containerStyle
      ]}
    >
      <ButtonBold
        containerStyle={[
          mainStyles.defaultButton,
          mainStyles.paddingHorizontal,
          { flexDirection: 'row' }
        ]}
        iconStyle={mainStyles.defaultButtonText}
        onPress={() => pushDialogBarcode(barcode)}
        iconName="barcode"
        fontSize="size7"
        color="white"
      >
        {strings.qrcode}
      </ButtonBold>
      <ButtonBold
        containerStyle={[
          mainStyles.defaultButton,
          isOwner ? mainStyles.backOrange : null,
          { flex: 1, marginRight: 10 }
        ]}
        onPress={isOwner ? submitEditBusiness : () => pushDetailBusiness(detailData)}
        fontSize="size7"
        color="white"
      >
        {isOwner ? strings.editBusinessDetail : strings.seeBusinessDetail}
      </ButtonBold>
    </View>
  );

export const ImageHeader = ({ voteBusiness, vote, banner, isOwner, chooseBanner }) => {
  console.log('vote', vote)
  return (
    <View>
      <Image
        source={getImageOrPlaceholder(banner)}
        style={{ width: '100%', aspectRatio: 2 / 1 }}
        resizeMode="stretch"
      />
      {isOwner ? (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 5,
            top: 5
          }}
        >
          {/* <ButtonBold
            containerStyle={[
              mainStyles.defaultButton,
              mainStyles.backRed,
              mainStyles.paddingHorizontal,
              { margin: 5 }
            ]}
            onPress={() => {}}
            fontSize="size7"
            color="white"
          >
            {strings.removeBanner}
          </ButtonBold> */}
          <ButtonBold
            containerStyle={[
              mainStyles.defaultButton,
              mainStyles.backOrange,
              mainStyles.paddingHorizontal,
              { margin: 5 }
            ]}
            onPress={chooseBanner}
            fontSize="size7"
            iconSize="size9"
            color="white"
            iconName="edit"
            iconColor="white"
          >
            {strings.changeBanner}
          </ButtonBold>
        </View>
      ) : null}
      {typeof (vote) === "number" ?
        <View style={{ position: 'absolute', top: 0 }}>
          <AirbnbRating
            onFinishRating={(v) => {
              if (voteBusiness) {
                voteBusiness(v)
              }
            }}
            showRating={false}
            count={5}
            defaultRating={vote}
            size={20}
          />
        </View> : null}
    </View>
  );
};

export const EditGroupButton = ({
  removeProduct,
  containerStyle,
  isOwner,
  ...props
}) => (
    <View style={[{ flexDirection: 'row', width: '100%' }, containerStyle]}>
      {isOwner ? (
        <ButtonBold
          containerStyle={[
            mainStyles.defaultButton,
            { backgroundColor: 'red', flex: 1, margin: 3 }
          ]}
          iconStyle={mainStyles.icons}
          color="white"
          onPress={removeProduct}
          fontSize="size7"
        >
          {strings.delete}
        </ButtonBold>
      ) : null}
      <ButtonBold
        containerStyle={[
          mainStyles.defaultButton,
          isOwner ? mainStyles.backOrange : null,
          { flex: 3, margin: 3 }
        ]}
        iconStyle={mainStyles.icons}
        color="white"
        onPress={() => {
          if (isOwner) pushEditProduct(props);
        }}
        fontSize="size7"
      >
        {isOwner ? strings.edit : strings.watch}
      </ButtonBold>
    </View>
  );

export const ProductFeature = ({
  containerStyle,
  onChangeText,
  isOwner,
  description
}) => (
    <View style={[{ width: '100%', flex: 1 }, containerStyle]}>
      <TextBold
        fontSize="size7"
        color="white"
        textStyle={[
          mainStyles.defaultButton,
          { textAlign: 'center', textAlignVertical: 'center' }
        ]}
      >
        {strings.productFeature}
      </TextBold>

      {isOwner ? (
        <TextInputBold
          multiline
          onChangeText={onChangeText}
          fontSize="size7"
          textStyle={[inputStyle.descriptionWrapper]}
        >
          {description}
        </TextInputBold>
      ) : (
          <TextBold
            fontSize="size7"
            textStyle={inputStyle.descriptionWrapper}
          >
            {description}
          </TextBold>
        )}
    </View>
  );
