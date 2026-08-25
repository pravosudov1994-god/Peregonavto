// KIRILL AUTO v2 - Camry animation JS
document.addEventListener('DOMContentLoaded',()=>{
 const car=document.querySelector('.camry-animation .car');
 if(!car)return;
 document.addEventListener('mousemove',e=>{
  const x=(window.innerWidth/2-e.clientX)/80;
  car.style.marginLeft=x+'px';
 });
});
