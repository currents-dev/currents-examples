const DEMO_EMAIL = "ana@northwind.test";
const DEMO_PASSWORD = "correct-horse";
const SIGN_IN_DELAY_MS = 600;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formStatus = document.getElementById("form-status");
const toggle = document.getElementById("toggle-password");
const signIn = document.getElementById("sign-in");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function emailMessage() {
  const value = email.value.trim();
  if (!value) return "Enter your email";
  if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address";
  return "";
}

function passwordMessage() {
  return password.value.length < 8
    ? "Password must be at least 8 characters"
    : "";
}

function showFieldError(input, errorEl, message) {
  errorEl.textContent = message;
  input.setAttribute("aria-invalid", String(Boolean(message)));
}

function validate() {
  const emailText = emailMessage();
  const passwordText = passwordMessage();
  showFieldError(email, emailError, emailText);
  showFieldError(password, passwordError, passwordText);
  return !emailText && !passwordText;
}

function setSigningIn(busy) {
  signIn.disabled = busy;
  signIn.textContent = busy ? "Signing in…" : "Sign in";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!validate()) {
    (emailMessage() ? email : password).focus();
    return;
  }

  setSigningIn(true);
  await wait(SIGN_IN_DELAY_MS);

  const matches =
    email.value.trim().toLowerCase() === DEMO_EMAIL &&
    password.value === DEMO_PASSWORD;
  if (matches) {
    location.href = "index.html?welcome=ana";
    return;
  }

  setSigningIn(false);
  formStatus.textContent = "Email or password is incorrect";
  password.focus();
});

email.addEventListener("input", () => {
  if (email.getAttribute("aria-invalid") === "true") validate();
});

password.addEventListener("input", () => {
  if (password.getAttribute("aria-invalid") === "true") validate();
});

toggle.addEventListener("click", () => {
  const showing = password.type === "text";
  password.type = showing ? "password" : "text";
  toggle.textContent = showing ? "Show" : "Hide";
  toggle.setAttribute("aria-pressed", String(!showing));
});
