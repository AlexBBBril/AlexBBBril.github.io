function getID($id){
    if(document.getElementById($id)) return document.getElementById($id);
    else return false;
}

window.onload = function(){

    if( getID('welcome') ){

        setTimeout( function(){
            showElem(getID('main'));
        }, 500 );

        setTimeout( function(){
            showElem(getID('welcome'));
        }, 1000 );

        setTimeout( function(){
            showElem(getID('contact'));
        }, 1500 );

        function showElem(elem){
            var opacity = +elem.style.opacity;

            elem.style.opacity = 0;

            var int = setInterval(function(){
                opacity = +(opacity + 0.01).toFixed(2);
                elem.style.opacity = opacity;

                if( opacity == 1 ){
                    clearInterval(int)
                }
            }, 2);
        }

    }


};