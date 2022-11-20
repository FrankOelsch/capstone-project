import { useState, useContext, useEffect } from "react";
import Item from "../components/Item";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../UserContext";
import { ShopItems } from "../data/Items";
import ReactModal from "react-modal";
import { getLocaleStringFromNumber, getSquareMeters } from "../utils/helper";
import * as variables from "../Variables";
import InputWithLabel from "../components/InputWithLabel";

const customStyles = {
  overlay: {
    backgroundColor: variables.BACKGROUND_COLOR_12,
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
    backgroundColor: "#c7ddde",
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
            if (item.quantity < 10) {
              return { ...item, quantity: +item.quantity + 1 };
            } else {
              return item;
            }
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
      <Header text={"Warenkorb"} size={"26px"} />
      <Container>
        <Wrapper>
          <StyledTopP>
            Hier sehen sie den automatisch konfigurierten <br />
            Tor- Artikel entsprechend den Eingaben auf den <br />
            vorherigen Seiten. Zusätzliche Artikel können zufügen werden.
          </StyledTopP>

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
            <StyledH4>Artikel bearbeiten</StyledH4>

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="id" value={cartItem.id} />

              <InputWithLabel
                type="text"
                id="name"
                name="name"
                value={cartItem.name}
                onChange={handleOnChange}
                minLength="8"
                maxLength="20"
                required
                labelText="Artikel-Name"
              />

              <InputWithLabel
                type="number"
                id="quantity"
                name="quantity"
                value={cartItem.quantity}
                onChange={handleOnChange}
                min="1"
                max="10"
                step="1"
                required
                labelText="Anzahl"
              />
              <StyledButton type="submit">Speichern</StyledButton>
              <StyledMessageP>{message}</StyledMessageP>
            </form>
            <StyledButton onClick={closeModal}>Schließen</StyledButton>
          </ReactModal>

          <StyledSumP>{"Brutto-Gesamtsumme: " + getSum() + " €"}</StyledSumP>

          <StyledH3>Zusätzliche Artikel</StyledH3>

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
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.main`
  height: 100%;
  min-height: 100vh;
  padding: 54px 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(background3.png);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    filter: opacity(45%) blur(3px);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const StyledH4 = styled.h4`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const StyledSection = styled.section`
  width: 98%;
`;

const StyledTopP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  margin: 2px;
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

const StyledMessageP = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1em;
  font-weight: bold;
  margin: 2px;
  margin-top: 10px;
  color: ${variables.BACKGROUND_COLOR_10};
`;

const StyledButton = styled.button`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  width: 200px;
  padding: 3px;
  margin-top: 20px;
  border: 3px solid;
  border-color: hsla(216, 65%, 60%, 0.8);
  border-radius: 6px;
  outline: none;
  background-color: hsla(216, 65%, 60%, 0.8);
  box-shadow: 3px 3px 5px hsla(0, 0%, 30%, 1);
  cursor: pointer;

  &:hover {
    border-color: ${variables.BACKGROUND_COLOR_14};
  }

  &:focus {
    border-color: ${variables.BACKGROUND_COLOR_14};
  }
`;

const StyledH3 = styled.h3`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1em;
  color: ${variables.BACKGROUND_COLOR_9};
  width: 100%;
  padding: 6px;
  background-color: ${variables.BACKGROUND_COLOR_1};
  margin: 8px;
`;
