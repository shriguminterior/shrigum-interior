import { content as c, projects, posts, type Image, type Field, type Project } from './content';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
const imageUrl = (src: string) => src.startsWith('/assets/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;
const img = (image: Image, eager = false) => `<img src="${escape(imageUrl(image.src))}" alt="${escape(image.alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
const paragraphs = (items: string[]) => items.map(p => p.startsWith('## ') ? `<h2>${escape(p.slice(3))}</h2>` : `<p>${escape(p)}</p>`).join('');
const button = (label: string, href: string) => `<a class="button" href="${escape(href)}">${escape(label)}</a>`;
let activeImages: Image[] = [];
let lightboxIndex = 0;
let previousFocus: HTMLElement | null = null;

function gallery(images: Image[], className = '') {
  const offset = activeImages.length;
  activeImages.push(...images);
  return `<div class="gallery ${className}">${images.map((image, index) => `<button class="gallery-image" data-image="${offset + index}" aria-label="${escape(image.alt)}">${img(image)}<span aria-hidden="true">＋</span></button>`).join('')}</div>`;
}

function categoryCards() {
  return `<div class="categories">${c.categories.map(category => `<a class="category-card" href="#/projects/${escape(category.slug)}">${img(category.image)}<h3>${escape(category.title)}<span aria-hidden="true">↗</span></h3></a>`).join('')}</div>`;
}

function projectCards(items: Project[]) {
  return `<div class="project-grid">${items.map(project => `<a class="project-card" href="#/project/${escape(project.slug)}">${img(project.cover)}<h2>${escape(project.title)}<span aria-hidden="true">↗</span></h2></a>`).join('')}</div>`;
}

function form(fields: Field[], kind: 'contact' | 'appointment') {
  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return `<form class="enquiry-form" data-kind="${kind}">${fields.map(field => {
    const attrs = `id="${kind}-${escape(field.name)}" name="${escape(field.name)}" ${field.required ? 'required' : ''}`;
    const autocomplete = ({name: 'name', email: 'email', phone: 'tel', address: 'street-address'} as Record<string,string>)[field.name];
    return `<div class="field ${field.type === 'textarea' ? 'wide' : ''}"><label for="${kind}-${escape(field.name)}">${escape(field.label)}${field.required ? ' <span aria-hidden="true">*</span>' : ''}</label>${field.type === 'textarea' ? `<textarea ${attrs} rows="4"></textarea>` : `<input ${attrs} type="${field.type}" ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${field.type === 'date' ? `min="${localDate}"` : ''} ${field.min !== undefined ? `min="${field.min}" step="1"` : ''}>`}</div>`;
  }).join('')}<div class="wide form-actions"><p class="form-help" id="${kind}-help">${escape(c.ui.emailHelp)}</p><button class="button" type="submit" aria-describedby="${kind}-help">${escape(c.ui.emailButton)} <span aria-hidden="true">↗</span></button><div class="form-status" role="status"></div></div></form>`;
}

function contact() {
  return `<section class="contact-section wrap"><div class="contact-details"><h2>${escape(c.contact.title)}</h2><p>${escape(c.brand.address)}</p><a href="mailto:${escape(c.brand.email)}">${escape(c.brand.email)}</a>${c.brand.phone ? `<a href="tel:${escape(c.brand.phone.replace(/[^+\d]/g, ''))}">${escape(c.brand.phone)}</a>` : ''}<a class="map-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.brand.address)}" target="_blank" rel="noopener noreferrer">${escape(c.contact.mapLabel)} <span aria-hidden="true">↗</span></a></div>${form(c.contact.fields, 'contact')}</section>`;
}

function home() {
  return `<section class="hero" aria-label="${escape(c.brand.title)}">${img(c.brand.hero, true)}<h1><span class="logo-art">${img(c.brand.heroLogo, true)}</span></h1></section>
    <section class="about"><div class="reading center"><h2>${escape(c.about.title)}</h2>${paragraphs(c.about.paragraphs)}</div>${gallery(c.about.gallery, 'showcase')}</section>
    <section class="process wrap"><h2 class="center">${escape(c.processTitle)}</h2><ol class="process-grid">${c.process.map((step, index) => `<li><span class="step-number" aria-hidden="true">${index + 1}</span><h3>${escape(step.title)}</h3><p>${escape(step.text)}</p></li>`).join('')}</ol><div class="center">${button(c.ui.book, '#/appointment')}</div></section>
    <section class="projects-section wrap"><h2 class="center">${escape(c.projectsTitle)}</h2>${categoryCards()}</section>
    <section class="offers"><div class="wrap"><h2 class="center">${escape(c.offerTitle)}</h2><div class="service-grid">${c.services.map(service => `<a href="#/service/${escape(service.slug)}">${img(service.image)}<h3>${escape(service.title)} <span aria-hidden="true">↗</span></h3></a>`).join('')}</div></div></section>${contact()}`;
}

function projectIndex(categorySlug?: string) {
  const category = c.categories.find(item => item.slug === categorySlug);
  if (categorySlug && !category) return notFound();
  return `<section class="wrap page-section"><h1 class="center">${escape(category?.title ?? c.workTitle)}</h1><nav class="filters" aria-label="${escape(c.ui.allProjects)}"><a href="#/projects" ${!category ? 'aria-current="page"' : ''}>${escape(c.ui.allProjects)}</a>${c.categories.map(item => `<a href="#/projects/${escape(item.slug)}" ${item.slug === categorySlug ? 'aria-current="page"' : ''}>${escape(item.title)}</a>`).join('')}</nav>${projectCards(category ? projects.filter(p => p.category === category.slug) : projects)}</section>`;
}

function projectDetail(slug: string) {
  const project = projects.find(item => item.slug === slug);
  if (!project) return notFound();
  return `<section class="wrap page-section"><a class="back-link" href="#/projects/${escape(project.category)}">← ${escape(c.ui.backProjects)}</a><div class="project-intro">${img(project.cover, true)}<div><h1>${escape(project.title)}</h1>${paragraphs(project.paragraphs)}</div></div>${gallery(project.gallery, 'project-gallery')}</section>`;
}

function blog() {
  return `<section class="wrap page-section"><h1 class="center">${escape(c.ui.blog)}</h1><p class="blog-filter">${escape(c.ui.allPosts)}</p><div class="blog-grid">${posts.map(post => `<article class="post-card"><a href="#/blog/${escape(post.slug)}">${img(post.image)}<div class="post-body"><p class="meta">${escape(post.date)} · ${escape(post.readTime)}</p><h2>${escape(post.title)}</h2><p>${escape(post.paragraphs[0])}</p><span class="text-link">${escape(c.ui.readArticle)} ↗</span></div></a></article>`).join('')}</div></section>`;
}

function article(slug: string) {
  const post = posts.find(item => item.slug === slug);
  if (!post) return notFound();
  return `<article class="article reading page-section"><a class="back-link" href="#/blog">← ${escape(c.ui.backBlog)}</a><p class="meta">${escape(post.date)} · ${escape(post.readTime)}</p><h1>${escape(post.title)}</h1>${img(post.image, true)}${paragraphs(post.paragraphs)}<aside class="recent"><h2>${escape(c.ui.recentPosts)}</h2>${posts.filter(p => p.slug !== slug).map(p => `<a href="#/blog/${escape(p.slug)}">${escape(p.title)} <span aria-hidden="true">↗</span></a>`).join('')}</aside></article>`;
}

function serviceDetail(slug: string) {
  const service = c.services.find(item => item.slug === slug);
  return service ? `<section class="wrap page-section"><a class="back-link" href="#/">← ${escape(c.ui.returnHome)}</a><h1 class="center">${escape(service.title)}</h1>${gallery(service.gallery, 'project-gallery')}<div class="center section-cta">${button(c.ui.book, '#/appointment')}</div></section>` : notFound();
}

function notFound() { return `<section class="wrap page-section center"><h1>${escape(c.ui.notFound)}</h1>${button(c.ui.returnHome, '#/')}</section>`; }

function render() {
  document.querySelector<HTMLDialogElement>('#lightbox')?.close();
  document.body.classList.remove('modal-open');
  activeImages = [];
  const [route = '', slug] = location.hash.replace(/^#\/?/, '').split('/');
  let page = '';
  let title = c.brand.title;
  if (!route) page = home();
  else if (route === 'projects') { page = projectIndex(slug); title = c.projectsTitle; }
  else if (route === 'project') { page = projectDetail(slug); title = projects.find(p => p.slug === slug)?.title ?? c.ui.notFound; }
  else if (route === 'blog') { page = slug ? article(slug) : blog(); title = posts.find(p => p.slug === slug)?.title ?? c.ui.blog; }
  else if (route === 'service') { page = serviceDetail(slug); title = c.services.find(s => s.slug === slug)?.title ?? c.ui.notFound; }
  else if (route === 'contact') { page = contact(); title = c.contact.title; }
  else if (route === 'appointment') { page = `<section class="appointment wrap page-section"><h1 class="center">${escape(c.appointment.title)}</h1>${form(c.appointment.fields, 'appointment')}</section>`; title = c.appointment.title; }
  else page = notFound();
  document.title = title === c.brand.title ? `${c.brand.title} | ${c.brand.description}` : `${title} | ${c.brand.title}`;
  const navRoute = route === 'project' ? 'projects' : route;
  app.innerHTML = `<a class="skip-link" href="#main">${escape(c.ui.skip)}</a><header class="site-header"><a class="brand" href="#/"><span class="logo-art">${img(c.brand.logo, true)}</span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">${escape(c.ui.menu)} <span aria-hidden="true">☰</span></button><nav id="site-nav" aria-label="${escape(c.brand.title)}">${c.navigation.map(item => `<a href="${escape(item.href)}" ${item.href === `#/${navRoute}` ? 'aria-current="page"' : ''}>${escape(item.label)}</a>`).join('')}</nav></header><main id="main" tabindex="-1">${page}</main><footer><p>${escape(c.brand.name)}</p><a href="mailto:${escape(c.brand.email)}">${escape(c.brand.email)}</a><small>${escape(c.brand.copyright)}</small></footer><dialog id="lightbox" aria-label="${escape(c.ui.gallery)}"><button class="lightbox-close" aria-label="${escape(c.ui.close)}">×</button><button class="lightbox-prev" aria-label="${escape(c.ui.previous)}">←</button><figure><img alt=""><figcaption></figcaption></figure><button class="lightbox-next" aria-label="${escape(c.ui.next)}">→</button></dialog>`;
  wireEvents();
}

