import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Select from "../components/Select";
import { UserContext } from "../UserContext";
import { RalColorsLimited } from "../data/RalColorsLimited";
import { getLocaleStringFromNumber, getSquareMeters } from "../utils/helper";
import * as variables from "../Variables";

export default function Design() {
  const { config, setConfig, configForSave, setConfigForSave } =
    useContext(UserContext);

  const canvasRef = useRef(null);

  const [qm, setQm] = useState(
    getLocaleStringFromNumber(getSquareMeters(config.width, config.height))
  );

  const [tempStepH, setTempStepH] = useState(0);
  const [tempStepW, setTempStepW] = useState(0);
  const [direction, setDirection] = useState("stop");

  useEffect(() => {
    checkConfig();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      drawIt();
    }, 6);
    return () => clearTimeout(timeout);
  }, [tempStepH, tempStepW, direction]);

  function checkConfig() {
    setConfigForSave(config);
    drawIt();
  }

  function handleSubmit(e) {
    e.preventDefault();
    checkConfig();
  }

  function handleSelect(e) {
    const value = e.target.value;

    switch (e.target.id) {
      case "material":
        if (value === "Holz") {
          setConfig({ ...config, material: value, doorColor: "#A65E2E" }); // Orangebraun
        } else {
          setConfig({ ...config, material: value });
        }
        break;
      case "design":
        setConfig({ ...config, design: value });
        break;
      case "wallColor":
        setConfig({ ...config, wallColor: value });
        break;
      case "doorColor":
        setConfig({ ...config, doorColor: value });
        break;
      default:
        break;
    }
  }

  function handleCanvasClick() {
    if (config.system === "Sectionaltor") {
      if (direction === "down") {
        setDirection("up");
        drawIt();
      } else {
        setDirection("down");
        drawIt();
      }
    } else {
      if (direction === "right") {
        setDirection("left");
        drawIt();
      } else {
        setDirection("right");
        drawIt();
      }
    }
  }

  function drawIt() {
    let canv = canvasRef.current;
    let ctx = canv.getContext("2d");

    let tempWidth = +config.width;
    let tempHeight = +config.height;
    let tempRadius = +config.radius;

    let wallColor = config.wallColor;
    let doorColor = config.doorColor;

    let startY = 340;
    let canvBreite = canv.width;
    let startXTemp = (canvBreite - tempWidth) / 2;

    let stepW = tempStepW;
    let stepH = tempStepH;

    if ((direction === "up") & (stepH < tempHeight)) {
      setTempStepH((prev) => prev + 1);
    } else if ((direction === "down") & (stepH > 0)) {
      setTempStepH((prev) => prev - 1);
    }

    if ((direction === "right") & (stepW < tempWidth)) {
      setTempStepW((prev) => prev + 1);
    } else if ((direction === "left") & (stepW > 0)) {
      setTempStepW((prev) => prev - 1);
    }

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

    // Door
    ctx.fillStyle = doorColor;
    ctx.fillRect(
      startXTemp + stepW,
      canv.height - (canv.height - startY) - tempHeight - stepH,
      tempWidth,
      tempHeight
    );

    // Door design
    if (config.system === "Rundlauftor") {
      ctx.strokeStyle = "hsl(0, 0%, 20%)";
      let segmentR = 10;
      ctx.lineWidth = 1;
      for (let i = 0; i < tempWidth; i += segmentR) {
        ctx.strokeRect(
          startXTemp + i + stepW,
          canv.height - (canv.height - startY) - tempHeight,
          segmentR,
          tempHeight
        );
      }
    } else {
      ctx.strokeStyle = "hsl(0, 0%, 20%)";
      let segment = tempHeight / 4;
      for (let i = 0; i < tempHeight; i += segment) {
        ctx.lineWidth = 4;
        ctx.strokeRect(
          startXTemp,
          canv.height - (canv.height - startY) - tempHeight + i - stepH,
          tempWidth,
          segment
        );
        if (config.design === "Sicke") {
          let subsegment = segment / 3;
          for (let ii = 0; ii < tempHeight - 1; ii += subsegment) {
            ctx.lineWidth = 1;
            ctx.strokeRect(
              startXTemp,
              canv.height - (canv.height - startY) - tempHeight + ii - stepH,
              tempWidth,
              subsegment
            );
          }
        } else if (config.design === "Großsicke") {
          let subsegment = segment / 2;
          for (let ii = 0; ii < tempHeight; ii += subsegment) {
            ctx.lineWidth = 1;
            ctx.strokeRect(
              startXTemp,
              canv.height - (canv.height - startY) - tempHeight + ii - stepH,
              tempWidth,
              subsegment
            );
          }
        } else if (config.design === "Kassette") {
          let subsegmentH = segment / 2;
          let subsegmentW = tempWidth / 5;
          let zwischenraum = subsegmentW / 5;
          for (
            let ii = zwischenraum;
            ii < tempWidth;
            ii += subsegmentW + zwischenraum
          ) {
            ctx.strokeRect(
              startXTemp + ii,
              canv.height -
                (canv.height - startY) -
                tempHeight +
                subsegmentH / 2 +
                i -
                stepH,
              subsegmentW,
              subsegmentH
            );
          }
        }
      }
    }

    // Wall
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
      <Container>
        <Wrapper>
          <StyledTopP>
            Wählen sie hier die gewünschte Torausführung <br />
            und -farbe, um einen Eindruck zu bekommen
          </StyledTopP>

          <StyledCanvas
            id="canvas"
            onClick={handleCanvasClick}
            ref={canvasRef}
            width={650}
            height={400}
          >
            Your browser does not support the HTML5 canvas tag.
          </StyledCanvas>

          <form onSubmit={handleSubmit}>
            <Select
              id="wallColor"
              onChange={handleSelect}
              value={config.wallColor}
              options={RalColorsLimited}
              labelText="Hauswand"
            />

            {config.system === "Rundlauftor" || (
              <>
                <Select
                  id="design"
                  onChange={handleSelect}
                  value={config.design}
                  options={[
                    { name: "Sicke", id: "Sicke" },
                    { name: "Großsicke", id: "Großsicke" },
                    { name: "Kassette", id: "Kassette" },
                  ]}
                  labelText="Tor-Design"
                />
              </>
            )}

            <Select
              id="material"
              onChange={handleSelect}
              value={config.material}
              options={[
                { name: "Holz", id: "Holz" },
                { name: "Metall", id: "Metall" },
              ]}
              labelText="Tor-Material"
            />

            {config.material === "Holz" || (
              <>
                <Select
                  id="doorColor"
                  onChange={handleSelect}
                  value={config.doorColor}
                  options={RalColorsLimited}
                  labelText="Tor-Farbe"
                />
              </>
            )}

            <StyledButton type="submit">Anwenden</StyledButton>
          </form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.main`
  position: relative;
  height: 100%;
  min-height: 100vh;
  padding: 50px 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(background3.png);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    filter: opacity(45%) blur(3px);
  }
`;

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
  cursor: pointer;
`;

const StyledButton = styled.button`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  width: 200px;
  padding: 3px;
  margin-top: 20px;
  border: 3px solid;
  border-color: ${variables.BACKGROUND_COLOR_1};
  border-radius: 6px;
  outline: none;
  background-color: ${variables.BACKGROUND_COLOR_1};
  box-shadow: 3px 3px 5px hsla(0, 0%, 30%, 1);
  cursor: pointer;

  &:hover {
    border-color: ${variables.BACKGROUND_COLOR_14};
  }

  &:focus {
    border-color: ${variables.BACKGROUND_COLOR_14};
  }
`;

const StyledTopP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  margin-top: 8px;
`;
