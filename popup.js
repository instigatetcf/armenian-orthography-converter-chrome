window.onload = function(){
    if(localStorage.mashtotsIsOnlyFiels == 'true'){
        document.getElementById('isonlyfields').checked = true;
    }
    if(localStorage.mashtotsIsSavePages == 'true'){
        document.getElementById('issavepages').checked = true;
    }
    if(localStorage.action){
        document.getElementById('action').value = localStorage.action;
    }
    document.getElementById('convert').addEventListener('click', function(){
        injection({
            'action': document.getElementById('action').value,
            'isOnlyFields': document.getElementById('isonlyfields').checked,
            'isSavePages': document.getElementById('issavepages').checked
        });
    });
    document.getElementById('isonlyfields').addEventListener('click', function(){
        localStorage.mashtotsIsOnlyFiels = this.checked
    });
    document.getElementById('issavepages').addEventListener('click', function(){
        localStorage.mashtotsIsSavePages = this.checked
    });
    document.getElementById('action').addEventListener('change', function(){
        localStorage.action = this.value
    });
    chrome.tabs.onUpdated.addListener(function(tabId){
        /*
        injection({
            'action': 'toMashtots',
            'isOnlyFields': document.getElementById('isonlyfields').checked,
            'isSavePages': document.getElementById('issavepages').checked
        });
        */
    });
    function injection(config) {
        chrome.tabs.getSelected(null, function(tab){
            chrome.tabs.executeScript(tab.id, {
                code: 'var mashtotsConfig = ' + JSON.stringify(config) + ';'
            }, function(){
                chrome.tabs.executeScript(tab.id, {
                    file: "injection.js"
                });
            });
        });
    }
};