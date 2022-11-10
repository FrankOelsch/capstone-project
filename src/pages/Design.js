import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Select from "../components/select/Select";
import { UserContext } from "../UserContext";
import { RALColors } from "../data/ral-colors";

export default function Design() {
  const { config, setConfig, configForSave, setConfigForSave } =
    useContext(UserContext);

  const canvasRef = useRef(null);

  const [qm, setQm] = useState(
    ((+config.width * +config.height) / 10000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
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
        setConfig({ ...config, material: value });
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

    ctx.beginPath();
    ctx.rect(0, 0, 650, 340);
    ctx.fillStyle = wallColor;
    ctx.fill();

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
    ctx.fillStyle = doorColor;
    ctx.fill();
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
          <StyledLabel htmlFor="wallColor">Hauswand</StyledLabel>
          <Select
            id="wallColor"
            onChange={handleSelect}
            value={config.wallColor}
            options={RALColors}
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

          <StyledLabel htmlFor="doorColor">Tor-Farbe</StyledLabel>
          <Select
            id="doorColor"
            onChange={handleSelect}
            value={config.doorColor}
            options={RALColors}
          />

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
  background-color: grey;
`;

const StyledLabel = styled.label`
  text-align: left;
`;

const StyledH3 = styled.h3`
  margin: 10px;
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
