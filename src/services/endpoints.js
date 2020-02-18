import { Animated } from 'react-native';
import httpClient from './restService';
import {  loadingErrorDialog } from '../components/dialogbox/helper';
import { getData } from './cacheHandler';
import { parseErrors } from './helper';

export const getCategories = () => {
  return getData('categories/all')
    .then((data) => {
      const categories = data;
      const ancestors = categories.filter(
        (item) => item.ancestors.length === 0
      );
      const subCategories = ancestors.map((ancestor) => {
        return categories.filter((item) =>
          item.ancestors[0] ? item.ancestors[0].id === ancestor.id : false
        );
      });

      const structuredCategory = ancestors.map((ancestor, index) => {
        return {
          widthAnim: new Animated.Value(0),
          parent: ancestor,
          children: subCategories[index]
        };
      });
      console.log(structuredCategory);
      return structuredCategory;
    })
    .catch((error) => {
      // loadingErrorDialog();
      throw parseErrors(error);
    });
};

export const generalSearch = (text) => {
  return httpClient({
    method: 'GET',
    url: `/generalSearch/${text}`
  })
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
}
