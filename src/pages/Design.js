import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Select from "../components/Select";
import { UserContext } from "../UserContext";
import { RalColors } from "../data/RalColors";
import { RalColorsLimited } from "../data/RalColorsLimited";
import { getLocaleStringFromNumber, getSquareMeters } from "../utils/helper";

export default function Design() {
  const { config, setConfig, configForSave, setConfigForSave } =
    useContext(UserContext);

  const canvasRef = useRef(null);

  const [qm, setQm] = useState(
    getLocaleStringFromNumber(getSquareMeters(config.width, config.height))
  );

  useEffect(() => {
    checkConfig();
  }, []);

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
          console.log(value);
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

    ctx.clearRect(0, 0, canv.width, canv.height);

    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canv.width, canv.height);

    // Door background
    ctx.fillStyle = "gainsboro";
    ctx.fillRect(
      startXTemp,
      canv.height - (canv.height - startY) - tempHeight,
      tempWidth,
      tempHeight
    );

    // Door
    ctx.fillStyle = doorColor;
    ctx.fillRect(
      startXTemp,
      canv.height - (canv.height - startY) - tempHeight,
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
          startXTemp + i,
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
          canv.height - (canv.height - startY) - tempHeight + i,
          tempWidth,
          segment
        );
        if (config.design === "Sicke") {
          let subsegment = segment / 3;
          for (let ii = 0; ii < tempHeight; ii += subsegment) {
            ctx.lineWidth = 1;
            ctx.strokeRect(
              startXTemp,
              canv.height - (canv.height - startY) - tempHeight + ii,
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
              canv.height - (canv.height - startY) - tempHeight + ii,
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
                i,
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
      <Header text={configForSave.system + " " + qm + " qm"} />
      <Container>
        <StyledTopP>
          Wählen sie hier die gewünschte Torausführung <br />
          und -farbe, um einen Eindruck zu bekommen
        </StyledTopP>

        <StyledCanvas id="canvas" ref={canvasRef} width={650} height={400}>
          Your browser does not support the HTML5 canvas tag.
        </StyledCanvas>

        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor="wallColor">Hauswand</StyledLabel>
          <Select
            id="wallColor"
            onChange={handleSelect}
            value={config.wallColor}
            options={RalColorsLimited}
          />

          <StyledLabel htmlFor="material">Tor-Material</StyledLabel>
          <Select
            id="material"
            onChange={handleSelect}
            value={config.material}
            options={[
              { name: "Metall", id: "Metall" },
              { name: "Holz", id: "Holz" },
            ]}
          />

          {config.system === "Rundlauftor" || (
            <>
              <StyledLabel htmlFor="design">Tor-Design</StyledLabel>
              <Select
                id="design"
                onChange={handleSelect}
                value={config.design}
                options={[
                  { name: "Sicke", id: "Sicke" },
                  { name: "Großsicke", id: "Großsicke" },
                  { name: "Kassette", id: "Kassette" },
                ]}
              />
            </>
          )}

          {config.material === "Holz" || (
            <>
              <StyledLabel htmlFor="doorColor">Tor-Farbe</StyledLabel>
              <Select
                id="doorColor"
                onChange={handleSelect}
                value={config.doorColor}
                options={RalColorsLimited}
              />
            </>
          )}

          <StyledButton type="submit">Anwenden</StyledButton>
        </form>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.main`
  height: 100%;
  min-height: 100vh;
  padding: 60px 0;
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
  background-color: lightslategray;
`;

const StyledLabel = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
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
  cursor: pointer;

  &:focus {
    border-color: hsl(216, 65%, 50%);
  }
`;

const StyledTopP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  margin: 2px;
`;
