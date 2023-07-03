const registerForm = document.querySelector(".registerFrom");
const nameInput = document.querySelector("#name");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const passInput = document.querySelector("#password");
const phoneInput = document.querySelector("#phone");

// Variable users y Grabar en LocalStorage
const users = JSON.parse(localStorage.getItem("RitualUsers")) || [];
const saveUsersToLS = () => {
  localStorage.setItem("RitualUsers", JSON.stringify(users));
};

// ----------FUNCIONES  AUXILIARES----------

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const charsLengthOK = (input, minChars, maxChars) => {
  return input.value.length >= minChars && input.value.length <= maxChars;
};

const showImputError = (input, message) => {
  const inputContainer = input.parentElement;
  inputContainer.classList.remove("success");
  inputContainer.classList.add("error");
  const errorMsg = inputContainer.querySelector("small");
  errorMsg.style.display = "block";
  errorMsg.textContent = message;
};

const showImputSuccess = (input) => {
  const inputParent = input.parentElement;
  inputParent.classList.remove("error");
  inputParent.classList.add("success");
  const errorMsg = inputParent.querySelector("small");
  errorMsg.style.display = "";
  errorMsg.textContent = "";
};

const registeredEmail = (input) => {
  return users.some((user) => user.email === input.value.trim());
};

// -----------REGULAR EXPRESIONS----------

const validEmail = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};

const validPass = (input) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
  return re.test(input.value.trim());
};

const validPhone = (input) => {
  const re = /^[0-9]{10}$/;
  return re.test(input.value.trim());
};

// ----------FUNCIONES  VALIDACION----------

// chequea el input Name y Last Name
const checkNames = (input) => {
  let valid = false;
  const minChars = 4;
  const maxChars = 20;
  // chequear si el imput esta vacio
  if (isEmpty(input)) {
    showImputError(input, "El campo es obligatorio");
    return;
  }
  // chequea si no es correcta la cantidad de caracteres
  if (!charsLengthOK(input, minChars, maxChars)) {
    showImputError(
      input,
      `El campo requiere un entre ${minChars} y ${maxChars} caracteres`
    );
    return;
  }
  showImputSuccess(input);
  valid = true;
  return valid;
};
// chequea el input Email
const checkEmail = (input) => {
  let valid = false;
  // chequear si el imput esta vacio
  if (isEmpty(input)) {
    showImputError(input, "El campo es obligatorio");
    return;
  }
  if (!validEmail(input)) {
    showImputError(input, "El ingreso no es un email valido");
    return;
  }
  if (registeredEmail(input)) {
    showImputError(input, "El email ya esta registrado");
    return;
  }
  showImputSuccess(input);
  valid = true;
  return valid;
};
// chequea el input Password
const checkPass = (input) => {
  let valid = false;
  // chequear si el imput esta vacio
  if (isEmpty(input)) {
    showImputError(input, "El campo es obligatorio");
    return;
  }
  if (!validPass(input)) {
    showImputError(
      input,
      "La contraseña debe tener una mayuscula, una minuscua, un numero, un sibolo y 6 caracteres como minimo"
    );
    return;
  }
  showImputSuccess(input);
  valid = true;
  return valid;
};
// chequea el input Phone
const checkPhone = (input) => {
  let valid = false;
  // chequear si el imput esta vacio
  if (isEmpty(input)) {
    showImputError(input, "El campo es obligatorio");
    return;
  }
  if (!validPhone(input)) {
    showImputError(input, "El telefono solo puede contener 10 números");
    return;
  }
  showImputSuccess(input);
  valid = true;
  return valid;
};
// valida que todos los input sean verdaderos
const checkInputs = (name, lastname, email, pass, phone) => {
  let regState = false;
  if (name && lastname && email && pass && phone) {
    return (regState = true);
  }
};

// --------------REGISTER BTN-------------
const register = (e) => {
  e.preventDefault();
  let name = checkNames(nameInput);
  let lastName = checkNames(lastNameInput);
  let email = checkEmail(emailInput);
  let pass = checkPass(passInput);
  let phone = checkPhone(phoneInput);
  console.log(e);
  if (checkInputs(name, lastName, email, pass, phone)) {
    users.push({
      name: nameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      pass: passInput.value.trim(),
      phone: phoneInput.value.trim(),
    });
    saveUsersToLS();
    alert("Registro Exitoso!");
    window.location.href = "../Pages/login.html";
  }
};

// ------------------INIT------------------
const init = () => {
  registerForm.addEventListener("submit", register);
  nameInput.addEventListener("input", () => checkNames(nameInput));
  lastNameInput.addEventListener("input", () => checkNames(lastNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  passInput.addEventListener("input", () => checkPass(passInput));
  phoneInput.addEventListener("input", () => checkPhone(phoneInput));
};

init();
