import React from "react";
import { X } from "lucide-react";

export function ProfileForm({ profile, onSave, onClose }) {
  const [firstName, setFirstName] = React.useState(profile.firstName || "");
  const [lastName, setLastName] = React.useState(profile.lastName || "");
  const [email, setEmail] = React.useState(profile.email || "");
  const [validationMessage, setValidationMessage] = React.useState("");

  React.useEffect(() => {
    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setEmail(profile.email || "");
    setValidationMessage("");
  }, [profile]);

  function isEmailValid(value) {
    return value.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setValidationMessage("First name and last name are required.");
      return;
    }

    if (!isEmailValid(email)) {
      setValidationMessage("Please enter a valid Gmail ID or leave it blank.");
      return;
    }

    onSave({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    });
  }

  return (
    <section className="profile-panel" aria-label="Profile form">
      <div className="profile-panel-header">
        <div>
          <p className="profile-panel-label">Profile</p>
          <h2>Update your details</h2>
        </div>

        <button
          type="button"
          className="profile-panel-close"
          aria-label="Close profile form"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First Name"
            required
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last Name"
            required
          />
        </label>

        <label>
          Gmail ID (optional)
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="example@gmail.com"
          />
        </label>

        <button type="submit">Save Profile</button>
        {validationMessage ? <p className="validation-message">{validationMessage}</p> : null}
      </form>
    </section>
  );
}
