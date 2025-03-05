import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-job" element={<AddJobPage />} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path="/" element={<ProductList refreshTrigger={refreshTrigger} />} />
              <Route path="/products/:id" element={<ProductDetail refreshProducts={refreshProducts} />} />
              <Route path="/add-product" element={<ProductForm refreshProducts={refreshProducts} />} />
              <Route path="/edit-product/:id" element={<ProductForm refreshProducts={refreshProducts} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
