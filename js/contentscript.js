/*
 * Developer: Andrey Zubkov
 * Date: 26.09.13
 */

$(function(){

    function collectData(){
        var data = [];
        $(".course-item-list-header").each(function(index,el){
            var title = $(el).find('h3').text();
            var match = /[IVX]+\.(.+)\(Week ([0-9]+)/.exec(title);
            var items = [];
            $(el).next().find('li').each(function(itemIndex, itemEl){
                var t = $(itemEl).children('a').text();
                var m = /\W*([^\(]+)\(([0-9]+) min\)/.exec(t);
                items.push({
                    title: m[1],
                    len: parseInt(m[2]),
                    viewed: $(itemEl).hasClass('viewed')
                })
            });
            data.push({
                title: match[1],
                week: parseInt(match[2]),
                items: items
            });
        });
        return data;
    }

    function groupByWeek(data){
        var map = {};
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var w = d.week;
            if (!map[w]) map[w] = {number: w, title: 'Week ' + w, sections: []};
            delete d["week"];
            map[w].sections.push(d);
        }
        var result = [];
        for (var key in map){
            var week = map[key];
            week.len = 0;
            week.vlen = 0;
            for (var i = 0; i < week.sections.length; i++){
                var section = week.sections[i];
                section.len = 0;
                section.vlen = 0;
                for (var j = 0; j < section.items.length; j++){
                    var item = section.items[j];
                    section.len += item.len;
                    if(item.viewed) section.vlen += item.len;
                }
                week.len += section.len;
                week.vlen += section.vlen;
            }
            result.push(week);
        }
        result.sort(function(a,b){
            return a.number - b.number;
        });
        return result;
    }

    chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
        if (request.action == 'collect'){
            sendResponse(groupByWeek(collectData()));
        }
    });

    chrome.extension.sendMessage({action: 'activate'});
});
