<?php
/*=============================================================================
#     FileName: edit_css.php
#         Desc:  
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-04-13 22:55:51
#      History:
=============================================================================*/

	session_start();	

	require('config.php');
	require('includes/check-session.php');
	require('includes/db-core.php');
	require('includes/db-functions.php');
	require('includes/helper-functions.php');
	require('lib/pear/Compat/Function/file_put_contents.php');

	connect_db();
	
	$form_id = (int) trim($_REQUEST['id']);
	$css_filename = DATA_DIR."/form_{$form_id}/css/view.css";
	
	
	//handle form submit
	if(!empty($_POST['submit'])){
		//save to file and redirect to manage_entries
		$css_content = stripslashes($_POST['css_data']);
		if(is_writable($css_filename)){
			$_SESSION['AP_SUCCESS']['title'] = '成功';
			$_SESSION['AP_SUCCESS']['desc']  = 'css文件已经更新';
			
			file_put_contents($css_filename,$css_content);
			header("Location: manage_form.php?id={$form_id}");
			exit;
		}else{
			
			$_SESSION['AP_ERROR']['title']   = 'An error occured while saving';
			$_SESSION['AP_ERROR']['desc']    = 'Unable to write into CSS file. Please check your file permission.';
			
		}
	}
	
	
	//get form name
	$query = "select form_name from `ap_forms` where form_id='$form_id'";
	$result = do_query($query);
	$row = do_fetch_result($result);
	$form_name = $row['form_name'];
		
	$css_content = htmlspecialchars(file_get_contents($css_filename),ENT_QUOTES);	
	
?>

<?php require('includes/header.php'); ?>
<div class="breadcrumbs">
        <ol class="breadcrumb">
          <li><a href="#"><i class="glyphicon glyphicon-home"></i>首页</a></li>
          <li><a href="#">智能表单</a></li>
          <li class="active"><?php echo $form_name; ?></li>
        </ol>
      </div>
      <div class="subnav">
        <ul class="nav nav-tabs">
          <li class="active"><a href="set_form.php?action=overview&id=<?php echo $form_id;?>">概述</a></li>
          <!--<li><a href="form_created_edit.html">编辑</a></li>
          <li><a href="form_rule.html">规则</a></li>
          <li><a href="form_theme.html">样式</a></li>-->
          <li><a href="set_form.php?action=setting&id=<?php echo $form_id;?>">设置</a></li>
          <li><a href="set_form.php?action=publish&id=<?php echo $form_id;?>">发布</a></li>
          <li><a href="manage_entries.php?id=<?php echo $form_id;?>">数据</a></li>
        </ul>
      </div>
<div id="form_manager">
<?php show_message(); ?>
<div class="info">
</div>

<div id="form_container">
		<form id="form_edit_css" class="appnitro"  method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		<ul>
			<li class="highlighted">
				<label class="desc" for="css_data">文件内容(请先做好备份)</label>
				<div>
					<textarea id="css_data" name="css_data" class="element textarea large"><?php echo $css_content; ?></textarea> 
				</div> 
			</li>
    		<li class="buttons">
		    	<input type="hidden" name="id" value="<?php echo $form_id; ?>" />
				<input id="saveForm" class="button_text" type="submit" name="submit" value="更新文件" />
			</li>
		</ul>
		</form>	
</div><br />

</div>
<?php require('includes/footer.php'); ?>
