import React from 'react';
import { View } from 'react-native';

import { TextBold } from 'AppFonts';
import { inputStyle } from 'app-styles';
import {
  Gender2,
  SimpleTextInput,
  MapInput
} from 'AppComponentShared';
import FilterCard from '../../shared/cards/filterCard';

export const SaeInput = ({
  value,
  label,
  name,
  onValueChange,
  index,
  gender,
  onMapSelect,
  validation,
  showConfirm,
  maxLen,
  type,
  ejectCityParameters,
  flyTo
}) => {
  return (
    <View style={{ flex: 1 }}>
      {name === 'map' ? (
        <MapInput
          onSelect={showConfirm}
          onMapSelect={onMapSelect}
          name={name}
          index={index}
          value={value}
          onNext={() => { }}
          flyTo={flyTo}
        />
      ) : name === 'filter' ? (
        <View style={inputStyle.inputWrapper80}>
          <FilterCard
            justCities
            ejectParameters={ejectCityParameters}
            onFilter={() => { }}
            province_id={value['province_id']}
            city_id={value['city_id']}
            itemStyle={inputStyle.inputWrapper}
          />
        </View>
      ) : (
            <View key={name}>
              {name === 'gender' ? (
                <>
                  <TextBold textStyle={{ textAlign: 'right' }}>{label}</TextBold>
                  <Gender2
                    onValueChange={onValueChange}
                    value={gender}
                    name={name}
                    index={index}
                  />
                </>
              ) : (
                  <SimpleTextInput
                    validation={validation}
                    label={label}
                    onValueChange={onValueChange}
                    value={value}
                    name={name}
                    index={index}
                    fullWidth
                    keyboardType={maxLen ? 'numeric' : 'default'}
                    maxLength={maxLen}
                    multiline={type === 'textarea'}
                    numberOfLines={type === 'textarea' ? 4 : 1}
                  />
                )}
            </View>
          )}
    </View>
  );
};