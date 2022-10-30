import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Config() {
  const canvasRef = useRef(null);
  const messageWidthRef = useRef(null);
  const messageHeightRef = useRef(null);
  const messageRadiusRef = useRef(null);

  const [gateWidth, setGateWidth] = useState("2500");
  const [gateHeight, setGateHeight] = useState("2000");
  const [radius, setRadius] = useState("300");
  const [qm, setQm] = useState(
    ((+gateWidth * +gateHeight) / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  );

  const gateWidthPrev = useRef("1500");
  const gateHeightPrev = useRef("2000");
  const radiusPrev = useRef("300");

  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const handleClick = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  let ctx = null;
  let canv = null;

  useEffect(() => {
    console.log(gateWidthPrev.current + " -> " + gateWidth);
    gateWidthPrev.current = gateWidth;
  }, [gateWidth]);

  useEffect(() => {
    console.log(gateHeightPrev.current + " -> " + gateHeight);
    gateHeightPrev.current = gateHeight;
  }, [gateHeight]);

  useEffect(() => {
    console.log(radiusPrev.current + " -> " + radius);
    radiusPrev.current = radius;
  }, [radius]);

  useEffect(() => {
    if (isNaN(gateHeight) || isNaN(gateWidth) || isNaN(radius)) {
      return;
    } else {
      if (+gateWidth < 1000 || +gateWidth > 5000) {
        messageWidthRef.current.innerText = "Zulässige Werte: 1000 - 5000 mm.";
        return;
      }
      if (+gateHeight < 1800 || +gateHeight > 3000) {
        messageHeightRef.current.innerText = "Zulässige Werte: 1800 - 3000 mm.";
        return;
      }
      if (+radius < 0 || +radius > +gateWidth / 2 || +radius > +gateHeight) {
        messageRadiusRef.current.innerText =
          "Zulässige Werte: 0 - 50 % der Breite und 0 - 100 % der Höhe.";
        return;
      }

      messageWidthRef.current.innerText = "";
      messageHeightRef.current.innerText = "";
      messageRadiusRef.current.innerText = "";

      setQm(
        ((+gateWidth * +gateHeight) / 1000000).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })
      );

      show();
    }
  }, [gateHeight, gateWidth, radius]);

  function handleChange(e) {
    if (isNaN(e.target.value)) {
      return;
    }
    if (e.target.id === "gateW") {
      setGateWidth(e.target.value);
    } else if (e.target.id === "gateH") {
      setGateHeight(e.target.value);
    } else if (e.target.id === "radius") {
      setRadius(e.target.value);
    }
  }

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

    let torBreitePrev = +gateWidthPrev.current;
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
      <h1>The component has been rendered for {count} seconds</h1>
      <button onClick={handleClick}>
        {intervalId ? "Stop counting" : "Start counting"}
      </button>
      <StyledCanvas id="canvas" ref={canvasRef} width={6000} height={4000}>
        Your browser does not support the HTML5 canvas tag.
      </StyledCanvas>

      <StyledH3>Torfläche: {qm} qm</StyledH3>

      <label htmlFor="gateW">Tor-Breite in mm</label>
      <StyledInput
        id="gateW"
        type="text"
        onChange={handleChange}
        value={gateWidth}
      ></StyledInput>
      <StyledMessage ref={messageWidthRef}></StyledMessage>

      <label htmlFor="gateH">Tor-Höhe in mm</label>
      <StyledInput
        id="gateH"
        type="text"
        onChange={handleChange}
        value={gateHeight}
      ></StyledInput>
      <StyledMessage ref={messageHeightRef}></StyledMessage>

      <label htmlFor="radius">Torbogen-Radius in mm</label>
      <StyledInput
        id="radius"
        type="text"
        onChange={handleChange}
        value={radius}
      ></StyledInput>
      <StyledMessage ref={messageRadiusRef}></StyledMessage>
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
`;

const StyledMessage = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: violet;
  margin-bottom: 10px;
  height: 1.1em;
`;
