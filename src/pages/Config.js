import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Config() {
  const [gateWidth, setGateWidth] = useState("2500");
  const [gateHeight, setGateHeight] = useState("2000");
  const [radius, setRadius] = useState("30");
  const [qm, setQm] = useState(
    ((+gateWidth * +gateHeight) / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  );

  useEffect(() => {
    if (isNaN(gateHeight) || isNaN(gateWidth)) {
      setQm("--");
    } else {
      setQm(
        ((+gateWidth * +gateHeight) / 1000000).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })
      );
    }
  }, [gateHeight, gateWidth]);

  return (
    <>
      <StyledH3>Sichtbare Torfläche: {qm} qm</StyledH3>

      <label htmlFor="gateW">Toröffnung-Breite in mm</label>
      <StyledInput
        id="gateW"
        type="text"
        onChange={(event) => setGateWidth(event.target.value)}
        value={gateWidth}
      ></StyledInput>
      {isNaN(gateWidth) ? (
        <StyledMessage>Bitte nur Zahlen eingeben!</StyledMessage>
      ) : +gateWidth < 1000 || +gateWidth > 5000 ? (
        <StyledMessage>
          Zulässige Werte für Höhe: 1000 bis 5000 mm
        </StyledMessage>
      ) : null}

      <label htmlFor="gateH">Toröffnung-Höhe in mm</label>
      <StyledInput
        id="gateH"
        type="text"
        onChange={(event) => setGateHeight(event.target.value)}
        value={gateHeight}
      ></StyledInput>
      {isNaN(gateHeight) ? (
        <StyledMessage>Bitte nur Zahlen eingeben!</StyledMessage>
      ) : +gateHeight < 1800 || +gateHeight > 3000 ? (
        <StyledMessage>
          Zulässige Werte für Höhe: 1800 bis 3000 mm
        </StyledMessage>
      ) : null}

      <label htmlFor="radius">Torbogen-Radius in mm</label>
      <StyledInput
        id="radius"
        type="text"
        onChange={(event) => setRadius(event.target.value)}
        value={radius}
      ></StyledInput>
      {isNaN(radius) ? (
        <StyledMessage>Bitte nur Zahlen eingeben!</StyledMessage>
      ) : +radius < 0 || +radius > gateWidth / 2 ? (
        <StyledMessage>
          Zulässige Werte für Radius: 0 bis 50% der Breite
        </StyledMessage>
      ) : null}
    </>
  );
}

const StyledH3 = styled.h3`
  margin: 10px;
`;

const StyledInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const StyledMessage = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  font-weight: bold;
  color: violet;
  margin-top: 10px;
  margin-bottom: 10px;
`;
