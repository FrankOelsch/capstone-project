import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Config() {
  const canvasRef = useRef(null);
  const messageWidthRef = useRef(null);
  const messageHeightRef = useRef(null);
  const messageRadiusRef = useRef(null);

  const [gateWidth, setGateWidth] = useState("250");
  const [gateHeight, setGateHeight] = useState("200");
  const [radius, setRadius] = useState("30");
  const [qm, setQm] = useState(
    ((+gateWidth * +gateHeight) / 1000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  );
  const [tempW, setTempW] = useState(150);
  const [prevWidth, setPrevWidth] = useState(150);

  const gateWidthPrev = useRef("150");
  const gateHeightPrev = useRef("200");
  const radiusPrev = useRef("30");

  let ctx = null;
  let canv = null;

  // useEffect(() => {
  //   gateWidthPrev.current = +gateWidth;
  //   console.log("prevW: " + gateWidthPrev.current);
  // }, [gateWidth]);

  useEffect(() => {
    gateHeightPrev.current = gateHeight;
  }, [gateHeight]);

  useEffect(() => {
    radiusPrev.current = radius;
  }, [radius]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      drawIt();
    }, 4);
    return () => clearTimeout(timeout);
  }, [tempW]);

  useEffect(() => {
    messageWidthRef.current.textContent = "";
    messageHeightRef.current.textContent = "";
    messageRadiusRef.current.textContent = "";

    let isUsefull = true;

    if (isNaN(gateHeight) || isNaN(gateWidth) || isNaN(radius)) {
      return;
    } else {
      if (+gateWidth < 100 || +gateWidth > 500) {
        messageWidthRef.current.textContent = "Zulässige Werte: 100 - 500 cm.";
        isUsefull = false;
      }
      if (+gateHeight < 180 || +gateHeight > 300) {
        messageHeightRef.current.textContent = "Zulässige Werte: 180 - 300 mm.";
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
        //if (+gateWidthPrev.current < +gateWidth) {
        //setStep(10);
        //}
        drawIt();
      }
    }
  }, [gateHeight, gateWidth, radius]);

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

    let startY = 340;
    let canvBreite = canv.width;

    let torBreitePrev = prevWidth;
    let torBreiteTemp = tempW;
    let torBreite = +gateWidth;
    console.log(
      "prevW: " +
        torBreitePrev +
        " - tempW: " +
        torBreiteTemp +
        " - W: " +
        torBreite
    );

    let startXTemp = (canvBreite - torBreiteTemp) / 2;

    let torHoehe = +gateHeight;
    let torHoehePrev = torHoehe;

    let radiusPrev = +radius;

    let step = 0;
    if (torBreitePrev < torBreite) {
      step = 1;
    } else if (torBreitePrev > torBreite) {
      step = -1;
    }

    if (tempW === torBreite) {
      console.log("tempW: " + tempW);
      setPrevWidth(torBreite);
    } else {
      setTempW((prev) => prev + step);
    }

    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.lineWidth = 4;

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
    ctx.lineTo(startXTemp + torBreiteTemp - radiusPrev, startY - torHoehePrev);
    ctx.arcTo(
      startXTemp + torBreiteTemp,
      startY - torHoehePrev,
      startXTemp + torBreiteTemp,
      startY - torHoehePrev + radiusPrev,
      radiusPrev
    );
    ctx.lineTo(startXTemp + torBreiteTemp, startY);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, startY);
    ctx.lineTo(canvBreite, startY);
    ctx.stroke();
  }

  return (
    <>
      <StyledCanvas id="canvas" ref={canvasRef} width={600} height={400}>
        Your browser does not support the HTML5 canvas tag.
      </StyledCanvas>

      <StyledH3>Torfläche: {qm} qm</StyledH3>

      <label htmlFor="gateW">Tor-Breite in cm</label>
      <StyledInput
        id="gateW"
        type="text"
        onChange={handleChange}
        value={gateWidth}
      ></StyledInput>
      <StyledMessage ref={messageWidthRef}></StyledMessage>

      <label htmlFor="gateH">Tor-Höhe in cm</label>
      <StyledInput
        id="gateH"
        type="text"
        onChange={handleChange}
        value={gateHeight}
      ></StyledInput>
      <StyledMessage ref={messageHeightRef}></StyledMessage>

      <label htmlFor="radius">Torbogen-Radius in cm</label>
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
