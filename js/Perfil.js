const defaultProfilePic = "images/Perfil/fotodeusuario1.png";

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

window.onload = () => {
  const name = localStorage.getItem("name") || "Nome do Usuário";
  const username = localStorage.getItem("username") || "@usuario";
  const email = localStorage.getItem("email") || "email@exemplo.com";
  const savedImage = localStorage.getItem("profilePic") || defaultProfilePic;

  document.getElementById("profile-name").textContent = name;
  document.getElementById("profile-username").textContent = username;
  document.getElementById("profile-email").textContent = email;
  document.getElementById("profile-image-display").src = savedImage;
};


function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

window.onload = () => {
  document.getElementById("name").value = localStorage.getItem("name") || "";
  document.getElementById("username").value = localStorage.getItem("username") || "";
  document.getElementById("email").value = localStorage.getItem("email") || "";

  const savedImage = localStorage.getItem("profilePic");
  if (savedImage) {
    document.getElementById("profile-pic").src = savedImage;
  }
};

document.getElementById("profile-pic-input").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgData = e.target.result;
      document.getElementById("profile-pic").src = imgData;
      localStorage.setItem("profilePic", imgData);
    }
    reader.readAsDataURL(file);
  }
});

function deleteProfilePic() {
  localStorage.removeItem("profilePic");
  document.getElementById("profile-pic").src = defaultProfilePic;
}

document.getElementById("edit-profile-form").addEventListener("submit", function(e) {
  e.preventDefault();
  localStorage.setItem("name", document.getElementById("name").value);
  localStorage.setItem("username", document.getElementById("username").value);
  localStorage.setItem("email", document.getElementById("email").value);
  window.location.href = "Perfil.html";
});

function deleteAccount() {
  if (confirm("Tem certeza que deseja excluir sua conta? Todos os seus dados serão perdidos.")) {
    localStorage.clear();
    const notification = document.getElementById("notification");
    notification.style.display = "block";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }
}
