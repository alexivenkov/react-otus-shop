import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  condition: boolean;
  redirectPath: string;
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
  if (!props.condition) {
    return <Navigate to={props.redirectPath} />;
  }
  return <>{props.children}</>;
};
