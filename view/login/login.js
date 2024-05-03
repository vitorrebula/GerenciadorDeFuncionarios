const email = document.getElementById('email');
const password = document.getElementById('password');
const url = 'http://localhost:8080/admin/1';
const btn = document.getElementById('btn');
document.getElementById("email").focus();


function limpaPassword(){
    document.getElementById("password").value = "";
}

// Função para mudar o foco para o próximo campo ao pressionar Enter
function changeFocusOnEnter(event) {
    if (event.keyCode === 13) { // Verifica se a tecla pressionada é Enter (código 13)
      event.preventDefault(); // Impede o comportamento padrão do Enter (submit do formulário)
      var campos = document.getElementsByTagName("input");
      for (var i = 0; i < campos.length; i++) {
        if (campos[i] === document.activeElement) { // Encontra o campo atualmente focado
          if (i === campos.length - 1) { // Se for o último campo, aperta o botao
            document.getElementById("btn").click();
            campos[0].focus();
          } else { // Caso contrário, mude para o próximo campo
            campos[i + 1].focus();
          }
          break;
        }
      }
    }
  }
  
// Adiciona um ouvinte de evento para a tecla pressionada
document.addEventListener("keydown", changeFocusOnEnter);

btn.addEventListener('click', function(){
    if(email.value === '' || password.value === ''){
        window.alert("Preencha todos os campos");
    }
    else{
        onLoader();
        getAPI(url);
    }

});


function onLoader(){
    document.getElementById("loading").style.display = "flex";
}

function offLoader(){
    document.getElementById("loading").style.display = "none";
}

function verifica(admin){
    if(admin.email === email.value && admin.password === password.value){
        window.location.href = "../Funcionarios/index.html";
    }
    else{
        document.getElementsByClassName("erroSenha")[0].style.display = "block";
        limpaPassword();
    }
}

async function getAPI(url){
    const response = await fetch(url,{method: 'GET'});
    const admin = await response.json();
    if(response.status !== 200){
        offLoader();
        limpaPassword();
        throw new Error("Não foi possível acessar a API");
    }
    
    offLoader();
    verifica(admin);
}







