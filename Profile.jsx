import { supabase } from "../lib/supabase";

export default function Profile({
  user,
  profile,
  setAuthOpen
}) {
  if (!user) {
    return (
      <section className="center-page">
        <h1>PLAYER PROFILE</h1>

        <p>
          Sign in to access your profile.
        </p>

        <button
          className="primary-button"
          onClick={() => setAuthOpen(true)}
        >
          SIGN IN →
        </button>
      </section>
    );
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <section className="profile-page">

      <span className="eyebrow">
        PLAYER / PROFILE
      </span>

      <h1>
        {profile?.username ||
          user.email?.split("@")[0]}
      </h1>

      <div className="profile-grid">

        <div className="profile-card">
          <span>EMAIL</span>
          <strong>{user.email}</strong>
        </div>

        <div className="profile-card">
          <span>ROLE</span>
          <strong>
            {profile?.role || "player"}
          </strong>
        </div>

        <div className="profile-card">
          <span>ACCOUNT</span>
          <strong>VERIFIED</strong>
        </div>

      </div>

      <button
        className="secondary-button"
        onClick={logout}
      >
        LOG OUT
      </button>

    </section>
  );
}
