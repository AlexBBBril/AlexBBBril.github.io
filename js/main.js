function getID( doc, $id ){
    doc = doc || document;
    if(doc.getElementById($id)) return doc.getElementById($id);
    else return false;
}

window.onload = function(){

    (function(){
        var doc = document;
        if( getID(doc, 'welcome') ){
            var main     =  getID(doc, 'main'),
                welcome  =  getID(doc, 'welcome'),
                contact  =  getID(doc, 'contact');


            setTimeout( function(){
                animate({
                    duration: 500,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        main.style.opacity = progress ;
                    }
                });
            }, 500 );

            setTimeout( function(){
                animate({
                    duration: 1000,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        welcome.style.opacity = progress ;
                    }
                });
            }, 1200 );

            setTimeout( function(){
                animate({
                    duration: 500,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        contact.style.opacity = progress ;
                    }
                });

                var className = getID(doc, 'contact').className;
                getID(doc, 'contact').className = className + " transition";
            }, 1800 );
        }
    })();


    function animate(options) {
        var start = performance.now();

        requestAnimationFrame(function animates(time) {
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;
            var progress = options.timing(timeFraction);

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animates);
            }
        });
    }

};



















