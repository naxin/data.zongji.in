<?php
/*=============================================================================
#     FileName: check-session.php
#         Desc: check session
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-04-21 15:12:52
#      History:
=============================================================================*/

	//check if user logged in or not
	//if not redirect them into login page
	if(empty($_SESSION['formuser'])){
		if(!empty($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] != 'off')){
			$ssl_suffix = 's';
		}
		
		$current_dir = dirname($_SERVER['PHP_SELF']);
      	if($current_dir == "/" || $current_dir == "\\"){
			$current_dir = '';
		}
		
		$_SESSION['AP_LOGIN_ERROR'] = 'Sorry, you must be logged in to do that.';
		header("Location: http{$ssl_suffix}://".$_SERVER['HTTP_HOST'].$current_dir.'/index.php?from='.base64_encode($_SERVER['REQUEST_URI']));
		exit;
	}

    $user_id = intval($_SESSION['formuser']['user_id']);
?>
