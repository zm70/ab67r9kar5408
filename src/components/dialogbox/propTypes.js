import Proptypes from 'prop-types';

export const dialogProps = {
  msg: Proptypes.string,
  visible: Proptypes.bool,
  confirm: Proptypes.func,
  onDismiss: Proptypes.func,
  dismiss: Proptypes.func
};

export const defaultProps = {
  msg: '',
  visible: false,
  confirm: () => {},
  onDismiss: () => {},
  dismiss: () => {}
};
