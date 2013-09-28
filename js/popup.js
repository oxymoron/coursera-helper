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

    function minToTime(min){
        return format("{0}:{1}", Math.floor(min / 60), min % 60);
    }

    function drawChart(week, x, y, rad){
        var r = Raphael("chart" + week.number),
            cr = "#F7FF24",
            cg = "#0d0";
        if (week.len == week.vlen){
            r.piechart(x, y, rad, [1], {colors: [cg], strokewidth: 0});
        }else if (week.vlen == 0){
            r.piechart(x, y, rad, [1], {colors: [cr], strokewidth: 0});
        }else{
            r.piechart(x, y, rad,
                [week.vlen, week.len - week.vlen], {colors: [cg, cr], strokewidth: 0, matchColors : true});
        }
    }

    function showData(data){
        $('body').append('<ul>');
        for (var i = 0; i < data.length; i++) {
            var week = data[i];
            $("ul").append(format(
                '<li>' +
                    '<div id="chart{3}" class="chart"></div>' +
                    '<div class="info">'+
                        '<div class="header">{0}</div>' +
                        '<div class="details">Total:<span>{2}</span></div>' +
                        '<div class="details">Viewed:<span>{1}</span></div>' +
                    '</div>'+
                    '<div class="stat">'+
                        '<div class="stat-wrap">'+
                            '<div class="percent">{4}%</div>' +
                            '<div class="values">{5} / {6}</div>' +
                        '</div>'+
                    '</div>'+
                '</li>',
                week.title,
                minToTime(week.vlen),
                minToTime(week.len),
                week.number,
                Math.floor(week.vlen / week.len * 100),
                week.viewedCount,
                week.itemsCount
            ));
            drawChart(week, 30, 30, 25);
        }
        $("body").append('<footer>Author: <a href="http://www.linkedin.com/in/andreyzubkov" target="_blank">Andrey Zubkov</a></footer>');
    }

    chrome.extension.getBackgroundPage().collectData(showData);

});
