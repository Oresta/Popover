const btn = document.querySelector('.btn');
const box = document.querySelector('.box');

const myPopover1 = new Popover(btn, {
  placement: 'top',
  trigger: 'click',
  isCloseBtn: true,
  isAnimations: true,
  delay: 700,
  parent: box,
});

const myPopover2 = new Popover(btn, {
  placement: 'bottom',
  trigger: 'click',
  isCloseBtn: true,
  isAnimations: true,
  delay: 500,
  parent: box,
  contentTemplate: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
});

const myPopover3 = new Popover(btn, {
  placement: 'right',
  trigger: 'click',
  isCloseBtn: true,
  isAnimations: true,
  delay: 700,
  parent: box,
  title: 'Lorem ipsum dolor sit amet',
  contentTemplate: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
});
