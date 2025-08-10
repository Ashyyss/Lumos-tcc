function toggleSidebar() {
      document.getElementById("sidebar").classList.toggle("active");
    }

    // Carrega os dados salvos no localStorage
    window.onload = () => {
      const name = localStorage.getItem("name") || "Nome do Usuário";
      const username = localStorage.getItem("username") || "@usuario";
      const email = localStorage.getItem("email") || "email@exemplo.com";

      document.getElementById("profile-name").textContent = name;
      document.getElementById("profile-username").textContent = username;
      document.getElementById("profile-email").textContent = email;
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

    document.getElementById("edit-profile-form").addEventListener("submit", function(e) {
      e.preventDefault();
      localStorage.setItem("name", document.getElementById("name").value);
      localStorage.setItem("username", document.getElementById("username").value);
      localStorage.setItem("email", document.getElementById("email").value);
      // redireciona para a página de perfil
      window.location.href = "perfil.html";
    });

    function deleteAccount() {
      if (confirm("Tem certeza que deseja excluir sua conta?")) {
        localStorage.clear();
        const notification = document.getElementById("notification");
        notification.style.display = "block";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      }
    }