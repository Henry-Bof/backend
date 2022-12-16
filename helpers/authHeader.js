function authHeader() {
  const token = localStorage.getItem("accessToken");
  if (token != null) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
