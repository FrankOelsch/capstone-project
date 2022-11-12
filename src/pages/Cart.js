import { useState, useContext, useEffect } from "react";
import Item from "../components/Item";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../UserContext";
import { ShopItems } from "../data/Items";
import ReactModal from "react-modal";

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
            quantity: (+config.width * +config.height) / 10000,
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

  return (
    <>
      <Header />
      <Container>
        <StyledH2>Warenkorb:</StyledH2>
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
