import React from 'react';
import Animation from 'lottie-react-native';
import EStylesSheet from 'react-native-extended-stylesheet';
import loadingAnimation from '../assets/animation/loading.json';
import { ActivityIndicator } from 'react-native';

const styles = EStylesSheet.create({
  animation: {}
});

const AnimationAux = (props) => {
  if (props.loading) {
    return (
      <ActivityIndicator
        style={[styles.animation, props.extraStyle]}
        size={40}
        color="#0e85c7"
      />
    );
  }
  return props.children;
};

export default AnimationAux;

{
  /* <Animation
            source={loadingAnimation}
            autoPlay={true}
            style={[styles.animation, props.extraStyle]}
        /> */
}
