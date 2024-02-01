import React, { FC } from 'react';
import { Image, Layout, Space } from 'antd';
import { Menu } from '@/components/HeaderContainer/Menu/Menu';
import cn from 'clsx';
import s from './Header.sass';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Auth } from '@/components/HeaderContainer/Auth/Auth';
import { Link } from 'react-router-dom';
import { CartIcon } from '@/components/CartIcon/CartIcon';

const { Header } = Layout;

export const HeaderContainer: FC = () => {
  return (
    <Header className={cn(s.header)}>
      <div className={cn(s.headerContent)}>
        <div className={cn(s.logo)}>
          <Image
            preview={false}
            src={
              'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAQAAAAk/gHOAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+gBDRImJBm20skAAANnSURBVGje7dVLbBR1HAfwz+yj2weltNBVQDEFjK2JIiSgQgQjAYKi8ZGSGGw1HPDg88DFGyc9+D54QEXRRhNFD5AIEkxaKkYh4RGlCqIgsTwMQkFaaLvtjAeWWkrXAHLwMJ/Lzsz+55fv7P+3vyEWi8VisVgsFovFLk/yqlRJKZHSfzWDlSgRXMb62VqtUn6l+YcKzDNTqM1afZdYZYy7jBym1iVJXHRlrBl22GyKSQIqLqVKxJVvwwXJI0uerG04lU2cnN7Xms0uSDe/sOJs95DIab2iYc9CKaFwYG1aoPeCu9Oii3/ZCyIEqRULF83ar0u900ZPyo4a8UrUPVAlME+D8X6zWquE+yyRddhrQpESz5ipw8c2CNV43HQJO31grzrP6nDYfJF1PtJteAGlL7W0RX9FHVEUnYjao7ePljyiamBBveP2+VC7w2a5xVGnbbTVDA/o0+eIdpE/3K7GtyJndYnsUuceOZFOp0R6PV+wF0pdU5yuyCg3CuU2+Lo0vUCjsloY6TlVdtqqzViPqVbpjE2etk1S4LhG8+2WdZtGd9jjfgvtMMUygT6dlpvpPWlLVReIUGVcWdHIYnBMi5/VJad0ZWtvfnD0pJuodD1u9LCkZn/a7nUpL2syRyjhkG32OIhik7HFV1q1YLIiCe0+1eZz/apVFuiFscrLi0Zk0K9ZYIKe0pVPrTN6aaal8SEdDpngSyvVmWithE2avWiaxTYhEuQfqM8B3OluObOxX6/QdeptUS/pmI4CEcYJKtIlRQgxUVaPuvQBFXJZRcmO/jfVWm6xaqGDxnvVXjX4NV8pcG7aJjRZZKovRMr86F1jUOYNPSrkvO9YgQg3OFGZyaTPNaZ+c8C9aE5Klehc45QG42z1mY1u1aTWdzZbpcY7ftcjtN4RbfZ51BOmSvjearvNlXBAkxn6rdNUaEJ4y7KGNWFvFEW56JNoa/SPlj0jrq0+3zvFg/qnWFphRTL5o7l67VYlPdz6Qe04TSabCRKIRML8Z4RUpiyZvzfUPWj4dMv9S4RePfmjQFJKUm649YM24gdHf9m+PhkFQrscdDI/9oLET/vPdBb5D47b6NCQSTkgGHI2/KsmnN/f5Zsrj5CQFskNjPJCEQIEAoFz/4kg/+X5bYnFYrFYLBaLxWKx/4u/AWTJHc+mK7SNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTAxLTEzVDE4OjM4OjEwKzAwOjAwqCIeawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wMS0xM1QxODozODoxMCswMDowMNl/ptcAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDEtMTNUMTg6Mzg6MzYrMDA6MDCvn7VPAAAAAElFTkSuQmCC'
            }
          />
        </div>
        <Menu />
        <Space size={'large'}>
          <Link to={'/cart'}>
            <CartIcon />
          </Link>
          <Auth />
          <LocaleSwitcher />
        </Space>
      </div>
    </Header>
  );
};
