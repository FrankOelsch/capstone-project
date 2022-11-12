import { useState, useContext } from "react";
import Item from "../components/Item";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../UserContext";
import { ShopItems } from "../data/Items";

export default function Cart() {
  const { config, setConfig, cartItems, setCartItems } =
    useContext(UserContext);

  const [shopItems, setShopItems] = useState(ShopItems);

  const filteredShopItems = shopItems.filter((item) => {
    return item.for === "all" || item.for === config.system;
  });

  function handleCreate(id) {
    let bereitsInCart = false;

    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          bereitsInCart = true;
          return { ...item, quantity: +item.quantity + 1 };
        } else {
          return item;
        }
      })
    );

    if (!bereitsInCart) {
      const newArray = shopItems.filter((item) => {
        return item.id === id;
      });

      if (newArray) {
        const newItem = newArray[0];

        setCartItems((cartItems) => [
          ...cartItems,
          { ...newItem, inCart: !newItem.inCart },
        ]);
      }
    }
  }

  function handleDelete(id) {
    setCartItems(
      cartItems.filter((item) => {
        return item.id !== id;
      })
    );
  }

  function handleEdit(id) {
    //setClickID(id);
  }

  return (
    <>
      <Header />
      <Container>
        <StyledH2>Warenkorb:</StyledH2>
        <StyledSection>
          {cartItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </StyledSection>

        <StyledH2>Artikel:</StyledH2>
        <StyledSection>
          {filteredShopItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </StyledSection>
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
