import React, { useEffect, useState } from "react";

type props = {
  number: number;
  isSelected: boolean;
};
const enum numberStyles {
  selected = `number numberShow`,
  notSelected = `number`,
}

export default function PowerballNumber(props: props) {
  const [numberStyle, setNumberStyle] = useState<numberStyles>();
  const isSelected = props.isSelected;
  const number = props.number;
  useEffect(() => {
    if (isSelected) {
      setNumberStyle(numberStyles.selected);
      return;
    }
    setNumberStyle(numberStyles.notSelected);

  }, [isSelected]);
  return (    
      <div className={numberStyle}>{number}</div>
  );
}
