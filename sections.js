(() => {
  const site=document.querySelector('.site'),panels=[...document.querySelectorAll('[data-slide]')],menu=[...document.querySelectorAll('.nav-link')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const stage=document.createElement('div');stage.className='slide-stage';stage.setAttribute('aria-label','Portfolio sections');
  const main=document.querySelector('main');main.before(stage);
  panels.forEach(p=>{p.classList.add('slide-panel');p.tabIndex=-1;stage.append(p);p.hidden=true;p.inert=true;});main.remove();
  let current=Math.max(0,panels.findIndex(p=>'#'+p.id===location.hash)),busy=false,wheelSum=0,lastWheel=0,gestureUsed=false;
  const sync=()=>{site.dataset.activeSection=panels[current].id;menu.forEach(a=>{if(a.hash==='#'+panels[current].id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});};
  panels[current].hidden=false;panels[current].inert=false;
  const show=async(index,updateURL=true,focus=false)=>{
    if(busy||index<0||index>=panels.length||index===current)return;
    busy=true;wheelSum=0;
    const old=panels[current],incoming=panels[index],direction=index>current?1:-1,hadFocus=old.contains(document.activeElement);
    old.inert=true;incoming.hidden=false;incoming.inert=true;incoming.scrollTop=0;incoming.style.zIndex='2';
    const options={duration:reduced.matches?0:680,easing:'cubic-bezier(.22,.68,0,1)',fill:'both'};
    const animations=[old.animate([{transform:'translateY(0)',opacity:1},{transform:`translateY(${-direction*100}%)`,opacity:.15}],options),incoming.animate([{transform:`translateY(${direction*100}%)`,opacity:.15},{transform:'translateY(0)',opacity:1}],options)];
    await Promise.all(animations.map(a=>a.finished.catch(()=>{})));old.hidden=true;animations.forEach(a=>a.cancel());incoming.style.zIndex='';incoming.inert=false;current=index;busy=false;
    if(updateURL)history.pushState(null,'','#'+incoming.id);sync();if(focus||hadFocus)incoming.focus({preventScroll:true});
  };
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.hash==='#top'?'featured':a.hash.slice(1),i=panels.findIndex(p=>p.id===id);if(i<0)return;e.preventDefault();show(i,true,true);});
  addEventListener('hashchange',()=>{const i=panels.findIndex(p=>'#'+p.id===location.hash);if(i>=0)show(i,false,true);});
  const canScroll=(target,direction)=>{for(let e=target instanceof Element?target:panels[current];e&&stage.contains(e);e=e.parentElement){if(/auto|scroll/.test(getComputedStyle(e).overflowY)&&e.scrollHeight>e.clientHeight+2&&(direction>0?e.scrollTop+e.clientHeight<e.scrollHeight-2:e.scrollTop>2))return true;}return false;};
  stage.addEventListener('wheel',e=>{if(e.ctrlKey||document.querySelector('dialog[open]')||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;const direction=Math.sign(e.deltaY),now=performance.now(),gap=now-lastWheel;lastWheel=now;if(gap>200){gestureUsed=false;wheelSum=0;}if(busy){e.preventDefault();gestureUsed=true;return;}if(canScroll(e.target,direction)){wheelSum=0;return;}e.preventDefault();if(gestureUsed)return;wheelSum+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?stage.clientHeight:1);if(Math.abs(wheelSum)>60){gestureUsed=true;show(current+direction);}},{passive:false});
  let touch=null;stage.addEventListener('touchstart',e=>{touch={x:e.touches[0].clientX,y:e.touches[0].clientY,scroll:panels[current].scrollTop,target:e.target};},{passive:true});
  stage.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;if(!busy&&Math.abs(dy)>65&&Math.abs(dy)>Math.abs(dx)*1.3&&Math.abs(panels[current].scrollTop-touch.scroll)<2&&!canScroll(touch.target,-Math.sign(dy)))show(current+(dy<0?1:-1));touch=null;},{passive:true});stage.addEventListener('touchcancel',()=>{touch=null;});
  document.addEventListener('keydown',e=>{if(e.defaultPrevented||document.querySelector('dialog[open]')||e.target.closest('input,textarea,select,[contenteditable="true"],.carousel'))return;const d=['ArrowDown','PageDown'].includes(e.key)?1:['ArrowUp','PageUp'].includes(e.key)?-1:0;if(d&&!canScroll(e.target,d)){e.preventDefault();show(current+d,true,true);}});
  site.classList.add('presentation');sync();
})();

