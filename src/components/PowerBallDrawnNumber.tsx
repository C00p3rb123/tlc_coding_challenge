import React, { useEffect, useState } from 'react'

type props = {
  centerComponent: any
  hidden?: boolean;
  className: string;
}


export default function PowerballDrawnNumber(props: props) {
  const {centerComponent, hidden, className} = props;
  const [classNameHidden, setClassnameHidden] = useState<string>("");
  const hiddenString = "hidden"
  useEffect(() => {
    if(!hidden){
      setClassnameHidden(hiddenString);
      return;
    }
    setClassnameHidden("")
  },[hidden])
  return (
    <div className={className}>
      <div><span className={classNameHidden}>{centerComponent}</span></div>
    </div>
  )
}
