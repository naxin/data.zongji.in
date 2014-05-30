<?php
/*=============================================================================
#     FileName: manage_form.php
#         Desc: mobi form manage index
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-03-30 10:53:53
#      History:
=============================================================================*/

	session_start();
	
	require('config.php');
	require('includes/check-session.php');
	require('includes/db-core.php');
	require('includes/db-functions.php');
	require('includes/helper-functions.php');

	connect_db();

	$rows_per_page = 10;
	
	//check for id parameter, if exist, populate the pageno automatically
	if(!empty($_GET['id'])){
		$form_id = (int) trim($_GET['id']);
		
		$query  = "select form_id from `ap_forms` where user_id = {$user_id} order by form_id asc";
		$result = do_query($query);
		
		while($row = do_fetch_result($result)){
			$form_id_lookup[] = (int) $row['form_id'];
		}
		$form_id_chunks = array_chunk($form_id_lookup,$rows_per_page);
		
		foreach ($form_id_chunks as $key=>$value){
			$index_key = array_search($form_id,$value,true);
			if($index_key !== false){
				$active_tab_auto = $index_key;
				$pageno_auto	 = $key + 1;
			}
		}
	}
	
	
	//check for form delete parameter
	if(!empty($_GET['delete'])){
		$deleted_form_id = (int) trim($_GET['delete']);

        $sql = "select * from ap_forms where user_id = {$user_id} and form_id = {$deleted_form_id}";
        $rs = getRow($sql);
        if(!$rs){
            exit("请不要非法操作");
        }
		delete_form($deleted_form_id);
	}
	
	//check for form duplicate parameter
	if(!empty($_GET['duplicate'])){
		$target_form_id = (int) trim($_GET['duplicate']);
		$result_form_id = duplicate_form($target_form_id);
		
		if(!empty($result_form_id)){
			$_SESSION['AP_SUCCESS']['title'] = '成功';
			$_SESSION['AP_SUCCESS']['desc']  = '表单复制.';
				
			header("Location: manage_form.php?id={$result_form_id}");
			exit;
		}
	}
	
	
	/****Pagination *************/
	//get page number for pagination
	if(!empty($pageno_auto)){
		$pageno = $pageno_auto;
	}elseif(!empty($_GET['pageno'])) {
	   $pageno = $_GET['pageno'];
	}else{
	   $pageno = 1;
	}
				
	//identify how many database rows are available
	$query = "select count(*) total_row from `ap_forms` where user_id = {$user_id}";
	$result = do_query($query);
	$row = do_fetch_result($result);
	
	$numrows = $row['total_row'];
				
	$lastpage      = ceil($numrows/$rows_per_page);
						
						
	//ensure that $pageno is within range
	//this code checks that the value of $pageno is an integer between 1 and $lastpage
	$pageno = (int)$pageno;
						
	if ($pageno < 1) { 
	   $pageno = 1;
	}
	elseif ($pageno > $lastpage){
		$pageno = $lastpage;
	}
						
	//construct the LIMIT clause for the sql SELECT statement
	if(!empty($numrows)){
		$limit = 'LIMIT ' .($pageno - 1) * $rows_per_page .',' .$rows_per_page;
	}
	/*****End Pagination code *******/	
	
	
	
	//get form list
	$query = "select form_id,shorturl,form_name,form_active,form_email from `ap_forms` where user_id = {$user_id} order by form_id asc $limit";
	$result = do_query($query);
	$i=0;
	$form_id_array = array();
	while($row = do_fetch_result($result)){
		$form_list[$i]['form_id']     = $row['form_id'];
		$form_list[$i]['shorturl']    = $row['shorturl'];
		$form_list[$i]['form_name']   = $row['form_name'];
		$form_list[$i]['form_active'] = $row['form_active']; 
		if(!empty($row['form_email'])){
			$form_list[$i]['form_email']  = $row['form_email']; 
		}else{
			$form_list[$i]['form_email']  = 'nobody'; 
		}
		$form_id_array[] = $row['form_id'];
		$i++;
	}
	
	//get total entries for each form
	foreach ($form_id_array as $form_id){
		//get all time entries
		$query = "select count(*) total_entry from `ap_form_{$form_id}`";
		$result = do_query($query);
		$row = do_fetch_result($result);
		$entries[$form_id]['total'] = $row['total_entry'];
	
		//get todays entries
		$query = "select count(*) today_entry from `ap_form_{$form_id}` where  date_created >= date_format(curdate(),'%Y-%m-%d 00:00:00') ";
		$result = do_query($query);
		$row = do_fetch_result($result);
		$entries[$form_id]['today'] = $row['today_entry'];
		
		//get latest entry timing
		$query = "select date_created from `ap_form_{$form_id}` order by id desc limit 1";
		$result = do_query($query);
		$row = do_fetch_result($result);
		$entries[$form_id]['latest_entry'] = relative_date($row['date_created']);
	}
	

	//delete a form, definition, entries and uploaded files
	function delete_form($form_id){
		//remove from ap_forms 
		$query = "delete from `ap_forms` where form_id='$form_id'";
		do_query($query);
		
		//remove from ap_form_elements
		$query = "delete from `ap_form_elements` where form_id='$form_id'";
		do_query($query);
		
		//remove from ap_element_options
		$query = "delete from `ap_element_options` where form_id='$form_id'";
		do_query($query);
		
		//remove from ap_column_preferences
		$query = "delete from `ap_column_preferences` where form_id='$form_id'";
		do_query($query);
		
		//remove review table
		$query = "drop table if exists `ap_form_{$form_id}_review`";
		do_query($query);
		
		//remove the actual table
		$query = "drop table if exists `ap_form_{$form_id}`";
		do_query($query);
		
		//remove form folder 
		@full_rmdir(UPLOAD_DIR."/form_{$form_id}");
		if(DATA_DIR != UPLOAD_DIR){
			@full_rmdir(DATA_DIR."/form_{$form_id}");
		}
		return true;
	}

	//duplicate a form
	function duplicate_form($form_id){
		
		//set the new name
		$query 	= "select form_name,form_review from `ap_forms` where form_id='$form_id' and  user_id = {$user_id}";
		$result = do_query($query);
		$row 	= do_fetch_result($result);
		$form_review = $row['form_review'];
		$form_name 	 = trim($row['form_name']);
		$form_name .= " Copy";
		
		//get new form_id
		$query = "select max(form_id)+1 new_form_id from `ap_forms` where  user_id = {$user_id}";
		$result = do_query($query);
		$row 	= do_fetch_result($result);
		$new_form_id = trim($row['new_form_id']);
			
		//insert into ap_forms table
		$query = "select * from `ap_forms` where form_id='{$form_id}' and user_id = {$user_id}";
		$result = do_query($query);
		
		$i = 0;
		$columns = array();
		$fields_num = mysql_num_fields($result);
		while($i < $fields_num){
			$meta = mysql_fetch_field($result, $i);
			
			if(($meta->name != 'form_id') && ($meta->name != 'form_name')){
				$columns[] = $meta->name;
			}
			
			$i++;
		}
		
		
		//build the query string
		$columns_joined = implode(",",$columns);
		$form_name = mysql_real_escape_string($form_name);	
		
		//insert to ap_forms
		$query = "insert into 
							`ap_forms`(form_id, user_id, form_name,{$columns_joined}) 
					   select 
							{$new_form_id}, {$user_id}'{$form_name}',{$columns_joined} 
						from 
							`ap_forms` 
						where 
							form_id='$form_id'";
		do_query($query);
		
		//create the new table
		do_query("create table `ap_form_{$new_form_id}` like `ap_form_{$form_id}`");
		
				
		//copy ap_form_elements table
		$query = "select * from `ap_form_elements` limit 1";
		$result = do_query($query);
		
		$i = 0;
		$columns = array();
		$fields_num = mysql_num_fields($result);
		while($i < $fields_num){
			$meta = mysql_fetch_field($result, $i);
			
			if($meta->name != 'form_id'){
				$columns[] = $meta->name;
			}
			
			$i++;
		}
		$columns_joined = implode("`,`",$columns);
		$query = "insert into 
							`ap_form_elements`(form_id,`{$columns_joined}`) 
					   select 
							{$new_form_id},`{$columns_joined}` 
						from 
							`ap_form_elements` 
						where 
							form_id='$form_id'";
		do_query($query);
		
		//copy ap_element_options table
		$query = "select * from `ap_element_options` limit 1";
		$result = do_query($query);
		
		$i = 0;
		$columns = array();
		$fields_num = mysql_num_fields($result);
		while($i < $fields_num){
			$meta = mysql_fetch_field($result, $i);
			
			if(($meta->name != 'form_id') && ($meta->name != 'aeo_id')){
				$columns[] = $meta->name;
			}
			
			$i++;
		}
		$columns_joined = implode("`,`",$columns);
		$query = "insert into 
							`ap_element_options`(form_id,`{$columns_joined}`) 
					   select 
							{$new_form_id},`{$columns_joined}` 
						from 
							`ap_element_options` 
						where 
							form_id='$form_id'";
		do_query($query);
		
		
		//copy ap_column_preferences table
		$query = "select * from `ap_column_preferences` limit 1";
		$result = do_query($query);
		
		$i = 0;
		$columns = array();
		$fields_num = mysql_num_fields($result);
		while($i < $fields_num){
			$meta = mysql_fetch_field($result, $i);
			
			if(($meta->name != 'form_id') && ($meta->name != 'acp_id')){
				$columns[] = $meta->name;
			}
			
			$i++;
		}
		$columns_joined = implode("`,`",$columns);
		$query = "insert into 
							`ap_column_preferences`(form_id,`{$columns_joined}`) 
					   select 
							{$new_form_id},`{$columns_joined}` 
						from 
							`ap_column_preferences` 
						where 
							form_id='$form_id'";
		do_query($query);
		
		//copy ap_form_xx_review table if exists
		if(!empty($form_review)){
			do_query("CREATE TABLE `ap_form_{$new_form_id}_review` like `ap_form_{$form_id}_review`");
		}
		
		//create form folder
		$old_mask = umask(0);
		mkdir(DATA_DIR."/form_{$new_form_id}",0777);
		mkdir(DATA_DIR."/form_{$new_form_id}/css",0777);
		if(DATA_DIR != UPLOAD_DIR){
			mkdir(UPLOAD_DIR."/form_{$new_form_id}",0777);
		}
		mkdir(UPLOAD_DIR."/form_{$new_form_id}/files",0777);
		umask($old_mask);
		
		//copy css file	
		copy(DATA_DIR."/form_{$form_id}/css/view.css",DATA_DIR."/form_{$new_form_id}/css/view.css");
		
		return $new_form_id;
	}
	
