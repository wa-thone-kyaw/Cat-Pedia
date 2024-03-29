import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyForm = () => {
  const [cat_name, setCatName] = useState("");
  const [cat_age, setCatAge] = useState("");
  const [cat_gender, setCatGender] = useState("");
  const [cat_photo, setCatPhoto] = useState(null);

  const handleCatPhotoChange = (e) => {
    setCatPhoto(e.target.files[0]);
  };

  const handleCatNameChange = (e) => {
    setCatName(e.target.value);
  };
  const handleCatAgeChange = (e) => {
    setCatAge(e.target.value);
  };
  const handleCatGenderChange = (e) => {
    setCatGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const formData = new FormData();
    formData.append("cat_name", cat_name);
    formData.append("cat_age", cat_age);
    formData.append("cat_gender", cat_gender);
    formData.append("cat_photo", cat_photo);

    setCatName("");
    setCatAge("");
    setCatGender("");
    setCatPhoto(null);
    console.log("Form submitted");
    console.log(e);
    console.log(cat_name);

    try {
      await axios.post("http://127.0.0.1:8000/polls/add_cat_info", formData);
    } catch (error) {
      console.error(error);
    }
    toast.success("Complete");
  };

  return (
    <div className="container">
      <h2>Bootstrap Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex justify-content-center">
          <input
            type="file"
            className="form-control"
            id="cat_photo"
            name="cat_photo"
            onChange={handleCatPhotoChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Cat Name
          </label>
          <input
            type="text"
            className="form-control"
            id="cat_name"
            name="cat_name"
            value={cat_name}
            onChange={handleCatNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Cat Age
          </label>
          <input
            type="text"
            className="form-control"
            id="cat_age"
            name="cat_age"
            value={cat_age}
            onChange={handleCatAgeChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className="form-control"
            id="cat_gender"
            name="cat_gender"
            value={cat_gender}
            onChange={handleCatGenderChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MyForm;
