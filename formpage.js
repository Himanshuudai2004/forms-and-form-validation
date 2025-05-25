import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "San Francisco", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
};

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phoneCode: "+91",
  phoneNumber: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

function FormPage() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const valid = checkValidity(formData);
    setIsValid(valid);
  }, [formData]);

  const checkValidity = (data) => {
    return (
      data.firstName.trim() !== "" &&
      data.lastName.trim() !== "" &&
      data.username.trim() !== "" &&
      /^\S+@\S+\.\S+$/.test(data.email) &&
      data.password.trim() !== "" &&
      /^\d{10}$/.test(data.phoneNumber) &&
      data.country !== "" &&
      data.city !== "" &&
      /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan) &&
      /^\d{12}$/.test(data.aadhar)
    );
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First Name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last Name is required";
    if (!formData.username.trim()) errs.username = "Username is required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = "Valid email is required";
    if (!formData.password.trim()) errs.password = "Password is required";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) errs.phoneNumber = "10-digit number required";
    if (!formData.country) errs.country = "Country is required";
    if (!formData.city) errs.city = "City is required";
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) errs.pan = "Valid PAN format required";
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar)) errs.aadhar = "12-digit Aadhar required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset city if country changes
      ...(name === "country" && { city: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* First Name */}
        <label>First Name:</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}

        {/* Last Name */}
        <label>Last Name:</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}

        {/* Username */}
        <label>Username:</label>
        <input name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

        {/* Email */}
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        {/* Password */}
        <label>Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((s) => !s)}
          />
          Show Password
        </label>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        {/* Phone Number with country code */}
        <label>Phone Number:</label>
        <div style={{ display: "flex", gap: 8 }}>
          <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit number"
          />
        </div>
        {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}

        {/* Country */}
        <label>Country:</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countries).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}

        {/* City */}
        <label>City:</label>
        <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
          <option value="">Select City</option>
          {(countries[formData.country] || []).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}

        {/* PAN No. */}
        <label>PAN No.:</label>
        <input name="pan" value={formData.pan} onChange={handleChange} placeholder="ABCDE1234F" />
        {errors.pan && <p style={{ color: "red" }}>{errors.pan}</p>}

        {/* Aadhar No. */}
        <label>Aadhar No.:</label>
        <input name="aadhar" value={formData.aadhar} onChange={handleChange} placeholder="12-digit number" />
        {errors.aadhar && <p style={{ color: "red" }}>{errors.aadhar}</p>}

        <button type="submit" disabled={!isValid} style={{ marginTop: 20 }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;