?>

<?php require('includes/header.php'); ?>
<div id="form_manager">
<?php show_message(); ?>
<div class="info">

	<div class="create_new_form">
		<a href="edit_form.php">创建新的表单</a>
	</div>
	<h2>表单管理</h2>
	<p>创建或编辑你的表单</p>
</div>

<div class="formManager_detail">
    <ul class="pull-left form">
        <li class="noForm">
          <div class="normal-create">
            <a href="edit_form.php">
              <i class="glyphicon glyphicon-plus"></i>
              <div><a href="edit_form.php">创建新表单</a></div>
           </a> 
          </div>
          <!--
          <div class="special-create template-create">
            <a href="#"><div>从模板创建表单</div></a>  
          </div>
          <div class="special-create excel-create">
            <a href="#"><div>从Excel创建表单</div></a>  
          </div>
          -->
        </li>

<?php 
	$i=($pageno -1) * $rows_per_page + 1;
	$first_row_number = $i;
	if(!empty($form_list)){

		
	foreach ($form_list as $key=>$data){ 
	     $key ++;
		 if(!empty($data['form_active'])){ 
		 	$form_status 	 = 'Accepting Entries'; 
		 	$image_status 	 = 'checkbox.gif';
		 	$activation_text = 'Disable this form';
		 	$activation_link = 'disable_form';
		 }else{ 
		 	$form_status 	 = 'Inactive';
		 	$image_status 	 = 'disabled.gif';
		 	$activation_text = 'Enable this form';
		 	$activation_link = 'enable_form';
		 }; 
		 
		 
?> 
        	<li>
        		<div class="form_shadow"></div>
                <a href="<?php echo "set_form.php?id={$data['form_id']}"; ?>" class="cover color_<?php echo $key;?>">
        			<span class="form-data-count"><?php echo $entries[$data['form_id']]['total']; ?></span>
        			<div class="content">
        				<div class="symbol"><i class="glyphicon glyphicon-pencil"></i></div>
                        <div class="name"><?php echo $data['form_name'];?></div>
        			</div>
        		</a>
        	</li>


<?php 
		$i++;
	} 
	
	$last_row_number = --$i;
	
	if(!empty($active_tab_auto)){
		$active_tab = $active_tab_auto;
	}else{
		$active_tab = 0;
	}
	
	echo '</ul>';
	}else{
		echo "<li style=\"height: 200px; text-align: center;padding-top: 70px\"><h2>您还没有表单,去<a href=\"edit_form.php\">创建</a>吧!</h2></li>";
	}
?>   
        <div class="clearfix"></div>
        <!--
        <div class="links">
          <a href="#" class="page-title">我为别人填的表单</a>
          <a href="#" class="page-title">已归档的表单</a>
        </div>
        -->
      </div>
</div>
<script src="/js/jquery/jquery-1.9.1.min.js"></script>
<script>
    $(function(){
        $(".noForm").click(function(){
            window.location.href="edit_form.php";
        });
    });    
</script>
<?php require('includes/footer.php'); ?>
