<?php
/*=============================================================================
#     FileName: db-core.php
#         Desc: db core
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-04-09 09:37:25
#      History:
=============================================================================*/

	function connect_db(){
		$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Could not connect: ' . mysql_error());
		mysql_select_db(DB_NAME) or die('Could not select database');
		mysql_query("SET NAMES utf8");
		return $link;
	}

    //选库
    function switchDb($db){
        $sql = 'use ' . $db; //注意user 和 ' 有一个空格
        do_query($sql);
    }
	
	function do_query($query){
		$result = mysql_query($query) or die($query.' Query failed: ' . mysql_error());
		return $result;
	}

    function insert_id(){
        return mysql_insert_id();
    }
	
	function do_fetch_result($result){
		$row = mysql_fetch_array($result);
		return $row;
	}
    
    function getAll($sql){
        $list  = array();
        $result = do_query($sql);
        if(!$result)
            return false;
        while($row= mysql_fetch_assoc($result)){
            $list[] = $row;
        }
        return $list;
    }

    function getRow($sql){
        $result = do_query($sql);
        if(!$result)
            return false;
        $row= mysql_fetch_assoc($result);
        return $row;
    }

?>
