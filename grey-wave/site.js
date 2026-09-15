// Grey Wave — header behavior. The site is fully usable without this file.
(function(){
  var root=document.documentElement, btns=document.querySelectorAll('.sizer button');
  function apply(s){ if(s==='normal'){root.removeAttribute('data-size')}else{root.setAttribute('data-size',s)}
    btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.size===s))}); }
  try{ var saved=localStorage.getItem('gw-size'); if(saved) apply(saved); }catch(e){}
  btns.forEach(function(b){ b.addEventListener('click',function(){ apply(b.dataset.size); try{localStorage.setItem('gw-size',b.dataset.size)}catch(e){} }); });
  var mb=document.querySelector('.menu-btn'), nav=document.getElementById('nav');
  if(mb&&nav){
    mb.addEventListener('click',function(){ var open=nav.classList.toggle('open'); mb.setAttribute('aria-expanded',String(open)); mb.textContent=open?'Close':'Menu'; });
  }
})();
