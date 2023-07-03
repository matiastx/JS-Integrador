const btnExit = document.querySelector(".logoutBtn");
const UserName = document.querySelector(".userName");

const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

const logout = () => {
  if (window.confirm("Seguro que quieres salir?")) {
    sessionStorage.removeItem("activeUser");
    window.location.href = "../../index.html";
  }
};

const showUserName = () => {
  UserName.textContent = ` ${activeUser.name.toUpperCase()}`;
};

(() => {
  if (!activeUser) {
    window.location.href = "../../index.html";
  }
})();

const homeInit = () => {
  showUserName();
  btnExit.addEventListener("click", logout);
};

homeInit();
