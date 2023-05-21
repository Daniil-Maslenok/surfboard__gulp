(function () {
  const openItem = item => {
    const container = item.closest(".participant");
    const contentBlock = container.find(".participant__content");
    const textBlock = contentBlock.find(".participant__content-block");
    const openHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(openHeight);
  }

  const closeAllItems = container => {
    const items = container.find('.participant__content');
    const itemContainer = container.find('.participant')

    itemContainer.removeClass('active');
    items.height(0);
  }


  $(".participant__name").on('click', e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.participant');

    if (elemContainer.hasClass('active')) {
      closeAllItems(container);
    } else {
      closeAllItems(container);
      openItem($this);
    }
  })
})()
