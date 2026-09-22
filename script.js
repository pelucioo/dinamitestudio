// Carousel controls are generated from each list, including the nine featured artworks.
const projectPost = { image: 'assets/citta-della.webp', title: 'Citta Della Pizzaria', description: 'Visual identity & illustrated mascot for a pizzeria.', alt: 'Citta Della Pizzaria identity and illustrated chef mascot by Dinamite Studio.' };
const pendingPosts = (label, start = 1) => Array.from({ length: 7 - start }, (_, i) => ({ title: `${label} ${String(start + i).padStart(2, '0')}`, pending: true }));
const carouselPosts = {
  featured: [
    { image: 'assets/featured-v3/1.webp', title: 'Citta Della Pizzaria', description: 'Visual identity & illustrated mascot for a pizzeria.', alt: 'Citta Della Pizzaria lettering and chef mascot on a blue background.' },
    { image: 'assets/featured-v3/dragonite.webp', title: 'Dragonite', description: 'Character illustration.', alt: 'Dragonite flying through a bright blue sky with white clouds.' },
    { image: 'assets/featured-v3/2.webp', title: 'Tusca 2023', description: 'Mascot illustration & T-shirt graphics.', alt: 'Yellow Tusca 2023 T-shirts featuring an illustrated boar mascot.' },
    { image: 'assets/featured-v3/mascosts.webp', title: 'Mascots', description: 'A selection of illustrated characters.', alt: 'Black-and-white character collection: woman, globe, magician, carton, television and toucan.' },
    { image: 'assets/featured-v3/5.webp', title: 'Nofronte Stage', description: 'Logo design & graphic identity.', alt: 'Purple and yellow Nofronte Stage logo variations.' },
    { image: 'assets/featured-v3/4.webp', title: 'RCS — Ninguém tá puro', description: 'Character illustration & lettering.', alt: 'Red and white clown and balloon character illustration on a black background.' },
    { image: 'assets/featured-v3/3.webp', title: 'Matadouro', description: 'Mascot illustration & T-shirt graphics.', alt: 'Black Matadouro T-shirts and a cartoon television mascot on a red background.' },
    { image: 'assets/featured-v3/6.webp', title: 'Resenha é Coisa Séria', description: 'Mascot illustration & T-shirt graphics.', alt: 'Black RCS T-shirts featuring a green cartoon flask mascot.' },
    { image: 'assets/featured-v3/camel.webp', title: 'Camel Club — Dunas Bar', description: 'Visual identity & packaging applications.', alt: 'Red and white Camel Club branding with camel logo, drink cup and food packaging.' }
  ],
  feedback: [
    { image: 'assets/review1.webp', title: 'Feedback 01', alt: 'Client feedback praising the liver mascot design, clear communication, revisions and color coordination.' },
    { image: 'assets/review2.webp', title: 'Rep Gringa', alt: 'Rep Gringa: anniversary artwork and a testimonial praising the result and expressing interest in future projects.' },
    { image: 'assets/review3.webp', title: 'DJ Pierre', alt: 'DJ Pierre: illustrated magician mascot and a testimonial praising the artwork.' },
    ...pendingPosts('Feedback', 4)
  ],
  projects: [projectPost, ...pendingPosts('Project', 2)]
};

const featuredBackgrounds = ['#0073c7','#0180ff','#c18600','#ffffff','#70338c','#000000','#740000','#b3b3b3','#ff0009'];
carouselPosts.featured.forEach((post, index) => {
  const name = post.image.split('/').pop().replace('.webp', '');
  post.image = `assets/featured-clean/${name}.webp`;
  post.fullImage = `assets/featured-clean/${name}-full.webp`;
  post.background = featuredBackgrounds[index];
  post.extendBackground = [1,2,6,7,8].includes(index);
});

