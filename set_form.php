<?php
/*=============================================================================
#     FileName: set_form.php
#         Desc: set form, include data/theme/set/publish/report...
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-04-09 09:34:11
#      History:
=============================================================================*/

	session_start();
	
	require('config.php');
	require('includes/check-session.php');
	require('includes/db-core.php');
	require('includes/db-functions.php');
	require('includes/helper-functions.php');
	require('includes/JSON.php');
	require('class/form.class.php');
	require('model/form_model.php');

    $action = !empty($_GET['action']) ? trim($_GET['action']) : 'overview';

	if(!empty($_GET['id'])){
		$form_id = (int) trim($_GET['id']);
	}else{
		$form_id = 0;
        exit("非法操作");
	}
	
	//get data from databae
	$db = connect_db();
	
    $form = new Form($db, $form_id);

    $form->$action();
