import { useState, useContext, useEffect } from "react";
import Item from "../components/Item";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../UserContext";
import { ShopItems } from "../data/Items";
import ReactModal from "react-modal";
import { getLocaleStringFromNumber, getSquareMeters } from "../utils/helper";
import TextInput from "../components/TextInput";

const customStyles = {
  overlay: {
    backgroundColor: "hsla(0, 0%, 40%, 70%)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "aliceblue",
  },
};

ReactModal.setAppElement("body");

export default function Cart() {
  const { config, cartItems, setCartItems } = useContext(UserContext);

  const [shopItems, setShopItems] = useState(ShopItems);

  const filteredShopItems = shopItems.filter((item) => {
    return item.for === "all" || item.for === config.system;
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    setCartItems(
      cartItems.map((item) => {
        if (item.autoCreated) {
          let door = config.system;
          let mat = config.material;
          let desc = door;
          if (door === "Sectionaltor") {
            if (mat === "Holz") {
              desc +=
                " 40mm Wandungsstärke in " +
                config.material +
                "-Ausführung incl. Dünnschicht-Lasur";
            } else {
              desc +=
                " " +
                config.design +
                " 40mm Wandungsstärke in " +
                config.material +
                "-Ausführung incl. Farbe nach RAL";
            }
          } else {
            if (mat === "Holz") {
              desc +=
                " 20mm Wandungsstärke in " +
                config.material +
                "-Ausführung incl. Dünnschicht-Lasur";
            } else {
              desc +=
                " 20mm Wandungsstärke in " +
                config.material +
                "-Ausführung incl. Farbe nach RAL";
            }
          }
          return {
            ...item,
            quantity: getSquareMeters(config.width, config.height),
            description: desc,
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

  const [cartItem, setCartItem] = useState({ name: "", quantity: 1, id: "0" });

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

  function handleOnChange(e) {
    const value = e.target.value;

    switch (e.target.id) {
      case "name":
        setCartItem({ ...cartItem, name: value });
        break;
      case "quantity":
        setCartItem({ ...cartItem, quantity: +value });
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data);
    const itemName = values.name.trim();
    const itemQuantity = values.quantity;

    if (!itemName || itemName.length < 8 || itemName.length > 20) {
      setMessage("Nicht gespeichert, weil fehlerhafte Eingabe!");
      return;
    }

    setCartItems(
      cartItems.map((item) => {
        if (item.id === values.id) {
          return { ...item, name: itemName, quantity: itemQuantity };
        } else {
          return item;
        }
      })
    );
    setMessage("Erfolgreich gespeichert.");
  }

  function handleAfterClose() {
    setMessage("");
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
          Zusätzliche Artikel können zufügen werden.
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
          onAfterClose={handleAfterClose}
        >
          <StyledH3>Artikel bearbeiten</StyledH3>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={cartItem.id} />
            <StyledLabel htmlFor="name">Artikel-Name:</StyledLabel>
            <TextInput
              type="text"
              id="name"
              name="name"
              value={cartItem.name}
              onChange={handleOnChange}
              minLength="8"
              maxLength="20"
              required
            />
            <StyledLabel htmlFor="quantity">Anzahl:</StyledLabel>
            <TextInput
              type="number"
              id="quantity"
              name="quantity"
              value={cartItem.quantity}
              onChange={handleOnChange}
              min="1"
              max="10"
              step="1"
              required
            />
            <StyledButton type="submit">Speichern</StyledButton>
            <p>{message}</p>
          </form>
          <StyledButton onClick={closeModal}>Schließen</StyledButton>
        </ReactModal>

        <StyledSumP>{"Brutto-Gesamtsumme: " + getSum() + " €"}</StyledSumP>
        <StyledHr />

        <StyledH2>Zusätzliche Artikel</StyledH2>
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
  margin-bottom: 10px;
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
  margin: 6px 0;
`;

const StyledSumP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  font-weight: bold;
  text-align: right;
  align-self: flex-end;
  margin-right: 14px;
  margin-bottom: 6px;
`;

const StyledHr = styled.hr`
  width: 100%;
  border-bottom: 6px solid hsl(216, 65%, 50%);
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
  cursor: pointer;

  &:focus {
    border-color: hsl(216, 65%, 50%);
  }
`;
