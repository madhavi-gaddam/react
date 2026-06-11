import React from "react";
import axios from "axios";

export function ProfilesPage() {
  const [profiles, setProfiles] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        setProfiles(response.data.users || []);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage("Profiles could not be loaded.");
        setIsLoading(false);
      });
  }, []);

  const filteredProfiles = profiles.filter((profile) => {
    const search = searchText.toLowerCase();
    const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();

    return (
      fullName.includes(search) ||
      profile.email.toLowerCase().includes(search) ||
      profile.company.name.toLowerCase().includes(search)
    );
  });

  return (
    <section className="profiles-page">
      <div className="profiles-header">
        <div>
          <p className="profiles-kicker">Profiles</p>
          <h1>User Profiles</h1>
        </div>

        <span className="profiles-count">{filteredProfiles.length} users</span>
      </div>

      <label className="search-box profiles-search">
        <span>Search</span>
        <input
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search Profiles"
          type="search"
          value={searchText}
        />
      </label>

      {isLoading && <div className="profiles-state">Loading profiles...</div>}
      {errorMessage && <div className="profiles-state error">{errorMessage}</div>}

      {!isLoading && !errorMessage && (
        <div className="profiles-grid">
          {filteredProfiles.map((profile) => (
            <article className="profile-card" key={profile.id}>
              <img
                alt={`${profile.firstName} ${profile.lastName}`}
                className="profile-image"
                src={profile.image}
              />

              <div className="profile-info">
                <h2>
                  {profile.firstName} {profile.lastName}
                </h2>
                <p>{profile.email}</p>
                <p>{profile.phone}</p>

                <div className="profile-details">
                  <span>Age: {profile.age}</span>
                  <span>{profile.gender}</span>
                </div>

                <div className="profile-company">
                  <strong>{profile.company.name}</strong>
                  <span>{profile.company.title}</span>
                </div>

                <p>
                  {profile.address.city}, {profile.address.state}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {!isLoading && !errorMessage && filteredProfiles.length === 0 && (
        <div className="profiles-state">No profiles found</div>
      )}
    </section>
  );
}
