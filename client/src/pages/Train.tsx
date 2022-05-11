import React from 'react';
import s from '../scss/train/Train.module.scss';

export const Train = () => {
  const name1: any = new name(10);

  return (
    <div className={s.main}>
      <div className={s.crap}>{name1.calc()}</div>
    </div>
  );
};
export default Train;

class name {
  width: number;
  constructor(parameters: any) {
    this.width = parameters;
  }
  calc() {
    return this.width;
  }
}
