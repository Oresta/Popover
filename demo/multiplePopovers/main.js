const btnMultiple = document.querySelector('.multiple');

const myPopover1 = new Popover(btnMultiple, {
  placement: 'top',
  trigger: 'click',
  isCloseBtn: true,
  isAnimations: true,
  delay: 700,
  contentTemplate: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
});

const myPopover2 = new Popover(btnMultiple, {
  placement: 'bottom',
  trigger: 'click',
  isCloseBtn: true,
  isAnimations: true,
  delay: 500,
});

const myPopover3 = new Popover(btnMultiple, {
  placement: 'left',
  trigger: 'click',
  isCloseBtn: true,
  isAnimations: true,
  delay: 700,
});

const myPopover4 = new Popover(btnMultiple, {
  placement: 'right',
  trigger: 'click',
  isCloseBtn: true,
  isAnimations: true,
  delay: 700,
});

const myPopover5 = new Popover(btnMultiple, {
  placement: 'top',
  trigger: 'click',
  isCloseBtn: true,
  isAnimations: true,
  delay: 100,
});