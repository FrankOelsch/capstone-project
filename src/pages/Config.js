import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Config() {
  const [gateWidth, setGateWidth] = useState(2500);
  const [gateHeight, setGateHeight] = useState(2000);
  const [messages, setMessages] = useState([]);
  const [qm, setQm] = useState(5);
  const [show, setShow] = useState(Math.random());

  useEffect(() => {
    setQm(
      ((gateWidth * gateHeight) / 1000000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
    );
  }, [show]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      let isUsefull = true;
      let array = [];

      if (gateWidth < 1000 || gateWidth > 5000) {
        isUsefull = false;
        array.push("Zulässige Werte für Breite: 1000 bis 5000 mm");
      }

      if (gateHeight < 1800 || gateHeight > 3000) {
        isUsefull = false;
        array.push("Zulässige Werte für Höhe: 1800 bis 3000 mm");
      }

      setMessages(array);

      if (isUsefull) {
        setShow(Math.random());
      }
    }
  };

  function handleChange(e) {
    if (isNaN(e.target.value)) {
      setMessages(["Bitte nur Zahlen eingeben!"]);
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
      <StyledH3>Sichtbare Torfläche: {qm} qm</StyledH3>
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
      {messages.map((message, i) => (
        <StyledMessage key={i}>{message}</StyledMessage>
      ))}
    </>
  );
}

const StyledH3 = styled.h3`
  margin: 10px;
`;

const StyledInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const StyledMessage = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  font-weight: bold;
  color: violet;
  margin-top: 10px;
`;
