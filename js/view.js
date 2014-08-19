if (window.attachEvent) {
    window["event_load" + initialize] = initialize;
    window["load" + initialize] = function() {
        window["event_load" + initialize](window.event)
    };
    window.attachEvent("onload", window["load" + initialize])
} else {
    window.addEventListener("load", initialize, false)
}
var el_array = new Array();
function initialize() {
    var _1 = document.getElementById("main_body");
    if (_1) {
        removeClassName(_1, "no_guidelines");
        var _2 = getElementsByClassName(document, "*", "guidelines");
        if ((_1.offsetWidth <= 450) || (_2 == "")) {
            addClassName(_1, "no_guidelines", true)
        }
    }
    elements = getElementsByClassName(document, "*", "element");
    for (i = 0; i < elements.length; i++) {
        if (elements[i].type == "checkbox" || elements[i].type == "radio" || elements[i].type == "file") {
            elements[i].onclick = function() {
                safari_reset();
                addClassName(this.parentNode.parentNode, "highlighted", true)
            };
            elements[i].onfocus = function() {
                safari_reset();
                addClassName(this.parentNode.parentNode, "highlighted", true)
            };
            el_array.splice(el_array.length, 0, elements[i])
        } else {
            elements[i].onfocus = function() {
                safari_reset();
                addClassName(this.parentNode.parentNode, "highlighted", true)
            };
            elements[i].onblur = function() {
                removeClassName(this.parentNode.parentNode, "highlighted")
            }
        }
    }
    var _3 = navigator.userAgent.toLowerCase();
    var _4 = document.getElementsByTagName("body");
    if (_3.indexOf("safari") + 1) {
        addClassName(_4[0], "safari", true)
    }
    if (_3.indexOf("firefox") + 1) {
        addClassName(_4[0], "firefox", true)
    }
}
function safari_reset() {
    for (var i = 0; i < el_array.length; i++) {
        removeClassName(el_array[i].parentNode.parentNode, "highlighted")
    }
}
function getElementsByClassName(_6, _7, _8) {
    var _9 = (_7 == "*" && _6.all) ? _6.all: _6.getElementsByTagName(_7);
    var _a = new Array();
    _8 = _8.replace(/\-/g, "\\-");
    var _b = new RegExp("(^|\\s)" + _8 + "(\\s|$)");
    var _c;
    for (var i = 0; i < _9.length; i++) {
        _c = _9[i];
        if (_b.test(_c.className)) {
            _a.push(_c)
        }
    }
    return (_a)
}
function removeClassName(_e, _f) {
    if (_e.className) {
        var _10 = _e.className.split(" ");
        var _11 = _f.toUpperCase();
        for (var i = 0; i < _10.length; i++) {
            if (_10[i].toUpperCase() == _11) {
                _10.splice(i, 1);
                i--
            }
        }
        _e.className = _10.join(" ")
    }
}
function addClassName(_13, _14, _15) {
    if (_13.className) {
        var _16 = _13.className.split(" ");
        if (_15) {
            var _17 = _14.toUpperCase();
            for (var i = 0; i < _16.length; i++) {
                if (_16[i].toUpperCase() == _17) {
                    _16.splice(i, 1);
                    i--
                }
            }
        }
        _16[_16.length] = _14;
        _13.className = _16.join(" ")
    } else {
        _13.className = _14
    }
}

