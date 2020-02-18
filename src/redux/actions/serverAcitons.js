import * as actionType from './actionType';

export function loading(isLoading) {
  return {
    type: actionType.LOADING,
    value: isLoading
  };
}
