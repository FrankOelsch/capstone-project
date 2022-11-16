import { useState, useContext, useEffect } from "react";
import Item from "../components/Item";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../UserContext";
import { ShopItems } from "../data/Items";
import ReactModal from "react-modal";
import { getLocaleStringFromNumber, getSquareMeters } from "../utils/helper";

const customStyles = {
  overlay: {
    backgroundColor: "papayawhip",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightsteelblue",
  },
};

ReactModal.setAppElement("body");

export default function Cart() {
  const { config, cartItems, setCartItems } = useContext(UserContext);

  const [shopItems, setShopItems] = useState(ShopItems);

  const filteredShopItems = shopItems.filter((item) => {
    return item.for === "all" || item.for === config.system;
  });

  useEffect(() => {
    setCartItems(
      cartItems.map((item) => {
        if (item.autoCreated) {
          return {
            ...item,
            quantity: getSquareMeters(config.width, config.height),
          };
        } else {
          return item;
        }
      })
    );
  }, []);

  const filteredCartItems = cartItems.filter((item) => {
    return item.for === config.system || item.for === "all";
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [cartItem, setCartItem] = useState({ name: "", id: "0" });

  function handleCreate(id) {
    const result = cartItems.find((item) => item.id === id);

    if (result) {
      setCartItems(
        cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: +item.quantity + 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      const newItem = shopItems.find((item) => item.id === id);
      if (newItem) {
        setCartItems((cartItems) => [
          ...cartItems,
          { ...newItem, inCart: true },
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
    const newArray = cartItems.filter((item) => {
      return item.id === id;
    });

    if (newArray.length > 0) {
      const newItem = newArray[0];
      setCartItem(newItem);
    }

    setModalIsOpen(true);
  }

  function handleOnChange(event) {
    const value = event.target.value;
    setCartItem({ ...cartItem, name: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data);

    setCartItems(
      cartItems.map((item) => {
        if (item.id === values.id) {
          return { ...item, name: values.name };
        } else {
          return item;
        }
      })
    );
  }

  function closeModal(e) {
    setModalIsOpen(false);
  }

  const getSum = () => {
    const sum = filteredCartItems.reduce(
      (total, curr) => total + curr.price * curr.quantity,
      0
    );
    return getLocaleStringFromNumber(sum);
  };

  return (
    <>
      <Header />
      <Container>
        <StyledTopP>
          Hier sehen sie den automatisch konfigurierten
          <br /> Tor-Artikel entsprechend den Eingaben auf den <br />
          vorherigen Seiten. <br />
          Weitere Artikel können zufügen werden.
        </StyledTopP>

        <StyledHr />

        <StyledH2>Warenkorb</StyledH2>
        <StyledSection>
          {filteredCartItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </StyledSection>

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Artikel Bearbeiten"
          preventScroll={true}
        >
          <StyledH3>Artikel bearbeiten</StyledH3>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={cartItem.id} />
            <StyledLabel htmlFor="name">Artikel-Name:</StyledLabel>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              value={cartItem.name}
              onChange={handleOnChange}
            />
            <br />
            <button type="submit">Speichern</button>
          </form>
          <button onClick={closeModal}>Zurück</button>
        </ReactModal>

        <StyledSumP>{"Brutto-Gesamtsumme: " + getSum() + " €"}</StyledSumP>
        <StyledHr />

        <StyledH2>Weitere Artikel</StyledH2>
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
  padding: 54px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledH2 = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  margin-top: 0px;
  padding: 0 6px;
  border-radius: 0px 0px 6px 6px;
  border-bottom: 3px solid hsl(216, 65%, 50%);
  border-left: 3px solid hsl(216, 65%, 50%);
  border-right: 3px solid hsl(216, 65%, 50%);
`;

const StyledH3 = styled.h3`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  margin: 10px;
`;

const StyledSection = styled.section`
  width: 98%;
`;

const StyledLabel = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: black;
`;

const StyledTopP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  margin-top: 6px;
`;

const StyledSumP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  font-weight: bold;
  text-align: right;
  align-self: flex-end;
  margin-right: 14px;
`;

const StyledHr = styled.hr`
  width: 100%;
  border-bottom: 6px solid hsl(216, 65%, 50%);
  margin-top: 8px;
`;
