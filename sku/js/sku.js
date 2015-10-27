var data = {
    'A8 A0 90': {type: '普'},
    'F0 50 30': {type: '火'},
    '38 98 F8': {type: '水'},
    '78 C8 50': {type: '草'},
    'F8 C0 30': {type: '電'},
    '58 C8 E0': {type: '冰'},
    'A0 50 38': {type: '斗'},
    'B0 58 A0': {type: '毒'},
    'D0 B0 58': {type: '地'},
    '98 A8 F0': {type: '飛'},
    'F8 70 A0': {type: '超'},
    'A8 B8 20': {type: '蟲'},
    'B8 A0 58': {type: '岩'},
    '60 60 A0': {type: '鬼'},
    '78 60 E0': {type: '龍'},
    '70 58 48': {type: '惡'},
    'A8 A8 C0': {type: '鋼'},
    'F0 A8 F8': {type: '妖'}
};


var keys = [
    ['38', '58', '60', '70', '78', '98', 'A0', 'A8', 'B0', 'B8', 'D0', 'F0', 'F8'],
    ['50', '58', '60', '70', '98', 'A0', 'A8', 'B0', 'B8', 'C0', 'C8'],
    ['20', '30', '38', '48', '50', '58', '90', 'A0', 'C0', 'E0', 'F0', 'F8']
];


var init = function () {
    for (var i = 0; i < keys.length; i++) {
        var row = $('<div></div>').attr({"rowNum": i, class: "row" + i + " " + "vitta"}).hover(function (event) {
            $('.vitta').addClass('unhover');
            $(this).removeClass('unhover');
            //添加滑动效果
           //var slider=$(this).find('.slider');
           // console.log(event.pageX,$('.row0').offset().left)
           // slider.css({left:event.pageX-$('.row0').offset().left})


        }, function () {
            $('.vitta').removeClass('unhover');

        });
        for (var j = 0; j < keys[i].length; j++) {
            var x = $('<i></i>').attr({
                type: "button",
                class: "sku",
                "attr_id": keys[i][j],
                "value": keys[i][j]
            }).hover(function () {
                //添加滑动效果
                var slider=$(this).siblings('.slider');
                var left=$(this).offset().left;

                timer = window.setTimeout(function(){
                    //console.log(left,$('.row0').offset().left)
                    slider.css({left:left-$('.row0').offset().left});
                    slider.css({'opacity':0.8,'visibility':'visible'});},100);



                if (!$(this).attr('disable')) {
                    $(this).parent().css({'background-color':getPartColor($(this))});
                }
            },function(){
                if(timer){
                    window.clearTimeout(timer);}
                $(this).parent().css({'background-color':'#fff'});
            });
            row.append(x);
        }
        var choose = $('#box').append(row);
    }
    $('.vitta').prepend($('<div class="slider"></div>'));
};


init();

var select = [];//每行选择的颜色

$('.sku').each(function () {
    var self = $(this);
    var attr_id = self.attr('attr_id');
    // if(!SKUResult[attr_id]) {
    //     self.attr('disabled', 'disabled');
    // }
}).click(function () {

    var thisRow = false;
    var self = $(this);
    console.log(self);
    if (self.hasClass('bh-sku-selected')) {
        select[self.parent().attr('rowNum')] = undefined;
        self.removeClass('bh-sku-selected');
        thisRow = true;
    }

    else {

        select[self.parent().attr('rowNum')] = self.attr("attr_id");
        self.siblings('.bh-sku-selected').removeAttr('disabled').removeClass('disabled');

        self.addClass('bh-sku-selected').siblings().removeClass('bh-sku-selected');


        var selectedObjs = $('bh-sku-selected');
        $(".sku").not(selectedObjs).not(self).each(function () {

// $(this).addClass('bh-sku-selected');
        });
    }

    req(self, thisRow);


//选够三个显示颜色
    if (select[0] != undefined && select[1] != undefined && select[2] != undefined) {

        animateStart();

    }
});


