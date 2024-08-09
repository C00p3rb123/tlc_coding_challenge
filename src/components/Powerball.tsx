import React, { useEffect, useState } from "react";
import { PowerBallResponse } from "../types/PowerballResponse";
import ErrorMessage from "./ErrorMessage";
import PowerballNumber from "./PowerballNumber";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiLightning } from "react-icons/pi";
import PowerballDrawnNumber from "./PowerBallDrawnNumber";
import powerballlogo from "../assets/powerballlogo.png";

export default function Powerball() {
  //Constants
  const powerballTitle = "SELECT YOUR POWERBALL";
  const powerballFiller = "PB";
  const primaryNumbersLength = 35;
  const secondaryNumbersLength = 20;
  //primary numbers are the first set of numbers
  const primaryNumbers = Array.from(
    { length: primaryNumbersLength },
    (_, i) => i + 1
  );
  //secondary numbers are the powerball selection numbers
  const secondaryNumbers = Array.from(
    { length: secondaryNumbersLength },
    (_, i) => i + 1
  );

  //Api constants
  const url = process.env.REACT_APP_API_URL!;
  const payload = {
    CompanyId: process.env.REACT_APP_COMPANY_ID,
    MaxDrawCountPerProduct: 1,
    OptionalProductFilter: [process.env.REACT_APP_OPTIONAL_PRODUCT_FILTER],
  };

  //Initialising an array so I'm able to render the circles on the page even if the api fails
  const [drawnPrimaryNumbers, setDrawnPrimaryNumebrs] = useState<number[]>(
    new Array(7).fill(0)
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [drawNumber, setDrawNumber] = useState<number | string>();
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
        setDrawnPrimaryNumebrs(powerballData.DrawResults[0].PrimaryNumbers); //These are the numbers that appear in the circles
        setPowerballNumber(powerballData.DrawResults[0].SecondaryNumbers[0]);
        setIsLoading(false);
        setError(false);
      } catch (err) {
        //If there is a problem with the API, an error message will be set on the screen. setError alerts the app.
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
        <div className="powerballContainer">
          <div className="logoContainer">
            <img className="logo" src={powerballlogo} alt="powerball logo" />
            {drawNumber && <span>Draw {drawNumber}</span>}
          </div>
          <div className="drawnNumbersPanel">
            <div className="drawnNumbers">
              {drawnPrimaryNumbers.map((drawnNumber) => (
                <PowerballDrawnNumber
                  centerComponent={drawnNumber}
                  hidden={showNumbers}
                  className={
                    showNumbers ? "circle primaryNumbersCircle" : "circle"
                  }
                />
              ))}
              <PowerballDrawnNumber
                centerComponent={
                  showNumbers ? powerballNumber : powerballFiller
                }
                hidden={true}
                className={showNumbers ? "circle powerball" : "circle"}
              />
            </div>

            <div id="powerballButtons">
              <div
                onClick={() => setShowNumbers(true)}
                className="circle lightningButton"
              >
                <span>
                  <PiLightning />
                </span>
              </div>
              <div
                onClick={() => setShowNumbers(false)}
                className="circle trashbutton"
              >
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
          <div className="purplenumbercontainer">
            {primaryNumbers.map((primaryNumber) => (
              <PowerballNumber
                number={primaryNumber}
                className={showNumbers && drawnPrimaryNumbers.includes(primaryNumber) ? "purplenumber showCross" : "purplenumber" }
              />
            ))}
          </div>
          <div id="pickpowerball">{powerballTitle}</div>
          <div className="purplenumbercontainer">
            {secondaryNumbers.map((secondaryNumber) => (
              <PowerballNumber
                number={secondaryNumber}
                className={showNumbers && powerballNumber === secondaryNumber ? "purplenumber showCross" : "purplenumber" }
              />
            ))}
          </div>
          {isError && <ErrorMessage />}
        </div>
      )}
    </div>
  );
}
