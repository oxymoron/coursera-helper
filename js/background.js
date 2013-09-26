/**
 * Developer: Andrey Zubkov
 * Date: 26.09.13
 */

function collectData(callback){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'collect'}, function(response) {
            callback(response);
        });
    });
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if (request.action == 'activate'){
        chrome.pageAction.show(sender.tab.id);
    }
});
