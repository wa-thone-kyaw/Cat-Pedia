import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const containerStyle = {
    marginTop: "50px", // Adjust this value to add more or less space
  };

  const quoteStyle = {
    fontStyle: "italic",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  };

  const footerStyle = {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#6c757d", // Bootstrap's muted color
  };

  return (
    <div className="container" style={containerStyle}>
      <p style={quoteStyle}>
        Every cat has a story, and within that story, lies a lesson waiting to
        be learned.
      </p>
      <p style={footerStyle}>- Cat-Pedia</p>
    </div>
  );
};

export default Home;
