import React, { useEffect, useState } from "react";
import { PowerBallResponse } from "../types/powerballResponse";
import ErrorMessage from "./ErrorMessage";
import PowerballNumber from "./PowerballNumber";
import PowerballNumberPanel from "./PowerballNumberPanel";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiLightning } from "react-icons/pi";


export default function Powerball() {
  const powerballTitle = "SELECT YOUR POWERBALL";
  const powerballFiller = "PB";
  const primaryNumbersLength = 35;
  const setPowerballNumbersLength = 20;
  const primaryNumbers = Array.from(
    { length: primaryNumbersLength },
    (_, i) => i + 1
  );
  const setPowerballNumbers = Array.from(
    { length: setPowerballNumbersLength },
    (_, i) => i + 1
  );
  const url = process.env.REACT_APP_API_URL!;
  const payload = {
    CompanyId: "GoldenCasket",
    MaxDrawCountPerProduct: 1,
    OptionalProductFilter: ["Powerball"],
  };

  const [drawnPrimaryNumbers, setDrawnPrimaryNumebrs] = useState<number[]>(
    new Array(7).fill(0)
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [drawnNumber, setDrawNumber] = useState<number>()
  const [powerballNumber, setPowerballNumber] = useState<number>(0);
  const [showNumbers, setShowNumbers] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);


  useEffect(() => {
    const fetchPowerball = async () => {
      try {
        const response = await fetch(url, {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const powerballData: PowerBallResponse = await response.json();
        setDrawNumber(powerballData.DrawResults[0].DrawNumber);
        setDrawnPrimaryNumebrs(powerballData.DrawResults[0].PrimaryNumbers);
        setPowerballNumber(powerballData.DrawResults[0].SecondaryNumbers[0]);
        setIsLoading(false);
        setError(false);
      } catch (err) {
        setIsLoading(false);
        setError(true);
      }
    };
    fetchPowerball();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="powerballRoot">
            <div className="logo"><img className="x" src={require("../assets/powerballlogo.png")}/><span>{`Draw ${drawnNumber}`}</span></div>           
          <div className="drawnNumbersPanel">
            <PowerballNumberPanel
              drawnPrimaryNumbers={drawnPrimaryNumbers}
              powerballNumber={powerballNumber}
              hidden={!showNumbers}
            />
            <div id="powerballButtons">
              <div onClick={() => setShowNumbers(true)} id="lightningButton">
                <span>
                  <PiLightning />
                </span>
              </div>
              <div
                onClick={() => setShowNumbers(false)}
                id="trashbutton"
                style={{ backgroundColor: "rgb(118, 118, 118)" }}
              >
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
          <div className="numberSelection">
            {primaryNumbers.map((n, i) => (
              <PowerballNumber
                number={n}
                isSelected={showNumbers && drawnPrimaryNumbers?.includes(n)}
              />
            ))}
          </div>
          <div id="powerballHeader">{powerballTitle}</div>
          <div className="numberSelection">
            {setPowerballNumbers.map((n, i) => (
              <PowerballNumber
                number={n}
                isSelected={showNumbers && powerballNumber === n}
              />
            ))}
          </div>
          {isError && <ErrorMessage />}
        </div>
      )}
    </div>
  );
}
