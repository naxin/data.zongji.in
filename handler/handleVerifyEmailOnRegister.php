<?php
/*=============================================================================
#     FileName: handleVerifyEmailOnRegister.php
#         Desc: 注册邮箱验证
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-05-11 09:26:53
#      History:
=============================================================================*/

require('../config.php');
require('../includes/db-core.php');
require('../includes/db-functions.php');
require('../includes/helper-functions.php');

$db = connect_db();

$email = $_POST['EMAIL'];

echo registValidate($email);
