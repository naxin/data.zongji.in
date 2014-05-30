<?php
/*=============================================================================
#     FileName: handleRegister.php
#         Desc: 用户注册
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-05-11 10:00:15
#      History:
=============================================================================*/

session_start();	

require('../config.php');
require('../includes/db-core.php');
require('../includes/db-functions.php');
require('../includes/helper-functions.php');

$db = connect_db();

$data = json_decode($_POST['DATA'], true);

$sql = "insert into ap_users(username, password, company, tel, mail, nickname) values('{$data['EMAIL']}', '{$data['PASSWORD']}', '{$data['COMPANY']}', '{$data['PHONE']}', '{$data['EMAIL']}', '{$data['NICKNAME']}')";
do_query($sql);

$formuser = array('user_id' => insert_id(), 'username' => $data['EMAIL'], 'nickname' => $data['NICKNAME']);

$_SESSION['formuser'] = $formuser;

echo json_encode(array("flag" => true));
