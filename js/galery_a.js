const container = document.getElementById("container");
const galleryTrack = document.getElementById("gallery-track");

// carregar presentes
const gifts = JSON.parse(localStorage.getItem("selectedGifts")) || [];

// criar blocos
gifts.sort((a,b)=> a.id-b.id).forEach(g=>{
  const block = document.createElement("div");
  block.classList.add("gallery-block");
  block.innerHTML=`
    <div class="image-container">
      <div class="image-frame">
        <img src="${g.img}">
        <div class="light-overlay"></div>
        <div class="light-sweep"></div>
      </div>
    </div>
    <div class="text-container">
      <div class="username">${g.gifter}</div>
    </div>
    <div class="profile-container">
      <div class="profile-picture">
        <img src="${g.foto}" onerror="this.style.display='none'">
      </div>
    </div>
  `;
  galleryTrack.appendChild(block);
});

// mover blocos em loop
let pos = window.innerWidth;
function animate(){
  pos-=2;
  galleryTrack.style.transform=`translateX(${pos}px)`;
  if(pos <= -galleryTrack.scrollWidth){
    pos=window.innerWidth;
  }
  requestAnimationFrame(animate);
}
animate();

// títulos alternando
setInterval(()=>{
  document.getElementById("titulo1").classList.toggle("hidden");
  document.getElementById("titulo2").classList.toggle("hidden");
},20000);

// fundo
document.getElementById("changeBg").addEventListener("click", ()=>{
  const input = document.createElement("input");
  input.type="file";
  input.accept="image/*,video/*";
  input.onchange = e=>{
    const file = e.target.files[0];
    if(file){
      const url = URL.createObjectURL(file);
      //Ajuste
      /*container.style.background=`url(${url}) center/cover no-repeat`;
      localStorage.setItem("galeryBg", url);*/
      const bgVideo = document.getElementById("bgVideo");
      if(file.type.startsWith("video/")){
        // fundo em vídeo
        bgVideo.src = url;
        bgVideo.classList.remove("hidden");
        container.style.background = "none";
        localStorage.setItem("galeryBgType", "video");
        localStorage.setItem("galeryBg", url);
      } else {
        // fundo em imagem
        container.style.background=`url(${url}) center/cover no-repeat`;
        bgVideo.classList.add("hidden");
        localStorage.setItem("galeryBgType", "image");
        localStorage.setItem("galeryBg", url);
      }
      //Fim Ajuste
    }
  }
  input.click();
});

document.getElementById("resetBg").addEventListener("click", ()=>{
  localStorage.removeItem("galeryBg");
  container.style.background="linear-gradient(to bottom, #111, #000)";
});

// restaurar fundoo
window.addEventListener("DOMContentLoaded", ()=>{
  //Ajuste
  /*const bg = localStorage.getItem("galeryBg");
  if(bg){
    container.style.background=`url(${bg}) center/cover no-repeat`;
  }*/
  const bg = localStorage.getItem("galeryBg");
  const type = localStorage.getItem("galeryBgType");
  if(bg){
    if(type === "video"){
      bgVideo.src = bg;
      bgVideo.classList.remove("hidden");
      container.style.background = "none";
    } else {
      container.style.background=`url(${bg}) center/cover no-repeat`;
      bgVideo.classList.add("hidden");
    }
  }
  //Fim Ajuste
});
