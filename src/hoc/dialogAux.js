// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import EStylesSheet from 'react-native-extended-stylesheet';
// import AlertDialog from '../components/dialogbox/popupDialog/alertDialog';
// import ConfirmDialog from '../components/dialogbox/popupDialog/confirmDialog';
// import LoadingDialog from '../components/dialogbox/popupDialog/loadDialog';
// import WarningDialog from '../components/dialogbox/popupDialog/warningDialog';
// import { View } from 'react-native';

// const DialogAux = (props) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <AlertDialog
//         msg={props.msg}
//         visible={props.showAlert}
//         dismiss={props.dismissAlert}
//         type={props.type}
//       />
//       <LoadingDialog
//         msg={props.msg}
//         visible={props.showLoading}
//         dismiss={props.dismissLoading}
//         type={props.type}
//       />

//       <ConfirmDialog
//         msg={props.msg}
//         visible={props.showConfirm}
//         dismiss={props.dismissConfirm}
//         confirm={props.confirm}
//         onDismiss={props.onDismiss}
//       />
//       <WarningDialog
//         visible={props.showWarning}
//         dismiss={props.dismissWarning}
//       />

//       {props.children}
//     </View>
//   );
// };

// export default connect()(DialogAux);
