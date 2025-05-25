import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    // No data, redirect to form
    navigate("/");
    return null;
  }

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Registration Successful!</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
}

export default SuccessPage;
