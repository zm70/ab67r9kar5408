import React from 'react';
import CreateProductContent from './createProductContent';
import CreateProductStore from './createProductMobx';
import { useDispatch, useSelector } from "react-redux";
import { ADD_NEW_PRODUCT_TO_LIST, SET_PRODUCTS_OF_MY_BUSINESS } from "../../../../redux/actions/actionType";

const addNewProduct = (product, dispatch) => {
  dispatch({
    type: ADD_NEW_PRODUCT_TO_LIST,
    products: [product]
  });
}

const editProduct = (product, productList, dispatch) => {
  const editedProductIndex = productList.findIndex(p => p.id == product.id)
  const editedProduct = productList;
  editedProduct.splice(editedProductIndex, 1, product);

  console.log(product, productList, editedProduct, editedProductIndex);
  dispatch({
    type: SET_PRODUCTS_OF_MY_BUSINESS,
    products: editedProduct
  });
}


const CreateProduct = (props) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.shop.myBuseinessProductList);

  return (
    <CreateProductContent
      addNewProduct={(product) => addNewProduct(product, dispatch)}
      editProduct={(product) => editProduct(product, productList, dispatch)}
      {...props}
      store={CreateProductStore}
    />
  );
};

export default CreateProduct;
