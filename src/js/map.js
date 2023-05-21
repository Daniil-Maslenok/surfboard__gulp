(function () {
  let myMap;

  const init = () => {
    myMap = new ymaps.Map("map", {
      center: [55.751792, 37.578022],
      zoom: 14,
      controls: []
    });

    const needPlace = new ymaps.Placemark([55.751792, 37.578022], {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/marker.svg',
      iconImageSize: [58, 73],
      iconImageOffset: [-3, -42]
    });

    myMap.geoObjects.add(needPlace);

    myMap.behaviors.disable('scrollZoom');
  }

  ymaps.ready(init);
})()