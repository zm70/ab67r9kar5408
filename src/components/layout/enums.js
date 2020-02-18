import React from 'react';
import strings from 'src/res/strings.json';

import colors from 'src/res/colors.json';
import { Icon } from 'AppFonts';
import * as navigationKeys from "../shared/navigationKeys";

function createIcon(name) {
  return <Icon name={name} color={colors.blue} iconSize="size10" />;
}

export const parentIndexMap = {
  first: 0,
  second: 1,
  third: 2,
  forth: 3,
  fifth: 4,
  sixth: 5
};

export const tabRoutes = [
  { index: 5, key: navigationKeys.BARCODE_PAGE, title: strings.home, iconName: 'barcode' },
  {
    index: 4,
    key: navigationKeys.MAP_PAGE,
    title: strings.followedBusiness,
    iconName: 'map'
  },
  { index: 3, key: navigationKeys.CHAT_PAGE, title: strings.myBusiness, iconName: 'chat' },
  { index: 2, key: navigationKeys.MY_BUSINESS_PAGE, title: strings.chat, iconName: 'myjob' },
  {
    index: 1,
    key: navigationKeys.BUSINESS_PAGE,
    title: strings.businessAddress,
    iconName: 'shop'
  },

  { index: 0, key: navigationKeys.HOME_PAGE, title: strings.barcode, iconName: 'home' }
];

export const iconMap = {
  first: 'home',
  second: 'shop',
  third: 'myjob',
  forth: 'chat',
  fifth: 'map',
  sixth: 'barcode'
};

export const icons = (key) => {
  return {
    first: createIcon(iconMap[key]),
    second: createIcon(iconMap[key]),
    third: createIcon(iconMap[key]),
    forth: createIcon(iconMap[key]),
    fifth: createIcon(iconMap[key]),
    sixth: createIcon(iconMap[key])
  };
};
