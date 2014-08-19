/*=============================================================================
#     FileName: machform.js
#         Desc:  
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-06-14 10:43:16
#      History:
=============================================================================*/


var JSON = function() {
    var m = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    s = {
        "boolean": function(x) {
            return String(x)
        },
        number: function(x) {
            return isFinite(x) ? String(x) : "null"
        },
        string: function(x) {
            if (/["\\\x00-\x1f]/.test(x)) {
                x = x.replace(/([\x00-\x1f\\"])/g,
                function(a, b) {
                    var c = m[b];
                    if (c) {
                        return c
                    }
                    c = b.charCodeAt();
                    return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                })
            }
            return '"' + x + '"'
        },
        object: function(x) {
            if (x) {
                var a = [],
                b,
                f,
                i,
                l,
                v;
                if (x instanceof Array) {
                    a[0] = "[";
                    l = x.length;
                    for (i = 0; i < l; i += 1) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == "string") {
                                if (b) {
                                    a[a.length] = ","
                                }
                                a[a.length] = v;
                                b = true
                            }
                        }
                    }
                    a[a.length] = "]"
                } else {
                    if (x instanceof Object) {
                        a[0] = "{";
                        for (i in x) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == "string") {
                                    if (b) {
                                        a[a.length] = ","
                                    }
                                    a.push(s.string(i), ":", v);
                                    b = true
                                }
                            }
                        }
                        a[a.length] = "}"
                    } else {
                        return
                    }
                }
                return a.join("")
            }
            return "null"
        }
    };
    return {
        copyright: "(c)2005 JSON.org",
        license: "http://www.crockford.com/JSON/license.html",
        stringify: function(v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == "string") {
                    return v;
                }
            }
            return null;
        },
        parse: function(a) {
            try {
                return ! (/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(a.replace(/"(\\.|[^"\\])*"/g, ""))) && eval("(" + a + ")");
            } catch(e) {
                return false;
            }
        }
    }
} ();

JJ = $;

JJ(document).ready(function() {
    load_tooltips();
    JJ("#statusPanel").ajaxStart(function() {
        JJ("#statusPanel").show("normal");
    });
    JJ("#statusPanel").ajaxStop(function() {
        JJ("#statusPanel").fadeOut("normal");
    });

    
    //添加商品按钮
    JJ("#element_product").click(function(){
        var dataid = $(this).attr("data-id");
        var editShopping_list = $(".prop_add_product[data-id='"+dataid+"']").find(".editShopping_list");
        editShopping_list.append(editShopping_list.find(".editShopping_item_meta").clone().attr("class", "editShopping_item").show());
        mbFileUpload();
    });

    JJ(".add-product-save").live('click', function(){
        var product = {};
        var dataid = $(this).closest(".prop_add_product").attr("data-id");

        product.pid = ((form_id === 0)) ? parseInt(dataid) + 1 : parseInt(dataid);

        console.log("pid:"+product.pid);

        var $editfield = $(this).parent().parent(); 
        product.shopping_name = $editfield.find(".shopping_name").find(":input").val();

        if(product.shopping_name == ""){
            $editfield.find(".errorinfo").show();
            return;
        }

        product.shopping_link = $editfield.find(".shopping_link").find(":input").val();
        product.shopping_price = $editfield.find(".shopping_price").find(":input").val();
        product.shopping_num = $editfield.find(".shopping_num").find(":input").val();
        product.uploadImageUrl = $editfield.parent().parent().find(".shoppingitem_edit .defaultimg").attr("src");
        //product.uploadImageUrl = uploadImageUrl;

        $editfield.parent().parent().find(".shoppingitem_preview").attr("mbid", product.newProductId);
        $editfield.parent().parent().find(".shoppingitem_preview > .previewimg >img").attr("src", product.uploadImageUrl);
        $editfield.parent().parent().find(".shoppingitem_preview > .previewinfo").text(product.shopping_name);
        $editfield.parent().parent().find(".shoppingitem_preview").show();
        $editfield.parent().parent().find(".shoppingitem_edit").hide();

        $("#li_" + dataid + " .shoppingList .empty").remove();

        var newid = $editfield.find(".newid").val();
        if(newid != 'no'){
            uploadData[newid] = product;
            product.newProductId = newid;
            $("#li_" + dataid + " .shoppingList .shopping-item[itemid='"+newid+"']").empty().append(tmpl("tmpl-shopping-item-update", product));
        }
        else{
            //数组的key,删除时使用
            product.newProductId = uploadData.push(product) - 1;
            $editfield.find(".newid").val(product.newProductId);
            $("#li_" + dataid + " .shoppingList").append(tmpl("tmpl-shopping-item", product));
        }

        console.log(product.newProductId);
        console.log(uploadData);
        console.log(JSON.stringify(uploadData));
    });

    JJ(".btn_canceledit").live('click', function(){
        $(this).closest(".editShopping_item").remove();
    });

    JJ(".shoppingitem_preview").live('click', function(){
        $(this).hide();
        $(this).parent().find(".shoppingitem_edit").show();
    });
    load_all();
});

function addProductToMain(){
    var o = {};
    o.url = $url;
    o.title = "";
    o.item = cid;
    o.pagelist = mbUtil.getPageList();
    $("#set-layout .upload-file ul").append(tmpl("tmpl-upload-item", o));
}

function mbFileUpload(){
    $('.input_file').fileupload({
        dataType: "json",
        url: 'upload.php',
        drop: function (e) {
            return false;
        },
        add: function (e, data) {
            var flag = false;
            if (data.files[0].size) {
                if (data.files[0].size < 2000000) {
                    $(this).attr('hasFile', true);
                    // $(this).parent().siblings('.errorinfo').text(data.files[0].name).css("color", "#333333");
                    flag = true;
                } else {
                    // $(this).siblings('p').css('color', '#B94A48');
                    $(this).parent().siblings('.uploadinfo').text('上传的文件太大了…').show().css('color', '#B94A48');
                }
            } else {
                $(this).attr('hasFile', true);
                // $(this).siblings('p').text(data.files[0].name).css("color", "#333333");
                flag = true;
            }
            if (flag) {
                data.submit();
            }
        },
        start: function (e, data) {
            $(this).parent().siblings('.uploadinfo').text('开始上传！').show().css('color', '#333');
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 90, 10);
            $(this).parent().siblings('.uploadinfo').text('上传中…' + progress + '%').show().css('color', '#333');
        },
        done: function (e, data) {
            // var uploadFlag = data.result.data.flag;
            var uploadFlag = data.result.files[0].url;
            if (uploadFlag) {
                uploadImageUrl = uploadFlag;
                $(this).parent().siblings('.uploadinfo').text('上传成功!').show().css('color', '#333');
                window.setTimeout((function ($ui) {
                    return function () {
                        $ui.parent().siblings('.uploadinfo').hide();
                    };
                })($(this)), 300);
                $(this).parent().parent().find(".defaultimg").attr("src", uploadFlag);

            } else {
                $(this).parent().siblings('.uploadinfo').text('上传失败...').show().css('color', '#333');
            }
            $(this).siblings('.progress').fadeOut();
        }
    });

}

