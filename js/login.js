$(document).ready(function(){
	loginValidate();//登录验证

	//通过检测链接中是否包含'?'来判断链接是否但参数，若有参数则弹出注册页面
	if(typeof(pageType) !='undefined' && pageType=='register'){
		$(this).addClass("login_active");
		$(this).siblings(".p_login").removeClass("login_active");
		$(this).find(".img_register").css("background-position","0px -27px");
		$(".login_items").slideUp();
		$(".register_items").slideDown();
		$(".p_register").unbind('hover');
	}

	//登录注册切换
	function registerMouseEnter() {
		$(this).addClass("login_active");
		$(this).find(".img_register").stop().animate({"background-position-y":"-27px"},200);
	}
	function registerMouseOut() {
		$(this).removeClass("login_active");
		$(this).find(".img_register").stop().animate({"background-position-y":"0px"},200);
	}
	$(".p_register").hover(registerMouseEnter, registerMouseOut);
	$(".p_register").click(function(){
		$(this).addClass("login_active");
		$(this).siblings(".p_login").removeClass("login_active");
		$(this).find(".img_register").css("background-position","0px -27px");
		$(".login_items").slideUp();
		$(".coopeLogin_mainFiild").slideUp();
		$(".register_items").slideDown();
		$(".p_register").unbind('hover');
		$(".coopeLogin_title").attr("type","OPEN").text("使用其他账号登录");
	});
	$(".p_login").click(function(){
		$(".login_error").hide();
		$(this).addClass("login_active");
		$(this).siblings(".p_register").removeClass("login_active");
		$(this).siblings(".p_register").find(".img_register").css("background-position","0px 0px");
		$(".register_items").slideUp();
		$(".coopeLogin_mainFiild").slideUp();
		$(".login_items").slideDown();
		$(".p_register").hover(registerMouseEnter, registerMouseOut);
		$(".coopeLogin_title").attr("type","OPEN").text("使用其他账号登录");
	});
	$(".coopeLogin_title").click(function(){
		if ($(this).attr("type") == "OPEN") {
			$(".login_items").slideUp();
			$(".register_items").slideUp();
			$(".coopeLogin_mainFiild").slideDown();
			$(this).attr("type","CLOSED").text("直接登录");
		}else if ($(this).attr("type") == "CLOSED") {
			$(".register_items").slideUp();
			$(".coopeLogin_mainFiild").slideUp();
			$(".login_items").slideDown();
			$(this).attr("type","OPEN").text("使用其他账号登录");
		}
	});

	//二级域名登陆，调整显示的公司字体大小
	var corpName = $(".p_login_Corp");
	if (corpName.length > 0) {
		var fontSize = parseInt(corpName.css("font-size").replace("px", ""));
		while ( getTextWidth(corpName.text(), fontSize, "MYH") > 318 ) {
			 fontSize = fontSize-2;
			 corpName.css("font-size", fontSize);
		}
	}
	
	//弹窗--忘记密码
	$("#forgetPassword").click(function(){
		click_delete = $(this);
		TINY.box.show({
			html:$(".popwin_forgetPassword").html(),
			width:414,
			height:222,
			fixed:false,
			maskid:'blackmask',
			maskopacity:40,
			boxid: 'forgetPasswordPopWin',
			openjs: function(){
				$("#forgetPasswordPopWin").find(".popwin_newForm_input").val($("#login_email").val());
			}
		});
	});

	$(".popwin_forgetPassword_confirm").live("click", function(){
		var email = $(this).siblings("input");
		if (email.val() !== "") {
			$.ajax({
				url: 'handler/handleForgetPassword.php',
				type: 'POST',
				dataType:'JSON',
				data:{
					"DATA": '{"EMAIL":"'+email.val()+'"}'
				},
				success: function(data){
					if (data.flag) {
						email.closest('.popwin_content').empty().append('<p class="popwin_tips">已发送邮件到注册邮箱，请根据提示重置密码</p><p class="popwin_description">如果遇到麻烦，可以发邮件到 service@mikecrm.com</p>').closest('.tinner').css("height", "185px");
					}else{
						email.closest('.popwin_content').find('.popwin_error').show().closest('.tinner').css("height", "255px");
					}
				}
			});
		}
	});

	//弹窗--服务协议
	$("#treaty").click(function(){
		click_delete = $(this);
		TINY.box.show({
			html:$("#popwin_treaty").html(),
			width:414,
			height:470,
			fixed:false,
			maskid:'blackmask',
			maskopacity:40
		});
	});

	//登录状态下，点回车提交表单
	$("#login_password").keyup(function(e){
		var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if (keyCode == 13){
			$(this).closest("form").find('.login_btn').trigger('click');
		}
	});
});

//登录验证
function loginValidate(){
	$('#login_items .login_btn').click(function(){
		var email = $('[name="EMAIL"]').val();
		var password = $('[name="PASSWORD"]').val();
		if (!email && !password) {
			$(".login_error").text("请输入登录邮箱和密码").css("display","block");
		}else if (!email) {
			$(".login_error").text("请输入邮箱").css("display","block");
		}else if (!password) {
			$(".login_error").text("请输入密码").css("display","block");
		}else{
			login();
		}
		return false;
	});

}
//普通登录
function login() {
	var formid = $("#login_items");
	var dataLogin = tojson(formid);

	$.ajax({
		type: "post",
		url: "handler/handleLogin.php",
		dataType: 'JSON',
		data: {
			DATA: dataLogin
		},
		success: function (data) {
			if (data.flag){
				$(".login_error").css("display","none");

				if( destPage != null ){
					location.href = destPage;
				}else{
                    location.href = "manage_form.php";
				}
			}else{
				$(".login_error").text("用户名或密码错误").hide().fadeIn();
			}
		}
	});
}

//注册验证
function registValidate(){
	$("#register_items").validate({
		rules: {
			EMAIL: {
				required: true,
				email: true,
				maxlength: 255,
				remote:{
					type: "POST",
					url: "handler/handleVerifyEmailOnRegister.php",
					data: {
						DATA:function(){
							var data =  '{"EMAIL":"'+$("#register_items").find("[name='EMAIL']").val()+'"}';
							return data;
						}
					}
				}
			},
			PASSWORD: {
				required: true
			},
			NICKNAME: {
				required: true,
				maxlength: 30
			},
			PHONE: {
				maxlength: 30
			},
			COMPANY: {
				required: true,
				maxlength: 255
			}
		},
		messages: {
			EMAIL:{
				remote:"此邮箱已被注册"
			}
		},
		onkeyup: false,
		onclick: false,
		focusInvalid: false,
		success: function(label){
			$(label).parent().addClass("checkRight");
			$(label).remove();
		},
		errorPlacement: function(error,element){
			element.parent().removeClass("checkRight");
			error.appendTo(element.parent()).after("<div class='error_img'></div>");
		},
		submitHandler: function(){
			register();
		}
	});
};
//注册
function register() {
	var formid = $("#register_items");
	var dataRegister = tojson(formid);
	$.ajax({
		type: "post",
		url: "handler/handleRegister.php",
		mode:"abort",
		dataType: 'JSON',
		data: {
			DATA: dataRegister
		},
		error: function () {
			return false;
		},
		beforeSend: function(data) {
			$(".login_btn").html("注&nbsp;&nbsp;册&nbsp;&nbsp;中").removeClass('submit');
		},
		success: function (data) {
			if (data.flag){
				$(".login_btn").html("注&nbsp;&nbsp;册&nbsp;&nbsp;成&nbsp;&nbsp;功");
				location.href = "manage_form.php";
			}
		}
	});
}