// Present the supplied projects instead of empty portfolio slots.
carouselPosts.projects = [0,2,4,6,7,8].map(index => ({...carouselPosts.featured[index]}));
carouselPosts.projects[0].gallery = [
  {src:'assets/projects/cittadella/tv-pizza.webp', alt:'Citta Della identity on a vintage television with pizza and blue checkered paper.'},
  {src:'assets/projects/cittadella/peca-1.webp', alt:'Citta Della campaign: friends sharing pizza with branded placemats and packaging.'},
  {src:'assets/projects/cittadella/caixa-pizza.webp', alt:'Citta Della pizza box with chef mascot and red and blue checkered details.'},
  {src:'assets/projects/cittadella/peca-2.webp', alt:'Citta Della campaign with a vintage television and the slogan Para todos os momentos.'}
];
carouselPosts.projects.splice(1,0,{
  title:'DJ Pierre', description:'Mascot illustration, lettering & T-shirt graphics.',
  video:'assets/projects/dj-pierre/pierre.mp4', poster:'assets/projects/dj-pierre/identity.webp',
  gallery:[
    {src:'assets/projects/dj-pierre/identity.webp',alt:'Pierre O Bom lettering and illustrated magician mascot.'},
    {src:'assets/projects/dj-pierre/shirt.webp',alt:'DJ Pierre black T-shirts with lettering and magician mascot.'},
    {src:'assets/projects/dj-pierre/illustration.webp',alt:'DJ Pierre magician illustration with glowing pink lettering.'},
    {src:'assets/projects/dj-pierre/lettering.webp',alt:'Pierre O Bom iridescent lettering on black.'}
  ]
});
Object.assign(carouselPosts.projects.find(post=>post.title==='Camel Club — Dunas Bar'),{
  image:'assets/projects/camel-club/logo.webp', fullImage:'assets/projects/camel-club/logo.webp',
  alt:'Camel Club Dunas Bar circular camel logo in red and white.',
  background:'#e30613', extendBackground:false, squareLogo:true,
  gallery:[
    {src:'assets/projects/camel-club/comida.webp',alt:'Camel Club food, branded cup and napkin mockup.'},
    {src:'assets/projects/camel-club/papel.webp',alt:'Camel Club patterned wrapping paper mockup.'},
    {src:'assets/projects/camel-club/embalagem.webp',alt:'Camel Club branded takeaway bag mockup.'},
    {src:'assets/projects/camel-club/faixada.webp',alt:'Camel Club red storefront and illuminated logo mockup.'}
  ]
});
const camelProjectIndex=carouselPosts.projects.findIndex(post=>post.squareLogo);
carouselPosts.projects.splice(2,0,...carouselPosts.projects.splice(camelProjectIndex,1));
carouselPosts.projects = carouselPosts.projects.filter(post => post.gallery?.length === 4);
carouselPosts.projects.push({
  title:'RCS — Resenha é Coisa Séria', description:'Logo design, character illustration & T-shirt graphics.',
  image:'assets/projects/rcs/logo.webp', fullImage:'assets/projects/rcs/logo.webp',
  alt:'Black RCS monogram inside a circular frame on white.', background:'#fff', lightBackground:true,
  gallery:[
    {src:'assets/projects/rcs/space-shirt.webp',alt:'RCS black T-shirts with a green space mascot on a blue background.'},
    {src:'assets/projects/rcs/clown-shirt.webp',alt:'RCS black T-shirts with a clown and balloon illustration on a red background.'},
    {src:'assets/projects/rcs/globe-shirt.webp',alt:'RCS black T-shirts with an illustrated globe on a green background.'},
    {src:'assets/projects/rcs/flask-shirt.webp',alt:'RCS black T-shirts with a green flask mascot on a white background.'}
  ]
});
// Match the first carousel's fixed canvas to the user's horizontal exports.
carouselPosts.featured.forEach(post => {
  const name = post.image.split('/').pop().replace('.webp','');
  post.image = `assets/featured-v2/${name}.webp`;
  post.fullImage = post.image;
  post.extendBackground = false;
});
const feedbackQuotes = [
  'I am really happy with the result, I felt that the design was well executed and that you communicated quickly and clearly. Any suggestions or alterations were taken with grace, and I really liked your implementation of color coordination throughout such as the purple and green vessels being reflected in the coloration of the eyes as well.\n\nI appreciate the work and am thankful for your help in making this project come to life!',
  'I’m the one who should thank you, my king, the artwork turned out really great. Honestly, from the heart, we’ll definitely call you again to create more pieces like this.',
  'I’m the one who should thank you, my king, the artwork turned out really great. Honestly, from the heart, we’ll definitely call you again to create more pieces like this.'
];
carouselPosts.feedback = carouselPosts.feedback.slice(0,3).map((post,index) => ({...post, quote:feedbackQuotes[index], author:['Client feedback','@REP_GRINGA','@DJPIERREBOM'][index]}));
carouselPosts.feedback.push({
  image:'assets/band-logo-feedback.webp', title:'Band logo', author:'Band logo client',
  alt:'Orange and black circular band logo with mirrored illustrated faces and white eyes.',
  fullArtwork:true, longQuote:true,
  quote:`We were incredibly lucky to find Pedro Lucas Silva de Araújo (Pelucio) to design our band's logo. After speaking with many different artists, he came along at exactly the right moment and helped us move forward with confidence after what had become a rather confusing search.

What immediately stood out was his professional and structured approach, his clear and direct communication, and the genuine care he took in understanding our ideas and requests. Working with him was smooth from start to finish: the kind of collaboration you hope for when hiring a true professional.

Throughout every important stage of the project, Pelucio kept us updated, shared his progress, and actively asked for our feedback. It never felt like we were simply waiting for the final result; we felt involved in the creative process from beginning to end. You can tell he genuinely cares about both the journey and the outcome, and that dedication is clearly reflected in the final design.

We couldn't be happier with our new logo. Thank you, Pelucio, for your outstanding work. We wholeheartedly recommend you to anyone looking for a talented, reliable, and passionate graphic artist!`
});

