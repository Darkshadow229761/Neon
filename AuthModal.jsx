import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthModal({
  open,
  onClose,
  onSuccess
}) {
  const [mode, setMode] =
    useState("signup");

  const [step, setStep] =
    useState("email");

  const [email, setEmail] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  if (!open) return null;

  async function sendOtp(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Enter your email.");
      return;
    }

    if (
      mode === "signup" &&
      !username.trim()
    ) {
      setMessage("Enter a username.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } =
      await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser:
            mode === "signup",
          data:
            mode === "signup"
              ? {
                  username:
                    username.trim()
                }
              : undefined
        }
      });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setStep("otp");

    setMessage(
      "Check your email for the verification code."
    );
  }

  async function verifyOtp(event) {
    event.preventDefault();

    if (!otp.trim()) {
      setMessage("Enter the code.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } =
      await supabase.auth.verifyOtp({
        email:
          email.trim().toLowerCase(),
        token: otp.trim(),
        type: "email"
      });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!data.user) {
      setMessage(
        "Verification succeeded, but no user session was returned."
      );
      return;
    }

    onSuccess(data.user);
  }

  function reset() {
    setStep("email");
    setOtp("");
    setMessage("");
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={event => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section className="auth-modal">

        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="auth-brand">
          <span className="brand-orb" />
          NEXUS<span>PLAY</span>
        </div>

        {step === "email" ? (
          <>
            <div className="auth-switch">
              <button
                className={
                  mode === "login"
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setMode("login");
                  reset();
                }}
              >
                LOGIN
              </button>

              <button
                className={
                  mode === "signup"
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setMode("signup");
                  reset();
                }}
              >
                SIGN UP
              </button>
            </div>

            <h2>
              {mode === "signup"
                ? "Create your account."
                : "Welcome back."}
            </h2>

            <p className="muted">
              {mode === "signup"
                ? "Join the Nexus."
                : "Enter the Playverse."}
            </p>

            {mode === "signup" && (
              <input
                className="form-input"
                value={username}
                onChange={event =>
                  setUsername(
                    event.target.value
                  )
                }
                placeholder="Username"
                maxLength={24}
              />
            )}

            <input
              className="form-input"
              value={email}
              onChange={event =>
                setEmail(
                  event.target.value
                )
              }
              type="email"
              placeholder="Email address"
              autoComplete="email"
            />

            <button
              className="primary-button full"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading
                ? "SENDING..."
                : "SEND CODE →"}
            </button>
          </>
        ) : (
          <>
            <h2>Verify your email.</h2>

            <p className="muted">
              We sent a one-time code to:
              <br />
              <strong>{email}</strong>
            </p>

            <input
              className="form-input otp-input"
              value={otp}
              onChange={event =>
                setOtp(
                  event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              inputMode="numeric"
              placeholder="000000"
              maxLength={6}
            />

            <button
              className="primary-button full"
              disabled={loading}
              onClick={verifyOtp}
            >
              {loading
                ? "VERIFYING..."
                : "VERIFY CODE →"}
            </button>

            <button
              className="text-button"
              onClick={reset}
            >
              CHANGE EMAIL
            </button>
          </>
        )}

        {message && (
          <div className="auth-message">
            {message}
          </div>
        )}
      </section>
    </div>
  );
}
