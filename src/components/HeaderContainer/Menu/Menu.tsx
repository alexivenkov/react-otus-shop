import React, { FC } from 'react';
import { Menu as MenuWrapper } from 'antd';

export const Menu: FC = () => {
  const items = new Array(5).fill(null).map((_, index) => ({
    key: index + 1,
    label: `menu item ${index + 1}`,
  }));

  return <MenuWrapper style={{ flex: 1, minWidth: 0 }} mode={'horizontal'} items={items} />;
};
