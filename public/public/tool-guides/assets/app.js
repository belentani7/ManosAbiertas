const guideId=document.documentElement.dataset.guideId;
const checks=[...document.querySelectorAll('input[type="checkbox"]')];
try{const saved=JSON.parse(localStorage.getItem(guideId)||'[]');checks.forEach((item,index)=>item.checked=Boolean(saved[index]));}catch{}
checks.forEach(item=>item.addEventListener('change',()=>{try{localStorage.setItem(guideId,JSON.stringify(checks.map(check=>check.checked)));}catch{}}));
document.querySelector('[data-copy]')?.addEventListener('click',async()=>{const status=document.querySelector('.status');try{await navigator.clipboard.writeText(document.querySelector('code').textContent);status.textContent='Comprobacion copiada.';}catch{status.textContent='Selecciona el texto y copialo manualmente.';}});
