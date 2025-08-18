// Dados das turmas
let turmas = JSON.parse(localStorage.getItem('turmas')) || [];

// Elementos
const cardsContainer = document.querySelector('.cards');
const btnCriarTurma = document.querySelector('.btn-criar');
const modal = document.getElementById('modal-nova-turma');
const btnFecharModal = document.getElementById('fecharModal');
const btnSalvarTurma = document.getElementById('criarTurma');
const nomeTurmaInput = document.getElementById('nomeTurma');
const corTurmaInput = document.getElementById('corTurma');

// Renderiza os cards
function renderizarTurmas() {
  cardsContainer.innerHTML = '';
  turmas.forEach((turma, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundColor = turma.cor;

    card.innerHTML = `
      <div class="card-header">
        <h3>${turma.nome}</h3>
        <button class="options">⋮</button>
        <ul class="dropdown">
          <li onclick="editarTurma(${index})">Editar</li>
          <li onclick="copiarTurma(${index})">Copiar</li>
          <li onclick="convidarTurma(${index})">Convite</li>
          <li onclick="excluirTurma(${index})">Excluir</li>
        </ul>
      </div>
      <div class="card-icon">📘</div>
    `;

    cardsContainer.appendChild(card);
  });

  configurarDropdowns();
}

// Dropdowns
function configurarDropdowns() {
  document.querySelectorAll('.options').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
      dropdown.style.display = 'block';
    };
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
  });
}

// Abrir/fechar modal
btnCriarTurma.onclick = () => modal.classList.remove('hidden');
btnFecharModal.onclick = () => modal.classList.add('hidden');

// Criar nova turma
btnSalvarTurma.onclick = () => {
  const nome = nomeTurmaInput.value.trim();
  const area = document.getElementById('areaTurma').value;

  if (!nome || area === "Selecione uma área") {
    alert("Preencha todos os campos!");
    return;
  }

  const cor = area === "Linguagens" ? "#eeb2c0" :
              area === "Matemática" ? "#a4ccd8" :
              area === "Ciências Humanas" ? "#c1b2e8" :
              "#c8e6c9"; // Ciências da Natureza

  turmas.push({ nome, cor, area, tarefas: [] });
  localStorage.setItem('turmas', JSON.stringify(turmas));
  renderizarTurmas();

  modal.classList.add('hidden');
  nomeTurmaInput.value = '';
  document.getElementById('areaTurma').selectedIndex = 0;
};


// Ações dos cards
window.editarTurma = (i) => {
  const novoNome = prompt("Novo nome da turma:", turmas[i].nome);
  if (novoNome) {
    turmas[i].nome = novoNome;
    salvar();
  }
};

window.copiarTurma = (i) => {
  const copia = { ...turmas[i], nome: turmas[i].nome + " (Cópia)" };
  turmas.push(copia);
  salvar();
};

window.convidarTurma = (i) => {
  alert(`Link de convite para "${turmas[i].nome}" copiado!`);
};

window.excluirTurma = (i) => {
  if (confirm(`Tem certeza que deseja excluir "${turmas[i].nome}"?`)) {
    turmas.splice(i, 1);
    salvar();
  }
};

function salvar() {
  localStorage.setItem('turmas', JSON.stringify(turmas));
  renderizarTurmas();
}

renderizarTurmas();
