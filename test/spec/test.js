/*global describe, it */
'use strict';
(function () {
  var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1,
      imageContainers = {
        big: { 
          image: document.getElementsByClassName('big')[0], 
          width: document.getElementsByClassName('big')[0].clientWidth * pixelRatio 
        },
        small: { 
          image: document.getElementsByClassName('small')[0], 
          width: document.getElementsByClassName('small')[0].clientWidth * pixelRatio
        }
      },
      $bigImg,
      $smallImg;

  before(function(){
    imageContainers.big.status = responsiveImages.lazyloadImage(imageContainers.big.image);
    imageContainers.small.status = responsiveImages.lazyloadImage(imageContainers.small.image);

    $bigImg = $('.lazy-load.big');
    $smallImg = $('.lazy-load.small');
  });
  
  describe('noscript', function () {
    it('should be replaced with img', function () {
      expect($('noscript', $bigImg)).to.have.length(0);
      expect($('> img', $bigImg)).to.have.length(1);
    });
  });

  describe('images', function () {
    it('should be loaded', function() {
      expect(imageContainers.big.status).to.be.object;
      expect(imageContainers.small.status).to.be.object;
    });

    it('should choose breakpoint based on container width', function () {
      expect(imageContainers.big.width).to.be.above(imageContainers.big.status.width);
      expect(imageContainers.small.width).to.be.above(imageContainers.small.status.width);
    });
  });

  describe('small image', function() {
    it('should be smaller than big', function() {
      expect(imageContainers.small.width).to.be.at.most(imageContainers.big.width);
      expect(imageContainers.small.status.width).to.be.at.most(imageContainers.big.status.width);
      expect($smallImg.width()).to.be.below($bigImg.width());
    });
  });

})();
