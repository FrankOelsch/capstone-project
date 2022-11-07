import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TextInput from "../components/input/TextInput";
import { CheckConfig } from "../components/Logic";
import Select from "../components/select/Select";

export default function Config({
  config,
  setConfig,
  configForSave,
  setConfigForSave,
}) {
  const canvasRef = useRef(null);

  const [messageW, setMessageW] = useState("");
  const [messageH, setMessageH] = useState("");
  const [messageR, setMessageR] = useState("");

  const [prevWidth, setPrevWidth] = useState(150);
  const [prevHeight, setPrevHeight] = useState(200);
  const [prevRadius, setPrevRadius] = useState(30);

  const [tempWidth, setTempWidth] = useState(150);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      drawIt();
    }, 2);
    return () => clearTimeout(timeout);
  }, [tempWidth, tempHeight, tempRadius]);

  function checkConfig() {
    let isUsefull = true;

    if (isNaN(config.height) || isNaN(config.width) || isNaN(config.radius)) {
      return;
    } else {
      if (+config.width < 100 || +config.width > 500) {
        setMessageW("Zulässige Werte: 100 - 500 cm.");
        isUsefull = false;
      } else {
        setMessageW("");
      }
      if (+config.height < 180 || +config.height > 300) {
        setMessageH("Zulässige Werte: 180 - 300 mm.");
        isUsefull = false;
      } else {
        setMessageH("");
      }
      if (
        +config.radius < 0 ||
        +config.radius > +config.width / 2 ||
        +config.radius > +config.height ||
        !config.radius
      ) {
        setMessageR(
          "Zulässige Werte: 0 - 50 % der Breite und 0 - 100 % der Höhe."
        );
        isUsefull = false;
      } else {
        setMessageR("");
      }

      if (isUsefull) {
        setQm(
          ((+config.width * +config.height) / 10000).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        );

        setConfigForSave(config);

        drawIt();
      }
    }
  }

  function handleChange(e) {
    if (isNaN(e.target.value)) {
      return;
    }
    switch (e.target.id) {
      case "gateW":
        setConfig({ ...config, width: e.target.value });
        break;
      case "gateH":
        setConfig({ ...config, height: e.target.value });
        break;
      case "radius":
        setConfig({ ...config, radius: e.target.value });
        break;
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === "Tab") {
      // checkConfig();
      CheckConfig(
        config,
        setConfigForSave,
        setMessageW,
        setMessageH,
        setMessageR,
        setQm,
        drawIt
      );
      if (!e.target === "select") {
        e.target.select();
      }
    }
  }

  function handleSelect(e) {
    setConfig({ ...config, system: e.target.value });
  }

  function handleClick() {
    // checkConfig();
    CheckConfig(
      config,
      setConfigForSave,
      setMessageW,
      setMessageH,
      setMessageR,
      setQm,
      drawIt
    );
  }

  function drawIt() {
    canv = canvasRef.current;
    ctx = canv.getContext("2d");

    let torBreite = +config.width;
    let torBreitePrev = prevWidth;
    let torBreiteTemp = tempWidth;

    let torHoehe = +config.height;
    let torHoehePrev = prevHeight;
    let torHoeheTemp = tempHeight;

    let torRadius = +config.radius;
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
      setPrevWidth(torBreite);
    } else {
      setTempWidth((prev) => prev + stepW);
    }

    if (tempHeight === torHoehe) {
      setPrevHeight(torHoehe);
    } else {
      setTempHeight((prev) => prev + stepH);
    }

    if (tempRadius === torRadius) {
      setPrevRadius(torRadius);
    } else {
      setTempRadius((prev) => prev + stepR);
    }

    if (torBreiteTemp < 0) torBreiteTemp = 0;
    if (torHoeheTemp < 0) torHoeheTemp = 0;
    if (torRadiusTemp < 0) torRadiusTemp = 0;

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

  return (
    <>
      <Header />
      <Container>
        <StyledH3>
          {configForSave.system}: {qm} qm
        </StyledH3>

        <StyledCanvas id="canvas" ref={canvasRef} width={600} height={400}>
          Your browser does not support the HTML5 canvas tag.
        </StyledCanvas>

        <Select
          onChange={handleSelect}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          value={config.system}
        />

        {/* <div>
          <select
            onChange={handleSelect}
            onKeyDown={handleKeyDown}
            value={config.system}
          >
            <option value={"Sectionaltor"}>Sectionaltor</option>
            <option value={"Rundlauftor"}>Rundlauftor</option>
          </select>
          <button onClick={handleClick}>Ok</button>
        </div> */}

        <label htmlFor="gateW">Tor-Breite in cm</label>
        <TextInput
          value={config.width}
          id="gateW"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <StyledMessage> {messageW}</StyledMessage>

        <label htmlFor="gateH">Tor-Höhe in cm</label>
        <TextInput
          value={config.height}
          id="gateH"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <StyledMessage> {messageH}</StyledMessage>

        <label htmlFor="radius">Torbogen-Radius in cm</label>
        <TextInput
          value={config.radius}
          id="radius"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <StyledMessage> {messageR}</StyledMessage>
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

const StyledH3 = styled.h3`
  margin: 10px;
`;

const StyledMessage = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: blue;
  margin-bottom: 10px;
  height: 1.1em;
`;
