(function () {
  const findBlockByNick = (nick) => {
    return $('.reviews__item').filter((ndx, item) => {
      return $(item).attr('data-link-rev') == nick;
    });
  };

  $('.reviews__switcher--link').click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-open-rev');
    const itemToShow = findBlockByNick(target);
    const needIcon = $this.closest('.reviews__switcher-item');

    itemToShow.addClass('active').siblings().removeClass('active');;
    needIcon.addClass('active').siblings().removeClass('active');
  });
})()