$(function(){
    $(".shopItem_add").click(function(){
        var hasData = false;
        var maxNum = parseInt($(this).prev(".shopItem_num").attr("data-max"));
        var elementId = parseInt($(this).prev(".shopItem_num").attr("data-element-id"));
        var newid = $(this).prev(".shopItem_num").attr("data-newid");
        var num = parseInt($(this).prev(".shopItem_num").val());
        var f_shoppingItem = $(this).closest(".f_shoppingItem");

        var fname = f_shoppingItem.find(".shopItem_name").text();
        var fprice = parseFloat(f_shoppingItem.find(".shopItem_price").text().substr(1));

        num++;
        if(num > maxNum){
            alert("此项最多只能选择"+maxNum+"个商品");
            return false;
        }

        $(".f_productslist .f_productitem").each(function(){
            var dataid = $(this).attr("data-id");    
            if(dataid == newid){
                hasData = true;
                return false;
            }
        });

        if(hasData){
            var item = $(".f_productslist").find(".f_productitem[data-id='"+newid+"']");
            item.find(".fp_num").text(num);
            var tmpPrice = parseFloat(item.find(".fp_price").text());
            item.find(".fp_price").text((tmpPrice + fprice).toFixed(2));
            item.find(".elementid").val(newid+"||"+num+"||"+fprice);
        }
        else{
            var pl = '<li class="f_productitem" data-id="'+newid+'"><span class="fp_name">'+fname+'</span>'+
                     '<span class="fp_num">'+num+'</span><span class="fp_price">'+fprice.toFixed(2)+'</span><input type="hidden" class="elementid" name="element_'+elementId+'[]" value="'+newid+'||'+num+'||'+fprice+'"></li>';
            $(".f_productslist").append(pl);
        }

        $(".li_cart").removeClass("li_cart");

        var total = 0;
        $(".f_productslist .f_productitem").each(function(){
            console.log(parseFloat($(this).find(".fp_price").text()));
            total += parseFloat($(this).find(".fp_price").text());
        });

        $("#li_cart .f_totalprice").text("￥"+total.toFixed(2));
        $(this).prev(".shopItem_num").val(num);
    });

    $(".shopItem_remove").click(function(){
        var newid = $(this).next(".shopItem_num").attr("data-newid");
        var num = parseInt($(this).next(".shopItem_num").val());
        var elementId = parseInt($(this).next(".shopItem_num").attr("data-element-id"));
        var f_shoppingItem = $(this).closest(".f_shoppingItem");
        var fprice = parseFloat(f_shoppingItem.find(".shopItem_price").text().substr(1));

        if(num == 0){
            return false;
        }

        num--;
        $(this).next(".shopItem_num").val(num);

        var item = $(".f_productslist").find(".f_productitem[data-id='"+newid+"']");
        item.find(".fp_num").text(num);
        var tmpPrice = parseFloat(item.find(".fp_price").text());
        item.find(".fp_price").text((tmpPrice - fprice).toFixed(2));
        

        item.find(".elementid").val(newid+"||"+num+"||"+fprice);
        var total = parseFloat($("#li_cart .f_totalprice").text().substr(1));

        $("#li_cart .f_totalprice").text("￥"+(total - fprice).toFixed(2));

        if(num == 0){
            $(".f_productslist").find(".f_productitem[data-id='"+newid+"']").remove();
        }

        checkHasProduct();
        
    });

    $(".shopItem_num").blur(function(){
        var hasData = false;
        var newid = $(this).attr("data-newid");
        var num = parseInt($(this).val());
        var maxNum = parseInt($(this).attr("data-max"));
        var f_shoppingItem = $(this).closest(".f_shoppingItem");
        var elementId = parseInt($(this).attr("data-element-id"));
        var fprice = parseFloat(f_shoppingItem.find(".shopItem_price").text().substr(1));
        var fname = f_shoppingItem.find(".shopItem_name").text();

        if(num < 0){
            return false;
        }

        if(num > maxNum){
            alert("此项最多只能选择"+maxNum+"个商品");
            return false;
        }

        $(".f_productslist .f_productitem").each(function(){
            var dataid = $(this).attr("data-id");    
            if(dataid == newid){
                hasData = true;
                return false;
            }
        });

        if(hasData){
            var item = $(".f_productslist").find(".f_productitem[data-id='"+newid+"']");
            item.find(".fp_num").text(num);
            //var tmpPrice = parseFloat(item.find(".fp_price").text());
            item.find(".fp_price").text((num * fprice).toFixed(2));
            item.find(".elementid").val(newid+"||"+num+"||"+fprice);
        }
        else{
            var pl = '<li class="f_productitem" data-id="'+newid+'"><span class="fp_name">'+fname+'</span>'+
                     '<span class="fp_num">'+num+'</span><span class="fp_price">'+(num * fprice).toFixed(2)+'</span><input type="hidden" class="elementid" name="element_'+elementId+'[]" value="'+newid+'||'+num+'||'+fprice+'"></li>';
            $(".f_productslist").append(pl);
        }

        $(".li_cart").removeClass("li_cart");

        var total = 0;
        $(".f_productslist .f_productitem").each(function(){
            console.log(parseFloat($(this).find(".fp_price").text()));
            total += parseFloat($(this).find(".fp_price").text());
        });

        $("#li_cart .f_totalprice").text("￥"+total.toFixed(2));

        if(num === 0){
            $(".f_productslist").find(".f_productitem[data-id='"+newid+"']").remove();
        }

        checkHasProduct();

    });

    function checkHasProduct(){
        if($(".f_productslist .f_productitem").length == 0){
            $("#li_cart").addClass("li_cart");
        }
    }
});
