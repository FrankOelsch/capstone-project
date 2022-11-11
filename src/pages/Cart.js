import { useState, useEffect, useContext } from "react";
import TextInput from "../components/input/TextInput";
import Item from "../components/Item";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../UserContext";
import { shopItems } from "../data/shopItems";

export default function Cart() {
  const { config, setConfig } = useContext(UserContext);

  const [data, setData] = useState(shopItems);
  const [searchString, setSearchString] = useState("");
  const [toggleID, setToggleID] = useState("");

  const { search } = require("fast-fuzzy");

  const falseArray = [];
  const cartArray = [];

  useEffect(() => {
    if (!toggleID) return;
    setData(
      data.map((item) => {
        if (item.id === toggleID) {
          setToggleID("");
          return { ...item, inCart: !item.inCart };
        } else {
          return item;
        }
      })
    );
  }, [toggleID]);

  data.forEach((item) => {
    if (item.inCart) {
      cartArray.push(item);
    } else {
      falseArray.push(item);
    }
  });

  const filterArray = search(searchString, falseArray, {
    keySelector: (obj) => obj.name,
  });

  function getFilteredItems(e) {
    setSearchString(e.target.value);
  }

  function toggleItem(id) {
    setToggleID(id);
  }

  return (
    <>
      <Header />
      <Container>
        <StyledH2>Warenkorb:</StyledH2>
        <StyledSection>
          {cartArray.map((item) => (
            <Item key={item.id} item={item} onToggle={toggleItem} />
          ))}
        </StyledSection>

        <StyledH2>Artikel:</StyledH2>
        <TextInput id="searchInput" onInput={getFilteredItems} />
        <StyledSection>
          {filterArray.map((item) => (
            <Item key={item.id} item={item} onToggle={toggleItem} />
          ))}
        </StyledSection>

        <Box></Box>
        <PropsBox background="blue" />
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

const StyledH2 = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.4em;
  margin-top: 10px;
`;

const StyledSection = styled.section`
  width: 98%;
`;

const Box = styled.div({
  background: "palevioletred",
  height: "50px",
  width: "50px",
});
const PropsBox = styled.div((props) => ({
  background: props.background,
  height: "50px",
  width: "50px",
}));
