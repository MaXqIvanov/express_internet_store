import React from 'react';
import { CloseButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeOrderPrice } from '../Redux/orderSlice';

export const TempOrderPage = (props: any) => {
  const dispatch = useDispatch();

  const filtr = () => {
    props.serR(props.r.filter((elem: any) => elem !== props.props.name));
  };

  return (
    <div className="TempOrderPage_div">
      <CloseButton
        variant="white"
        onClick={() => {
          dispatch(changeOrderPrice(-props.props.price));
          filtr();
        }}
        className="btn button_order_basket"
      />
      <div className="data_name">{props.props.name}</div>
      <div className="data_price">{props.props.price} ₽</div>
    </div>
  );
};
