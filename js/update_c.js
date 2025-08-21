const gifts = [
  {id:1,label:"Mergulho com baleias",img:"../images/galery_c/baleias.png"},
  {id:2,label:"Galáxia",img:"../images/galery_c/galaxia.png"},
  {id:3,label:"Dj Óculos",img:"../images/galery_c/dj_oculos.png"},
  {id:4,label:"Pistola de dinheiro",img:"../images/galery_c/pistola.png"},
  {id:5,label:"Corgi",img:"../images/galery_c/corgi.png"},
  {id:6,label:"Coracoes",img:"../images/galery_c/coracoes.png"},
  {id:7,label:"Mão com coração",img:"../images/galery_c/mao_coracao.png"},
  {id:8,label:"Chapéu e bigode",img:"../images/galery_c/chapeu.png"},
  {id:9,label:"Rosquinha",img:"../images/galery_c/rosquinha.png"},
  {id:10,label:"Rosa Grande",img:"../images/galery_c/big_rosa.png"},
  {id:11,label:"Mãos fazendo coração",img:"../images/galery_c/fazendo_coracao.png"},
  {id:12,label:"Rosa",img:"../images/galery_c/rosa.png"},
];

const container = document.querySelector(".blocos-container");

// cria blocos
gifts.forEach(g => {
  const block = document.createElement("div");
  block.classList.add("gift-block");
  block.dataset.id = g.id;

  block.innerHTML = `
    <label>${g.label}</label>
    <img src="${g.img}" class="gift-img">
    <input type="text" class="gifter" placeholder="@gifter" disabled>
    <input type="text" class="foto" placeholder="Foto do Gifter" disabled>
  `;

  block.addEventListener("click", e => {
    if(e.target.tagName === "INPUT") return; // não marca ao clicar nos inputs

    block.classList.toggle("selected");
    const gifter = block.querySelector(".gifter");
    const foto = block.querySelector(".foto");

    if(block.classList.contains("selected")) {
      gifter.disabled = false;
      foto.disabled = false;
    } else {
      gifter.value = "";
      foto.value = "";
      gifter.disabled = true;
      foto.disabled = true;
      removeFromStorage(g.id);
    }
    saveState();
  });

  container.appendChild(block);
});

// salva no localStorage
function saveState(){
  let data = [];
  document.querySelectorAll(".gift-block.selected").forEach(block=>{
    data.push({
      id: block.dataset.id,
      label: block.querySelector("label").textContent,
      img: block.querySelector("img").src,
      gifter: block.querySelector(".gifter").value,
      foto: block.querySelector(".foto").value
    });
  });
  localStorage.setItem("selectedGifts", JSON.stringify(data));
}

// remove item do storage
function removeFromStorage(id){
  let data = JSON.parse(localStorage.getItem("selectedGifts")) || [];
  data = data.filter(d=> d.id != id);
  localStorage.setItem("selectedGifts", JSON.stringify(data));
}

// restaurar do localStorage
window.addEventListener("DOMContentLoaded", ()=>{
  const saved = JSON.parse(localStorage.getItem("selectedGifts")) || [];
  saved.forEach(s=>{
    const block = document.querySelector(`.gift-block[data-id='${s.id}']`);
    if(block){
      block.classList.add("selected");
      const gifter = block.querySelector(".gifter");
      const foto = block.querySelector(".foto");
      gifter.disabled = false;
      foto.disabled = false;
      gifter.value = s.gifter;
      foto.value = s.foto;
    }
  });
});

// desmarcar todos
document.getElementById("uncheckAll").addEventListener("click", ()=>{
  document.querySelectorAll(".gift-block.selected").forEach(block=>{
    block.classList.remove("selected");
    block.querySelector(".gifter").value="";
    block.querySelector(".foto").value="";
    block.querySelector(".gifter").disabled=true;
    block.querySelector(".foto").disabled=true;
  });
  localStorage.removeItem("selectedGifts");
});

// atualizar -> abre galeria
document.getElementById("updateBtn").addEventListener("click", ()=>{
  saveState();
  window.open("galery_c.html","_blank");
});
