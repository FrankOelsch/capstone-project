import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Config() {
  const [gateWidth, setGateWidth] = useState(2500);
  const [gateHeight, setGateHeight] = useState(2000);
  const [message, setMessage] = useState("");
  const [qm, setQm] = useState(5);

  useEffect(() => {
    setQm(
      ((gateWidth * gateHeight) / 1000000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
    );
  }, []);

  const handleKeyDown = (e) => {
    console.log(e);
    if (e.key === "Enter" || e.type === "blur") {
      let isUsefull = true;
      let x = "";

      if (gateWidth < 1000 || gateWidth > 5000) {
        isUsefull = false;
        x += "Breite muss größer 1000 mm und kleiner 5000 mm sein.";
      }

      if (gateHeight < 1800 || gateHeight > 3000) {
        isUsefull = false;
        x += "\nHöhe muss größer 1800 mm und kleiner 3000 mm sein.";
      }

      setMessage(x);

      if (isUsefull) {
        setQm(
          ((gateWidth * gateHeight) / 1000000).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        );
        setMessage("");
      }
    }
  };

  function handleChange(e) {
    if (isNaN(e.target.value)) {
      setMessage("Bitte nur Zahlen eingeben!");
      return;
    }

    if (e.target.id === "gateW") {
      setGateWidth(+e.target.value);
    } else if (e.target.id === "gateH") {
      setGateHeight(+e.target.value);
    }
  }

  return (
    <>
      <p>Sichtbare Torfläche: {qm} qm</p>
      <label htmlFor="gateW">Toröffnung-Breite in mm</label>
      <StyledInput
        onBlur={handleKeyDown}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        id="gateW"
        value={gateWidth}
      ></StyledInput>
      <label htmlFor="gateH">Toröffnung-Höhe in mm</label>
      <StyledInput
        onBlur={handleKeyDown}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        id="gateH"
        value={gateHeight}
      ></StyledInput>
      <p>{message}</p>
    </>
  );
}

const StyledInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  margin-bottom: 10px;
`;
