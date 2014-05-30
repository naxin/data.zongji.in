<?php
/*=============================================================================
#     FileName: language.php
#         Desc:  
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-04-13 23:40:55
#      History:
=============================================================================*/

	global $lang;
	
	//simple name and extended name
	$lang['name_first']			=	'First';
	$lang['name_last']			=	'Last';
	$lang['name_title']			=	'Title';
	$lang['name_suffix']		=	'Suffix';
	
	//address
	$lang['address_street']		=	'Street Address';
	$lang['address_street2']	=	'Address Line 2';
	$lang['address_city']		=	'City';
	$lang['address_state']		=	'State / Province / Region';
	$lang['address_zip']		=	'Postal / Zip Code';
	$lang['address_country']	=	'Country';

	//captcha
	$lang['captcha_required']	=	'请输入验证码';
	$lang['captcha_mismatch']	=	'验证码不匹配';
	$lang['captcha_error']		=	'处理错误,请重试';
	$lang['captcha_title']		=	'请输入下方验证码';
	
	//date
	$lang['date_dd']			=	'DD';
	$lang['date_mm']			=	'MM';
	$lang['date_yyyy']			=	'YYYY';
	
	//price
	$lang['price_dollar_main']	=	'Dollars';
	$lang['price_dollar_sub']	=	'Cents';
	$lang['price_euro_main']	=	'Euros';
	$lang['price_euro_sub']		=	'Cents';
	$lang['price_pound_main']	=	'Pounds';
	$lang['price_pound_sub']	=	'Pence';
	$lang['price_yen']			=	'Yen';
	
	//time
	$lang['time_hh']			=	'HH';
	$lang['time_mm']			=	'MM';
	$lang['time_ss']			=	'SS';
	
	//error message
	$lang['error_title']		=	'提交错误';
	$lang['error_desc']			=	'请检查高亮部分';
	
	//form buttons
	$lang['submit_button']		=	'提交';
	$lang['continue_button']	=	'继续';
	$lang['back_button']		=	'返回';
	
	//form status
	$lang['form_inactive']		=	'这个表单已经暂停';
	
	//form password
	$lang['form_pass_title']	=	'表单已设置密码';
	$lang['form_pass_desc']		=	'请输入密码';
	$lang['form_pass_invalid']	=	'密码错误!';
	
	//form review
	$lang['review_title']		=	'预览';
	$lang['review_message']		=	'请检查下面的条目,单击提交按钮来完成。';
	
	//validation message 
	$lang['val_required'] 		=	'这个字段要求必须填写,请输入值';
	$lang['val_required_file'] 	=	'必须上传一个文件哦';
	$lang['val_unique'] 		=	'这个值已经被使用了,请换一个吧';
	$lang['val_integer'] 		=	'必须输入一个整数哦';
	$lang['val_float'] 			=	'必须输入一个带小数点的哦';
	$lang['val_numeric'] 		=	'必须输入一个数字';
	$lang['val_min'] 			=	'长度不能小于 %s 个字符.';		
	$lang['val_max'] 			=	'长度不能超过 %s 个字符.';
	$lang['val_range'] 			=	'这个值必须在%s 和 %s 的范围内.';
	$lang['val_email'] 			=	'请填写正确的email格式';
	$lang['val_website'] 		=	'请填写正确的网址格式';
	$lang['val_username'] 		=	'只能输入 a-z 0-9 和下划线';
	$lang['val_equal'] 			=	'%s 必须匹配.';
	$lang['val_date'] 			=	'请填写正确的日期';
	$lang['val_time'] 			=	'请填写正确的时间';
	$lang['val_phone'] 			=	'请输入一个有效的电话号码.';
	$lang['val_filetype']		=	'这个文件类型不允许上传';
	
	//fields on excel/csv
	$lang['export_num']			=	'No.';
	$lang['date_created']		=	'Date Created';
	$lang['date_updated']		=	'Date Updated';
	$lang['ip_address']			=	'IP Address';			
?>
