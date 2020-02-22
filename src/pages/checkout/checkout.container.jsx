import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CheckoutPage from './checkout.component';

const GET_CART_PROPERTIES = gql`
  {
   cartItems @client
   total @client
  }
`;

const CheckoutPageContainer = ({ data: { cartItems, total } }) => <CheckoutPage cartItems={cartItems} total={total} />

export default flowRight(
  graphql(GET_CART_PROPERTIES),
)(CheckoutPageContainer);