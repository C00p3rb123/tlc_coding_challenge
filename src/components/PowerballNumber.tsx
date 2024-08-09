import React from "react";

type props = {
  number: number;
  className: string;
};
export default function PowerballNumber(props: props) { 
  const {className, number} = props 
  return (    
      <div className={className}>{number}</div>
  );
}
