//styles
import "./App.scss";

//components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AddInventoryItem from "./components/addInventoryItem/AddInventoryItem";
import AddWarehouse from "./components/addWarehouse/AddWarehouse";
import DeleteInventoryItem from "./components/deleteInventoryItem/DeleteInventoryItem";
import DeleteWarehouse from "./components/deleteWarehouse/DeleteWarehouse";
import EditInventoryItem from "./components/editInventoryItem/EditInventoryItem";
import EditWarehouse from "./components/editWarehouse/EditWarehouse";
import InventoryItemDetails from "./components/inventoryItemDetails/InventoryItemDetails";
import WarehouseSingle from "./components/warehouseSingle/WarehouseSingle";

//pages
import Inventory from "./pages/inventory/Inventory";
import Warehouses from "./pages/warehouses/Warehouses";

//react router components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [inventoryItemsList, setInventoryItemsList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);

  //<----------------WAREHOUSE---------------------------->
  //get data for warehouse
  useEffect(() => {
    const fetchAllwarehouses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/warehouses`);
        setWarehouseList(data);
      } catch (err) {
        console.log("Error", err);
      }
    };

    fetchAllwarehouses();
  }, []);

  function handleDeleteWarehouse(warehouseId) {
    setWarehouseList(
      warehouseList?.filter((warehouse) => warehouse?.id !== warehouseId)
    );
  }

  function handleAddWarehouse(warehouse) {
    setWarehouseList(warehouseList);
  }

  // function handleEditWarehouse() {
  //   setWarehouseList();
  //   //here will go the edited warehouse
  // }

  // function handleEditWarehouse() {
  //   setWarehouseList();
  //   //here will go the edited warehouse
  // }

  //<----------------INVENTORY---------------------------->
  //get data for inventory
  useEffect(() => {
    const getInventoryItemsURL = "http://localhost:8080/inventories";
    axios
      .get(getInventoryItemsURL)
      .then((response) => {
        setInventoryItemsList(response.data);
      })
      .catch((error) => console.log(error));
  }, [inventoryItemsList]);

  function handleDeleteItem(itemId) {
    setInventoryItemsList(
      inventoryItemsList?.filter((item) => item?.id !== itemId)
    );
  }

  function handleAddItem(newInventoryItem) {
    setInventoryItemsList(newInventoryItem);
  }

  function handleEditItem(editInventoryItem) {
    setInventoryItemsList(editInventoryItem);
  }

  // console.log(inventoryItemsList);
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Header stays outside the routes */}
        <header className="header-container">
          <Header />
        </header>
        <div className="main-footer-wrapper">
          {/* <div> */}
          <main className="main-container">
            <Routes>
              {/*<---------------- HOME ---------------->*/}
              {/* Home will navigate the user to the Warehouses page so there is no need for a file homePage.js */}
              <Route path="/" element={<Navigate to={"/warehouses"} />} />

              {/*<---------------- WAREHOUSE PAGE ---------------->*/}
              {/* The Warehouses page has only one nested route to DELETE an existing warehouse*/}
              <Route
                path="/warehouses"
                element={<Warehouses warehouseList={warehouseList} />}
              >
                <Route
                  path="deleteWarehouse/:warehouseId"
                  element={
                    <DeleteWarehouse
                      warehouseList={warehouseList}
                      handleDeleteWarehouse={handleDeleteWarehouse}
                    />
                  }
                />
              </Route>
              <Route
                path="warehouses/:warehouseId"
                element={<WarehouseSingle />}
              />
              <Route
                element={<EditWarehouse />}
                path="warehouses/editWarehouse/:warehouseId"
              />
              <Route
                path="warehouses/addWarehouse"
                element={
                  <AddWarehouse
                    warehouseList={warehouseList}
                    handleAddWarehouse={handleAddWarehouse}
                  />
                }
              />

              {/*<---------------- INVENTORY PAGE ---------------->*/}
              {/* The Inventory page has only one nested to DELETE an existing item*/}
              <Route
                path="/inventory"
                element={<Inventory inventoryItemsList={inventoryItemsList} />}
              >
                <Route
                  path="deleteInventoryItem/:itemId"
                  element={
                    <DeleteInventoryItem
                      inventoryItemsList={inventoryItemsList}
                      handleDeleteItem={handleDeleteItem}
                    />
                  }
                />
              </Route>
              <Route
                path="inventory/:itemId"
                element={<InventoryItemDetails warehouseList={warehouseList} />}
              />
              <Route
                path="inventory/editInventoryItem/:itemId"
                element={
                  <EditInventoryItem
                    inventoryItemsList={inventoryItemsList}
                    handleEditItem={handleEditItem}
                  />
                }
              />
              <Route
                path="inventory/addInventoryItem"
                element={
                  <AddInventoryItem
                    inventoryItemsList={inventoryItemsList}
                    handleAddItem={handleAddItem}
                  />
                }
              />

              {/*<---------------- FALLBACK ROUTE ---------------->*/}
              {/* Fallback route will direct user to Warehouses page*/}
              <Route path="*" element={<Warehouses />} />
            </Routes>
          </main>
          {/* </div> */}
          {/* Footer stays outside the routes */}
          <div className="footer-wrapper">
            <footer className="footer-container">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
