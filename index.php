<?php
/*=============================================================================
#     FileName: index.php
#         Desc:  
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-04-13 23:11:07
#      History:
=============================================================================*/

    //session_id($_COOKIE['mb_cookie_session_id']);
	session_start();	

	require('config.php');
	require('includes/check-session.php');
	require('includes/db-core.php');
	require('includes/db-functions.php');
	require('includes/helper-functions.php');

	
	$ssl_suffix = get_ssl_suffix();
	
    /*
	if(file_exists("installer.php")){
		header("Location: http{$ssl_suffix}://".$_SERVER['HTTP_HOST'].get_dirname($_SERVER['PHP_SELF'])."/installer.php");
		exit;
	}
     */

    /*
    $mb_user = unserialize($_SESSION['mb_user']['user']);

    if(!$_SESSION['formuser'] or !$mb_user){
        $db = connect_db();
        user_sync($mb_user);
    }
     */

	/*
	 * 修改：dignran
	 * 时间：20140813
	 */
	 if (!$_SESSION['from'] && $_GET['from'] == 'wifi') {
	    $_SESSION['from'] = true; 
	 }
     /*结束*/
	    
    header("Location: http{$ssl_suffix}://".$_SERVER['HTTP_HOST'].get_dirname($_SERVER['PHP_SELF'])."/manage_form.php");
    exit;

    $_SESSION['logged_in'] = true;

	//redirect to form manager if already logged-in
    /*
	if(!empty($_SESSION['logged_in']) && $_SESSION['logged_in'] == true){
		header("Location: http{$ssl_suffix}://".$_SERVER['HTTP_HOST'].get_dirname($_SERVER['PHP_SELF'])."/manage_form.php");
		exit;
	}
     */
	
	if(!empty($_POST['submit'])){
		$username = trim($_POST['admin_username']);
		$password = trim($_POST['admin_password']);
		if(($username != ADMIN_USER) || ($password != ADMIN_PASSWORD)){
			$_SESSION['AP_LOGIN_ERROR'] = '请输入正确的用户名及密码!';
		}else{
			$_SESSION['logged_in'] = true;
			
			if(!empty($_SESSION['prev_referer'])){
				$next_page = $_SESSION['prev_referer'];
				
				unset($_SESSION['prev_referer']);
				header("Location: http{$ssl_suffix}://".$_SERVER['HTTP_HOST'].$next_page);
				
				exit;
			}else{
				header("Location: http{$ssl_suffix}://".$_SERVER['HTTP_HOST'].get_dirname($_SERVER['PHP_SELF'])."/manage_form.php");
				exit;
			}
		}
	}
	
	if(!empty($_GET['from'])){
		$_SESSION['prev_referer'] = base64_decode($_GET['from']);
	}
	
	$hide_nav = true;
	
?>

<?php require('includes/header.php'); ?>

<div id="form_manager" style="padding-left: 50px;padding-top: 50px;padding-bottom: 50px">
<?php show_message(); ?>
<div class="info" style="width: 40%">
	<h2><img src="images/icons/lock.gif" align="absmiddle" /> 用户登陆</h2>
	<p></p>
</div>

<div id="form_container" style="align: center">
		<form id="form_login" class="appnitro"  method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		<ul style="width: 40%;">
		<?php if(!empty($_SESSION['AP_LOGIN_ERROR'])){ ?>    
			<li class="error" style="padding-top:20px;padding-bottom:20px;text-align: center">
				<label class="desc">				
				<?php echo $_SESSION['AP_LOGIN_ERROR']; ?>
				</label>
			</li>	
		<?php 
				unset($_SESSION['AP_LOGIN_ERROR']);	
			} 
		?>	
			<li class="highlighted"  style="padding-left: 30px;padding-top: 30px;padding-right: 30px">
								
				<label class="desc" for="admin_username"><img src="images/icons/edit_user.gif" align="absmiddle" style="padding-bottom: 5px"/> 用户名</label>
				<div>
					<input id="admin_username" name="admin_username" class="element text large" type="text" maxlength="255" value=""/> 
				</div>
				
			</li>		
			<li class="highlighted" style="padding-left: 30px;padding-bottom: 30px;padding-right: 30px">
				<label class="desc" for="admin_password"><img src="images/icons/decrypted.gif" align="absmiddle" style="padding-bottom: 5px"/> 密码</label>
				<div>
					<input id="admin_password" name="admin_password" class="element text large" type="password" maxlength="255" value=""/> 
				</div> 
			</li>
    		<li class="buttons" style="padding-left:0px">
		    	<input id="login" class="button_text" type="submit" name="submit" value="登陆" style="padding: 8px" />
			</li>
		</ul>
		</form>	
</div><br />

</div>
<?php require('includes/footer.php'); ?>