function load_tooltips() {
    JJ(".tooltip").each(function(A) {
        JJ(this).click(function() { (JJ(this).next().attr("id") == "tooltip") ? remove_tooltip(this.nextSibling) : show_tooltip(this);
            return false
        })
    })
}
function show_tooltip(A) {
    if (JJ("#tooltip").length) {
        remove_tooltip("#tooltip")
    }
    var B = '<span onclick="remove_tooltip (this)" id="tooltip" style="display: none;"><b>' + A.title + "</b><em>" + A.rel + "</em></span>";
    JJ(B).insertAfter(A).show("normal")
}
function remove_tooltip(A) {
    JJ(A).fadeOut("normal",
    function() {
        JJ(this).remove();
    })
}
function prepare_form_property_values() {
    JJ("#form_title").val(main_form.data.name);
    JJ("#form_description").val(main_form.data.description);
    JJ("#form_password_data").val(main_form.data.password);
    JJ("#form_password_option").click(function() {
        if (JJ("#form_password").hasClass("hide")) {
            JJ("#form_password").removeClass("hide");
            update_form(tmp_form_password, "password");
            JJ("#form_password_data").val(tmp_form_password);
            JJ("#form_password_data").focus().select();
        } else {
            JJ("#form_password").addClass("hide");
            tmp_form_password = JJ("#form_password_data").val();
            update_form("", "password");
        }
    });
    if (main_form.data.password == "") {
        JJ("#form_password_option").attr("checked", "");
        JJ("#form_password").addClass("hide");
    } else {
        JJ("#form_password_option").attr("checked", "checked");
        JJ("#form_password").removeClass("hide");
    }
    if (main_form.data.unique_ip == 1) {
        JJ("#form_unique_ip").attr("checked", "checked");
    } else {
        JJ("#form_unique_ip").attr("checked", "");
    }
    if (main_form.data.captcha == 1) {
        JJ("#form_captcha").attr("checked", "checked");
    } else {
        JJ("#form_captcha").attr("checked", "");
    }
    if (main_form.data.review == 1) {
        JJ("#form_review").attr("checked", "checked");
    } else {
        JJ("#form_review").attr("checked", "");
    }
    if (main_form.data.redirect != "") {
        JJ("#form_success_message").addClass("hide");
        JJ("#form_redirect_url").removeClass("hide");
        JJ("#form_redirect_option").attr("checked", "checked");
        JJ("#form_redirect_url").val(main_form.data.redirect);
    } else {
        JJ("#form_redirect_url").addClass("hide");
        JJ("#form_success_message").removeClass("hide");
        JJ("#form_success_message_option").attr("checked", "checked");
        JJ("#form_success_message").val(main_form.data.success_message);
    }
}
var element_properties = function() {};
element_properties.prototype = {
    initialize: function(A) {
        this.id = A;
    },
    render: function() {
        JJ("#prop_phone_default").css("display", "none");
        JJ("#prop_time_noseconds").css("display", "none");
        JJ("#prop_default_country").css("display", "none");
        JJ("#prop_date_format").css("display", "none");
        JJ("#prop_access_control").css("display", "none");
        JJ("#prop_element_type").css("display", "none");
        JJ("#prop_randomize").css("display", "none");
        JJ("#list_buttons").css("display", "none");
        JJ("#prop_add_product").css("display", "none");
        JJ("#element_position").css("display", "none");
        JJ("#prop_default_value").css("display", "none");
        JJ("#prop_phone_format").css("display", "none");
        JJ("#prop_currency_format").css("display", "none");
        JJ("#prop_element_size").css("display", "none");
        JJ("#prop_name_format").css("display", "none");
        JJ("#prop_choices").css("display", "none");
        JJ("#prop_options").css("display", "none");
        JJ("#element_inactive").css("display", "none");
        JJ("#all_properties").css("display", "none");
        JJ("#element_label").val(ds.get(this.id, "title"));
        JJ("#mb_element_title").text(ds.get(this.id, "title"));
        for (var A = 0; A < components[ds.get(this.id, "type")].length; A++) {
            //console.log(components[ds.get(this.id, "type")][A]);
            this[components[ds.get(this.id, "type")][A]]();
        }
        JJ("#element_instructions").val(ds.get(this.id, "guidelines"));
        JJ("#element_position").html(parseInt(ds.get(this.id, "position")) + 1);
        JJ("#all_properties").css("display", "block");
        JJ("#element_position").css("display", "block");
        JJ("#list_buttons").css("display", "block");
        JJ("#element_label").select().focus()
    },
    types: function() {
        JJ("#prop_element_type").css("display", "block");
        if (ds.get(this.id, "is_db_live") == "1") {
            JJ("#element_type").attr("disabled", "disabled")
        } else {
            JJ("#element_type").attr("disabled", "")
        }
        var B = ds.get(this.id, "type");
        if (B == "name") {
            B = "simple_name";
        } else {
            if (B == "simple_phone") {
                B = "phone";
            } else {
                if (B == "europe_date") {
                    B = "date";
                }
            }
        }
        element_types = document.getElementById("element_type");
        for (var A = 0; A < element_types.options.length; A++) {
            if (element_types.options[A].value == B) {
                element_types.selectedIndex = A;
            }
        }
    },
    required: function() {
        JJ("#prop_options").css("display", "block");
        if (ds.get(active_element, "is_required") == "1") {
            JJ("#element_required").attr("checked", "checked");
        } else {
            JJ("#element_required").attr("checked", "");
        }
        var A = ds.get(active_element, "type");
        if (A == "checkbox" || A == "radio") {
            this.switch_unique("hide");
        } else {
            this.switch_unique("show");
        }
    },
    switch_unique: function(A) {
        if (A == "hide") {
            JJ("#element_unique").css("visibility", "hidden");
        } else {
            JJ("#element_unique").css("visibility", "visible");
        }
        var B = ds.get(active_element, "type");
        if (B == "radio" || B == "checkbox" || B == "select" || B == "simple_name" || B == "name" || B == "address" || B == "file") {
            JJ("#element_unique_span").css("display", "none");
        } else {
            JJ("#element_unique_span").css("display", "block");
        }
    },
    size: function() {
        JJ("#prop_element_size").css("display", "block");
        var B = ds.get(this.id, "size");
        field_sizes = document.getElementById("field_size");
        for (var A = 0; A < field_sizes.options.length; A++) {
            if (field_sizes.options[A].value == B) {
                field_sizes.selectedIndex = A;
            }
        }
    },
    choices: function() {
        JJ("#prop_choices").css("display", "block");
        JJ("#element_choices").html("");
        options = ds.get(this.id, "options");
        field_type = ds.get(this.id, "type");
        all_markup = new Array();
        for (var A = 0; A < options.length; A++) {
            el_val = options[A].option.replace(/\"/g, "&quot;");
            if (options[A].is_default == 1) {
                loc = "images/icons/star.gif";
                msg = "Default";
            } else {
                loc = "images/icons/stardim.gif";
                msg = "Make Default";
            }
            all_markup[A] = '<li><input id="choice' + A + '" class="text" type="text" autocomplete="off" value="' + el_val + "\" onkeyup=\"set_properties(this.value, 'choices', " + A + ')" onkeypress="choices_event(event,' + A + ')" /> <img class="button" src="images/icons/add.gif" alt="Add" title="Add" onclick="insert_choice(' + (A + 1) + ')" /> <img class="button" src="images/icons/delete.gif" alt="Delete" title="Delete" onclick="delete_checkbox(' + options[A].id + ", " + options[A].is_db_live + ", '" + field_type + "', " + A + ')" /> <img class="button" src="' + loc + '" alt="' + msg + '" title="' + msg + '" onclick="set_choice_default(' + A + ')" /></li>';
        }
        JJ("#element_choices").html(all_markup.join(""));
    },
    choices_sex: function() {
        JJ("#prop_choices").css("display", "block");
        JJ("#element_choices").html("");
        var options = ds.get(this.id, "sexs");
        var field_type = ds.get(this.id, "type");
        var all_markup = new Array();
        for (var A = 0; A < options.length; A++) {
            var el_val = options[A].option.replace(/\"/g, "&quot;");
            if (options[A].is_default == 1) {
                loc = "images/icons/star.gif";
                msg = "Default";
            } else {
                loc = "images/icons/stardim.gif";
                msg = "Make Default";
            }
            all_markup[A] = '<li><input id="choice_sex' + A + '" class="text" type="text" autocomplete="off" value="' + el_val + "\" onkeyup=\"set_properties(this.value, 'choices_sex', " + A + ')" onkeypress="choices_event_sex(event,' + A + ')" /> <img class="button" src="images/icons/add.gif" alt="Add" title="Add" onclick="insert_choice_sex(' + (A + 1) + ')" /> <img class="button" src="images/icons/delete.gif" alt="Delete" title="Delete" onclick="delete_checkbox_sex(' + options[A].id + ", " + options[A].is_db_live + ", '" + field_type + "', " + A + ')" /> <img class="button" src="' + loc + '" alt="' + msg + '" title="' + msg + '" onclick="set_choice_sex_default(' + A + ')" /></li>';
        }
        JJ("#element_choices").html(all_markup.join(""));
    },
    unique: function() {
        if (ds.get(active_element, "is_unique") == "1") {
            JJ("#element_unique").attr("checked", "checked");
        } else {
            JJ("#element_unique").attr("checked", "");
        }
    },
    is_private: function() {
        JJ("#prop_access_control").css("display", "block");
        if (ds.get(active_element, "is_private") == "1") {
            JJ("#fieldPrivate").attr("checked", "checked");
        } else {
            JJ("#fieldPublic").attr("checked", "checked");
        }
    },
    phone_default: function() {
        JJ("#prop_phone_default").css("display", "block");
        el_val = ds.get(this.id, "default_value");
        JJ("#element_phone_default1").val(el_val.substring(0, 3));
        JJ("#element_phone_default2").val(el_val.substring(3, 6));
        JJ("#element_phone_default3").val(el_val.substring(6, 10));
    },
    address_default: function() {
        JJ("#prop_default_country").css("display", "block");
        el_val = ds.get(this.id, "default_value");
        countries = document.getElementById("element_countries");
        for (var A = 0; A < countries.options.length; A++) {
            if (countries.options[A].value == el_val) {
                countries.selectedIndex = A;
            }
        }
    },
    randomize: function() {
        JJ("#prop_randomize").css("display", "block");
        if (ds.get(active_element, "constraint") == "random") {
            JJ("#element_random").attr("checked", "checked");
        } else {
            JJ("#element_not_random").attr("checked", "checked");
        }
    },
    product: function() {
        var product_id = this.id;
        var hasProductItem = false;

        JJ("#btn-add-product").css("display", "block");
        JJ("#element_product").attr("data-id", product_id);
        //JJ("#prop_add_product").attr("data-id", this.id);
        //JJ("#prop_add_product").css("display", "block");

        /*
        if($("#product-list").find(".prop_add_product").length === 0){
            $("#product-list").append(tmpl("tmpl-add-product", {"data_id" : product_id}));
            console.log("no found!");
            return;
        }
        */
        //console.log("=========exec!"+product_id);

        $("#product-list .prop_add_product").hide();

        $("#product-list .prop_add_product").each(function(){
            //console.log("+++++++found!"+$(this).attr("data-id"));
            if($(this).attr("data-id") == product_id){
                $(this).show();
                hasProductItem = true;
                return false;
            }
        });

        //console.log(hasProductItem);
        //点击商品时，如果右侧没有,增加一个li模板
        if(hasProductItem === false){
            $("#product-list").append(tmpl("tmpl-add-product", {"data_id" : product_id}));
        }
    },
    noseconds: function() {
        JJ("#prop_time_noseconds").css("display", "block");
        if (ds.get(active_element, "constraint") == "show_seconds") {
            JJ("#time_noseconds").attr("checked", "checked");
        } else {
            JJ("#time_noseconds").attr("checked", "");
        }
    },
    text_default: function() {
        JJ("#prop_default_value").css("display", "block");
        JJ("#element_default").val(ds.get(this.id, "default_value"));
    },
    date: function() {
        JJ("#prop_date_format").css("display", "block");
        date_type = ds.get(active_element, "type");
        dates = document.getElementById("date_type");
        for (var A = 0; A < dates.options.length; A++) {
            if (dates.options[A].value == date_type) {
                dates.selectedIndex = A;
            }
        }
    },
    name: function() {
        JJ("#prop_name_format").css("display", "block");
        if (ds.get(this.id, "is_db_live") == "1") {
            JJ("#name_format").attr("disabled", "disabled");
        } else {
            JJ("#name_format").attr("disabled", "");
        }
        name_type = ds.get(active_element, "type");
        name_format = document.getElementById("name_format");
        for (var A = 0; A < name_format.options.length; A++) {
            if (name_format.options[A].value == name_type) {
                name_format.selectedIndex = A;
            }
        }
    },
    phone: function() {
        JJ("#prop_phone_format").css("display", "block");
        phone_type = ds.get(active_element, "type");
        phone_format = document.getElementById("phone_format");
        for (var A = 0; A < phone_format.options.length; A++) {
            if (phone_format.options[A].value == phone_type) {
                phone_format.selectedIndex = A;
            }
        }
    },
    currency: function() {
        JJ("#prop_currency_format").css("display", "block");
        constraint = ds.get(active_element, "constraint");
        money_format = document.getElementById("money_format");
        for (var A = 0; A < money_format.options.length; A++) {
            if (money_format.options[A].value == constraint) {
                money_format.selectedIndex = A;
            }
        }
    }
};

var field = function() {};
field.prototype = {
    initialize: function(A) {
        this.id = A;
    },
    display: function() {
        this.li = document.createElement("li");
        this.generate_markup();
        this.li.id = "li_" + this.id;
        JJ(this.li).addClass("drag");
        if (ds.get(this.id, "is_private") == "1") {
            JJ(this.li).addClass("private");
        }
        return this.li;
    },
    selected: function() {
        JJ(this.li).addClass("current_edit");
    },
    unselect: function() {
        JJ(this.li).removeClass("current_edit");
    },
    generate_markup: function() {
        this.li.innerHTML = '<img id="arrow" src="images/icons/arrow.gif" alt="" class="arrow"><a href="#" class="hover_ready" onclick="return false;" title="点击编辑,拖拽可排序">' + this.field_label() + this[ds.get(this.id, "type")]() + "</a>" + this.element_actions();
    },
    field_label: function() {
        label_id = "title" + this.id;
        label_val = ds.get(this.id, "title");
        label_val = label_val.replace(/\n/g, "<br />");
        var B = "";
        if (ds.get(this.id, "is_required") == "1") {
            B = '<span class="req"> *</span>';
        }
        var A = '<label class="desc" id="' + label_id + '">' + label_val + B + "</label>";
        return A;
    },
    element_actions: function() {
        if (JJ.browser.msie) {
            style = 'style="margin-top: -18px"';
        } else {
            style = "";
        }
        return '<div class="element_actions" ' + style + '><img src="images/icons/duplicate.gif" alt="复制" title="复制" onclick="duplicate_element(' + this.id + ')"> <img src="images/icons/delete.gif" alt="Delete." title="删除" onclick="delete_element(' + this.id + ')"></div>';
    },
    text: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    xingming: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    zhiwei: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    dianhua: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    dizhi: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    city: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    tel: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    weixin: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    QQ: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    fax: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    company: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    textarea: function() {
        return '<div><textarea type="text" readonly="readonly" id="field' + this.id + '" class="textarea ' + ds.get(this.id, "size") + '" rows="" cols=""></textarea></div>';
    },
    checkbox: function() {
        element_options = ds.get(this.id, "options");
        var A = "";
        for (i = 0; i < element_options.length; i++) {
            el_val = element_options[i].option;
            if (el_val == "") {
                el_val = "&nbsp;";
            }
            if (element_options[i].is_default == 1) {
                checked = 'checked="checked"';
            } else {
                checked = "";
            }
            A = A + '<input class="checkbox" ' + checked + ' type="checkbox"><label class="choice">' + el_val + "</label>\n";
        }
        A = '<span id="field' + this.id + '">' + A + "</span>";
        return A;
    },
    select: function() {
        element_options = ds.get(this.id, "options");
        var A = "";
        for (i = 0; i < element_options.length; i++) {
            if (element_options[i].is_default == 1) {
                selected = 'selected="selected"';
            } else {
                selected = "";
            }
            A = A + "<option " + selected + ">" + element_options[i].option + "</option>";
        }
        A = '<div><select id="field' + this.id + '" class="select ' + ds.get(this.id, "size") + '">' + A + "</select></div>";
        return A;
    },
    radio: function() {
        element_options = ds.get(this.id, "options");
        console.log(element_options);
        var A = "";
        for (i = 0; i < element_options.length; i++) {
            el_val = element_options[i].option;
            if (el_val == "") {
                el_val = "&nbsp;";
            }
            if (element_options[i].is_default == 1) {
                name = "radiogroup" + this.id;
                checked = 'checked="checked"';
            } else {
                name = "radiogroup";
                checked = "";
            }
            A = A + '<input class="radio" name="' + name + '" ' + checked + ' type="radio"><label class="choice">' + el_val + "</label>\n";
        }
        A = '<span id="field' + this.id + '">' + A + "</span>";
        return A;
    },
    sex: function() {
        element_options = ds.get(this.id, "sexs");
        var A = "";
        for (i = 0; i < element_options.length; i++) {
            el_val = element_options[i].option;
            if (el_val == "") {
                el_val = "&nbsp;";
            }
            if (element_options[i].is_default == 1) {
                name = "sexgroup" + this.id;
                checked = 'checked="checked"';
            } else {
                name = "sexgroup";
                checked = "";
            }
            A = A + '<input class="radio" name="' + name + '" ' + checked + ' type="radio"><label class="choice">' + el_val + "</label>\n";
        }
        A = '<span id="field' + this.id + '">' + A + "</span>";
        return A;
    },

    name1: function() {
        return '<div><span><input readonly="readonly" class="text" size="2" type="text"><label>Title</label></span><span><input readonly="readonly" class="text" size="12" type="text"><label>First</label></span><span><input readonly="readonly" class="text" size="14" type="text"><label>Last</label></span><span><input readonly="readonly" class="text" size="3" type="text"><label>Suffix</label></span></div>';
    },
    name: function() {
        return '<div><span><input readonly="readonly" class="text" size="8" type="text"></span></div>';
    },
    simple_name: function() {
        return '<div><span><input readonly="readonly" class="text" size="12" type="text"><label>First</label></span><span><input readonly="readonly" class="text" size="14" type="text"><label>Last</label></span></div>';
    },
    date: function() {
        return '<div><span><input readonly="readonly" class="text" size="2" type="text"> / <label>MM</label></span><span><input readonly="readonly" class="text" size="2" type="text"> / <label>DD</label></span><span><input readonly="readonly" class="text" size="4" type="text"> <label>YYYY</label></span><img src="images/icons/calendar.gif" alt="Pick Date." class="icon"></div>';
    },
    europe_date: function() {
        return '<div><span><input readonly="readonly" class="text" size="2" type="text"> / <label>DD</label></span><span><input readonly="readonly" class="text" size="2" type="text"> / <label>MM</label></span><span><input readonly="readonly" class="text" size="4" type="text"> <label>YYYY</label></span><img src="images/icons/calendar.gif" alt="Pick Date." class="icon"></div>';
    },
    time: function() {
        if (ds.get(this.id, "constraint") == "show_seconds") {
            return '<div id="time' + this.id + '"><span><input readonly="readonly" class="text" size="2" type="text"> : <label>HH</label></span><span><input readonly="readonly" class="text" size="2" type="text"> : <label>MM</label></span><span><input readonly="readonly" class="text" size="2" type="text"><label>SS</label></span><span><select class="select" style="width: 4em;"><option>AM</option><option>PM</option></select><label>AM/PM</label></span></div>';
        } else {
            return '<div id="time' + this.id + '"><span><input readonly="readonly" class="text" size="2" type="text"> : <label>HH</label></span><span><input readonly="readonly" class="text" size="2" type="text"><label>MM</label></span><span><select class="select" style="width: 4em;"><option>AM</option><option>PM</option></select><label>AM/PM</label></span></div>';
        }
    },
    product: function() {
        return '<div class="shopping"><ul class="shoppingList"><li class="shopping-item empty">暂时没有商品</li></ul></div>';
    },
    phone: function() {
        return '<div><span><input readonly="readonly" class="text" size="3" type="text"> - <label>(###)</label></span><span><input readonly="readonly" class="text" size="3" type="text"> - <label>###</label></span><span><input readonly="readonly" class="text" size="4" type="text"><label>####</label></span></div>';
    },
    simple_phone: function() {
        return '<div class="full"><input readonly="readonly" id="field' + this.id + '" class="text medium" type="text"></div>';
    },
    address: function() {
        return '<div class="full"><div class="full"><input readonly="readonly" class="text large" type="text"><label>Street Address</label></div><div class="full"><input readonly="readonly" class="text large" type="text"><label>Address Line 2</label></div><div class="left"><input readonly="readonly" class="text medium" type="text"><label>City</label></div><div class="right"><input readonly="readonly" class="text medium" type="text"><label>State / Province / Region</label></div><div class="left"><input readonly="readonly" class="text medium" type="text"><label>Zip / Postal Code</label></div><div class="right"><select class="select medium" name=""><option value=""></option></select><label>Country</label></div></div>';
    },
    money: function() {
        currency = ds.get(this.id, "constraint");
        symbol = "&#165;";
        main_curr = "人民币";
        sub_curr = "";
        major = "15";
        decimal = "";

        if (currency == "Dollars") {
            symbol = "$";
            main_curr = "Dollars";
            sub_curr = "Cents";
            major = "10";
            decimal = " . ";
        }
        if (currency == "euro") {
            symbol = "&#8364;";
            main_curr = "Euros";
            sub_curr = "Cents";
        }
        if (currency == "pound") {
            symbol = "&#163;";
            main_curr = "Pounds";
            sub_curr = "Pence";
        }
        if (currency == "yen") {
            symbol = "&#165;";
            main_curr = "Yen";
            decimal = "";
            major = "15";
        }
        if (currency != "yen" && currency != "rmb" && currency != "") {
            minor = '<span><input readonly="readonly" class="text" size="2" type="text"><label>' + sub_curr + "</label></span>";
        } else {
            minor = "";
        }
        return "<div><span>" + symbol + '</span><span><input readonly="readonly" class="text" size="' + major + '" type="text">' + decimal + "<label>" + main_curr + "</label></span>" + minor + "</div>";
    },
    file: function() {
        return '<div><input class="text" readonly="readonly" type="file"></div>';
    },
    email: function() {
        return '<div><input value="@" readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    url: function() {
        return '<div><input value="http://" readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    number: function() {
        return '<div><input value="0123456789" readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>';
    },
    section: function() {
        var A = ds.get(this.id, "guidelines");
        A = A.replace(/\n/g, "<br />");
        return '<span id="guidelines' + ds.get(this.id, "id") + '">' + A + "</span>";
    }
};
var data_source = function() {};
data_source.prototype = {
    initialize: function() {
        this.data = {
            elements: []
        }
    },
    new_element: function(A, C, B) {
        title = "Untitled";
        switch (A) {
        case "xingming":
            title = "姓名";
            break;
        case "text":
            title = "单行文本";
            break;
        case "zhiwei":
            title = "职位";
            break;
        case "dianhua":
            title = "手机";
            break;
        case "dizhi":
            title = "地址";
            break;
        case "city":
            title = "城市";
            break;
        case "tel":
            title = "固话";
            break;
        case "weixin":
            title = "微信";
            break;
        case "QQ":
            title = "QQ";
            break;
        case "company":
            title = "公司";
            break;
        case "product":
            title = "商品";
            break;
        case "fax":
            title = "传真";
            break;
        case "textarea":
            title = "多行文本";
            break;
        case "select":
            title = "下拉菜单";
            break;
        case "radio":
            title = "单项选择";
            break;
        case "checkbox":
            title = "多项选择";
            break;
        case "name":
            title = "姓名";
            break;
        case "sex":
            title = "称谓";
            break;
        case "simple_name":
            title = "Name";
            break;
        case "date":
            title = "日期";
            break;
        case "europe_date":
            title = "Date";
            break;
        case "time":
            title = "时间";
            break;
        case "simple_phone":
            title = "Phone";
            break;
        case "money":
            title = "价格";
            break;
        case "url":
            title = "网址";
            break;
        case "email":
            title = "Email";
            break;
        case "number":
            title = "数字";
            break;
        case "file":
            title = "上传文件";
            break;
        case "section":
            title = "节分割";
            break;
        }
        this.data.elements.push({
            title: title,
            guidelines: "",
            size: "medium",
            is_required: "0",
            is_unique: "0",
            is_private: "0",

            type: A,
            object: B,
            position: C,
            id: C,
            is_db_live: "0",
            default_value: "",
            constraint: "",
            options: [{
                option: "第一个选项",
                is_default: 0,
                is_db_live: "0",
                id: "0"
            },
            {
                option: "第二个选项",
                is_default: 0,
                is_db_live: "0",
                id: "0"
            },
            {
                option: "第三个选项",
                is_default: 0,
                is_db_live: "0",
                id: "0"
            }],
            sexs:[{
                option: "先生",
                is_default: 0,
                is_db_live: "0",
                id: "0"
            },
            {
                option: "女士",
                is_default: 0,
                is_db_live: "0",
                id: "0"
            }]
        })
    },
    get: function(D, A) {
        for (var B = 0; B < this.data.elements.length; B++) {
            var C = this.data.elements[B];
            if (D == C.id) {
                el = C;
                break;
            }
        }
        return el[A];
    },
    set: function(C, A, B) {
        jQuery.each(this.data.elements,
        function(E, D) {
            if (B.replace) {
                B = B.replace(/\\\"/g, '\\ "')
            }
            if (D.id == C) {
                D[A] = B
            }
        })
    },
    set_sex_option: function(C, A, B) {
        if (A.replace) {
            A = A.replace(/\\\"/g, '\\ "')
        }
        jQuery.each(this.data.elements,
        function(E, D) {
            if (D.id == C) {
                D.sexs[B].option = A;
            }
        })
    },
    set_sex_default_option: function(B, A) {
        jQuery.each(this.data.elements,
        function(D, C) {
            if (C.id == A) {
                jQuery.each(C.sexs,
                function(E, F) {
                    if (E == B && F.is_default == 0) {
                        F.is_default = 1
                    } else {
                        if (E == B && F.is_default == 1) {
                            F.is_default = 0
                        } else {
                            if (C.type != "checkbox") {
                                F.is_default = 0
                            }
                        }
                    }
                })
            }
        })
    },
    set_option: function(C, A, B) {
        if (A.replace) {
            A = A.replace(/\\\"/g, '\\ "');
        }
        console.log(this.data.elements);
        jQuery.each(this.data.elements,
        function(E, D) {
            console.log("******");
            console.log(D.id);
            console.log(C);
            console.log("******");
            if (D.id == C) {
                D.options[B].option = A;
            }
        });
    },
    set_default_option: function(B, A) {
        jQuery.each(this.data.elements,
        function(D, C) {
            if (C.id == A) {
                jQuery.each(C.options,
                function(E, F) {
                    if (E == B && F.is_default == 0) {
                        F.is_default = 1;
                    } else {
                        if (E == B && F.is_default == 1) {
                            F.is_default = 0;
                        } else {
                            if (C.type != "checkbox") {
                                F.is_default = 0;
                            }
                        }
                    }
                })
            }
        })
    },
    remove_element: function(C) {
        for (var A = 0; A < this.data.elements.length; A++) {
            var B = this.data.elements[A];
            if (C == B.id) {
                ds.data.elements.splice(A, 1);
                break
            }
        }
    },
    get_element: function(C, B) {
        var A;
        jQuery.each(this.data.elements,
        function(E, D) {
            if (D.position == C) { (B) ? A = D[B] : A = E
            }
        });
        return A
    },
    stringify: function() {
        save_elements = new Array();
        jQuery.each(this.data.elements,
        function(B, A) {
            save_elements.push(A.object);
            A.object = "";
        });
        ret = JSON.stringify(this.data);
        jQuery.each(this.data.elements,
        function(B, A) {
            A.object = save_elements[B];
        });
        return ret;
    }
};

var uploadData = new Array();
var product_id = null;
var uploadImageUrl = null;

var form = function() {};
form.prototype = {
    initialize: function() {
        this.data = {
            id: "0",
            name: "新的表单",
            description: "表单描述,点击可进行编辑",
            redirect: "",
            success_message: "您的表单已保存成功",
            password: "",
            frame_height: "",
            unique_ip: "0",
            captcha: "0",
            review: "0"
        }
    },
    display: function() {
        this.li = document.createElement("li");
        JJ(this.li).attr("id", "active_form").addClass("info");
        this.li.innerHTML = '<img src="images/icons/arrow.gif" alt="" class="arrow"><a href="#" onclick="return false;" class="hover_ready" title="Click to edit."><h2 id="form_name">' + this.data.name + '</h2><p id="form_desc">' + this.data.description.replace(/\n/g, "<br />") + "</p></a>";
        return this.li
    },
    selected: function() {
        JJ(this.li).addClass("current_edit")
    },
    unselect: function() {
        JJ(this.li).removeClass("current_edit")
    }
};
var components = {
    text: ["types", "size", "required", "unique", "is_private", "text_default"],
    xingming: ["types", "size", "required", "unique", "is_private", "text_default"],
    zhiwei: ["types", "size", "required", "unique", "is_private", "text_default"],
    tel: ["types", "size", "required", "unique", "is_private", "text_default"],
    dianhua: ["types", "size", "required", "unique", "is_private", "text_default"],
    dizhi: ["types", "size", "required", "unique", "is_private", "text_default"],
    fax: ["types", "size", "required", "unique", "is_private", "text_default"],
    company: ["types", "size", "required", "unique", "is_private", "text_default"],
    weixin: ["types", "size", "required", "unique", "is_private", "text_default"],
    QQ: ["types", "size", "required", "unique", "is_private", "text_default"],
    city: ["types", "size", "required", "unique", "is_private", "text_default"],
    textarea: ["types", "size", "required", "unique", "is_private", "text_default"],
    select: ["types", "size", "required", "choices", "is_private"],
    radio: ["types", "choices", "required", "is_private"],
    sex: ["types", "choices_sex", "required", "is_private"],
    checkbox: ["types", "choices", "required", "is_private"],
    name: ["types", "required", "is_private", "name"],
    simple_name: ["types", "required", "is_private", "name"],
    date: ["types", "required", "unique", "is_private", "date"],
    europe_date: ["types", "required", "unique", "is_private", "date"],
    time: ["types", "required", "unique", "is_private", "noseconds"],
    //phone: ["types", "required", "unique", "is_private", "phone", "phone_default"],
    simple_phone: ["types", "required", "unique", "is_private", "phone", "text_default"],
    //address: ["types", "required", "is_private", "address_default"],
    money: ["types", "required", "unique", "is_private", "currency"],
    url: ["types", "size", "required", "unique", "is_private", "text_default"],
    product: ["types", "size", "required", "unique", "is_private", "product"],
    email: ["types", "size", "required", "unique", "is_private", "text_default"],
    number: ["types", "size", "required", "unique", "is_private", "text_default"],
    file: ["types", "required", "is_private"],
    section: ["types", "is_private"]
};
var redirect_url = "http://";
var tmp_form_password = "";
var ds = new data_source();
ds.initialize();
var element_count = 0;
var active_element;
var element_view;
var main_form;
var current_offset;
function load_all() {
    display_sidebar("add_elements");
    element_view = new element_properties();
    element_view.initialize(1);
    new_form();
    JJ("#active_form").css("display", "none");
    populate_elements();
    populate_form();
    JJ("#form_save_button").click(function() {
        save_form_data();
    });
    JJ("#statusPanel").fadeOut("normal")
}
function new_form() {
    ctrl = new form();
    ctrl.initialize();
    main_form = ctrl;
    markup = ctrl.display();
    document.getElementById("form_elements").insertBefore(markup, document.getElementById("form_elements").lastChild);
    JJ(ctrl.li).mousedown(function() {
        activate_form();
    })
}
function insert_element(A) {
    if (A != "pagebreak") {
        JJ("#nofields").css("display", "none");
        if (A == "currency") {
            A = "money";
        }
        ctrl = initialize_control(A);
        //console.log(ctrl);
        if (A == "address") {
            ds.set(ctrl.id, "size", "large");
        }
        if (A == "simple_name") {
            ds.set(ctrl.id, "size", "small");
        }
        display_control(ctrl);
        add_element_events(ctrl);
        display_save_button();
        init_dragdrop();
        update_pos("true");
    }
}
function initialize_control(A) {
    pos = create_id(A);
    ctrl = new field();
    ctrl.initialize(pos);
    ds.new_element(A, pos, ctrl);
    return ctrl;
}
function display_control(A) {
    markup = A.display();
    markup.style.display = "none";
    JJ("#form_elements").append(markup);
    if (JJ.browser.msie) {
        JJ(markup).fadeIn("normal")
    } else {
        JJ(markup).show("normal")
    }
}
function add_element_events(A) {
    JJ(A.li).click(function() {
        select_element(A)
    });
    JJ(A.li).mousedown(function() {
        A.li.style.cursor = "move"
    });
    JJ(A.li).mouseup(function() {
        A.li.style.cursor = "pointer"
    })
}
function display_save_button() {
    JJ("#div_button").removeClass("hide")
}
function create_id(A) {
    ret = element_count;
    element_count += 1;
    if (A == "address") {
        element_count += 5;
    }
    if (A == "simple_name") {
        element_count += 3;
    }
    if (A == "name") {
        element_count += 3;
    }
    if (A == "checkbox") {
        element_count += 100;
    }
    return ret;
}
//显示字段属性
function select_element(A) {
    unselect_allfields();
    main_form.unselect();
    A.selected();
    active_element = A.id;
    JJ("#element_properties").css("margin-top", JJ(A.li).offset().top - 196 + "px");
    show_field_property();
    display_properties();
    current_offset = JJ(A.li).offset().top - 146;
    adjust_element_properties();
}
function adjust_element_properties() {
    JJ("#element_properties").css("margin-top", JJ(ds.get(active_element, "object").li).offset().top - 226 + "px");
}
function unselect_allfields() {
    jQuery.each(ds.data.elements,
    function(B, A) {
        A.object.unselect()
    });
    JJ("#element_inactive").css("display", "block");
    JJ("#element_position").css("display", "none");
    JJ("#all_properties").css("display", "none");
    JJ("#list_buttons").css("display", "none");
}
function display_properties() {
    display_sidebar("element_properties");
    element_view = new element_properties(active_element);
    element_view.initialize(active_element);
    element_view.render();
}
function set_properties(B, A, C) {
    if (A == "choices") {
        ds.set_option(active_element, B, C);
    }
    else if(A == "choices_sex"){
        ds.set_sex_option(active_element, B, C);
    }
    else{
        ds.set(active_element, A, B);
    }
    /*
    if (A != "choices" && A !="choices_sex") {
        ds.set(active_element, A, B);
    } else {
        ds.set_option(active_element, B, C);
    }
    */
    live_preview[A](B);
}
live_preview = {
    title: function(A) {
        if (JJ("#title" + active_element).length) {
            JJ("#title" + active_element).html(A.replace(/\n/g, "<br />"))
        }
        this.is_required(ds.get(active_element, "is_required"))
    },
    guidelines: function(A) {
        if (JJ("#guidelines" + active_element)) {
            JJ("#guidelines" + active_element).html(A.replace(/\n/g, "<br />"))
        }
    },
    type: function(A) {
        if (A != "date" && A != "europe_date" && A != "phone" && A != "simple_phone") {
            child_id = create_id(A);
            ds.set(active_element, "id", child_id);
            active_element = child_id;
            if (A == "name") {
                ds.set(active_element, "size", "small")
            }
            if (A == "simple_name") {
                ds.set(active_element, "size", "small")
            }
            if (A == "address") {
                ds.set(active_element, "size", "large")
            }
        }
        this.redraw();
        element_view.id = active_element;
        element_view.render()
    },
    size: function(A) {
        JJ("#field" + active_element).attr("class", "text " + ds.get(active_element, "type") + " " + A);
        this.redraw()
    },
    is_required: function(A) {
        if (A == "1") {
            JJ("#title" + active_element).html(JJ("#title" + active_element).html() + ' <span class="req">*</span>')
        } else {
            JJ("#title" + active_element).html(ds.get(active_element, "title").replace(/\n/g, "<br />"))
        }
    },
    is_unique: function() {
        this.redraw()
    },
    is_private: function(A) {
        if (A == 1) {
            JJ(ds.get(active_element, "object").li).addClass("private")
        } else {
            JJ(ds.get(active_element, "object").li).removeClass("private")
        }
    },
    choices: function() {
        this.redraw()
    },
    choices_sex: function() {
        this.redraw();
    },
    constraint: function() {
        this.redraw()
    },
    default_value: function() {},
    redraw: function() {
        ds.get(active_element, "object").li.innerHTML = "";
        ds.get(active_element, "object").li.id = "li_" + active_element;
        ds.get(active_element, "object").id = active_element;
        ds.get(active_element, "object").generate_markup();
        ds.get(active_element, "object").selected()
    }
};

//sex start
function insert_choice_sex(A) {
    ds.get(active_element, "sexs").splice(A, 0, {
        option: "",
        is_default: "0",
        is_db_live: "0",
        id: "0"
    });
    element_view.choices_sex();
    set_properties("", "choices_sex", A);
    if (JJ("#choice_sex" + (A)).length) {
        JJ("#choice_sex" + A).focus()
    }
}
function delete_choice_sex(A) {
    if (A == 0 && ds.get(active_element, "sexs").length == 1) {
        alert("你不能删除这个选项");
        return false
    } else {
        ds.get(active_element, "sexs").splice(A, 1)
    }
    element_view.choices_sex();
    live_preview.choices_sex();
    if (JJ("#choice_sex" + (A - 1)).length) {
        JJ("#choice_sex" + (A - 1)).focus()
    } else {
        JJ("#choice_sex" + (A)).focus()
    }
}
function delete_checkbox_sex(c, d, e, f) {
    if (e == "checkbox" && ds.get(active_element, "sexs").length == 1) {
        alert("You cannot delete all choices.");
        return false;
    }
    if (e == "checkbox" && d == 1) {
        confirmed = confirm("所有相关数据都将被删除,确定吗?");
    } else {
        confirmed = true;
    }
    if (confirmed) {
        if (d == 1 && e == "checkbox") {
            JJ("#statusText").html("删除中,请稍后...");
            JJ.post("delete_element_option.php", {
                form_id: json_form.id,
                element_id: active_element,
                option_id: c
            },
            function(a) {
                var b = eval("(" + a + ")");
                if (b.status == "ok") {
                    delete_choice_sex(f);
                } else {
                    alert("删除错误!");
                }
            })
        } else {
            delete_choice_sex(f);
        }
    }
}
function set_choice_sex_default(A) {
    ds.set_sex_default_option(A, active_element);
    element_view.choices_sex();
    ds.get(active_element, "object").li.innerHTML = "";
    ds.get(active_element, "object").generate_markup();
    ds.get(active_element, "object").selected()
}


//sex end

function insert_choice(A) {
    ds.get(active_element, "options").splice(A, 0, {
        option: "",
        is_default: "0",
        is_db_live: "0",
        id: "0"
    });
    element_view.choices();
    set_properties("", "choices", A);
    if (JJ("#choice" + (A)).length) {
        JJ("#choice" + A).focus()
    }
}
function delete_choice(A) {
    if (A == 0 && ds.get(active_element, "options").length == 1) {
        alert("你不能删除这个选项");
        return false
    } else {
        ds.get(active_element, "options").splice(A, 1)
    }
    element_view.choices();
    live_preview.choices();
    if (JJ("#choice" + (A - 1)).length) {
        JJ("#choice" + (A - 1)).focus()
    } else {
        JJ("#choice" + (A)).focus()
    }
}
function delete_checkbox(c, d, e, f) {
    if (e == "checkbox" && ds.get(active_element, "options").length == 1) {
        alert("你不能删除这个选项");
        return false
    }
    if (e == "checkbox" && d == 1) {
        confirmed = confirm("所有相关数据都将被删除,确定吗?")
    } else {
        confirmed = true
    }
    if (confirmed) {
        if (d == 1 && e == "checkbox") {
            JJ("#statusText").html("删除中,请稍后...");
            JJ.post("delete_element_option.php", {
                form_id: json_form.id,
                element_id: active_element,
                option_id: c
            },
            function(a) {
                var b = eval("(" + a + ")");
                if (b.status == "ok") {
                    delete_choice(f)
                } else {
                    alert("删除错误!")
                }
            })
        } else {
            delete_choice(f)
        }
    }
}
function set_choice_default(A) {
    ds.set_default_option(A, active_element);
    element_view.choices();
    ds.get(active_element, "object").li.innerHTML = "";
    ds.get(active_element, "object").generate_markup();
    ds.get(active_element, "object").selected()
}
function activate_form() {
    unselect_allfields();
    main_form.selected();
    display_form_properties()
}
function update_form(B, A) {
    if (B.replace) {
        B = B.replace(/\\\"/g, '\\ "')
    }
    main_form.data[A] = B;
    if (form_updates[A]) {
        form_updates[A](B)
    }
}
form_updates = {
    name: function(A) {
        JJ("#form_name").html(A)
    },
    description: function(A) {
        JJ("#form_desc").html(A.replace(/\n/g, "<br />"))
    }
};
function display_fields(A) {
    unselect_allfields();
    main_form.unselect();
    if (JJ.browser.msie) {
        if (A != 0) {
            JJ("#add_elements").css("margin-top", current_offset - 10)
        } else {
            JJ("#add_elements").css("margin-top", 0)
        }
    }
    display_sidebar("add_elements");
    JJ("#tabs").attr("class", "add_field_tab")
}
function display_field_properties() {
    if (ds.data.elements.length == 0) {
        JJ("#nofields").css("display", "block");
        unselect_allfields();
        JJ("#div_button").addClass("hide");
        main_form.unselect()
    } else {
        if (!active_element) {
            active_element = ds.get_element(0, "id");
            JJ("#element_inactive").css("display", "block");
            JJ("#element_position").css("display", "none");
            JJ("#all_properties").css("display", "none")
        }
    }
    display_sidebar("element_properties");
    show_field_property()
}
function display_form_properties() {
    unselect_allfields();
    main_form.selected();
    display_sidebar("form_properties");
    prepare_form_property_values();
    show_form_property()
}
function display_sidebar(A) {
    hide_sidebar();
    switch_display(A, "block")
}
function hide_sidebar() {
    switch_display("add_elements", "none");
    switch_display("element_properties", "none");
    switch_display("form_properties", "none");
    switch_display("add_elements_button", "none")
}
function switch_display(A, B) {
    JJ("#" + A).css("display", B);
    if (A == "element_properties") {
        JJ("#add_elements_button").css("display", B)
    }
}
function delete_element(A) {

    if (ds.get(A, "is_db_live") == "1") {
        confirmed = confirm("与此字段相关的所有数据将被删除。你确定你要删除这个字段吗?");
    } else {
        confirmed = true;
    }
    if (confirmed) {
        var A = ds.get(A, "id");
        delete_from_db(A);
    }
}
function delete_from_db(c) {
    if (ds.get(c, "is_db_live") == "1") {
        JJ("#statusText").html("删除中...请等待");
        JJ.post("delete_element.php", {
            form_id: json_form.id,
            element_id: c
        },
        function(a) {
            var b = eval("(" + a + ")");
            if (b.status == "ok") {
                delete_element_markup(c)
            } else {
                alert("删除出错!")
            }
        })
    } else {
        delete_element_markup(c)
    }
}
function delete_element_markup(A) {
console.log(JJ(ds.get(A, "object").li).find(".shopping").length);

var isProduct = JJ(ds.get(A, "object").li).find(".shopping").length;

if(isProduct){
    $.each(uploadData, function(key, value){
        if(form_id === 0)
            value.pid = value.pid - 1;
        console.log(key);
        console.log(value);
        console.log(value.pid);
        console.log(A);
        if(value.pid == A){
            delete uploadData[key];
        }
    });
}

    JJ(ds.get(A, "object").li).fadeOut("normal",
    function() {
        JJ(ds.get(A, "object").li).remove();
        ds.remove_element(A);
        update_pos("true");
        active_element = "";
        if (JJ("#element_properties").attr("display") == "block") {
            display_field_properties()
        }
        if (ds.data.elements.length == 0) {
            display_fields(true)
        }
    })
}
function duplicate_element(A) {
    field_type = ds.get(A, "type");
    ctrl = initialize_control(field_type);
    copy_values(ctrl, A);
    display_duplicate(ctrl, A);
    add_element_events(ctrl);
    display_save_button();
    init_dragdrop();
    update_pos("true")
}
function copy_values(C, E) {
    for (var A = 0; A < ds.data.elements.length; A++) {
        var D = ds.data.elements[A];
        if (E == D.id) {
            jQuery.each(ds.data.elements[A],
            function(G, H) {
                if (G != "id" && G != "object" && G != "is_db_live") {
                    if (G == "options") {
                        opts = [];
                        for (var F = 0; F < H.length; F++) {
                            opts.push(clone(H[F]))
                        }
                    } else {
                        opts = H
                    }
                    ds.set(C.id, G, opts)
                }
            });
            break
        }
    }
    next_val = ds.get(C.id, "options");
    for (var B = 0; B < next_val.length; B++) {
        next_val[B].is_db_live = "0";
        next_val[B].id = "0"
    }
}
function clone(C) {
    if (typeof(C) != "object") {
        return C
    }
    if (C == null) {
        return C
    }
    var B = new Object();
    for (var A in C) {
        B[A] = clone(C[A])
    }
    return B
}
function display_duplicate(A, B) {
    markup = A.display();
    markup.style.display = "none";
    document.getElementById("form_elements").insertBefore(markup, document.getElementById("li_" + B).nextSibling);
    JJ(markup).show("normal")
}
function init_dragdrop() {
    $( "#form_elements" ).sortable({
        update: update_pos
    });
    $( "#form_elements" ).disableSelection();
/*
    Sortable.create("form_elements", {
        onUpdate: function() {
            update_pos()
        },
        hoverclass: "sortHelper",
        only: "drag"
    })
*/
}
function update_pos(A) {
    jQuery.each(ds.data.elements,
    function(C, B) {
        B.position = get_prev_siblings(B.object.li)
    });
    if (A != "true") {
        JJ("#element_position").html(parseInt(ds.get(active_element, "position")) + 1)
    }
}
function get_prev_siblings(A) {
    var B = 0;
    while (A.previousSibling && A.previousSibling.className && JJ(A.previousSibling).hasClass("drag")) {
        A = A.previousSibling;
        B++
    }
    return B
}
function choices_event(A, B) {
    if (A.keyCode == 13) {
        insert_choice(B + 1);
    }
}
function choices_event_sex(A, B) {
    if (A.keyCode == 13) {
        insert_choice_sex(B + 1);
    }
}
function show_field_property() {
    JJ("#tabs").attr("class", "field_prop_tab")
}
function show_form_property() {
    JJ("#tabs").attr("class", "form_prop_tab")
}
function save_form_data() {
    JJ("#statusText").html("保存中...请稍后...");
    JJ("#form_save_button").html('<img src="images/icons/filesave.gif" /> Saving');
    main_form.data.frame_height = JJ("#main").outerHeight();
    JJ("#form_save_button").unbind("click");
    JJ.post("save.php", {
        form: JSON.stringify(main_form.data),
        elements: ds.stringify(),
        products: JSON.stringify(uploadData)
    },
    function(A) {
        form_aftersave_callback(A)
    })
}
function form_aftersave_callback(a) {
    JJ("#form_save_button").html('<img src="images/icons/filesave.gif" /> Save Form');
    JJ("#form_save_button").click(function() {
        save_form_data();
    });
    var b = eval("(" + a + ")");
    if (b.status == "ok") {
        window.location.replace("manage_form.php?id=" + b.message)
    } else {
        alert("An error has occured while saving your form!")
    }
}
function populate_form() {
    JJ("#active_form").css("display", "block");
    var A = json_form;
    update_form(A.id, "id");
    update_form(A.name, "name");
    update_form(A.description.replace(/\<br \/\>/g, "\n"), "description");
    update_form(A.redirect, "redirect");
    update_form(A.success_message.replace(/\<br \/\>/g, "\n"), "success_message");
    update_form(A.password, "password");
    update_form(A.unique_ip, "unique_ip");
    update_form(A.captcha, "captcha");
    update_form(A.review, "review")
}
function populate_elements() {
    var A = 50;
    var B = json_elements;
    JJ(B.elements).each(function(C) {
        num = this;
        ctrl = new field();
        ctrl.initialize(num.id);
        ds.new_element(num.type, num.id, ctrl);
        newMax = parseInt(num.id);
        if (num.type == "address") {
            newMax += 5
        }
        if (num.type == "name") {
            newMax += 3
        }
        if (num.type == "simple_name") {
            newMax += 1
        }
        if (num.type == "checkbox") {
            newMax += 100
        }
        update_element_count(newMax);
        jQuery.each(num,
        function(D, E) {
            if (E.replace) {
                next_val = E.replace(/\<br \/\>/g, "\n")
            } else {
                next_val = E
            }
            ds.set(ctrl.id, D, next_val)
        });
        markup = ctrl.display();
        JJ("#form_elements").append(markup);
        add_element_events(ctrl);
        update_pos("true");
        A += 50;
        if(num.type == "product"){
            add_li_products(num.options);
        }
    });
    init_dragdrop()
}

//初始化时如果有产品数据，载入
function add_li_products(products){
    //console.log(products);
    $.each(products, function(key, val){
        var product = {};
        var hasProductItem = false;
        product.pid = val['option'][0];
        /*
         *if(product.pid == 2)
         *    return false;
         */
        console.log("val:");
        console.log(val);
        product.shopping_name = val['option'][1];
        product.shopping_link = val['option'][2];
        product.shopping_price = val['option'][3];
        product.shopping_num = val['option'][4];
        product.uploadImageUrl = val['option'][5];
        product.newProductId = val['option'][6];

        uploadData[product.newProductId] = product;

        $("#li_" + product.pid + " .shoppingList .empty").remove();
        $("#li_" + product.pid + " .shoppingList").append(tmpl("tmpl-shopping-item", product));


        $("#product-list .prop_add_product").each(function(){
            if($(this).attr("data-id") == product.pid){
                hasProductItem = true;
                return false;
            }
        });

        //点击商品时，如果右侧没有,增加一个li模板
        if(hasProductItem === false){
            $("#product-list").append(tmpl("tmpl-add-product", {"data_id" : product.pid}));
        }

        var shopping_list = $(".prop_add_product[data-id='"+product.pid+"']").find(".editShopping_list");
        shopping_list.append(shopping_list.find(".editShopping_item_meta").clone().attr("class", "editShopping_item").show());

        var item = shopping_list.find(".editShopping_item:last");
        item.find(".shoppingitem_preview").attr("mbid", product.newProductId);
        item.find(".shoppingitem_preview > .previewimg >img").attr("src", product.uploadImageUrl);
        item.find(".shoppingitem_preview > .previewinfo").text(product.shopping_name);
        item.find(".shoppingitem_preview").show();

        var itemedit = item.find(".shoppingitem_edit");
        itemedit.find(".defaultimg").attr("src", product.uploadImageUrl);
        itemedit.find(".shopping_name input").val(product.shopping_name);
        itemedit.find(".shopping_link input").val(product.shopping_link);
        itemedit.find(".newid").val(product.newProductId);
        itemedit.find(".shopping_price input").val(product.shopping_price);
        itemedit.find(".shopping_num input").val(product.shopping_num);
        itemedit.hide();
        mbFileUpload();
        
    });
    console.log("uploadData:");
    console.log(uploadData);
}

function update_element_count(A) {
    if (A >= element_count) {
        element_count = parseInt(A) + 1
    }
    display_save_button();
};
