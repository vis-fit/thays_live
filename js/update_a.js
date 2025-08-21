const gifts = [
  {id:1,label:"Tiktok Universo",img:"../images/galery_a/universo.png"},
  {id:2,label:"Leão",img:"../images/galery_a/leao.png"},
  {id:3,label:"Festa Sem Parar",img:"../images/galery_a/festa.png"},
  {id:4,label:"Planeta Maravilhoso",img:"../images/galery_a/planeta.png"},
  {id:5,label:"Trabalhe Muito e Sorria",img:"../images/galery_a/trabalhe muito.png"},
  {id:6,label:"Jatos Voadores",img:"../images/galery_a/jatos.png"},
  {id:7,label:"Leon",img:"../images/galery_a/leon.png"},
  {id:8,label:"Mergulho com Baleias",img:"../images/galery_a/mergulho_baleias.png"},
  {id:9,label:"Fogos de Artificio",img:"../images/galery_a/fogos.png"},
  {id:10,label:"Galáxia",img:"../images/galery_a/galaxia.png"},
  {id:11,label:"Pistola de Dinheiro",img:"../images/galery_a/pistola.png"},
  {id:12,label:"Rosa Para Sempre",img:"../images/galery_a/rosa_grande.png"},
  {id:13,label:"Corgi",img:"../images/galery_a/corgi.png"},
  {id:14,label:"Corações",img:"../images/galery_a/coracoes.png"},
  {id:15,label:"Mão Com Coração",img:"../images/galery_a/mão_coracao.png"},
  {id:16,label:"Chapéu e Bigode",img:"../images/galery_a/chapeu.png"},
  {id:17,label:"Rosquinha",img:"../images/galery_a/rosquinha.png"},
  {id:18,label:"Rosa",img:"../images/galery_a/rosa.png"},
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
  window.open("galery_a.html","_blank");
});
