import { Actions } from 'react-native-router-flux';
import { tabRoutes, iconMap } from '../layout/enums';

export const pushSubpage = (childKey, parentKey, title, iconName, data) => {
  const parentIndex = tabRoutes.findIndex(route => route.key === parentKey)
  console.log(parentKey, parentIndex)
  const passProps = {
    childKey,
    parentKey,
    iconName: iconName ? iconName : iconMap[tabRoutes[parentIndex].key],
    titles: title ? title : tabRoutes[parentIndex].route,
    data
  };
 
  // if (Actions.currentScene == "subHome") {
  //   Actions.refresh({ ...passProps })
  //   return
  // }
  Actions.subHome({ ...passProps });
 
};

export const pushCatSubpage = (childKey, parentKey, title, iconName, data) => {
  const parentIndex = tabRoutes.findIndex(route => route.key === parentKey)
  const passProps = {
    childKey,
    parentKey,
    iconName: iconName ? iconName : iconMap[tabRoutes[parentIndex].key],
    titles: title ? title : tabRoutes[parentIndex].route,
    data
  };
  
  Actions.subCategory({ ...passProps });
  
};