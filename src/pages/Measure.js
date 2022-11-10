import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TextInput from "../components/input/TextInput";
import Select from "../components/select/Select";
import { UserContext } from "../UserContext";

export default function Measure() {
  const {
    config,
    setConfig,
    configForSave,
    setConfigForSave,
    prevConfig,
    setPrevConfig,
  } = useContext(UserContext);

  const canvasRef = useRef(null);

  const inputWidthRef = useRef(null);
  const inputHeightRef = useRef(null);
  const inputRadiusRef = useRef(null);

  const [tempWidth, setTempWidth] = useState(250);
  const [tempHeight, setTempHeight] = useState(200);
  const [tempRadius, setTempRadius] = useState(30);

  const [qm, setQm] = useState(
    ((+config.width * +config.height) / 10000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  );

  let ctx = null;
  let canv = null;
  let inputWidth = null;
  let inputHeight = null;
  let inputRadius = null;

  const RUNDLAUF = "Rundlauftor";
  const SECTIONAL = "Sectionaltor";

  useEffect(() => {
    checkConfig();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      drawIt();
    }, 2);
    return () => clearTimeout(timeout);
  }, [tempWidth, tempHeight, tempRadius]);

  function checkConfig() {
    // console.log("checkConfig");
    let isUsefull = true;
    const system = config.system;

    if (
      isNaN(config.height) ||
      isNaN(config.width) ||
      isNaN(config.radius) ||
      !config.system
    ) {
      return;
    } else {
      // console.log("else");
      if (system === RUNDLAUF) {
        if (+config.width < 200 || +config.width > 600) {
          isUsefull = false;
        }
        if (+config.height < 180 || +config.height > 300) {
          isUsefull = false;
        }
      }

      if (system === SECTIONAL) {
        if (+config.width < 200 || +config.width > 500) {
          isUsefull = false;
        }
        if (+config.height < 180 || +config.height > 250) {
          isUsefull = false;
        }
      }

      if (
        +config.radius < 0 ||
        +config.radius > +config.width / 2 ||
        +config.radius > +config.height ||
        !config.radius
      ) {
        isUsefull = false;
      }

      if (isUsefull) {
        // console.log("isUsefull");
        setQm(
          ((+config.width * +config.height) / 10000).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        );

        setConfigForSave(config);

        const w = +prevConfig.width;
        setTempWidth(w);
        const h = +prevConfig.height;
        setTempHeight(h);
        const r = +prevConfig.radius;
        setTempRadius(r);

        drawIt();
      }
    }
  }

  function handleChange(e) {
    if (isNaN(e.target.value)) {
      return;
    }

    const doorSystem = config.system;
    changeInputMinMax(doorSystem);

    switch (e.target.id) {
      case "gateWidth":
        setConfig({ ...config, width: e.target.value });
        break;
      case "gateHeight":
        setConfig({ ...config, height: e.target.value });
        break;
      case "radius":
        setConfig({ ...config, radius: e.target.value });
        break;
    }
  }

  function changeInputMinMax(doorSystem) {
    inputWidth = inputWidthRef.current;
    inputHeight = inputHeightRef.current;
    inputRadius = inputRadiusRef.current;

    const w = inputWidth.value;
    const h = inputHeight.value;
    const radiusMax = Math.min(Math.trunc(+w / 2), +h);
    inputRadius.max = radiusMax.toString();

    if (doorSystem === SECTIONAL) {
      inputWidth.max = "500";
      inputHeight.max = "250";
    } else {
      inputWidth.max = "600";
      inputHeight.max = "300";
    }
  }

  function handleSelect(e) {
    const value = e.target.value;
    changeInputMinMax(value);
    setConfig({ ...config, system: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    checkConfig();
  }

  function drawIt() {
    // console.log("drawIt");

    canv = canvasRef.current;
    ctx = canv.getContext("2d");

    let torBreite = +config.width;
    let torBreitePrev = +prevConfig.width;

    let torHoehe = +config.height;
    let torHoehePrev = +prevConfig.height;

    let torRadius = +config.radius;
    let torRadiusPrev = +prevConfig.radius;

    let startY = 340;
    let canvBreite = canv.width;
    let startXTemp = (canvBreite - tempWidth) / 2;

    let stepW = 0;
    if (torBreitePrev < torBreite) {
      stepW = 1;
    } else if (torBreitePrev > torBreite) {
      stepW = -1;
    }

    console.log(
      " - torBreite: " +
        torBreite +
        " - torBreitePrev: " +
        torBreitePrev +
        " - tempWidth: " +
        tempWidth +
        " - stepW: " +
        stepW
    );

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

    let isBreiteEqual = false;
    let isHoeheEqual = false;
    let isRadiusEqual = false;

    if (tempWidth === torBreite) {
      isBreiteEqual = true;
    } else {
      setTempWidth((prev) => prev + stepW);
    }

    if (tempHeight === torHoehe) {
      isHoeheEqual = true;
    } else {
      setTempHeight((prev) => prev + stepH);
    }

    if (tempRadius === torRadius) {
      isRadiusEqual = true;
    } else {
      setTempRadius((prev) => prev + stepR);
    }

    if (isBreiteEqual && isHoeheEqual && isRadiusEqual) {
      setPrevConfig({
        ...prevConfig,
        width: torBreite.toString(),
        height: torHoehe.toString(),
        radius: torRadius.toString(),
      });
    }

    if (tempWidth < 200) setTempWidth(200);
    if (tempHeight < 175) setTempHeight(175);
    if (tempRadius < 0) setTempRadius(0);

    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(startXTemp, startY);
    ctx.lineTo(startXTemp, startY - tempHeight + tempRadius);
    ctx.arcTo(
      startXTemp,
      startY - tempHeight,
      startXTemp + tempRadius,
      startY - tempHeight,
      tempRadius
    );
    ctx.lineTo(startXTemp + tempWidth - tempRadius, startY - tempHeight);
    ctx.arcTo(
      startXTemp + tempWidth,
      startY - tempHeight,
      startXTemp + tempWidth,
      startY - tempHeight + tempRadius,
      tempRadius
    );
    ctx.lineTo(startXTemp + tempWidth, startY);
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
      <Header />
      <Container>
        <StyledH3>
          {configForSave.system}: {qm} qm
        </StyledH3>

        <StyledCanvas id="canvas" ref={canvasRef} width={650} height={400}>
          Your browser does not support the HTML5 canvas tag.
        </StyledCanvas>

        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor="system">Torsystem</StyledLabel>
          <Select
            id="system"
            onChange={handleSelect}
            value={config.system}
            options={[
              { de: "Sectionaltor", id: "Sectionaltor" },
              { de: "Rundumtor", id: "Rundumtor" },
            ]}
          />

          <StyledLabel htmlFor="gateWidth">Tor-Breite in cm</StyledLabel>
          <TextInput
            required
            type="number"
            id="gateWidth"
            min="200"
            max="500"
            onChange={handleChange}
            value={config.width}
            ref={inputWidthRef}
          />
          {/* <StyledMessage> {messageW}</StyledMessage> */}

          <label htmlFor="gateHeight">Tor-Höhe in cm</label>
          <TextInput
            required
            type="number"
            id="gateHeight"
            min="175"
            max="250"
            onChange={handleChange}
            value={config.height}
            ref={inputHeightRef}
          />
          {/* <StyledMessage> {messageH}</StyledMessage> */}

          <label htmlFor="radius">Torbogen-Radius in cm</label>
          <TextInput
            required
            type="number"
            id="radius"
            min="0"
            max="100"
            onChange={handleChange}
            value={config.radius}
            ref={inputRadiusRef}
          />
          {/* <StyledMessage> {messageR}</StyledMessage> */}

          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledCanvas = styled.canvas`
  border: 1px solid #d3d3d3;
  margin: 10px auto;
  width: 90%;
`;

const StyledLabel = styled.label`
  text-align: left;
`;

const StyledH3 = styled.h3`
  margin: 10px;
`;

const StyledMessage = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: blue;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  width: 200px;
  padding: 3px;
  margin-top: 20px;
  border: 3px solid;
  border-color: hsl(216, 65%, 80%);
  border-radius: 6px;
  outline: none;
  background-color: hsl(216, 65%, 80%);
  box-shadow: 3px 3px 3px lightgrey;

  &:focus {
    border-color: hsl(216, 65%, 50%);
  }
`;
