import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Login from "../Components/Modal/Login";
import Sell from "../Components/Modal/Sell";
import Card from "../Components/Card/Card";
import { useItems } from "../Components/Context/ItemContext";
import { fetchFromFireStore } from "../Components/Firebase/Firebase";
import Footer from "../Components/Footer/Footer";
import Label from "../Components/Label/Label";
import Banner from "../Components/Banner/Banner";

const Home = () => {
  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);

  const toggleModal = () => {
    setModal(!openModal);
  };
  const toggleModalSell = () => {
    setModalSell(!openModalSell);
  };

  const { items, setItems } = useItems();

  useEffect(() => {
    const getItems = async () => {
      const datas = await fetchFromFireStore();
      setItems(datas);
    };

    getItems();
  }, [setItems]);

  return (
    <>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Banner />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell
        setItems={setItems}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
      />
      <Card items={items || []} />
      <Label />
      <Footer />
    </>
  );
};

export default Home;
