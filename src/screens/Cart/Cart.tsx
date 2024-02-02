import React, { FC, useEffect } from 'react';
import { ShoppingCart } from '@/components/ShoppingCart/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelectors } from '@/store/slices/cart';
import { ordersActions } from '@/store/slices/orders';
import { OrderProduct, OrderStatus } from '@/models/order';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/hooks/useNotification';
import { CartState, OrdersState, Status } from '@/store/states';
import { useTranslation } from 'react-i18next';

export const Cart: FC = () => {
  const cart: CartState = useSelector(cartSelectors.get);
  const sum = useSelector(cartSelectors.sum);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError, showSuccess } = useNotification();

  const onCheckout = () => {
    const ordersPayload = cart.data.map((order: OrderProduct) => {
      return {
        id: order.product.id,
        quantity: order.quantity,
      };
    });

    dispatch(
      ordersActions.checkOut({
        products: ordersPayload,
        status: OrderStatus.Processing,
      })
    );

    navigate('/orders');
  };

  useEffect(() => {
    if (cart.status == Status.succeeded) {
      showSuccess(t('messages.orderCreated'));
    }

    if (cart.status == Status.failed) {
      showError(cart.error);
    }
  }, [cart.status]);

  return (
    <>
      <ShoppingCart cart={cart.data} sum={sum} onCheckOut={onCheckout} />
    </>
  );
};
