function getID( doc, $id ){
    doc = doc || document;
    if(doc.getElementById($id)) return doc.getElementById($id);
    else return false;
}

window.onload = function(){

    (function(){

        var doc = document,
            isExistError = allowSend(),
            mailMatch = /^[-0-9a-zёа-я_\.]+@[-0-9a-zёа-я_^\.]+\.[a-zёа-я]{2,8}$/i,
            matchLink = /((https|http)(\:)*(\/)*)*(\S)+(((\.)|(\/)+\S)|(\S)|)*((\.)|(\/))+([a-zа-я]+)(\/*(\S))*((\/)*(\?)*(\S)+(\=|\&)*)*((\.)*(\S](\?|=)*)*())*/i,
            telephone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;


        function allowSend(){
            var error = false;
            return {
                setError: function(err){
                    error = err;
                },
                getError: function(){
                    return error;
                }
            }
        }

        if( getID(doc, 'welcome') ){
            var main       =  getID(doc, 'main'),
                welcome    =  getID(doc, 'welcome'),
                contact    =  getID(doc, 'contact'),
                formMail   =  getID(doc, 'form-mail'),
                closeForm  =  getID(doc, 'close-form'),
                formValue  =  doc.getElementsByClassName('form-value');

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

        contact.onclick = function(){
            var className = formMail.className,
                display = /display-none/;

            if( display.test(className)){
                className = className.replace("display-none", "");
                formMail.style.opacity = 0;
                formMail.className = className;

                animate({
                    duration: 500,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        formMail.style.opacity = progress ;
                        welcome.style.opacity = -progress ;
                        contact.style.opacity = -progress ;
                    }
                });
            }
        };

        main.onclick = function(event){
            var target      =  event.target,
                className   =  formMail.className;

            if( target == this && !/display-none/.test(className) ){
                formMail.className = className + " display-none";
                animate({
                    duration: 500,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        welcome.style.opacity = progress ;
                        contact.style.opacity = progress ;
                    }
                });
            }
        };

        closeForm.onclick = function(){
            var className   =  formMail.className;

            if( !/display-none/.test(className) ){
                formMail.className = className + " display-none";
                animate({
                    duration: 500,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        welcome.style.opacity = progress ;
                        contact.style.opacity = progress ;
                    }
                });
            }
        };

        formMail.onsubmit = function(){
            var self        =  this,
                className   =  this.className;

            for (var i = 0, max = formValue.length; i < max; i++) {
                var val = formValue[i].value;

                if( val == "" && this.getAttribute("data-type") != "phone" ){
                    this.value = "Поле должно быть заполнено";
                    this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    isExistError.setError(true);
                }
                if( val != "" && this.getAttribute("data-type") == "name" && matchLink.test(val) ){
                    this.value = "Извините, ссылки запрещены.";
                    this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    isExistError.setError(true);
                }
                if( val != "" && this.getAttribute("data-type") == "mail" && ! mailMatch.test(val) ){
                    this.value = "Неправильный ввод e-mail";
                    this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    isExistError.setError(true);
                    console.log("mail");
                }
                if( val != "" && this.getAttribute("data-type") == "phone" && ! telephone.test(val) ){
                    this.value = "Неправильный ввод телефона";
                    this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    isExistError.setError(true);
                }
                if( val != "" && this.getAttribute("data-type") == "message" && matchLink.test(val) ){
                    this.value =  "Извините, ссылки запрещены.";
                    this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    isExistError.setError(true);
                }

                if( formValue[i].className.indexOf("red-alert") != -1 ){
                    isExistError.setError(true);
                }else{
                    isExistError.setError(false);
                }

                if( isExistError.getError() === true ){
                    return false;
                }
                console.log(val);
            }


            setTimeout(function(){
                animate({
                    duration: 500,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        self.style.opacity    = -progress ;
                        welcome.style.opacity = progress ;
                        contact.style.opacity = progress ;
                    }
                });
                self.className = className + " display-none";
                self.reset();
            }, 500);
        };

        (function () {
            var sendMessage  =  getID(doc, "send-message"),
                oldValue     =  false;

            for (var i = 0, max = formValue.length; i < max; i++) {

                formValue[i].onblur = function(){
                    var val = this.value;
                    if( val == "" && this.getAttribute("data-type") != "phone" ){
                        this.value = "Поле должно быть заполнено";
                        this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    }
                    if( val != "" && this.getAttribute("data-type") == "name" && matchLink.test(val) ){
                        this.value = "Извините, ссылки запрещены.";
                        this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    }
                    if( val != "" && this.getAttribute("data-type") == "mail" && ! mailMatch.test(val) ){
                        this.value = "Неправильный ввод e-mail";
                        this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                        console.log("mail");
                    }
                    if( val != "" && this.getAttribute("data-type") == "phone" && ! telephone.test(val) ){
                        this.value = "Неправильный ввод телефона";
                        this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    }
                    if( val != "" && this.getAttribute("data-type") == "message" && matchLink.test(val) ){
                        oldValue   =  val;
                        this.value =  "Извините, ссылки запрещены.";
                        this.className = this.className.indexOf("red-alert") == -1 ?  this.className + " red-alert" : this.className;
                    }
                };
                formValue[i].onfocus = function(){
                    var className = this.className;
                    if( className.indexOf("red-alert") != -1 ){
                        className = className.replace("red-alert", "");
                        this.className = className;
                        this.value = "";
                    }
                    if( oldValue && this.getAttribute("data-type") == "message" ){
                        this.value = oldValue;
                        oldValue = false;
                    }
                };
            }
        })();

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



















