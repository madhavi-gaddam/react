import React from "react";

export function ProfileModal({ isOpen, onClose, onSave, profile }) {
  const [formData, setFormData] = React.useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
  });

  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  React.useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
      });
    }
  }, [profile, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (formData.email && !/^[^\s@]+@gmail\.com$/i.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid Gmail ID";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
      });
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="profile-dropdown">
      <div className="profile-dropdown-header">
        <h3>Registration Form</h3>
        <button className="profile-dropdown-close" onClick={onClose} aria-label="Close">
          x
        </button>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Madhavi"
            className={errors.firstName && touched.firstName ? "input-error" : ""}
          />
          {errors.firstName && touched.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Gaddam"
            className={errors.lastName && touched.lastName ? "input-error" : ""}
          />
          {errors.lastName && touched.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Gmail ID (Optional)</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@gmail.com"
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="profile-dropdown-actions">
          <button type="button" className="dropdown-button cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="dropdown-button save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
