import React from 'react';
import { View } from 'react-native';
import { ButtonBold, TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import   {mainStyles,cardStyles}  from 'app-styles';





import _ from 'underscore';
import 'react-input-range/lib/css/index.css'

import 'jquery-ui/ui/effects/effect-slide';
import Helpers from "../../service/Helpers";

const flyToCard = (data, index)=> {
  const array = [];
  array.push(data);
  const cartData = Helpers.getLocalStorageData('cartData');
  const findManData = _.findWhere(cartData, {id: data.id});
  if (findManData) {
      for (let i = 0; i < cartData.length; i++) {
          if (data.id === cartData[i].id) {
              cartData[i].qty += 1;
              break;
          }
      }
      Helpers.setLocalStorageData('cartData', cartData);
  } else {
      if (cartData) {
          cartData.push(array[0]);
          Helpers.setLocalStorageData('cartData', cartData);
      } else {
          Helpers.setLocalStorageData('cartData', array);
      }
  }
  setTimeout(()=>{
    this.props.totalCnt(Helpers.getLocalStorageData('cartData') ? Helpers.getLocalStorageData('cartData').length : 0);
  },2000);


  let imgtodrag = document.getElementsByClassName('pro_img')[index];
  let viewcart = document.getElementsByClassName('w3view-cart')[0];
  let imgtodragImage = imgtodrag.querySelector('.pro_img');

  let disLeft= imgtodrag.getBoundingClientRect ().left;
  let disTop= imgtodrag.getBoundingClientRect ().button;
  let cartleft= viewcart.getBoundingClientRect ().left;
  let carttop= viewcart.getBoundingClientRect ().button;
  let image = imgtodragImage.cloneNode(true);

  image.style ='z-index: 1111; width: 100px;opacity:0.8; position:fixed; top:'+ disTop+'px;left:'+ disLeft+'px;transition: left 2s, top 2s, width 2s, opacity 2s cubic-bezier(1, 1, 1, 1)';
  var rechange=document.body.appendChild(image);
  setTimeout(function() {
      image.style.left=cartleft+'px';
      image.style.top=carttop+'px';
      image.style.width='40px';
      image.style.opacity='0';
  }, 200);
  setTimeout(function() {
      rechange.parentNode.removeChild(rechange);
  }, 3000);
}




export const DiaolgCart = ({ name, count, cost }) => (
  <View style={cardStyles.cartDialog}>
    <TextBold fontSize="size8" textStyle={{ alignSelf: 'center' }}>
      {name}
    </TextBold>
    <TextBold fontSize="size7">{+count * +cost}</TextBold>
    <View style={cardStyles.addSubContainer}>
      <ButtonBold fontSize="size7">+</ButtonBold>
      <TextBold fontSize="size7">{count}</TextBold>
      <ButtonBold fontSize="size7">-</ButtonBold>
    </View>
    <ButtonBold onPress={flyToCard}
      containerStyle={[mainStyles.defaultButton, mainStyles.backOrange]}
    >
      {strings.order}
    </ButtonBold>
  </View>
);
