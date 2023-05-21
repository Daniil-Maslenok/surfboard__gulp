(function () {
  const resultWidth = item => {
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest(".product-menu");
    const titlesBlocks = container.find(".product-menu__title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".product-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const mobileVer = window.matchMedia("(max-width: 768px)").matches;

    if (mobileVer) {
      reqItemWidth = screenWidth - titlesWidth;
      // if (screenWidth <= 768) {
      //   reqItemWidth = screenWidth;
      // }
    } else {
      reqItemWidth = 500;
    };

    return {
      container: reqItemWidth,
      textContainer: reqItemWidth - paddingLeft - paddingRight
    }

  }

  const closeEveryItemInContainer = container => {
    const items = container.find(".product-menu__item");
    const content = container.find(".product-menu__content");

    items.removeClass("active");
    content.width(0);
  }

  const openCont = item => {
    const hiddenContent = item.find(".product-menu__content");
    const reqWidth = resultWidth(item);
    const textBlock = item.find(".product-menu__container");

    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
  }

  $(".product-menu__title").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".product-menu__item");
    const contOpened = item.hasClass("active");
    const container = $this.closest(".product-menu");

    if (contOpened) {
      closeEveryItemInContainer(container);
    } else {
      closeEveryItemInContainer(container);
      openCont(item);
    }
  });

  $(".product-menu__close").click(e => {
    e.preventDefault();

    closeEveryItemInContainer($(".product-menu"));
  })
})()