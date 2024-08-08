import React, { useEffect, useState } from "react";

type props = {
  drawnPrimaryNumbers: number[];
  powerballNumber: number;
  hidden: boolean;
};
export default function PowerballNumberPanel(props: props) {
    const hiddenClass = `hidden`;
    const powerballInitials = `PB`;
    const [powerball, setPowerball] = useState<string | number>(powerballInitials)
    const [primaryNumbersClassName, setprimaryNumbersClassName] = useState<string>("");
    const [powerballClassName, setPowerballClassname] = useState<string>("");
    const hidden = props.hidden;
    const powerballNumber = props.powerballNumber;
    const drawnPrimaryNumbers = props.drawnPrimaryNumbers;

    useEffect(() => {
        if(!hidden && powerballNumber){
            setprimaryNumbersClassName("drawnNumbersCircle primaryNumbers");
            setPowerball(powerballNumber);
            setPowerballClassname("drawnNumbersCircle powerball");           
            return;
        }
        setprimaryNumbersClassName(hiddenClass);
        setPowerball(powerballInitials);
        setPowerballClassname("")
        
    },[hidden])

  return (
    <div className="drawnNumbers">      
        {drawnPrimaryNumbers.map((drawnNumber,i) => (
          <div className="drawnNumbersCircle"><span className={primaryNumbersClassName}>{drawnNumber}</span></div>
        ))}
      
      <div className="drawnNumbersCircle"><span className={powerballClassName} >{powerball}</span></div>
    </div>
  );
}
