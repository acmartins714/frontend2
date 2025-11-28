// 1. Selecionar o formulário e o botão
const formulario = document.getElementById('formulario-admin');
const botaoEnviar = document.getElementById('botao-login');
const dadosObjetoDiv = document.getElementById('dados-login');

// 2. Adicionar um "ouvinte de evento" (event listener) ao formulário para o evento de submissão
formulario.addEventListener('submit', function(evento) {
    
    evento.preventDefault(); 
    
    // 4. Capturar os valores dos campos usando seus IDs
    const emailCampo = document.getElementById('email').value;
    const senhaCampo = document.getElementById('senha').value;

    // 5. Gerar o objeto no formato solicitado
    let objLoginSenha = {
        email: emailCampo, 
        senha: senhaCampo
    };

    let loginValido = validarUsuario(objLoginSenha);
    
    if (loginValido === true) {
        localStorage.setItem("usuarioLogado", objLoginSenha.email)
        window.location.href = "mensagens.html";
    } else {
        alert("Falha no login - e-mail ou senha estão incorretos!");
    }
    
});