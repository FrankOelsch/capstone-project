import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Config() {
  const canvasRef = useRef(null);

  const [gateWidth, setGateWidth] = useState("2500");
  const [gateHeight, setGateHeight] = useState("2000");
  const [radius, setRadius] = useState("30");
  const [qm, setQm] = useState(
    ((+gateWidth * +gateHeight) / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  );

  let ctx = null;
  let canv = null;

  useEffect(() => {
    if (isNaN(gateHeight) || isNaN(gateWidth) || isNaN(radius)) {
      setQm("--");
    } else {
      setQm(
        ((+gateWidth * +gateHeight) / 1000000).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })
      );
      show();
    }
  }, [gateHeight, gateWidth, radius]);

  function show() {
    canv = canvasRef.current;
    //console.log(canv);
    ctx = canv.getContext("2d");
    //console.log(ctx);

    let canvBreite = 6000;
    let startY = 3400;
    let startXTemp = 0;

    let torBreite = +gateWidth;
    let torHoehe = +gateHeight;

    let torBreitePrev = torBreite;
    let torHoehePrev = torHoehe;
    let radiusPrev = +radius;

    canvBreite = canv.width;
    console.log(canvBreite);
    startXTemp = (canvBreite - torBreitePrev) / 2;
    console.log(torBreitePrev);
    console.log(startXTemp);

    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.lineWidth = 40;

    ctx.beginPath();
    ctx.moveTo(startXTemp, startY);
    ctx.lineTo(startXTemp, startY - torHoehePrev + radiusPrev);
    ctx.arcTo(
      startXTemp,
      startY - torHoehePrev,
      startXTemp + radiusPrev,
      startY - torHoehePrev,
      radiusPrev
    );
    ctx.lineTo(startXTemp + torBreitePrev - radiusPrev, startY - torHoehePrev);
    ctx.arcTo(
      startXTemp + torBreitePrev,
      startY - torHoehePrev,
      startXTemp + torBreitePrev,
      startY - torHoehePrev + radiusPrev,
      radiusPrev
    );
    ctx.lineTo(startXTemp + torBreitePrev, startY);
    ctx.closePath();
    ctx.stroke(); // Draw it

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0, startY);
    ctx.lineTo(canvBreite, startY);
    ctx.stroke(); // Draw it

    //setInterval(myTimer, 4);
    //myTimer(ctx, canv);
  }

  return (
    <>
      <StyledCanvas id="canvas" ref={canvasRef} width={6000} height={4000}>
        Your browser does not support the HTML5 canvas tag.
      </StyledCanvas>

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
      ) : +radius < 0 || +radius > gateWidth / 2 || +radius > gateHeight ? (
        <StyledMessage>
          Zulässige Werte für Radius: 0 bis 50% der Breite
        </StyledMessage>
      ) : null}
    </>
  );
}

const StyledCanvas = styled.canvas`
  border: 1px solid #d3d3d3;
  margin: 10px auto;
  width: 80%;
`;

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
