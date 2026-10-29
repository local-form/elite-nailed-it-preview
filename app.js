const dateInput=document.querySelector('[name=day]');const now=new Date();dateInput.min=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
document.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const box=document.querySelector('#confirmation');const day=f.get('day')?new Date(f.get('day')+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'}):'day to be confirmed';box.replaceChildren();const summary=document.createElement('p');summary.textContent=`${f.get('service')||'Nail care'}, ${day}, ${String(f.get('time')).toLowerCase()}, for ${f.get('name')}. Technician: ${f.get('stylist')}.`;const note=document.createElement('p');note.textContent='Preview only: nothing was sent. On the real site, the shop confirms by text or call.';box.append(summary,note);box.hidden=false;box.focus();});
// header: black over the hero, frosted bone once the page moves
(()=>{const h=document.querySelector('header');const set=()=>h.classList.toggle('scrolled',scrollY>40);set();addEventListener('scroll',set,{passive:true})})();
(()=>{const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;const g=window.gsap,ST=window.ScrollTrigger;
  if(!calm&&g&&ST){g.registerPlugin(ST);
    // hero: the photo settles out of a slow zoom, the wordmark lights up letter group by group, a gold rule draws under it
    const tl=g.timeline({defaults:{ease:'expo.out'}});
    tl.fromTo('.hero-photo img',{scale:1.18,opacity:0},{scale:1,opacity:1,duration:2.4},0)
      .from('.hero .eyebrow',{opacity:0,x:-20,duration:1.2},.3)
      .from('.hero h1 .lk-elite',{opacity:0,y:30,filter:'blur(8px)',duration:1.4},.45)
      .from('.hero h1 .lk-nailed>*',{opacity:0,y:40,filter:'blur(10px)',duration:1.5,stagger:.12},.6)
      .from('.rule',{scaleX:0,duration:1.4,ease:'expo.inOut'},1)
      .from('.hero .intro,.hero .lede,.hero .actions,.hero .fine',{opacity:0,y:20,duration:1.1,stagger:.08},1.1);
    g.to('.hero-photo img',{yPercent:10,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.9}});
    // the salon: each photo drifts inside its frame as you scroll past
    g.utils.toArray('.salon-grid img, .service-grid figure img').forEach(img=>g.fromTo(img,{yPercent:-6,scale:1.14},{yPercent:6,scale:1.14,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:.9}}));
    g.utils.toArray('.salon-grid figure').forEach((f,i)=>g.from(f,{clipPath:'inset(100% 0 0 0)',duration:1.6,ease:'expo.inOut',delay:i*.08,clearProps:'clipPath',scrollTrigger:{trigger:'.salon-grid',start:'top 85%',once:true}}));
    // shade wall: the board rises into place
    const wall=document.querySelector('.wall');wall.removeAttribute('data-reveal');
    g.from(wall,{y:80,opacity:0,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'.shades',start:'top 80%',once:true}});

    // reviews: each quote writes itself in word by word, the gold mark swings in, the big background quote drifts
    g.utils.toArray('.review-grid blockquote').forEach(q=>{const words=q.textContent.trim().split(/\s+/);q.textContent='';words.forEach((w,i)=>{const s=document.createElement('span');s.className='w';s.textContent=w;q.append(s,i<words.length-1?' ':'')});
      const fig=q.closest('figure');g.timeline({scrollTrigger:{trigger:fig,start:'top 85%',once:true},delay:.15}).from(fig.querySelector('.quote'),{scale:.2,rotate:-25,opacity:0,duration:1.1,ease:'back.out(2.4)'}).from(q.querySelectorAll('.w'),{opacity:0,y:16,filter:'blur(6px)',duration:.9,ease:'expo.out',stagger:.07},'-=.7')});

    g.utils.toArray('.gallery img').forEach(img=>g.from(img,{scale:1.25,duration:1.8,ease:'expo.out',scrollTrigger:{trigger:img,start:'top 92%',once:true}}));
  }
  // section reveals (CSS transitions, staggered per group)
  const els=[...document.querySelectorAll('[data-reveal]')];if(calm||!('IntersectionObserver'in window))return;document.documentElement.classList.add('js-reveal');
  const n=new Map();els.forEach(e=>{const p=e.parentElement,i=n.get(p)||0;e.style.setProperty('--d',i*.09+'s');n.set(p,i+1)});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.01,rootMargin:'0px 0px -8% 0px'});els.forEach(e=>io.observe(e));
})();
