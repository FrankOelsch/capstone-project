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
  const [tempW, setTempW] = useState(1500);

  const gateWidthPrev = useRef("1500");
  const gateHeightPrev = useRef("2000");
  const radiusPrev = useRef("300");

  // *** Nur zum Testen ***
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
      setTempW((prev) => prev + 10);

      // let w = +gateWidthPrev.current;
      // if (+gateWidthPrev.current !== +gateWidth) {
      //   if (+gateWidthPrev.current < +gateWidth) {
      //     w += 10;
      //   }
      //   if (+gateWidthPrev.current > +gateWidth) {
      //     w -= 10;
      //   }
      // }
      //drawIt();
    }, 10);
    setIntervalId(newIntervalId);
  };

  const handleKeydown = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleClick();
    }
  };
  // *** Nur zum Testen ***

  let ctx = null;
  let canv = null;

  useEffect(() => {
    gateWidthPrev.current = gateWidth;
  }, [gateWidth]);

  useEffect(() => {
    gateHeightPrev.current = gateHeight;
  }, [gateHeight]);

  useEffect(() => {
    radiusPrev.current = radius;
  }, [radius]);

  useEffect(() => {
    messageWidthRef.current.textContent = "";
    messageHeightRef.current.textContent = "";
    messageRadiusRef.current.textContent = "";

    let isUsefull = true;

    if (isNaN(gateHeight) || isNaN(gateWidth) || isNaN(radius)) {
      return;
    } else {
      if (+gateWidth < 1000 || +gateWidth > 5000) {
        messageWidthRef.current.textContent =
          "Zulässige Werte: 1000 - 5000 mm.";
        isUsefull = false;
      }
      if (+gateHeight < 1800 || +gateHeight > 3000) {
        messageHeightRef.current.textContent =
          "Zulässige Werte: 1800 - 3000 mm.";
        isUsefull = false;
      }
      if (+radius < 0 || +radius > +gateWidth / 2 || +radius > +gateHeight) {
        messageRadiusRef.current.textContent =
          "Zulässige Werte: 0 - 50 % der Breite und 0 - 100 % der Höhe.";
        isUsefull = false;
      }

      if (isUsefull) {
        setQm(
          ((+gateWidth * +gateHeight) / 1000000).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        );

        let w = +gateWidthPrev.current;
        if (+gateWidthPrev.current !== +gateWidth) {
          if (+gateWidthPrev.current < +gateWidth) {
            w += 10;
          }
          if (+gateWidthPrev.current > +gateWidth) {
            w -= 10;
          }
        }

        //setInterval(drawIt, 10);
        drawIt();
      }
    }
  }, [gateHeight, gateWidth, radius, tempW]);

  function handleChange(e) {
    if (isNaN(e.target.value)) {
      return;
    }
    switch (e.target.id) {
      case "gateW":
        setGateWidth(e.target.value);
        break;
      case "gateH":
        setGateHeight(e.target.value);
        break;
      case "radius":
        setRadius(e.target.value);
        break;
    }
  }

  function drawIt() {
    canv = canvasRef.current;
    ctx = canv.getContext("2d");

    let startY = 3400;
    let canvBreite = canv.width;
    let torBreitePrev = tempW;
    let startXTemp = (canvBreite - torBreitePrev) / 2;

    let torBreite = +gateWidth;
    let torHoehe = +gateHeight;

    let torHoehePrev = torHoehe;
    let radiusPrev = +radius;

    if (tempW > torBreite) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
        return;
      }
    }

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
    ctx.stroke();

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0, startY);
    ctx.lineTo(canvBreite, startY);
    ctx.stroke();
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>{intervalId ? "Stop" : "Start"}</button>
      <StyledCanvas id="canvas" ref={canvasRef} width={6000} height={4000}>
        Your browser does not support the HTML5 canvas tag.
      </StyledCanvas>

      <StyledH3>Torfläche: {qm} qm</StyledH3>

      <label htmlFor="gateW">Tor-Breite in mm</label>
      <StyledInput
        id="gateW"
        type="text"
        onKeyDown={handleKeydown}
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
  width: 90%;
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
