(function(){
    function convert(element){
        switch(localStorage.mashtotsAction) {
            case 'toMashtots':
                mashtots.sovietToMashtots(element, undefined, filters);
                break;
            case 'toSoviet':
                mashtots.mashtotsToSoviet(element, undefined, filters);
                break;
        }
    }
    if(localStorage.mashtotsIsSavePages){
        if(localStorage.mashtotsIsOnlyFields == 'true'){
            var filters = {
                'textarea':null,
                'input': {
                    'type': ['text', 'search', 'url']
                },
                'div': {
                    'contenteditable': 'true'
                },
                'iframe': {
                    '$function': function(element){
                        try {
                            var doc = element.contentDocument || element.contentWindow.document;
                            var isDesignModeOn = doc.designMode == 'on';
                            var isContentEditable = doc.getElementsByTagName('body')[0].getAttribute('contenteditable') == 'true';
                            return isDesignModeOn || isContentEditable ? true : false;
                        }
                        catch(e){
                            return false;
                        }
                    }
                }
            };
        }
        convert(document.body);
        window.addEventListener('hashchange', function(){
            convert(document.body);
        });
        document.addEventListener('change', function(e){
            conver(e.target);
        }, true);
    }
})();