function showImage() {
  const image = activeImages[lightboxIndex];
  const dialog = document.querySelector<HTMLDialogElement>('#lightbox')!;
  const picture = dialog.querySelector('img')!;
  picture.src = imageUrl(image.src);
  picture.alt = image.alt;
  dialog.querySelector('figcaption')!.textContent = `${image.alt} (${lightboxIndex + 1} / ${activeImages.length})`;
}

function wireEvents() {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
  const nav = document.querySelector('#site-nav')!;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.innerHTML = `${escape(expanded ? c.ui.closeMenu : c.ui.menu)} <span aria-hidden="true">${expanded ? '×' : '☰'}</span>`;
    nav.classList.toggle('open', expanded);
  });
  nav.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); });
  const dialog = document.querySelector<HTMLDialogElement>('#lightbox')!;
  document.querySelectorAll<HTMLButtonElement>('[data-image]').forEach(element => element.addEventListener('click', () => {
    previousFocus = element; lightboxIndex = Number(element.dataset.image); showImage(); dialog.showModal(); document.body.classList.add('modal-open');
  }));
  const close = () => dialog.close();
  const move = (direction: number) => { lightboxIndex = (lightboxIndex + direction + activeImages.length) % activeImages.length; showImage(); };
  dialog.querySelector('.lightbox-close')!.addEventListener('click', close);
  dialog.querySelector('.lightbox-prev')!.addEventListener('click', () => move(-1));
  dialog.querySelector('.lightbox-next')!.addEventListener('click', () => move(1));
  dialog.addEventListener('keydown', event => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); });
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); previousFocus?.focus(); });
  document.querySelectorAll<HTMLFormElement>('.enquiry-form').forEach(formElement => formElement.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(formElement);
    const appointment = formElement.dataset.kind === 'appointment';
    const fields: Field[] = appointment ? c.appointment.fields : c.contact.fields;
    const body = fields.map(field => `${field.label}: ${String(data.get(field.name) ?? '').trim()}`).join('\n');
    const subject = appointment ? c.ui.appointmentSubject : String(data.get('subject') || c.ui.emailSubject);
    const href = `mailto:${c.brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = formElement.querySelector('.form-status')!;
    status.replaceChildren();
    const message = document.createElement('p'); message.textContent = c.ui.emailReady;
    const link = document.createElement('a'); link.href = href; link.textContent = c.ui.emailFallback;
    status.append(message, link);
    // User initiates opening an email draft; no false server submission state.
    link.click();
  }));
}

window.addEventListener('hashchange', () => {
  if (location.hash === '#main') { document.querySelector<HTMLElement>('main')?.focus(); return; }
  render(); window.scrollTo(0, 0); document.querySelector<HTMLElement>('main')?.focus({preventScroll: true});
});
render();
