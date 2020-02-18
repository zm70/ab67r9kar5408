import React from 'react';
import { View } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import strings from 'src/res/strings.json';
import { TextBold, ValidationTextInput, ButtonBold } from 'AppFonts';
import { mainDetailDefault, mainDetailProps } from './helper/customPropTypes';
import cardStyles from '../../style/cardStyles';
import { pushAllFollowers } from "../navigation";



const formatFollower = (followers) => {
  return followers && followers.slice(0, 3).map((follower, index) => {
    if (index < followers.length - 1)
      return ` ${follower.fname} ${follower.lname}, `;
    return `${follower.fname} ${follower.lname}`;
  });
};

export const MainDetail = ({
  editable,
  title,
  voteBusiness,
  category,
  vote,
  description,
  address,
  phone,
  mobile,
  followers,
  onChangeText
}) => {
  let followersName = '';

  if (followers) {
    followersName = formatFollower(followers);

  }
  const shopCat =
    typeof category === 'string' ? category : category[0] && category[0].name;
  return (
    <View>
      <TextBold
        weight="bold"
        fontSize="size6"
        editable={editable}
        onChangeText={(text, anyError) => onChangeText(text, anyError, 'title')}
      >
        {title}
      </TextBold>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>

        <View style={{ flex: 1 }}>
          {category ? (
            <TextBold
              weight="light"
              fontSize="size4"
              color="gray"
              editable={false}
            >
              {strings.categoryBusiness + shopCat}
            </TextBold>
          ) : null}

          {description ? (
            <TextBold
              weight="light"
              fontSize="size5"
              numberOfLines={2}
              multiline={true}
              editable={editable}
              onChangeText={(text, anyError) =>
                onChangeText(text, anyError, 'description')
              }
            >
              {strings.descriptionWord + description}
            </TextBold>
          ) : null}

          {/* {address ? (
            <TextBold
              weight="light"
              fontSize="size5"
              editable={editable}
              onChangeText={(text, anyError) =>
                onChangeText(text, anyError, 'address')
              }
            >
              {strings.addressWord + address}
            </TextBold>
          ) : null} */}

          {phone ? (
            <TextBold
              weight="light"
              fontSize="size5"
              editable={editable}
              onChangeText={(text, anyError) =>
                onChangeText(text, anyError, 'phone')
              }
            >
              {strings.phoneWord + phone}
            </TextBold>
          ) : null}
{/* 
          {mobile ? (
            <TextBold
              weight="light"
              fontSize="size5"
              editable={editable}
              onChangeText={(text, anyError) =>
                onChangeText(text, anyError, 'mobile')
              }
            >
              {strings.mobileWord + mobile}
            </TextBold>
          ) : null} */}
        </View>
      </View>


      {followers ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <ButtonBold
            weight="light"
            fontSize="size4"
            color="gray"
            onPress={() => pushAllFollowers(followers)}>
            {strings.seeall}
          </ButtonBold>
          <TextBold
            weight="light"
            fontSize="size4"
            color="gray"
            editable={false}
          >
            {strings.followedBy + followersName}
          </TextBold>
        </View>
      ) : null}
      {typeof (vote) === "number" ? (
        <View style={{ alignItems: 'flex-start' }}>
          <AirbnbRating
            onFinishRating={(v) => {
              if (voteBusiness) {
                voteBusiness(v)
              }
            }}
            showRating={false}
            count={5}
            defaultRating={vote}
            size={13}
          />
        </View>
      ) : null}
    </View>
  );
};

const EditableField = ({
  editable,
  name,
  label,
  onChangeText,
  keyName,
  maxLength,
  color = 'black',
  numberOfLines = 1,
  validation
}) => (
    <View style={[cardStyles.inputLabelInline, editable
      ? null
      : { justifyContent: 'flex-end' }]}>
      <ValidationTextInput
        textStyle={[editable ? cardStyles.editableLarge : null]}
        weight="light"
        fontSize="size4"
        color={color}
        maxLength={maxLength}
        editable={editable}
        validation={validation}
        multiline={numberOfLines > 1}
        numberOfLines={numberOfLines}
        onChangeText={(text, anyError) => onChangeText(text, anyError, keyName)}
      >
        {name}
      </ValidationTextInput>
      <View pointerEvents="none">
        <ValidationTextInput

          editable={false}
          fontSize="size4"
          color={color}
          weight="light"
        >
          {label}
        </ValidationTextInput>
      </View>
    </View>
  );

export const MainDetailEdit = ({
  editable,
  title,
  category,
  description,
  address,
  phone,
  mobile,
  onChangeText,
  card_number,
  followers,
  ...props
}) => {
  console.log(props)
  let followersName = '';
  if (followers) {
    followersName = formatFollower(followers);
  }
  return (
    <View style={{ flex: 1 }}>
      <ValidationTextInput
        textStyle={cardStyles.editableLarge}
        weight="bold"
        fontSize="size6"
        editable={editable}
        validation={['require', 'persian']}
        maxLength={50}
        onChangeText={(text, anyError) => onChangeText(text, anyError, 'title')}
      >
        {title}
      </ValidationTextInput>


      <EditableField
        editable={false}
        name={category && category[0] && category[0].name}
        color="gray"
        label={strings.categoryBusiness}
      />


      <EditableField
        editable={true}
        name={description}
        keyName={'description'}
        validation={['require']}
        label={strings.descriptionWord}
        onChangeText={onChangeText}
        maxLength={500}
        numberOfLines={2}
      />


      <EditableField
        editable={true}
        name={address}
        keyName={'address'}
        validation={['require']}
        label={strings.addressWord}
        onChangeText={onChangeText}
        maxLength={500}
      />

      <EditableField
        editable={false}
        name={mobile}
        keyName={'mobile'}
        label={strings.mobileWord}
        onChangeText={onChangeText}
        maxLength={11}
      />

      <EditableField
        editable={true}
        name={phone}
        keyName={'phone'}
        label={strings.phoneWord}
        onChangeText={onChangeText}
        maxLength={11}
      />

      <EditableField
        editable={true}
        name={card_number}
        keyName={'card_number'}
        label={strings.cardNumber}
        onChangeText={onChangeText}
        maxLength={16}
      />


      {followers ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <ButtonBold
            weight="light"
            fontSize="size4"
            color="gray"
            onPress={() => pushAllFollowers(followers)}>
            {strings.seeall}
          </ButtonBold>
          <TextBold
            weight="light"
            fontSize="size4"
            color="gray"
          >
            {strings.followedBy + followersName}
          </TextBold>
        </View>
      ) : null}
    </View>
  );
};

MainDetail.propTypes = {
  ...mainDetailProps
};
MainDetail.defaultProps = {
  ...mainDetailDefault
};
MainDetailEdit.propTypes = {
  ...mainDetailProps
};
MainDetailEdit.defaultProps = {
  ...mainDetailDefault
};
