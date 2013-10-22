var responsiveImages = function() {
    var breakpoints = [
        { name: 'x-high',   width: 1200},
        { name: 'high',     width: 992 },
        { name: 'medium',   width: 768 },
        { name: 'small',    width: 480 },
        { name: 'x-small',    width: 0 }
    ],

    getImageVersion = function(containerWidth) {
        var devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1,
            width = (containerWidth ? containerWidth : window.innerWidth) * devicePixelRatio,
            breakpointsLen = breakpoints.length,
            i;

        for(i = 0; i < breakpointsLen; i++){
            if(width > breakpoints[i].width){
                return breakpoints[i];
                break;
            }
        }
    },

    lazyloadImage = function (imageContainer) {
        if (!imageContainer || !imageContainer.children) {
            return;
        }
        var img = imageContainer.children[0];
        if (img) {
            var imageVersion = getImageVersion(imageContainer.clientWidth);
            var imgSRC = img.getAttribute('data-src-' + imageVersion.name);
            var altTxt = img.getAttribute('data-alt');
            if (imgSRC) {
                var imageElement = new Image();
                imageElement.src = imgSRC;
                imageElement.setAttribute('alt', altTxt ? altTxt : '');
                imageContainer.appendChild(imageElement);
                imageContainer.removeChild(imageContainer.children[0]);

                return imageVersion;
            }
        }
        
        return false;
    },

    lazyloadImages = function(imageContainers){
        for (var i = 0; i < imageContainers.length; i++) {
            lazyloadImage(imageContainers[i]);
        }
    };

    return {
        lazyloadImages: lazyloadImages,
        lazyloadImage: lazyloadImage
    }
}();