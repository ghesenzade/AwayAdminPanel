import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const [data, setData] = useState({
    name: "",
    details: "",
    price: "",
    productImage: "uploads/item1.webp"
  });

  useEffect(() => {
    getSingleProductData();
  }, []);

// -----------------------------getting data --------------------------------------------
  const getSingleProductData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SINGLE_PRODUCT}${id}`);
      const productData = response.data;
      setData(productData);

      setValue("name", productData.name);
      setValue("details", productData.details);
      setValue("price", productData.price);
    } catch (err) {
      console.log(err);
    }
  };
// -------------------------------------submission-------------------------------------------------
  const onSubmit = async (data) => {
    const body = new FormData();
    body.append("name", data.name);
    body.append("details", data.details);
    body.append("price", data.price);
    body.append("productImage", image);
    console.log(image);
    try {
      const response = await axios.put(`${process.env.REACT_APP_EDIT_PRODUCT}${id}`, body);
      console.log(response);
      navigate("/"); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit product</h1>
{/* -----------------------------------NAME-PART----------------------------------------------- */}
        <div className="formControl">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", {
              required: "Name is required.",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters."
              },
              maxLength: {
                value: 200,
                message: "Name cannot exceed 200 characters."
              }
            })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
{/* --------------------------------detail part------------------------------------------------------ */}
        <div className="formControl">
          <label htmlFor="details">Detail</label>
          <input
            type="text"
            id="details"
            name="details"
            {...register("details", {
              required: "Detail is required.",
              minLength: {
                value: 3,
                message: "Detail must be at least 3 characters."
              },
              maxLength: {
                value: 200,
                message: "Detail cannot exceed 200 characters."
              }
            })}
          />
          {errors.details && <p className="error">{errors.details.message}</p>}
        </div>
{/* ---------------------------------PRICE PART------------------------------------------- */}
        <div className="formControl">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            {...register("price", {
              required: "Price is required.",
              validate: (value) => {
                const parsedValue = parseFloat(value);
                if (isNaN(parsedValue) || parsedValue <= 0) {
                  return "Price must be a positive number.";
                }
                return true;
              }
            })}
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>
{/* -------------------------------IMAGE PART----------------------------------------------------- */}
        <div className="formControl">
          <label htmlFor="image">Upload image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setSelectedImageURL(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        <div className="previewImage">
          {selectedImageURL ? (
            <img src={selectedImageURL} alt="newImage" />
          ) : (
            <img src={`http://localhost:5000/${data.productImage}`} alt="existingImage" />
          )}
        </div>
{/* ---------------------------buttons--------------------------------------------------- */}
        <div className="btns">
          <button className="btn secondary" type="button">
            <Link to={`/products/${id}`} className="cancel">
              Cancel
            </Link>
          </button>
          <button className="btn primary" type="submit">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
