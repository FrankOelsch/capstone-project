import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserContext } from "../UserContext";
import { RalColorsLimited } from "../data/RalColorsLimited";
import { getLocaleStringFromNumber, getSquareMeters } from "../utils/helper";
import * as variables from "../Variables";
import SelectWithLabel from "../components/SelectWithLabel";
import MyButton from "../components/MyButton";

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

    let breite = +config.width;
    let hoehe = +config.height;
    let radius = +config.radius;

    let wallColor = config.wallColor;
    let doorColor = config.doorColor;

    let startY = 340;
    let canvBreite = canv.width;
    let startXTemp = (canvBreite - breite) / 2;

    let stepW = tempStepW;
    let stepH = tempStepH;

    if ((direction === "up") & (stepH < hoehe)) {
      setTempStepH((prev) => prev + 1);
    } else if ((direction === "down") & (stepH > 0)) {
      setTempStepH((prev) => prev - 1);
    }

    if ((direction === "right") & (stepW < breite)) {
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
      canv.height - (canv.height - startY) - hoehe,
      breite,
      hoehe
    );

    // Door
    ctx.fillStyle = doorColor;
    ctx.fillRect(
      startXTemp + stepW,
      canv.height - (canv.height - startY) - hoehe - stepH,
      breite,
      hoehe
    );

    // Door design
    if (config.system === "Rundlauftor") {
      ctx.strokeStyle = "hsl(0, 0%, 20%)";
      let segmentR = 10;
      ctx.lineWidth = 1;
      for (let i = 0; i < breite; i += segmentR) {
        ctx.strokeRect(
          startXTemp + i + stepW,
          canv.height - (canv.height - startY) - hoehe,
          segmentR,
          hoehe
        );
      }
    } else {
      ctx.strokeStyle = "hsl(0, 0%, 20%)";
      let segment = hoehe / 4;
      for (let i = 0; i < hoehe; i += segment) {
        ctx.lineWidth = 4;
        ctx.strokeRect(
          startXTemp,
          canv.height - (canv.height - startY) - hoehe + i - stepH,
          breite,
          segment
        );
        if (config.design === "Sicke") {
          let subsegment = segment / 3;
          for (let ii = 0; ii < hoehe - 1; ii += subsegment) {
            ctx.lineWidth = 1;
            ctx.strokeRect(
              startXTemp,
              canv.height - (canv.height - startY) - hoehe + ii - stepH,
              breite,
              subsegment
            );
          }
        } else if (config.design === "Großsicke") {
          let subsegment = segment / 2;
          for (let ii = 0; ii < hoehe; ii += subsegment) {
            ctx.lineWidth = 1;
            ctx.strokeRect(
              startXTemp,
              canv.height - (canv.height - startY) - hoehe + ii - stepH,
              breite,
              subsegment
            );
          }
        } else if (config.design === "Kassette") {
          let subsegmentH = segment / 2;
          let subsegmentW = breite / 5;
          let zwischenraum = subsegmentW / 5;
          for (
            let ii = zwischenraum;
            ii < breite;
            ii += subsegmentW + zwischenraum
          ) {
            ctx.strokeRect(
              startXTemp + ii,
              canv.height -
                (canv.height - startY) -
                hoehe +
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
    ctx.lineTo(startXTemp, startY - hoehe + radius);
    ctx.arcTo(
      startXTemp,
      startY - hoehe,
      startXTemp + radius,
      startY - hoehe,
      radius
    );
    ctx.lineTo(startXTemp + breite - radius, startY - hoehe);
    ctx.arcTo(
      startXTemp + breite,
      startY - hoehe,
      startXTemp + breite,
      startY - hoehe + radius,
      radius
    );
    ctx.lineTo(startXTemp + breite, startY);
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
            <SelectWithLabel
              id="wallColor"
              onChange={handleSelect}
              value={config.wallColor}
              options={RalColorsLimited}
              labelText="Hauswand"
            />

            {config.system === "Rundlauftor" || (
              <>
                <SelectWithLabel
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

            <SelectWithLabel
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
                <SelectWithLabel
                  id="doorColor"
                  onChange={handleSelect}
                  value={config.doorColor}
                  options={RalColorsLimited}
                  labelText="Tor-Farbe"
                />
              </>
            )}

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
  cursor: pointer;
`;

const StyledTopP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  margin-top: 8px;
`;
