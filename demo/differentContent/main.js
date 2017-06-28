const btn1 = document.querySelector('.btn-first');
const myPopover1 = new Popover(btn1, {
  placement: 'bottom',
  trigger: 'click',
});

const btn2 = document.querySelector('.btn-second');
const myPopover2 = new Popover(btn2, {
  placement: 'bottom',
  trigger: 'click',
  contentTemplate: '<a href="#">https://v4-alpha.getbootstrap.com/components/popovers/</a>',
});

const btn3 = document.querySelector('.btn-third');
const myPopover3 = new Popover(btn3, {
  placement: 'bottom',
  trigger: 'click',
  contentTemplate: '<img src="images/city.jpg" /><p>Lviv is the largest city in western Ukraine and the seventh-largest city in the country overall, with a population of around 728,350 as of 2016.</p></a>',
});
