const btnTop = document.querySelector('.placement-top');
const popoverTop = new Popover(btnTop, {
  placement: 'top',
});

const btnBottom = document.querySelector('.placement-bottom');
const popoverBottom = new Popover(btnBottom, {
  placement: 'bottom',
});

const btnLeft = document.querySelector('.placement-left');
const popoverLeft = new Popover(btnLeft, {
  placement: 'left',
});

const btnRight = document.querySelector('.placement-right');
const popoverRight = new Popover(btnRight, {
  placement: 'right',
  parent: document.querySelector('.example1'),
});

const btnStatic = document.querySelector('.trigger-static');
const popoverStatic = new Popover(btnStatic, {
  placement: 'top',
  trigger: 'static',
});

const btnHover = document.querySelector('.trigger-hover');
const popoverHover = new Popover(btnHover, {
  placement: 'top',
  trigger: 'hover',
});

const btnClick = document.querySelector('.trigger-click');
const popoverClick = new Popover(btnClick, {
  placement: 'top',
  trigger: 'click',
});

const btnWithoutClose = document.querySelector('.without-close-btn');
const popoverWithoutCloseBtn = new Popover(btnWithoutClose, {
  placement: 'left',
  trigger: 'click',
  isCloseBtn: false,
});

const btnWithClose = document.querySelector('.with-close-btn');
const popoverWithCloseBtn = new Popover(btnWithClose, {
  placement: 'right',
  trigger: 'click',
  isCloseBtn: true,
});

const btnSmallDelay = document.querySelector('.small-delay');
const popoverSmallDelay = new Popover(btnSmallDelay, {
  placement: 'top',
  trigger: 'hover',
  isCloseBtn: true,
  delay: 500,
});

const btnMediumDelay = document.querySelector('.medium-delay');
const popoverMediumDelay = new Popover(btnMediumDelay, {
  placement: 'top',
  trigger: 'hover',
  isCloseBtn: true,
  delay: 1000,
});

const btnBigDelay = document.querySelector('.big-delay');
const popoverBigDelay = new Popover(btnBigDelay, {
  placement: 'top',
  trigger: 'hover',
  isCloseBtn: true,
  delay: 2000,
});

const btnAnimation = document.querySelector('.animation');
const popoverWithAnimation = new Popover(btnAnimation, {
  placement: 'top',
  trigger: 'hover',
  isCloseBtn: true,
  isAnimations: true,
  delay: 100,
});
