import { Link } from "react-router-dom";
export const ProductCard = ({
  id,
  name,
  price,
  image
}) => {
  return (
    <div className="productCard">
      <Link className="productLink" to={`products/${id}`}>
        <div className="imgContainer">
          <img
            className="productImage"
            src={image}
            alt={name}
          />
        </div>
      </Link>
      <div className="productInfo">
        <Link to={`products/${id}`} className="name">{name}</Link>
        <h4 className="details">${`${price}`}</h4>
      </div>
    </div>
  );
};
