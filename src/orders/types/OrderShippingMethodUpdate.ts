/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderUpdateShippingInput, OrderErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderShippingMethodUpdate
// ====================================================

export interface OrderShippingMethodUpdate_orderUpdateShipping_errors {
  __typename: "OrderError";
  code: OrderErrorCode;
  field: string | null;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order_total_tax {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order_total_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order_total {
  __typename: "TaxedMoney";
  tax: OrderShippingMethodUpdate_orderUpdateShipping_order_total_tax;
  gross: OrderShippingMethodUpdate_orderUpdateShipping_order_total_gross;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order_shippingMethod_price {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: OrderShippingMethodUpdate_orderUpdateShipping_order_shippingMethod_price | null;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order_shippingPrice {
  __typename: "TaxedMoney";
  gross: OrderShippingMethodUpdate_orderUpdateShipping_order_shippingPrice_gross;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping_order {
  __typename: "Order";
  availableShippingMethods: (OrderShippingMethodUpdate_orderUpdateShipping_order_availableShippingMethods | null)[] | null;
  total: OrderShippingMethodUpdate_orderUpdateShipping_order_total;
  id: string;
  shippingMethod: OrderShippingMethodUpdate_orderUpdateShipping_order_shippingMethod | null;
  shippingMethodName: string | null;
  shippingPrice: OrderShippingMethodUpdate_orderUpdateShipping_order_shippingPrice;
}

export interface OrderShippingMethodUpdate_orderUpdateShipping {
  __typename: "OrderUpdateShipping";
  errors: OrderShippingMethodUpdate_orderUpdateShipping_errors[];
  order: OrderShippingMethodUpdate_orderUpdateShipping_order | null;
}

export interface OrderShippingMethodUpdate {
  orderUpdateShipping: OrderShippingMethodUpdate_orderUpdateShipping | null;
}

export interface OrderShippingMethodUpdateVariables {
  id: string;
  input: OrderUpdateShippingInput;
}
