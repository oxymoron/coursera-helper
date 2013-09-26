/**
 * Developer: Andrey Zubkov
 * Date: 26.09.13
 */

$(function(){

    function format(str){
        var args = Array.prototype.slice.call(arguments,1);
        return str.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }

    function showData(data){
        var ul = $('body').append('<ul>');
        for (var i = 0; i < data.length; i++) {
            var week = data[i];
            ul.append(format("<li>{0} ({1}/{2} mins)</li>", week.title, week.vlen, week.len));
        }
    }

    chrome.extension.getBackgroundPage().collectData(showData);
});
