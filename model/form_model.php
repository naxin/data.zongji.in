<?php

class Form_Model{

    protected $db = null;

    function __construct($db){
        if(is_resource($this->db) OR is_object($this->db)){
            return true;
        }
        if(!$db){
            exit('db连接错误');
        }
        $this->db = $db;
    }

    function getFormById($form_id){
        $query = "select * from `ap_forms` where form_id = {$form_id}";
        $result = getRow($query);
        return $result;
    }

    function getTotalData($form_id){
        $query = "select count(*) total_entry from `ap_form_{$form_id}`";
        $row= getRow($query);
		return $row['total_entry'];
    }

    function updateForm($form_id, $data){
        foreach($data as $key => $val){
            $cond .= "`{$key}` = '{$val}',";
        }
        $cond = rtrim($cond, ",");
        $sql = "update `ap_forms` set {$cond} where form_id={$form_id}";
        return do_query($sql);
    }

    //get todays entries
    function getTodayData($form_id){
		$query = "select count(*) today_entry from `ap_form_{$form_id}` where date_created >= date_format(curdate(),'%Y-%m-%d 00:00:00') ";
        $row= getRow($query);
		return $row['today_entry'];
    }

    function getLatestData($form_id){
		//get latest entry timing
		$query = "select date_created from `ap_form_{$form_id}` order by id desc limit 1";
        $row= getRow($query);
		return $row['date_created'];
    }
	
		

}
