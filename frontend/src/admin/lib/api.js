// Tiny fetch wrapper: attaches the JWT, parses JSON, logs out on 401.

const TOKEN_KEY = "sifat_admin_token";
const USER_KEY = "sifat_admin_user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};
export const storeSession = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

async function request(path, { method = "GET", body, formData } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(path, {
    method,
    headers,
    body: formData ? formData : body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && !path.includes("/auth/login")) {
    clearSession();
    if (onUnauthorized) onUnauthorized();
    throw new Error("Sessiya muddati tugadi. Qaytadan kiring.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* empty body */
  }
  if (!res.ok) throw new Error(data?.error || data?.message || "So'rov bajarilmadi");
  if (data === null)
    throw new Error("Serverdan javob kelmadi. Backend ishlayotganini tekshiring.");
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  del: (path) => request(path, { method: "DELETE" }),
  upload: (file) => {
    const fd = new FormData();
    fd.append("image", file);
    return request("/api/upload", { method: "POST", formData: fd });
  },
};

export default api;
