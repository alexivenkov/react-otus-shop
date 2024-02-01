import React, { FC, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { Product } from '@/models/product';

interface CounterCartProps {
  count: number;
  add: (product: Product) => void;
  remove: (product: Product) => void;
  product: Product;
}

export const CounterCart: FC<CounterCartProps> = (props: CounterCartProps) => {
  const [count, setCount] = useState<number>(props.count);

  const add = () => {
    setCount(count + 1);

    props.add(props.product);
  };

  const remove = () => {
    if (count > 0) {
      setCount(count - 1);

      props.remove(props.product);
    }
  };

  return (
    <>
      {!count && <Button onClick={add}>Add To Cart</Button>}
      {!!count && (
        <Space.Compact>
          <Button onClick={remove}>-</Button>
          <Input value={count} disabled={true} />
          <Button onClick={add}>+</Button>
        </Space.Compact>
      )}
    </>
  );
};
