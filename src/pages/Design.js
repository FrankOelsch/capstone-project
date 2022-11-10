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
    setConfigForSave(config);
  }, []);

  function checkConfig() {
    setConfigForSave(config);
  }

  function handleSelect(e) {
    const value = e.target.value;

    console.log("value");
    console.log(e.target.value);

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
    checkConfig();
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

        <StyledLabel htmlFor="material">Material</StyledLabel>
        <Select
          id="material"
          onChange={handleSelect}
          value={config.material}
          options={[
            { de: "Metall", id: "Metall" },
            { de: "Holz", id: "Holz" },
          ]}
        />

        <StyledLabel htmlFor="design">Design</StyledLabel>
        <Select
          id="design"
          onChange={handleSelect}
          value={config.design}
          options={[
            { de: "Sicke", id: "Sicke" },
            { de: "Großsicke", id: "Großsicke" },
            { de: "Kassette", id: "Kassette" },
          ]}
        />

        <StyledLabel htmlFor="wallColor">Farbe Hauswand</StyledLabel>
        <Select
          id="wallColor"
          onChange={handleSelect}
          value={config.wallColor}
          options={RALColors}
        />

        <StyledLabel htmlFor="doorColor">Farbe Hauswand</StyledLabel>
        <Select
          id="doorColor"
          onChange={handleSelect}
          value={config.doorColor}
          options={RALColors}
        />
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
