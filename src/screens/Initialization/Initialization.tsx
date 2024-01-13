import React, { FC, memo, useContext } from 'react';
import cn from 'clsx';
import s from './Initialization.sass';
import { useDispatch, useSelector } from 'react-redux';
import { initActions } from '@/store/slices/init';
import { AppContext, Context } from '@/App';
import { authSelectors } from '@/store/slices/auth';

export const Initialization: FC = memo(() => {
  const context: AppContext = useContext<AppContext>(Context);
  const dispatch = useDispatch();
  dispatch(initActions.run());
  context.token = useSelector(authSelectors.token);

  return (
    <div className={cn(s.initialization)}>
      <h1>Initialization</h1>
    </div>
  );
});

Initialization.displayName = 'Initialization';
