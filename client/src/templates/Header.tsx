import React from 'react';
import { Navigation } from './Navigation';

export const Header = (props: any) => {
  return (
    <div className="Header">
      <Navigation
        setPage={props.setPage}
        setName={props.setName}
        setTypeGoods={props.setTypeGoods}
      />
    </div>
  );
};
