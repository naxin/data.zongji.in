<?php
/*=============================================================================
#     FileName: view_entry.php
#         Desc:  
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-04-13 22:28:58
#      History:
=============================================================================*/

	session_start();

	require('config.php');
	require('includes/check-session.php');
	require('includes/db-core.php');
	require('includes/db-functions.php');
	require('includes/helper-functions.php');
	require('includes/entry-functions.php');

	connect_db();
	
	$form_id  = (int) trim($_REQUEST['form_id']);
	$entry_id = (int) trim($_REQUEST['id']);
	
	if(empty($form_id) || empty($entry_id)){
			die('ID required.');
	}
	
	
	//check for delete parameter
	if(!empty($_GET['delete'])){
			
		delete_entries($form_id,array($entry_id));
			
		$_SESSION['AP_SUCCESS']['title'] = 'Entry deleted';
		$_SESSION['AP_SUCCESS']['desc']  = "Entry #{$entry_id} has been deleted.";
		
		$ssl_suffix = get_ssl_suffix();	
		header("Location: http{$ssl_suffix}://".$_SERVER['HTTP_HOST'].get_dirname($_SERVER['PHP_SELF'])."/manage_entries.php?id={$form_id}");
		exit;
	}
		
	//get form name
	$query = "select form_name from `ap_forms` where form_id='$form_id'";
	$result = do_query($query);
	$row = do_fetch_result($result);
	$form_name = $row['form_name'];
	
	$entry_details = get_entry_details($form_id,$entry_id);
	
	//get entry timestamp
	$query = "select date_created,date_updated,ip_address from `ap_form_{$form_id}` where id='$entry_id'";
	$result = do_query($query);
	$row = do_fetch_result($result);
	
	$date_created = $row['date_created'];
	if(!empty($row['date_update'])){
		$date_updated = $row['date_updated'];
	}else{
		$date_updated = '&nbsp;';
	}
	$ip_address   = $row['ip_address'];
	
	//get ids for navigation buttons
	//older entry id
	$result = do_query("select id from ap_form_{$form_id} where id < $entry_id order by id desc limit 1");
	$row = do_fetch_result($result);
	$older_entry_id = $row['id'];
	
	//oldest entry id
	$result = do_query("select id from ap_form_{$form_id} order by id asc limit 1");
	$row = do_fetch_result($result);
	$oldest_entry_id = $row['id'];
	
	//newer entry id
	$result = do_query("select id from ap_form_{$form_id} where id > $entry_id order by id asc limit 1");
	$row = do_fetch_result($result);
	$newer_entry_id = $row['id'];
	
	//newest entry id
	$result = do_query("select id from ap_form_{$form_id} order by id desc limit 1");
	$row = do_fetch_result($result);
	$newest_entry_id = $row['id'];
	
	if(($entry_id == $newest_entry_id) && ($entry_id == $oldest_entry_id)){
		$nav_position = 'disabled';
	}elseif($entry_id == $newest_entry_id){
		$nav_position = 'newest';
	}elseif ($entry_id == $oldest_entry_id){
		$nav_position = 'oldest';
	}else{
		$nav_position = 'middle';
	}
	
	
	$header_data =<<<EOT
<script src="js/jquery/jquery-core.js"></script>  
<script src="js/jquery/jquery-columnhover.js"></script>
<script src="js/jquery/jquery-simplemodal.js"></script>
<script src='js/email_entry.js' type='text/javascript'></script>

<link type='text/css' href='css/email_entry.css' rel='stylesheet' media='screen' />

<!--[if lt IE 7]>
<link type='text/css' href='css/email_entry_ie.css' rel='stylesheet' media='screen' />
<![endif]-->

<link rel="stylesheet" type="text/css" href="css/entry_print.css" media="print">
EOT;

	
?>

<?php require('includes/header.php'); ?>
<div class="breadcrumbs">
        <ol class="breadcrumb">
          <li><a href="#"><i class="glyphicon glyphicon-home"></i>首页</a></li>
          <li><a href="#">智能表单</a></li>
          <li class="active"><?php echo $form_name;?></li>
        </ol>
      </div>
      <div class="subnav">
        <ul class="nav nav-tabs">
          <li><a href="set_form.php?action=overview&id=<?php echo $form_id;?>">概述</a></li>
          <!--<li><a href="form_created_edit.html">编辑</a></li>
          <li><a href="form_rule.html">规则</a></li>
          <li><a href="form_theme.html">样式</a></li>-->
          <li><a href="set_form.php?action=setting&id=<?php echo $form_id;?>">设置</a></li>
          <li><a href="set_form.php?action=publish&id=<?php echo $form_id;?>">发布</a></li>
          <li class="active"><a href="manage_entries.php?id=<?php echo $form_id;?>">数据</a></li>
        </ul>
      </div>

<div id="form_manager">
<?php show_message(); ?>
<div class="info">
	<h2><a class="breadcrumb" href="manage_form.php?id=<?php echo $form_id; ?>"><?php echo $form_name; ?></a> <img src="images/icons/resultset_next.gif" align="bottom" /> <a id="ve_a_entries" class="breadcrumb" href="manage_entries.php?id=<?php echo $form_id; ?>">数据</a> <img id="ve_a_next" src="images/icons/resultset_next.gif" align="bottom" /> #<?php echo $entry_id; ?> </h2>
</div>


<div id="view_entry">
<div id="ve_detail" >
<table id="ve_detail_table" width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>

<?php 
		$toggle = false;
		
		foreach ($entry_details as $data){ 
			if($toggle){
				$toggle = false;
				$row_style = 'class="alt"';
			}else{
				$toggle = true;
				$row_style = '';
			}	
?>  
  	<tr <?php echo $row_style; ?>>
  	    <td width="40%"><strong><?php echo $data['label']; ?></strong> </td>
  		<td width="60%"><?php echo nl2br($data['value']); ?></td>
  	</tr>
<?php } ?>  	
  	
  		  	
  </tbody>
</table>
<table id="ve_table_info" width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>		
		<tr>
  	    <td style="font-size: 85%;color: #444; font-weight: bold"><img src="images/icons/date.gif"/> 相关信息</td>
  		<td >&nbsp; </td>
  		</tr> 
		
		<tr class="alt">
  	    <td width="40%"><strong>创建时间</strong></td>
  		<td width="60%"><?php echo $date_created; ?></td>
  		</tr>  	<tr >
  	    <td ><strong>更新时间</strong></td>

  		<td><?php echo $date_updated; ?></td>
  		</tr>  	
		<tr class="alt">
  	    <td ><strong>IP地址</strong></td>
  		<td><?php echo $ip_address; ?></td>
  	</tr>
  </tbody>
</table>
</div>
<?php
	if($nav_position == 'newest'){
		$img_new = '_grey';
	}elseif ($nav_position == 'oldest'){
		$img_old = '_grey';
	}elseif ($nav_position == 'disabled'){
		$img_new = '_grey';
		$img_old = '_grey';
	}
?>
<?php require('includes/footer.php'); ?>
