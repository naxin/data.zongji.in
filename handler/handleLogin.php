<?php
/*=============================================================================
#     FileName: handleLogin.php
#         Desc: login
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-05-26 21:22:13
#      History:
=============================================================================*/

session_start();	

require('../config.php');
require('../includes/db-core.php');
require('../includes/db-functions.php');
require('../includes/helper-functions.php');

$db = connect_db();

$data = json_decode($_POST['DATA'], true);

$sql = "select * from ap_users where username = '{$data['EMAIL']}' and password = '{$data['PASSWORD']}'";
$formuser = getRow($sql);

$_SESSION['formuser'] = $formuser;

echo json_encode(array("flag" => true));