var SKUResult = [];
var getPartColor = function (item) {
    var colorPart;
    switch (item.parent().index()) {
        case 0:
            colorPart = '#' + item.attr('attr_id') + '0000';
            break;
        case 1:
            colorPart = '#00' + item.attr('attr_id') + '00';
            break;
        case 2:
            colorPart = '#0000' + item.attr('attr_id');
            break;
    }
    return colorPart;
};
//判断是否可点
var req = function (item, thisRow) {

    item.parent().css({'background-color': getPartColor(item)});
    //若r g b 其中一个已选 则判断是否有匹配的sku
    for (var j in data) {
        var bingo = true;
        for (var i = 0; i < 3; i++) {
            if (!((select[i] == undefined) || j.split(' ')[i] == select[i]  )) {
                bingo = false;
                break;
            }
        }
        bingo ? SKUResult.push(j) : '';
    }


    var SKUResultTemp = [];
//这一行已点击
    if (thisRow == true) {

        //取消选择后要知道 其他行数之中有已选的行数中的其他元素是否解除锁定

        item.siblings().each(function () {


            $(this).removeAttr('disabled');//这行先全部解除锁定
            var selectT = item.parent().index();
            var bingo = false;
            for (var i in SKUResult) {
                // console.log($(this).attr('attr_id'));
                //若存在匹配的 则不变 不存在则设置为不可点
                //["98 A8 F0", "A8 A8 C0", "F0 A8 F8"] 的 第i (1) 个的第selectT (1)个 ‘98’
                if (SKUResult[i].split(' ')[selectT] == $(this).attr('attr_id')) {
                    bingo = true;
                    break;
                }
            }
            bingo ? '' : $(this).attr('disabled', 'disabled').addClass('disabled');

        })


    }


//另外两行
    for (var row = 0; row < 2; row++) {
        //无视这行已选部分 使用其他行的已选部分拼凑sku
        var SKUResultTemp = [];
        for (var j in data) {
            var bingo2 = true;
            for (var i = 0; i < 3; i++) {

                if (!(($(item.parent().siblings()[row]).index() == i) ||//无视这一行 即相当于这一行没选
                    (select[i] == undefined) ||   //这一行没选
                    j.split(' ')[i] == select[i]  )) {
                    bingo2 = false;
                    break;
                }
            }
            bingo2 ? SKUResultTemp.push(j) : '';
        }
        console.log(SKUResultTemp)
        $(item.parent().siblings()[row]).children().each(function () {
            $(this).removeAttr('disabled').removeClass('disabled');//其他两行先全部解除锁定
            var selectT = $(item.parent().siblings()[row]).index();
            var bingo = false;
            for (var i in SKUResultTemp) {

                // console.log($(this).attr('attr_id'));
                //若存在匹配的 则不变 不存在则设置为不可点
                //["98 A8 F0", "A8 A8 C0", "F0 A8 F8"] 的 第i (1) 个的第selectT (1)个 ‘98’
                if (SKUResultTemp[i].split(' ')[selectT] == $(this).attr('attr_id')) {
                    bingo = true;
                    break;
                }
            }
            bingo ? '' : $(this).attr('disabled', 'disabled').addClass('disabled');

        });

        SKUResultTemp.length = 0;
    }


    SKUResult.length = 0;
};
// req();


// var reqThisRow=function(item);


var animateStart = function () {
    console.log(select);
    var color = select.join('');
    var key = select.join(' ');

    var type = $('<div></div>').html(data[key].type);
    $('body').css('background-color', '#' + color);
    $('.type').html(data[key].type).css({opacity:'0'}).animate({opacity:'0.6'},1500);
    $('.shadow').remove();
    if(data[key].type=='火'){

        $('body').append($("<div></div>").addClass('shadow').addClass('fire-monkey'));
        $('body').append($("<div></div>").addClass('shadow').addClass('fire-dragon'));
        $('body').append($("<div></div>").addClass('shadow').addClass('monster-ball'));
        $('body').append($("<div class ='shadow monster-ball2'><div class ='monster-ball-up'></div><div class ='monster-ball-down'></div></div>"));
    }
};

(function(){
    $(".sku").addClass('down');
})();