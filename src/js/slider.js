// const slider = $(".products");
// const buttons = $(".product-slider__arrow");
// const items = $(".products__item")

// const sliderTranform = (to) => {
//   const productsItem = $(".products__item")
//   const width = productsItem.width();
//   const currentPosition = Math.abs(parseInt(slider.css('left')));

//   let i = Math.abs(0);

//   if (to == "right") {
//     if (currentPosition == 0) {
//       i = 1;
//     } else if (currentPosition > 0 && currentPosition < width * (items.length - 1)) {
//       i = currentPosition / width + 1
//     };
//   } else {
//     if (currentPosition == 0) {
//       i = (items.length - 1)
//     } else if (currentPosition > 0) {
//       i = currentPosition / width - 1
//       console.log(currentPosition);
//     }
//   }

//   slider.css({
//     left: `-${width * i}px`
//   })

// }

// $(buttons).each((ndx, item) => {
//   const eqBtn = buttons[ndx];

//   $(eqBtn).click(e => {
//     e.preventDefault();
//     if ($(eqBtn).hasClass("product-slider__arrow--slider-left")) {
//       sliderTranform("left");
//     } else {
//       sliderTranform("right");
//     }
//   })
// })


const slider = $(".products").bxSlider({
  pager: false,
  controls: false
})

$('.product-slider__arrow--slider-left').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
})

$('.product-slider__arrow--slider-right').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});