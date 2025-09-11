export const validateSignupInput = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return {
      valid: false,
      message: "All fields are required",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: "Invalid email format",
    };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be atleast 6 characters",
    };
  }

  return { valid: true };
};
