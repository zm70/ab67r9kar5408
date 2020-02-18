import React from 'react';
import { createDeepLinkingHandler } from 'react-native-deep-link';
import {
  pushSingleBusiness,
  pushSingleProduct
} from './src/components/shared/navigation';

import App from './App';

const handleInvitationToBusiness = ({
  params: { businessId, title }
}) => () => {
  // addCurrentUserToChannel is a redux-thunk action,
  // which was defined somewhere in the code.
  console.log(title, businessId);
  ///
  pushSingleBusiness({ id: businessId, title }, { data: 'shared' });
};

const handleInvitationToProduct = ({ params: { productId, name } }) => () => {
  // addCurrentUserToChannel is a redux-thunk action,
  // which was defined somewhere in the code.

  pushSingleProduct({ id: productId, name, isShared: 'shared' });
};

const schemes = [
  {
    name: 'http:',
    routes: [
      {
        expression: '/abrikaar/business/:businessId/:title',
        callback: handleInvitationToBusiness
      },
      {
        expression: '/abrikaar/product/:productId/:name',
        callback: handleInvitationToProduct
      }
    ]
  }
];
const Application = createDeepLinkingHandler(schemes)(App);

export default class AppWithDeepLink extends React.Component {
  render() {
    return (
      <Application
        onGetInitialUrlError={(err) => console.log(err)}
        onCanOpenUrlError={(err) => console.log(err)}
        onUrlIsNotSupported={(url) =>
          console.log(`The ${url} is not supported.`)
        }
        onCannotHandleUrl={(url) =>
          console.log(`A handler for the ${url} was not found.`)
        }
      />
    );
  }
}
