import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getLocaleStringFromNumber, getSquareMeters } from "../utils/helper";
import { UserContext } from "../UserContext";
import * as variables from "../Variables";
import InputWithLabel from "../components/InputWithLabel";
import SelectWithLabel from "../components/SelectWithLabel";
import MyButton from "../components/MyButton";

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
    getLocaleStringFromNumber(getSquareMeters(config.width, config.height))
  );

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
        setQm(
          getLocaleStringFromNumber((+config.width * +config.height) / 10000)
        );

        setConfigForSave(config);

        const w = +prevConfig.width;
        setTempWidth(w);
        const h = +prevConfig.height;
        setTempHeight(h);
        const r = +prevConfig.radius;
        setTempRadius(r);

        changeInputMinMax(system);

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
      default:
        break;
    }
  }

  function changeInputMinMax(doorSystem) {
    let inputWidth = inputWidthRef.current;
    let inputHeight = inputHeightRef.current;
    let inputRadius = inputRadiusRef.current;

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
    let canv = canvasRef.current;
    let ctx = canv.getContext("2d");

    let wallColor = config.wallColor;

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
    ctx.strokeRect(0, 0, canv.width, canv.height);

    // Door background
    ctx.fillStyle = "#434B4D";
    ctx.fillRect(
      startXTemp,
      canv.height - (canv.height - startY) - tempHeight,
      tempWidth,
      tempHeight
    );

    //Wall
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, startY);
    ctx.lineTo(startXTemp, startY);
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
    ctx.lineTo(canvBreite, startY);
    ctx.lineTo(canvBreite, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, startY);
    ctx.fillStyle = wallColor;
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, startY);
    ctx.lineTo(canvBreite, startY);
    ctx.stroke();
  }

  return (
    <>
      <Header text={configForSave.system + " " + qm + " qm"} size={"24px"} />
      <main>
        <Wrapper>
          <StyledTopP>
            Geben sie hier Höhe, Breite und Radius ein, um <br />
            die Torfläche zu berechnen und darzustellen.
          </StyledTopP>

          <StyledCanvas id="canvas" ref={canvasRef} width={650} height={400}>
            Your browser does not support the HTML5 canvas tag.
          </StyledCanvas>

          <form onSubmit={handleSubmit}>
            <SelectWithLabel
              id="system"
              onChange={handleSelect}
              value={config.system}
              options={[
                { name: "Sectionaltor", id: "Sectionaltor" },
                { name: "Rundlauftor", id: "Rundlauftor" },
              ]}
              labelText="Torsystem"
            />

            <InputWithLabel
              required
              type="number"
              id="gateWidth"
              min="200"
              max="500"
              onChange={handleChange}
              value={config.width}
              ref={inputWidthRef}
              labelText="Tor-Breite in cm"
            />

            <InputWithLabel
              required
              type="number"
              id="gateHeight"
              min="175"
              max="250"
              onChange={handleChange}
              value={config.height}
              ref={inputHeightRef}
              labelText="Tor-Höhe in cm"
            />

            <InputWithLabel
              required
              type="number"
              id="radius"
              min="0"
              max="100"
              onChange={handleChange}
              value={config.radius}
              ref={inputRadiusRef}
              labelText="Torbogen-Radius in cm"
            />

            <MyButton type="submit">Anwenden</MyButton>
          </form>
        </Wrapper>
      </main>
      <Footer />
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const StyledCanvas = styled.canvas`
  margin: 8px auto;
  width: 90%;
  background-color: ${variables.BACKGROUND_COLOR_7};
  box-shadow: 3px 3px 5px hsla(0, 0%, 40%, 1);
`;

const StyledTopP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  margin-top: 8px;
`;
