const body = document.body;
let top = 0;

const disable = () => {
  top = window.pageYOffset;
  body.style.top = `-${top}px`;
  body.classList.add('no-scroll');
};

const enable = () => {
  if (body.classList.contains('no-scroll')) {
    body.style.top = '';
    body.classList.remove('no-scroll');
    window.scrollTo(0, top)
  }
};

export default { disable, enable };
