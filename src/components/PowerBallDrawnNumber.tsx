import React, { useEffect, useState } from 'react'

//This component handles the display of the circular drawn numbers. It accounts for the style and visibililty.
//When the user clicks the lightning icon, this component will show the number and change the background of the circle.
//When the user  clicks the trash icon it will hide the number and change the style of the circle.  

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
