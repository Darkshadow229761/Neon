import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

import Navbar from "./components/Navbar";
import OrbBackground from "./components/OrbBackground";
import AuthModal from "./components/AuthModal";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadProfile(currentUser) {
    if (!currentUser) {
      setProfile(null);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", currentUser.id)
      .maybeSingle();

    setProfile(data || null);
  }

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!mounted) return;

      const currentUser =
        session?.user || null;

      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser);
      }

      setLoading(false);
    }

    initialize();

    const {
      data: listener
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser =
          session?.user || null;

        setUser(currentUser);

        if (currentUser) {
          await loadProfile(currentUser);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    setUser(null);
    setProfile(null);
    setPage("home");
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader-orb" />
        <p>INITIALIZING NEXUS...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <OrbBackground />

      <Navbar
        page={page}
        setPage={setPage}
        user={user}
        profile={profile}
        onAuth={() => setAuthOpen(true)}
        onLogout={logout}
      />

      <main>
        {page === "home" && (
          <Home
            setPage={setPage}
            user={user}
            profile={profile}
          />
        )}

        {page === "games" && (
          <Games user={user} />
        )}

        {page === "profile" && (
          <Profile
            user={user}
            profile={profile}
            setAuthOpen={setAuthOpen}
          />
        )}

        {page === "admin" &&
          profile?.role === "admin" && (
            <Admin />
          )}
      </main>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={async currentUser => {
          setUser(currentUser);
          await loadProfile(currentUser);
          setAuthOpen(false);
        }}
      />
    </div>
  );
}
