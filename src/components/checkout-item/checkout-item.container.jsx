import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
import { gql } from 'apollo-boost';

import CheckoutItem from './checkout-item.component';

const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item) {
    addItemToCart(item: $item) @client
  }
`;

const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;

const CheckoutItemContainer = ({ removeItemFromCart, addItemToCart, clearItemFromCart, ...props }) => <CheckoutItem
  {...props}
  clearItem={item => clearItemFromCart({ variables: { item } })}
  addItem={item => addItemToCart({ variables: { item } })}
  removeItem={item => removeItemFromCart({ variables: { item } })}
/>;

export default flowRight(
  graphql(REMOVE_ITEM_FROM_CART, { name: 'removeItemFromCart' }),
  graphql(ADD_ITEM_TO_CART, { name: 'addItemToCart' }),
  graphql(CLEAR_ITEM_FROM_CART, { name: 'clearItemFromCart' }),
)(CheckoutItemContainer);