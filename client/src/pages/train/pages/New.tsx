import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export const New = () => {
  const store = useSelector((store: any) => store);
  console.log(store);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch({ type: 'LOAD_DATA' })}>click</Button>
    </div>
  );
};