// Two identical runs create a seamless marquee, including after a viewport resize.
document.querySelectorAll('.ticker').forEach(ticker => {
  const run = ticker.querySelector('span');
  run.className = 'ticker-run';
  const track = document.createElement('div');
  track.className = 'ticker-track';
  track.append(run, run.cloneNode(true));
  ticker.replaceChildren(track);
});

// One shared modal keeps the artwork uncropped and keyboard focus inside the viewer.
const viewer = document.createElement('dialog');
viewer.className = 'art-viewer';
viewer.setAttribute('aria-label', 'Artwork preview');
const closeViewer = document.createElement('button');
closeViewer.type = 'button'; closeViewer.className = 'viewer-close'; closeViewer.textContent = 'Close ×';
const viewerImage = document.createElement('img');
viewer.append(closeViewer, viewerImage); document.body.append(viewer);
let viewerTrigger = null;
const openArtwork = (image, title, trigger) => {
  viewerTrigger = trigger; viewerImage.src = image.src; viewerImage.alt = image.alt || title;
  if (!viewer.open) viewer.showModal();
  document.documentElement.classList.add('viewer-open');
  closeViewer.focus();
};
closeViewer.addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => {
  document.documentElement.classList.remove('viewer-open');
  viewerImage.removeAttribute('src');
  if (viewerTrigger?.isConnected) viewerTrigger.focus({preventScroll:true});
});
const artworkButton = (image, title) => {
  const button = document.createElement('button'); button.type = 'button'; button.className = 'artwork-open';
  button.setAttribute('aria-label', `Enlarge artwork: ${title}`); button.setAttribute('aria-haspopup', 'dialog');
  const img = document.createElement('img'); img.src = image.src; img.alt = image.alt || title;
  img.width = 1300; img.height = 520; button.append(img);
  button.addEventListener('click', () => openArtwork({src:image.fullSrc || image.src, alt:image.alt}, title, button));
  return button;
};

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const posts = carouselPosts[carousel.dataset.carousel];
  carousel.replaceChildren();
  const track = document.createElement('div');
  track.className = 'carousel-track';
  const slides = posts.map((post, index) => {
    const slide = document.createElement('article');
    slide.className = 'carousel-slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${posts.length}: ${post.title}`);
    if (post.video) {
      slide.classList.add('project-video-slide');
      const video=document.createElement('video');
      video.src=post.video; video.poster=post.poster; video.controls=true;
      video.playsInline=true; video.preload='metadata';
      video.muted=true; video.defaultMuted=true; video.loop=true; video.autoplay=true;
      video.setAttribute('aria-label',`${post.title} — project video`);
      slide.append(video);
      // Play only while this project and its section are visible.
      const syncPlayback=()=>{
        if(document.hidden || video.closest('[inert],[hidden]')) video.pause();
        else video.play().catch(()=>{});
      };
      new MutationObserver(syncPlayback).observe(carousel.closest('[data-slide]'),{attributes:true,subtree:true,attributeFilter:['inert','hidden']});
      document.addEventListener('visibilitychange',syncPlayback);
    } else if (post.image && post.quote) {
      slide.classList.add('feedback-story');
      if(post.fullArtwork) slide.classList.add('feedback-full-art');
      if(post.longQuote) slide.classList.add('feedback-long');
      const art = artworkButton({src:post.image, alt:post.alt}, post.title);
      art.classList.add('feedback-art');
      const copy = document.createElement('div'); copy.className = 'feedback-copy';
      if(post.longQuote) { copy.tabIndex=0; copy.setAttribute('role','region'); copy.setAttribute('aria-label','Full client testimonial'); }
      const quote = document.createElement('blockquote'); quote.textContent = post.quote;
      const author = document.createElement('p'); author.className = 'feedback-author'; author.textContent = post.author;
      copy.append(quote,author); slide.append(art,copy);
    } else if (post.image) {
      if(post.lightBackground) slide.classList.add('light-project-slide');
      if (post.background) slide.style.setProperty('--art-background', post.background);
      if (post.extendBackground) {
        slide.classList.add('extended-art-background');
        slide.style.setProperty('--art-fill', `url("${post.image}")`);
      }
      const art=artworkButton({src:post.image, fullSrc:post.fullImage, alt:post.alt}, post.title);
      if(post.squareLogo){
        art.classList.add('square-logo-art');
        const frame=document.createElement('span');frame.className='square-logo-frame';
        frame.append(art.querySelector('img'));art.append(frame);
      }
      slide.append(art);
    } else {
      const copy = document.createElement('div'); copy.className = 'slide-copy';
      const title = document.createElement('h3'); title.textContent = post.title;
      const description = document.createElement(post.quote ? 'blockquote' : 'p');
      description.textContent = post.quote || 'Content coming soon';
      if (post.quote) { copy.classList.add('testimonial'); copy.append(description); }
      else copy.append(title, description);
      if (post.author) {
        const author = document.createElement('p'); author.className = 'testimonial-author'; author.textContent = post.author; copy.append(author);
        if (post.role) { const role = document.createElement('p'); role.className = 'testimonial-role'; role.textContent = post.role; copy.append(role); }
      }
      slide.append(copy);
    }
    track.append(slide);
    return slide;
  });
  const createButton = (label, className, text) => {
    const button = document.createElement('button'); button.type = 'button';
    button.className = className; button.setAttribute('aria-label', label);
    button.textContent = text; return button;
  };
  const prev = createButton('Previous post', 'carousel-arrow previous', '‹');
  const next = createButton('Next post', 'carousel-arrow next', '›');
  const dots = document.createElement('div'); dots.className = 'carousel-dots';
  dots.setAttribute('role', 'group'); dots.setAttribute('aria-label', 'Choose a post');
  const status = document.createElement('p'); status.className = 'sr-only';
  status.setAttribute('aria-live', 'polite'); status.setAttribute('aria-atomic', 'true');
  let current = 0;
  const show = (index, announce = true) => {
    current = (index + posts.length) % posts.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => { slide.inert = i !== current; slide.setAttribute('aria-hidden', String(i !== current)); });
    [...dots.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
    carousel.dataset.index = String(current);
    const caption = document.querySelector(`[data-caption="${carousel.dataset.carousel}"]`);
    if (caption) {
      caption.querySelector('span').textContent = posts[current].title;
      caption.querySelector('p').textContent = posts[current].description || 'More work coming soon.';
    }
    if (carousel.dataset.carousel === 'featured') {
      document.querySelectorAll('.featured-thumb').forEach((tile, i) => {
        const index = (current + i) % posts.length;
        const post = posts[index];
        tile.removeAttribute('aria-hidden'); tile.dataset.project = String(current);
        tile.setAttribute('aria-label', post.title);
        tile.classList.toggle('is-selected', i === 0);
        tile.replaceChildren();
        tile.style.setProperty('--art-background', post.background);
        const button = artworkButton({src:post.image, fullSrc:post.fullImage, alt:post.alt}, post.title);
        button.addEventListener('click', () => { show(index); viewerTrigger = carousel; });
        tile.append(button);
      });
    }
    if (carousel.dataset.carousel === 'projects') {
      const post = posts[current];
      const gallery = post.gallery || [{src:post.image, fullSrc:post.fullImage, alt:post.alt}];
      document.querySelectorAll('.project-tile').forEach((tile,i) => {
        tile.removeAttribute('aria-hidden');tile.dataset.project=String(current);
        tile.setAttribute('aria-label',`${post.title} — artwork ${i+1}`);
        tile.replaceChildren();
        if(gallery[i]) tile.append(artworkButton(gallery[i],`${post.title} — artwork ${i+1}`));
        else {
          const label=document.createElement('span');label.className='tile-pending';
          const title=document.createElement('strong');title.textContent=`Mockup ${String(i).padStart(2,'0')}`;
          const note=document.createElement('span');note.textContent='Coming soon';
          label.append(title,note);tile.append(label);
        }
      });
    }
    if (announce) status.textContent = `${current + 1} of ${posts.length}: ${posts[current].title}`;
  };
  posts.forEach((post, i) => {
    const dot = createButton(`Go to post ${i + 1}: ${post.title}`, 'carousel-dot', '');
    dot.addEventListener('click', () => show(i)); dots.append(dot);
  });
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  carousel.addEventListener('keydown', event => {
    if(event.target.closest('video')) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    show(event.key === 'Home' ? 0 : event.key === 'End' ? posts.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let touchStart = null;
  carousel.addEventListener('touchstart', event => { touchStart = event.target.closest('video') ? null : {x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY}; }, {passive:true});
  carousel.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, {passive:true});
  carousel.addEventListener('touchcancel', () => { touchStart = null; });
  carousel.append(track, prev, next, dots, status);
  show(0, false);
});
