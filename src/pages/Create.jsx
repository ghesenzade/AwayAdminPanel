import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Create = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // --------------------Validations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!image) {
      return "Please select an image.";
    }

    // ----------put new data
    const body = new FormData();
    body.append("name", data.name);
    body.append("details", data.details);
    body.append("price", data.price);
    body.append("productImage", image);

    try {
      const res = await axios.post(
        process.env.REACT_APP_CREATE_NEW_PRODUCT,
        body
      );
      console.log(res);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------------------------Coming Image-------------------------------
  const handleImagePreview = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="create">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Create new product</h1>

        <div className="formControl">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required.",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters.",
              },
              maxLength: {
                value: 40,
                message: "Name cannot exceed 40 characters.",
              },
            })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="formControl">
          <label htmlFor="details">Details</label>
          <input
            type="text"
            id="details"
            {...register("details", {
              required: "Detail is required.",
              minLength: {
                value: 3,
                message: "Detail must be at least 3 characters.",
              },
              maxLength: {
                value: 200,
                message: "Detail cannot exceed 200 characters.",
              },
            })}
          />
          {errors.details && <p className="error">{errors.details.message}</p>}
        </div>

        <div className="formControl">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            {...register("price", {
              required: "Price is required.",
              validate: (value) => {
                const parsedValue = parseFloat(value);
                if (isNaN(parsedValue) || parsedValue <= 0) {
                  return "Price must be a positive number.";
                }
                return true;
              },
            })}
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        <div className="formControl">
          <label htmlFor="image">Upload image</label>
          <input
            type="file"
            id="image"
            onChange={handleImagePreview}
            required
          />
        </div>

        {imagePreview && (
          <div className="previewImage">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}

        <div className="btns">
          <button className="btn secondary">
            <Link to="/" className="cancel">
              Cancel
            </Link>
          </button>
          <button className="btn primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
