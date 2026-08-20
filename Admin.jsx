import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);

    const {
      data,
      error
    } = await supabase
      .from("profiles")
      .select(
        "id, username, role, created_at"
      )
      .order(
        "created_at",
        { ascending: false }
      );

    if (error) {
      setError(error.message);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  }

  return (
    <section className="admin-page">

      <span className="eyebrow">
        03 / CONTROL
      </span>

      <h1>ADMIN CENTER</h1>

      <p className="muted">
        Manage NexusPlay users.
      </p>

      <div className="admin-panel">

        <div className="admin-panel-head">
          <strong>
            USERS
          </strong>

          <span>
            {users.length} ACCOUNTS
          </span>
        </div>

        {loading && (
          <div className="empty-state">
            LOADING...
          </div>
        )}

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          users.map(user => (
            <div
              className="user-row"
              key={user.id}
            >
              <div>
                <strong>
                  {user.username ||
                    "Unnamed Player"}
                </strong>

                <small>
                  {new Date(
                    user.created_at
                  ).toLocaleDateString()}
                </small>
              </div>

              <span
                className={
                  user.role === "admin"
                    ? "role-admin"
                    : "role-player"
                }
              >
                {user.role}
              </span>
            </div>
          ))}

      </div>
    </section>
  );
}
