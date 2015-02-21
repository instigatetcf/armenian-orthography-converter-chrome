(function(){
    if(mashtotsConfig.isOnlyFields){
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
    if(mashtotsConfig.isSavePages){
        localStorage.mashtotsIsSavePages = true;
        localStorage.mashtotsIsOnlyFields = mashtotsConfig.isOnlyFields;
        localStorage.mashtotsAction = mashtotsConfig.action;
    }
    switch(mashtotsConfig.action) {
        case 'toMashtots':
            mashtots.sovietToMashtots(document.body, undefined, filters);
            break;
        case 'toSoviet':
            mashtots.mashtotsToSoviet(document.body, undefined, filters);
            break;
        case 'removeSavedData':
            localStorage.removeItem('mashtotsIsSavePages');
            localStorage.removeItem('mashtotsIsOnlyFields');
            localStorage.removeItem('mashtotsAction');
            break;
    }
})();