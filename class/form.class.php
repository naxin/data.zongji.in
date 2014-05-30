<?php
/*=============================================================================
#     FileName: form.class.php
#         Desc:  
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-04-16 12:39:54
#      History:
=============================================================================*/

class Form{

    protected $form_id = null;
    protected $conn = null;
    protected $fm = null;
    protected $form = null;

    public function __construct($conn, $form_id){
        $this->form_id = $form_id;
        if(is_resource($this->conn) OR is_object($this->conn)){
            return true;
        }
        if(!$conn){
            exit('db连接错误');
        }
        $this->conn = $conn;
        $this->fm = new Form_Model($this->conn);
        $this->form = $this->fm->getFormById($this->form_id);
    }

    function overview(){
        $formInfo = $this->form;
        $formInfo['totalData'] = $this->fm->getTotalData($this->form_id);
        $formInfo['toDayData'] = $this->fm->getToDayData($this->form_id);
        $formInfo['latestData'] = $this->fm->getLatestData($this->form_id);
        include("view/form_overview.php");
    }

    function setting(){
        $formInfo = $this->form;
        include("view/form_setting.php");
    }

    function collectData(){
        $data = array_map(addslashes, $_POST);
        $this->fm->updateForm($this->form_id, $data);
        echo "ok";
    }

    function changeStatus(){
        $data = array_map(intval, $_POST);
        $this->fm->updateForm($this->form_id, $data);
        echo "ok";
    }

    function publish(){
        $formInfo = $this->fm->getFormById($this->form_id);

        $form_name = $formInfo['form_name'];
        $form_id = $this->form_id;
	
        if(empty($formInfo['form_captcha'])){
            $frame_height = $formInfo['form_frame_height'] + 80;
        }else{
            $frame_height = $formInfo['form_frame_height'] + 250;
        }
        
        $page_name = 'embed_code';
        
        $ssl_suffix = get_ssl_suffix();

        //construct standard form code
        $standard_form_code = '<iframe height="'.$frame_height.'" allowTransparency="true" frameborder="0" scrolling="no" style="width:100%;border:none" src="http'.$ssl_suffix.'://'.$_SERVER['HTTP_HOST'].rtrim(dirname($_SERVER['PHP_SELF']), '/\\').'/embed.php?id='.$form_id.'" title="'.$form_name.'"><a href="http'.$ssl_suffix.'://'.$_SERVER['HTTP_HOST'].rtrim(dirname($_SERVER['PHP_SELF']), '/\\').'/view.php?id='.$form_id.'" title="'.$form_name.'">'.$form_name.'</a></iframe>';	
        
        $form_link_code = '<a href="http'.$ssl_suffix.'://'.$_SERVER['HTTP_HOST'].rtrim(dirname($_SERVER['PHP_SELF']), '/\\').'/view.php?id='.$form_id.'" title="'.$form_name.'">'.$form_name.'</a>';


        //print_r($formInfo);
        include("view/form_publish.php");
    }

    function data(){
        $formInfo = $this->fm->getFormById($this->form_id);
        $formInfo['totalData'] = $this->fm->getTotalData($this->form_id);
        $formInfo['toDayData'] = $this->fm->getToDayData($this->form_id);
        $formInfo['latestData'] = $this->fm->getLatestData($this->form_id);
        print_r($formInfo);
        include("view/form_overview.php");
    }

    function report(){
        $formInfo = $this->fm->getFormById($this->form_id);
        $formInfo['totalData'] = $this->fm->getTotalData($this->form_id);
        $formInfo['toDayData'] = $this->fm->getToDayData($this->form_id);
        $formInfo['latestData'] = $this->fm->getLatestData($this->form_id);
        print_r($formInfo);
        include("view/form_overview.php");
    }

}
