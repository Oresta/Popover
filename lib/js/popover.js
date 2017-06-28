(function () {
  const defaults = {
    placement: 'top',
    trigger: 'static',
    parent: document.body,
    isAnimations: false,
    isCloseBtn: false,
    delay: 0,
  };

  function setParams(values) {
    const params = values || {};

    Object.keys(defaults).forEach((key) => {
      if (typeof params[key] === 'undefined') {
        params[key] = defaults[key];
      }
    });

    return params;
  }

  function getAnimationEvent() {
    const el = document.createElement('fakeelement');
    const animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd',
    };
    let animationType;

    Object.keys(animations).forEach((key) => {
      if (el.style[key] !== undefined) {
        animationType = animations[key];
      }
    });

    return animationType;
  }

  // with border, padding and scrollbar
  function offsetElement(el) {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      bottom: el.offsetTop + el.offsetHeight,
      right: el.offsetLeft + el.offsetWidth,
    };
  }

  // without border, padding and scrollbar
  function offsetContent(el) {
    return {
      top: el.offsetTop + el.clientTop,
      left: el.offsetLeft + el.clientLeft,
      bottom: el.offsetTop + el.clientTop + el.clientHeight,
      right: el.offsetLeft + el.clientLeft + el.clientWidth,
    };
  }

  function createID() {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * target - DOM element
   * plasement - 'left', 'right', 'top', 'bottom'
   * isAnimations - true, false
   * isCloseBtn - true, false
   * delay - number in ms
   * trigger - 'hover', 'click', 'static'
   * parent - DOM element
   */
  class Popover {
    constructor(target, options) {
      const params = setParams(options);

      if (!(target instanceof Element)) {
        throw new Error('Targer is not DOM element.');
      }

      this.target = target;
      this.placement = params.placement;
      this.isAnimations = params.isAnimations;
      this.isCloseBtn = params.isCloseBtn;
      this.delay = params.delay;
      this.trigger = params.trigger;
      this.parent = params.parent;
      this.element = null;
      this.title = this.getTitle(params.title);
      this.contentTemplate = params.contentTemplate || this.getContent();

      this.delayTimeout = null;

      this.clickHandler = this.toggle.bind(this);
      this.mouseenterHandler = this.show.bind(this);
      this.mouseleaveHandler = this.hide.bind(this);
      this.animationEnd = this.hideEl.bind(this);

      this.init();
    }

    init() {
      this.createTemplate();

      switch (this.trigger) {
        case 'hover':
          this.attachHover();
          break;
        case 'click':
          this.attachClickEvent();
          break;
        case 'static':
          this.show();
          break;
        default:
          throw new SyntaxError('Invalid trigger event');
      }

      this.initResize();
      if (this.isCloseBtn) {
        this.attachCloseBtnEvent();
      }
      if (this.isAnimations) {
        this.element.classList.add('animated');
      }
    }

    destroy() {
      const that = this;

      if (this.trigger === 'hover') {
        this.detachHover();
      } else if (this.trigger === 'click') {
        this.detachClickEvent();
      }

      if (this.isAnimations) {
        this.detachHideAnimations();
      }

      clearTimeout(this.delayTimeout);
      this.element.remove();

      Object.keys(that).forEach((key) => {
        delete that[key];
      });
    }

    getContent() {
      const dataAttr = this.target.dataset;
      let content;

      if (dataAttr && dataAttr.content) {
        content = dataAttr.content;
      } else {
        content = '';
      }

      return content;
    }

    getTitle(value) {
      const dataAttr = this.target.dataset;
      let title;

      if (typeof value === 'string') {
        title = value;
      } else if (dataAttr && dataAttr.title) {
        title = dataAttr.title;
      } else {
        title = '';
      }

      return title;
    }

    createTemplate() {
      const popover = document.createElement('div');
      this.element = document.body.appendChild(popover);
      this.element.className = 'pl-popover';
      if (this.title) {
        this.addNode('pl-popover-title', this.title);
      }
      this.addNode('pl-popover-content');
      if (this.isCloseBtn) {
        this.addNode('pl-close-btn');
      }
      this.addNode('pl-popover-arrow');
      this.element.classList.add(`pl-popover-${createID()}`);
      // add unique class
      const divContent = this.element.querySelector('.pl-popover-content');
      // convert string to DOM Node
      const range = document.createRange();
      range.selectNodeContents(divContent);
      const frag = range.createContextualFragment(this.contentTemplate);
      divContent.appendChild(frag);
    }

    addNode(className, text) {
      const divEl = document.createElement('div');
      let content = text;

      if (typeof content === 'undefined') {
        content = '';
      }

      divEl.innerHTML = content;
      divEl.className = className;
      this.element.appendChild(divEl);
    }

    setPopoverPosition() {
      const divOffset = offsetElement(this.target);
      let top;
      let left;

      if (this.placement === 'top') {
        top = divOffset.top - this.element.offsetHeight;
        left = divOffset.left + ((this.target.offsetWidth - this.element.offsetWidth) / 2);
      } else if (this.placement === 'bottom') {
        top = divOffset.bottom;
        left = divOffset.left + ((this.target.offsetWidth - this.element.offsetWidth) / 2);
      } else if (this.placement === 'left') {
        top = divOffset.top + ((this.target.offsetHeight - this.element.offsetHeight) / 2);
        left = divOffset.left - this.element.offsetWidth;
      } else if (this.placement === 'right') {
        top = divOffset.top + ((this.target.offsetHeight - this.element.offsetHeight) / 2);
        left = divOffset.right;
      }
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
      this.element.classList.add(this.placement);
    }

    isOutOfBounds() {
      const popoverOffset = offsetElement(this.element);
      const parentOffset = offsetContent(this.parent);


      if (popoverOffset.top - parentOffset.top < 0) {
        return true;
      } else if (popoverOffset.bottom - parentOffset.bottom > 0) {
        return true;
      } else if (popoverOffset.left - parentOffset.left < 0) {
        return true;
      } else if (popoverOffset.right - parentOffset.right > 0) {
        return true;
      }

      return false;
    }

    show() {
      const el = this.element;

      this.detachHideAnimations();
      clearTimeout(this.delayTimeout);
      el.style.display = 'block';
      this.setPopoverPosition();
      el.classList.remove('hide');
      el.classList.add('show');

      if (this.isOutOfBounds()) {
        this.element.classList.add('out-of-bounds');
      }
    }

    hide() {
      const el = this.element;

      clearTimeout(this.delayTimeout);
      this.delayTimeout = setTimeout(() => {
        el.classList.remove('show');
        if (this.isAnimations) {
          el.classList.add('hide');
          this.attachHideAnimations();
        } else {
          el.style.display = 'none';
        }
      }, this.delay);
    }

    toggle() {
      if (this.element.classList.contains('show')) {
        this.hide();
      } else {
        this.show();
      }
    }

    hideEl() {
      this.element.style.display = 'none';
    }

    attachHideAnimations() {
      const animationEvent = getAnimationEvent();

      this.element.addEventListener(animationEvent, this.animationEnd);
    }

    detachHideAnimations() {
      const animationEvent = getAnimationEvent();

      this.element.removeEventListener(animationEvent, this.animationEnd);
    }

    attachHover() {
      this.target.addEventListener('mouseenter', this.mouseenterHandler);
      this.target.addEventListener('mouseleave', this.mouseleaveHandler);
    }

    detachHover() {
      this.target.removeEventListener('mouseenter', this.mouseenterHandler);
      this.target.removeEventListener('mouseleave', this.mouseleaveHandler);
    }

    attachClickEvent() {
      this.target.addEventListener('click', this.clickHandler);
    }

    detachClickEvent() {
      this.target.removeEventListener('click', this.clickHandler);
    }

    initResize() {
      window.addEventListener('resize', () => {
        this.setPopoverPosition();
        if (this.isOutOfBounds()) {
          this.element.classList.add('out-of-bounds');
        } else {
          this.element.classList.remove('out-of-bounds');
        }
      });
    }

    attachCloseBtnEvent() {
      const closeBtn = this.element.querySelector('.pl-close-btn');

      closeBtn.addEventListener('click', () => {
        this.hide();
      });
    }
  }

  window.Popover = Popover;
})();