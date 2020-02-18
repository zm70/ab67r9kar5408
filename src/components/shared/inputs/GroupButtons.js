import React from 'react';
import { ButtonBold } from 'AppFonts';
import propTypes from 'prop-types';
import cardStyles from '../../style/cardStyles';

const Auxillary = props => props.children;

const GroupButton = ({ buttons, isMedium }) => (
  <Auxillary
    style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}
  >
    {buttons.map(({ title, color, icon, backColor, key, onPress }) => (
      <ButtonBold
        key={key}
        containerStyle={[
          cardStyles.followBtnWrapper,
          {
            borderColor: color,
            backgroundColor: backColor,
            flexDirection: 'row-reverse'
          }
        ]}
        iconStyle={{ color }}
        textStyle={{
          textAlign: 'center',
          color: backColor ? '#fff' : color,
          margin: 2
        }}
        onPress={onPress}
        iconName={icon || undefined}
        isMedium={isMedium}
      >
        {title}
      </ButtonBold>
    ))}
  </Auxillary>
);

export default GroupButton;

GroupButton.propTypes = {
  buttons: propTypes.shape([
    {
      key: propTypes.number,
      title: propTypes.string.isRequired,
      color: propTypes.string,
      backColor: propTypes.string,
      onPress: propTypes.func.isRequired,
      icon: propTypes.string
    }
  ]).isRequired,

  isMedium: propTypes.bool
};

GroupButton.defaultProps = {
  buttons: [{ key: 100, icon: undefined }],
  isMedium: false
};
