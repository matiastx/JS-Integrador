const loginForm = document.querySelector(".loginForm");
const emailInput = document.querySelector("#email");
const passInput = document.querySelector("#pass");
const errorMsg = document.querySelector("#formError");

// trae Users del localStorage y graba en sessionStorage
const users = JSON.parse(localStorage.getItem("RitualUsers")) || [];

const saveUserOnSS = (user) => {
  sessionStorage.setItem("activeUser", JSON.stringify(user));
};

// ----------FUNCIONES  AUXILIARES----------
const isEmpty = (input) => {
  return !input.value.trim().length;
};
const showErrorMsg = (message) => {
  errorMsg.textContent = message;
};
const emailExist = () => {
  return users.some((user) => user.email === emailInput.value.trim());
};
const correctPass = () => {
  const user = users.find((user) => user.email === emailInput.value.trim());
  return user.pass === passInput.value.trim();
};

// ----------FUNCION DE VALIDACION----------
const validAcount = () => {
  let validAC = false;
  if (isEmpty(emailInput)) {
    showErrorMsg("Algun campo esta vacio, completelo porfavor");
    return;
  }
  if (isEmpty(passInput)) {
    showErrorMsg("Algun campo esta vacio, completelo porfavor");
    return;
  }
  if (!emailExist()) {
    showErrorMsg("El Email no es valido");
    return;
  }
  if (!correctPass()) {
    showErrorMsg("La contraseña no es correcta");
    return;
  }
  validAC = true;
  errorMsg.textContent = "";
  return validAC;
};

// ----------------LOGIN BTN----------------
const login = (e) => {
  e.preventDefault();
  console.log(emailInput.value.trim());
  console.log(passInput.value.trim());
  if (validAcount()) {
    const user = users.find((user) => user.email === emailInput.value.trim());
    console.log(user);
    saveUserOnSS(user);
    window.location.href = "../Pages/home.html";
  }
};
// ------------------INIT-------------------
const init = () => {
  loginForm.addEventListener("submit", login);
};

init();
