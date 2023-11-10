import { useEffect, useState } from "react";
import axios from "axios";
import { formatImgUrl } from "../utils/utils";
import { ProductCard } from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    await axios
      .get(process.env.REACT_APP_ALL_PRODUCTS)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="shopAll">
      <div className="container">
        <div className="row">
          <div className="content column">
            <div className="title">
              <h2>All Products</h2>
              <p>{products.length} products</p>
            </div>
            <div className="shopAllProducts">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  detail={product.details}
                  image={formatImgUrl(product.productImage)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
