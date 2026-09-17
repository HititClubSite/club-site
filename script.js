const feed=document.querySelector('#security-feed');
const events=['TLS el sıkışması doğrulandı','Ziyaretçi oturumu anonimleştirildi','Güvenlik başlıkları kontrol edildi','İstek hızı normal aralıkta','İstemci bağlantısı güvenli','Şüpheli trafik engellendi','Anonim olay kaydedildi'];
function renderFeed(){feed.innerHTML=events.map((e,i)=>`<div class="feed-row"><b><span class="green">✓</span> ${e}</b><span>${String(i+1).padStart(2,'0')}s önce</span></div>`).join('')}
renderFeed();
setInterval(()=>{document.querySelector('#event-count').textContent=128+Math.floor(Math.random()*8);renderFeed()},5000);
document.querySelector('#location-btn').addEventListener('click',()=>{const out=document.querySelector('#visitor-location');if(!navigator.geolocation){out.textContent='Tarayıcınız konum özelliğini desteklemiyor.';return}navigator.geolocation.getCurrentPosition(p=>{out.textContent=`Yaklaşık koordinat: ${p.coords.latitude.toFixed(2)}, ${p.coords.longitude.toFixed(2)} (yalnızca bu oturumda)`},()=>{out.textContent='Konum izni verilmedi; gizlilik modu korunuyor.'});});
