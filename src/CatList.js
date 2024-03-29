import React, { useState, Fragment, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CatList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const fetchDataAsync = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/polls/cat_list");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const jsonData = await response.json();
      console.log("fetched data", jsonData);
      setData(jsonData.cats);
      console.log("Fetched data", response.jsonData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const handleEditClick = (data) => {
    console.log("Edit Clicked for", data._id);
    // Implement edit functionality
    setEditCat(data._id);
  };
  const [editCat, setEditCat] = useState(null);
  const handleEditForm = (event, fieldName, contactId) => {
    const updatedData = data.map((cat) => {
      if (cat._id === contactId) {
        return {
          ...cat,
          [fieldName]: event.target.value,
        };
      }
      return cat;
    });

    setData(updatedData);
  };
  const handleEditFormSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const updateData = {
        cat_name: data.find((cat) => cat._id === editCat).cat_name,
        cat_age: data.find((cat) => cat._id === editCat).cat_age,
        cat_gender: data.find((cat) => cat._id === editCat).cat_gender,
      };

      const response = await fetch(
        `http://127.0.0.1:8000/polls/update_cat_info/${editCat}`,
        {
          method: "PATCH",
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        const updatedData = data.map((cat) =>
          cat._id === editCat
            ? {
                ...cat,
                cat_name: updateData.cat_name,
                cat_age: updateData.cat_age,
                cat_gender: updateData.cat_gender,
              }
            : cat
        );
        setData(updatedData);
        setEditCat(null);
      } else {
        console.error("Error editing Cat");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Function to handle delete button click
  const handleDeleteClick = async (cat) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/polls/delete_cat_info/${cat}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updateData = data.filter((cat) => cat._id !== cat);
        setData(updateData);
        toast.success("Complete");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error while deleting item", error);
    }
  };
  return (
    <div>
      <h1>Cat List</h1>
      <form onSubmit={handleEditFormSubmit1}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={thStyle}>Id</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cat, index) => (
              <Fragment key={index}>
                <tr>
                  <td style={tableCellStyle}>{cat._id}</td>
                  <td>
                    {editCat === cat._id ? (
                      <input
                        type="text"
                        value={cat.cat_name}
                        onChange={(e) => handleEditForm(e, "cat_name", cat._id)}
                      />
                    ) : (
                      cat.cat_name
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editCat === cat._id ? (
                      <input
                        type="text"
                        value={cat.cat_age}
                        onChange={(e) => handleEditForm(e, "cat_age", cat._id)}
                      />
                    ) : (
                      cat.cat_age
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editCat === cat._id ? (
                      <input
                        type="text"
                        value={cat.cat_gender}
                        onChange={(e) =>
                          handleEditForm(e, "cat_gender", cat._id)
                        }
                      />
                    ) : (
                      cat.cat_gender
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editCat === cat._id ? (
                      <button
                        className="btn btn-success btn-lg"
                        onClick={handleEditFormSubmit1}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          style={buttonStyle}
                          onClick={() => handleDeleteClick(cat._id)}
                        >
                          Delete
                        </button>
                        <button
                          style={buttonStyle}
                          onClick={() => handleEditClick(cat)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <ToastContainer />
    </div>
  );
};
const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};
const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#f2f2f2", // Gray background color
};
const buttonStyle = {
  padding: "8px 16px", // Adjust padding for button size
  backgroundColor: "#f2f2f2", // Gray background color
  border: "1px solid #ddd",
  borderRadius: "4px",
  cursor: "pointer",
};

export default CatList;
