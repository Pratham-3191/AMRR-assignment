import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';
import Home from './pages/Home';

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add-item" element={<AddItem onAddItem={handleAddItem} />} />
        <Route path="/view-items" element={<ViewItems items={items} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
