const form = document.getElementById('formLogin');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // coleta de e-mail e senha
  const email = form.emailLogin.value;
  const senha = form.senhaLogin.value;

  // limpa mensagens de erro
  erroEmail.textContent = '';
  erroSenha.textContent = '';

  // verifica se os campos estão preenchidos
  if (email.trim() === '') {
    erroEmail.textContent = 'Por favor, preencha o e-mail.';
    return;
  }
  if (senha.trim() === '') {
    erroSenha.textContent = 'Por favor, preencha a senha.';
    return;
  }

  // função para carregar dados da API
  async function carregarDados() {
    try {
      const response = await fetch('https://blue-guardians-api-production.up.railway.app/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao carregar a API:", error);
      erroSenha.textContent = 'Erro ao conectar com o servidor.';
      return [];
    }
  }

  // função para verificar usuário
  async function verificaSeUsuarioExiste() {
    const users = await carregarDados();
    const user = users.find(u => u.email === email);

    if (!user) {
      erroSenha.textContent = 'Usuário não encontrado.';
      return;
    }

    if (user.password === senha) {
      console.log('Usuário encontrado');
      localStorage.setItem('nomeUsuario', user.name);
      localStorage.setItem('usuarioLogado', JSON.stringify(user));
      window.location.href = 'index.html';
    } else {
      erroSenha.textContent = 'Senha incorreta.';
    }
  }

  // executa verificação
  verificaSeUsuarioExiste();
});
