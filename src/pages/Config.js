import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Config() {
  const canvasRef = useRef(null);

  const messageWidthRef = useRef(null);
  const messageHeightRef = useRef(null);
  const messageRadiusRef = useRef(null);

  const [width, setWidth] = useState("250");
  const [height, setHeight] = useState("200");
  const [radius, setRadius] = useState("30");

  const [prevWidth, setPrevWidth] = useState(150);
  const [prevHeight, setPrevHeight] = useState(200);
  const [prevRadius, setPrevRadius] = useState(30);

  const [tempWidth, setTempWidth] = useState(150);
  const [tempHeight, setTempHeight] = useState(200);
  const [tempRadius, setTempRadius] = useState(30);

  const [qm, setQm] = useState(
    ((+width * +height) / 10000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  );

  let ctx = null;
  let canv = null;

  useEffect(() => {
    const timeout = setTimeout(() => {
      drawIt();
    }, 2);
    return () => clearTimeout(timeout);
  }, [tempWidth, tempHeight, tempRadius]);

  useEffect(() => {
    messageWidthRef.current.textContent = "";
    messageHeightRef.current.textContent = "";
    messageRadiusRef.current.textContent = "";

    let isUsefull = true;

    if (isNaN(height) || isNaN(width) || isNaN(radius)) {
      return;
    } else {
      if (+width < 100 || +width > 500) {
        messageWidthRef.current.textContent = "Zulässige Werte: 100 - 500 cm.";
        isUsefull = false;
      }
      if (+height < 180 || +height > 300) {
        messageHeightRef.current.textContent = "Zulässige Werte: 180 - 300 mm.";
        isUsefull = false;
      }
      if (+radius < 0 || +radius > +width / 2 || +radius > +height || !radius) {
        messageRadiusRef.current.textContent =
          "Zulässige Werte: 0 - 50 % der Breite und 0 - 100 % der Höhe.";
        isUsefull = false;
      }

      if (isUsefull) {
        setQm(
          ((+width * +height) / 10000).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        );

        drawIt();
      }
    }
  }, [height, width, radius]);

  function handleChange(e) {
    if (isNaN(e.target.value)) {
      return;
    }
    switch (e.target.id) {
      case "gateW":
        setWidth(e.target.value);
        break;
      case "gateH":
        setHeight(e.target.value);
        break;
      case "radius":
        setRadius(e.target.value);
        break;
    }
  }

  function drawIt() {
    canv = canvasRef.current;
    ctx = canv.getContext("2d");

    let torBreite = +width;
    let torBreitePrev = prevWidth;
    let torBreiteTemp = tempWidth;

    let torHoehe = +height;
    let torHoehePrev = prevHeight;
    let torHoeheTemp = tempHeight;

    let torRadius = +radius;
    let torRadiusPrev = prevRadius;
    let torRadiusTemp = tempRadius;

    let startY = 340;
    let canvBreite = canv.width;
    let startXTemp = (canvBreite - torBreiteTemp) / 2;

    let stepW = 0;
    if (torBreitePrev < torBreite) {
      stepW = 1;
    } else if (torBreitePrev > torBreite) {
      stepW = -1;
    }

    let stepH = 0;
    if (torHoehePrev < torHoehe) {
      stepH = 1;
    } else if (torHoehePrev > torHoehe) {
      stepH = -1;
    }

    let stepR = 0;
    if (torRadiusPrev < torRadius) {
      stepR = 1;
    } else if (torRadiusPrev > torRadius) {
      stepR = -1;
    }

    if (tempWidth === torBreite) {
      console.log("tempWidth: " + tempWidth);
      setPrevWidth(torBreite);
    } else {
      setTempWidth((prev) => prev + stepW);
    }

    if (tempHeight === torHoehe) {
      console.log("tempHeight: " + tempHeight);
      setPrevHeight(torHoehe);
    } else {
      setTempHeight((prev) => prev + stepH);
    }

    if (tempRadius === torRadius) {
      console.log("tempRadius: " + tempRadius);
      setPrevRadius(torRadius);
    } else {
      setTempRadius((prev) => prev + stepR);
    }

    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(startXTemp, startY);
    ctx.lineTo(startXTemp, startY - torHoeheTemp + torRadiusTemp);
    ctx.arcTo(
      startXTemp,
      startY - torHoeheTemp,
      startXTemp + torRadiusTemp,
      startY - torHoeheTemp,
      torRadiusTemp
    );
    ctx.lineTo(
      startXTemp + torBreiteTemp - torRadiusTemp,
      startY - torHoeheTemp
    );
    ctx.arcTo(
      startXTemp + torBreiteTemp,
      startY - torHoeheTemp,
      startXTemp + torBreiteTemp,
      startY - torHoeheTemp + torRadiusTemp,
      torRadiusTemp
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

  const onFocus = (e) => {
    if (e.which === 9) {
      return false;
    }
    setTimeout(() => {
      e.target.select();
    }, 100);
  };

  return (
    <>
      <StyledCanvas id="canvas" ref={canvasRef} width={600} height={400}>
        Your browser does not support the HTML5 canvas tag.
      </StyledCanvas>

      <StyledH3>Torfläche: {qm} qm</StyledH3>

      <label htmlFor="gateW">Tor-Breite in cm</label>
      <StyledInput
        value={width}
        id="gateW"
        type="text"
        autoComplete="off"
        onChange={handleChange}
        onFocus={onFocus}
      ></StyledInput>
      <StyledMessage ref={messageWidthRef}></StyledMessage>

      <label htmlFor="gateH">Tor-Höhe in cm</label>
      <StyledInput
        value={height}
        id="gateH"
        type="text"
        autoComplete="off"
        onChange={handleChange}
        onFocus={onFocus}
      ></StyledInput>
      <StyledMessage ref={messageHeightRef}></StyledMessage>

      <label htmlFor="radius">Torbogen-Radius in cm</label>
      <StyledInput
        value={radius}
        id="radius"
        type="text"
        autoComplete="off"
        onChange={handleChange}
        onFocus={onFocus}
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
  padding: 3px;
  border: 2px solid;
  border-color: burlywood;
  border-radius: 6px;
  outline: none;
  background-color: rgba(250, 235, 215, 0.41);

  &:focus {
    background-color: lightblue;
    border-color: cadetblue;
  }
`;

const StyledMessage = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: blue;
  margin-bottom: 10px;
  height: 1.1em;
`;
