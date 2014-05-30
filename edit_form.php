<?php
/*=============================================================================
#     FileName: edit_form.php
#         Desc: mobi form create and edit page
#       Author: RainYang - https://github.com/rainyang
#        Email: rainyang2012@qq.com
#     HomePage: http://360mb.cn
#      Version: 0.0.1
#   LastChange: 2014-03-30 12:36:07
#      History:
=============================================================================*/
	session_start();
	
	require('config.php');
	require('includes/check-session.php');
	require('includes/db-core.php');
	require('includes/db-functions.php');
	require('includes/JSON.php');

	if(!empty($_GET['id'])){
		$form_id = (int) trim($_GET['id']);
	}else{
		$form_id = 0;
	}
	
		
	//get data from databae
	connect_db();
	
	//get form data
	$query 	= "select 
					 form_name,
					 form_description,
					 form_redirect,
					 form_success_message,
					 form_password,
					 form_unique_ip,
					 form_captcha,
					 form_review,
					 form_frame_height
			     from 
			     	 ap_forms 
			    where 
			    	 form_id='$form_id' and user_id = {$user_id}";
	$result = do_query($query);
	$row 	= do_fetch_result($result);
	
	$form = new stdClass();
	if(!empty($row)){
		$form->id 				= $form_id;
		$form->name 			= $row['form_name'];
		$form->description 		= $row['form_description'];
		$form->redirect 		= $row['form_redirect'];
		$form->success_message  = $row['form_success_message'];
		$form->password 		= $row['form_password'];
		$form->frame_height 	= $row['form_frame_height'];
		$form->unique_ip 		= $row['form_unique_ip'];
		$form->captcha 			= $row['form_captcha'];
		$form->review 			= $row['form_review'];
	}else{
		$form->id 				= 0;
		$form->name 			= '新的表单';
		$form->description 		= '这里是表单的描述,点击可以进行编辑.';
		$form->redirect 		= '';
		$form->success_message  = '提交成功!';
		$form->password 		= '';
		$form->frame_height 	= 0;
		$form->unique_ip 		= 0;
		$form->captcha			= 0;
		$form->review			= 0;
	}
	
	//get element options first and store it into array
	$query = "select 
					element_id,
					option_id,
					`position`,
					`option`,
					option_is_default 
			    from 
			    	ap_element_options 
			   where 
			   		form_id='$form_id' and live=1 
			order by 
					element_id asc,`position` asc";
	$result = do_query($query);
	while($row = do_fetch_result($result)){
		$element_id = $row['element_id'];
		$option_id  = $row['option_id'];
		$options_lookup[$element_id][$option_id]['position'] 		  = $row['position'];
		$options_lookup[$element_id][$option_id]['option'] 			  = $row['option'];
		$options_lookup[$element_id][$option_id]['option_is_default'] = $row['option_is_default'];
	}

	
	//get elements data
	$element = array();
	$query = "select 
					element_id,
					element_title,
					element_guidelines,
					element_size,
					element_is_required,
					element_is_unique,
					element_is_private,
					element_type,
					element_position,
					element_default_value,
					element_constraint 
				from 
					ap_form_elements 
			   where 
			   		form_id='$form_id' 
			order by 
					element_position asc";
	$result = do_query($query);
	$j=0;
	while($row = do_fetch_result($result)){
		$element_id = $row['element_id'];
		
		//lookup element options first
		if(!empty($options_lookup[$element_id])){
			$element_options = array();
			$i=0;
			foreach ($options_lookup[$element_id] as $option_id=>$data){
				$element_options[$i] = new stdClass();
				$element_options[$i]->id 		 = $option_id;
				$element_options[$i]->option 	 = $data['option'];
				$element_options[$i]->is_default = $data['option_is_default'];
				$element_options[$i]->is_db_live = 1;
				$i++;
			}
		}
		
	
		//populate elements
		$element[$j] = new stdClass();
		$element[$j]->title 		= $row['element_title'];
		$element[$j]->guidelines 	= $row['element_guidelines'];
		$element[$j]->size 			= $row['element_size'];
		$element[$j]->is_required 	= $row['element_is_required'];
		$element[$j]->is_unique 	= $row['element_is_unique'];
		$element[$j]->is_private 	= $row['element_is_private'];
		$element[$j]->type 			= $row['element_type'];
		$element[$j]->position 		= $row['element_position'];
		$element[$j]->id 			= $row['element_id'];
		$element[$j]->is_db_live 	= 1;
		$element[$j]->default_value = $row['element_default_value'];
		$element[$j]->constraint 	= $row['element_constraint'];
		if(!empty($element_options)){
			$element[$j]->options 	= $element_options;
		}else{
			$element[$j]->options 	= '';
		}
		$j++;
	}
	
	
	$json = new Services_JSON();
	$json_form = $json->encode($form);
	
		
	$all_element = array('elements' => $element);
	
	$json_element = $json->encode($all_element);

	
	$header_data =<<<EOT
	<script type="text/javascript" src="js/base.js"></script>
	<script type="text/javascript" src="js/machform.js"></script>
EOT;
	
	$show_status_bar = true; //for header.php
	
	require('includes/header.php'); 
?>
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
<div id="main">
<form id="form_result" action="">
<ul id="form_elements"></ul>

<div class="notification" style="display: <?php if(empty($element)){ echo 'block'; } else { echo 'none'; }; ?>;" id="nofields" onclick="display_fields(0)">
<h2>您还没有添加字段!</h2>
<p>点击右侧的字段可以添加到这里.</p>
</div>

<div id="div_button" class="buttons form_save <?php if(empty($element)){ echo ' hide'; } ?>">
<a href="#" id="form_save_button" class="positive">
                <i class="glyphicon glyphicon-ok"></i>保存表单
</a>
</div>
</form>
<div id="debug_box"></div>
</div>


<div id="sidebar">
<div id="tabs" class="row tabs">
            <div class="col-md-4 col-md-p prop_tab"  id="add_field_tab">
              <a class="hover" href="javascript:display_fields(0);" title="Add a Field"><i class="glyphicon glyphicon-plus"></i>添加组件</a>
            </div>
            <div class="col-md-4 col-md-p prop_tab" id="field_prop_tab">
             <a href="javascript:display_field_properties();" title="Field Properties"><i class="glyphicon glyphicon-edit"></i>编辑组件</a>
            </div>
            <div class="col-md-4 col-md-p prop_tab" id="form_prop_tab">
              <a href="javascript:display_form_properties();" title="Form Properties"><i class="glyphicon glyphicon-cog"></i>表单设置</a>
            </div>
          </div>
<!--
<ul id="tabs" class="add_field_tab">
<li id="add_field_tab"><a href="javascript:display_fields(0);" title="Add a Field">添加组件</a></li>
<li id="field_prop_tab"><a href="javascript:display_field_properties();" title="Field Properties">编辑组件</a></li>
<li id="form_prop_tab"><a href="javascript:display_form_properties();" title="Form Properties">表单设置</a></li>
</ul>
-->

<div id="add_elements" class="accordion-heading">
          	<div class="available-fields">
              <div class="accordion-toggle"><i class="glyphicon glyphicon-plus"></i>添加组件</div>
              <div id="element_buttons">
                <ul id="add_column">
                <li><a id="single_line_text" href="javascript:insert_element('text')"><i class="icon text-field field-icon"></i>单行文本</a></li>
                <li><a id="multiple_choice" href="javascript:insert_element('radio');"><i class="glyphicon glyphicon-record field-icon"></i>单项选择</a></li>
                <li><a id="paragraph_text" href="javascript:insert_element('textarea');"><i class="icon text-area field-icon"></i>多行文本</a></li>
                <li><a id="checkboxes" href="javascript:insert_element('checkbox');"><i class="glyphicon glyphicon-check field-icon"></i>多项选择</a></li>
                <li><a id="number" href="javascript:insert_element('number');"><i class="icon number-field field-icon"></i>数字</a></li>
                <li><a id="drop_down" href="javascript:insert_element('select');"><i class="icon drop-down field-icon"></i>下拉框</a></li>
                <li><a id="date" href="javascript:insert_element('date');"><i class="glyphicon glyphicon-calendar field-icon"></i>日期</a></li>
                <li><a id="time" href="javascript:insert_element('time');"><i class="glyphicon glyphicon-time field-icon"></i>时间</a></li>
                <li><a id="price" href="javascript:insert_element('currency');"><i class="glyphicon glyphicon-usd field-icon"></i>价格</a></li>
                <li><a id="section_break" href="javascript:insert_element('section');" title="Organize your form."><i class="glyphicon glyphicon-minus field-icon"></i>分节</a></li>
                <li><a id="file_upload" href="javascript:insert_element('file');"><i class="glyphicon glyphicon-cloud-upload field-icon"></i>上传文件</a></li>
                <li><a id="product" href="javascript:insert_element('product');"><i class="glyphicon glyphicon-usd field-icon"></i>商品</a></li>
                </ul>
                <ul class="column_describe">
                <hr>
                <h1>联系人组件<p>用户在组件中填写的内容，会自动成为联系人的信息项</p></h1>
                <li><a id="xingming" href="javascript:insert_element('xingming');"><i class="glyphicon glyphicon-user field-icon"></i>姓名</a></li>
                <li><a id="sex" href="javascript:insert_element('sex');"><i class="glyphicon glyphicon-user field-icon"></i>称谓</a></li>
                <li><a id="zhiwei" href="javascript:insert_element('zhiwei');"><i class="glyphicon glyphicon-user field-icon"></i>职位</a></li>
                <li><a id="email" href="javascript:insert_element('email');"><i class="glyphicon glyphicon-envelope field-icon"></i>邮箱</a></li>
                <li><a id="dianhua" href="javascript:insert_element('dianhua');"><i class="glyphicon glyphicon-earphone field-icon"></i>手机</a></li>
                <li><a id="city" href="javascript:insert_element('city');"><i class="glyphicon glyphicon-earphone field-icon"></i>城市</a></li>
                <li><a id="tel" href="javascript:insert_element('tel');"><i class="glyphicon glyphicon-earphone field-icon"></i>固话</a></li>
                <li><a id="weixin" href="javascript:insert_element('weixin');"><i class="glyphicon glyphicon-earphone field-icon"></i>微信</a></li>
                <li><a id="company" href="javascript:insert_element('company');"><i class="glyphicon glyphicon-earphone field-icon"></i>公司</a></li>
                <li><a id="fax" href="javascript:insert_element('fax');"><i class="glyphicon glyphicon-earphone field-icon"></i>传真</a></li>
                <li><a id="QQ" href="javascript:insert_element('QQ');"><i class="glyphicon glyphicon-earphone field-icon"></i>QQ</a></li>
                <li><a id="web_site" href="javascript:insert_element('url');"><i class="glyphicon glyphicon-globe field-icon"></i>网址</a></li>
                <li><a id="dizhi" href="javascript:insert_element('dizhi');"><i class="glyphicon glyphicon-home field-icon"></i>地址</a></li>
                </ul>

              </div>
            </div>
            <div class="arrow-left-inner"><i class="fa fa-caret-left"></i></div>
          </div>


<form style="display: block;" id="element_properties" action="" onsubmit="return false;">
<div class="element_inactive" id="element_inactive">
<h3><b>请先选择一个组件</b></h3>
<p>从左侧区域先选择一个组件以进行编辑</p>
</div>


<div id="add_elements" class="accordion-heading">
<div class="available-fields" id="all_properties">
<div class="accordion-toggle" style="height:35px;"><span id="element_position">2</span><i class="glyphicon glyphicon-edit" style="float:left;"></i><span id="mb_element_title" style="float:left;">单行文本</span></div>
<ul class="edit_elements">
<li>
<label class="desc" for="element_label">
组件标题
<a href="#" class="tooltip" title="Field Label" rel="组件标题将显示在组件之上">(?)</a>
</label>
<textarea id="element_label" class="textarea" 
					 onkeyup="set_properties(this.value, 'title')"
					  /></textarea><img src="images/icons/arrow_left.gif" id="arrow_left" height="24" width="24" align="top" style="margin-left: 3px;" />
</li>

<li class="left half" id="prop_element_type">
<label class="desc" for="element_type">
组件类型
<a href="#" class="tooltip" title="Field Type" rel="组件类型是指您想收集哪种数据，保存之后不可改变">(?)</a>
</label>
<select class="select full" id="element_type" autocomplete="off" tabindex="12" onchange="set_properties(JJ(this).val(), 'type')">
<option value="text">单行文本</option>
<option value="textarea">多行文本</option>
<option value="radio">单项选择</option>
<option value="checkbox">复选</option>
<option value="select">下拉菜单</option>
<option value="number">数字</option>
<option value="date">日期</option>
<option value="time">时间</option>
<option value="money">价格</option>
<option value="url">网址</option>
<option value="dizhi">地址</option>
<option value="file">文件上传</option>
<option value="section">节间隔</option>
<option value="xingming">姓名</option>
<option value="sex">称谓</option>
<option value="zhiwei">职位</option>
<option value="tel">固话</option>
<option value="dianhua">手机</option>
<option value="fax">传真</option>
<option value="email">Email</option>
<option value="QQ">QQ</option>
<option value="weixin">微信</option>
</select>
</li>

<li class="right half" id="prop_element_size">
<label class="desc" for="field_size">
组件尺寸
<a href="#" class="tooltip" title="Field Size" rel="组件的大小">(?)</a>
</label>
<select class="select full" id="field_size" autocomplete="off" tabindex="13" onchange="set_properties(JJ(this).val(), 'size')">
<option value="small">小</option>
<option value="medium">中</option>
<option value="large">大</option>
</select>
</li>

<li class="right half" id="prop_date_format">
<label class="desc" for="field_size">
日期格式
<a href="#" class="tooltip" title="Date Format" rel="你可以选择其中一种日期格式">(?)</a>
</label>
<select class="select full" id="date_type" autocomplete="off" onchange="set_properties(JJ(this).val(), 'type')">
<option id="element_date" value="date">MM / DD / YYYY</option>
<option id="element_europe_date" value="europe_date">DD / MM / YYYY</option>
</select>
</li>

<li class="right half" id="prop_name_format">
<label class="desc" for="name_format">
名字格式
<a href="#" class="tooltip" title="Name Format" rel="Two format available. A normal name field, or an extended name field with title and suffix.">(?)</a>
</label>
<select class="select full" id="name_format" autocomplete="off" onchange="set_properties(JJ(this).val(), 'type')">
<option id="element_simple_name" value="simple_name" selected="selected">Normal</option>
<option id="element_name" value="name">Extended</option>
</select>
</li>

<li class="right half" id="prop_phone_format">
<label class="desc" for="field_size">
电话格式
<a href="#" class="tooltip" title="Phone Format" rel="You can choose between American and International Phone Formats">(?)</a>
</label>
<select class="select full" id="phone_format" autocomplete="off" onchange="set_properties(JJ(this).val(), 'type')">
<option id="element_phone" value="phone">(###) ### - ####</option>
<option id="element_simple_phone" value="simple_phone">International</option>
</select>
</li>

<li class="right half" id="prop_currency_format">
<label class="desc" for="field_size">
货币格式
</label>
<select class="select full" id="money_format" autocomplete="off" onchange="set_properties(JJ(this).val(), 'constraint')">
<option id="element_money_yen" value="rmb">¥ 人民币</option>
<option id="element_money_usd" value="dollar">$ Dollars</option>
<option id="element_money_euro" value="euro">€ Euros</option>
<option id="element_money_pound" value="pound">£ Pounds</option>
<option id="element_money_yen" value="yen">¥ Yen</option>
</select>
</li>

<li class="clear" id="prop_choices">
<fieldset class="choices">
<legend>
选项
<a href="#" class="tooltip" title="Choices" rel="Use the plus and minus buttons to add and delete choices. Click on the star to make a choice the default selection.">(?)</a>
</legend>
<ul id="element_choices">
</ul>
</fieldset>
</li>

<li class="left half clear" id="prop_options">
<fieldset class="fieldset">
<legend>规则</legend>
<input id="element_required" class="checkbox" value="" tabindex="14" onclick="(this.checked) ? checkVal = '1' : checkVal = '0';set_properties(checkVal, 'is_required')" type="checkbox">
<label class="choice" for="element_required">是否必填</label>
<a href="#" class="tooltip" title="Required" rel="如果选择此项,那么用户将必须填写此字段">(?)</a><br>
<span id="element_unique_span">
<input id="element_unique" class="checkbox" value="" tabindex="15" onchange="(this.checked) ? checkVal = '1' : checkVal = '0';set_properties(checkVal, 'is_unique')" type="checkbox"> 
<label class="choice" for="element_unique">数据唯一</label>  
<a href="#" class="tooltip" title="No Duplicates" rel="如果选择此项,用户填写的数据不能重复">(?)</a></span><br>
</fieldset>
</li>

<li class="right half" id="prop_access_control">
<fieldset class="fieldset">
<legend>是否可见</legend>
<input id="fieldPublic" name="security" class="radio" value="" checked="checked" tabindex="16" onclick="set_properties('0', 'is_private')" type="radio">
<label class="choice" for="fieldPublic">所有人可见</label>
<a href="#" class="tooltip" title="Visible to Everyone" rel="This is the default option. The field will be accessible by anyone when the form is made public.">(?)</a><br>
<span id="admin_only_span">
<input id="fieldPrivate" name="security" class="radio" value="" tabindex="17" onclick="set_properties('1', 'is_private')" type="radio">
<label class="choice" for="fieldPrivate">仅管理员可见</label>
<a href="#" class="tooltip" title="Admin Only" rel="Fields that are set to 'Admin Only' will not be shown to users when the form is made public.">(?)</a></span><br>
</fieldset>
</li>

<li class="left half clear" id="prop_randomize">
<fieldset class="fieldset">
<legend>Randomize</legend>
<input id="element_not_random" name="randomize" class="radio" value="" checked="checked" tabindex="16" onclick="set_properties('', 'constraint')" type="radio">
<label class="choice" for="element_not_random">Static Order</label>
<a href="#" class="tooltip" title="Static Order" rel="This is the default option. Options will always be displayed in the order you have created them.">(?)</a><br>

<input id="element_random" name="randomize" class="radio" value="" tabindex="16" onclick="set_properties('random', 'constraint')" type="radio">
<label class="choice" for="element_random">Random Order</label>
<a href="#" class="tooltip" title="Random Order" rel="Choose this if you would like the options to be shuffled around each time someone views your form.">(?)</a><br>
</fieldset>
</li>

<li class="clear" id="prop_time_noseconds" style="padding-top: 5px">
<input id="time_noseconds" class="checkbox" value="" onclick="(this.checked) ? checkVal = 'show_seconds' : checkVal = '';set_properties(checkVal, 'constraint')" type="checkbox" style="margin-left: 0px;margin-top: -15px">
<label class="choice" for="time_noseconds">Show Seconds field</label>
<a href="#" class="tooltip" title="Show Seconds field" rel="Checking this will enable Seconds field on your time field.">(?)</a><br>
</li>


<li class="clear buttons" id="prop_add_product" style="display:block;">
<label class="desc">
商品列表
<a href="#" class="tooltip" title="Default Value" rel="By setting this value, the field will be prepopulated with the text you enter.">(?)</a>
</label>

<div class="shoppingitem_preview_container">
    <div class="shoppingitem_preview" style="display: none;">
        <div class="previewimg">
            <img src="" alt="">
        </div>
        <div class="previewinfo"></div>
    </div>
    <div class="shoppingitem_edit" newitem="true">
        <div class="editimgfield">
            <img class="defaultimg" src="images/icon/formDefaultImage.png" alt="上传图片" style="width: 94%; display: inline;">
            <img src="" alt="" class="editimg" style="display:none;">
            
            <div class="upload_shopping_file">
                <input type="file" size="1" class="input_file" name="_FILE_">
                <a class="btn btn-primary btn_shopiingimg">上传图片</a>
            </div>
            <div class="uploadinfo" style="display:none;margin-top:10px;text-align:center;"></div>
        </div>
        <div class="editfield">
            <div class="shopping_name"><p class="namefield">名称:</p><input type="text" class="input"></div>
            <div class="shopping_link"><p class="namefield">链接:</p><input type="text" class="input"></div>
            <!-- <div class="shopping_describe"><p class="namefield">描述:</p><input type="text" class="input"></div> -->
            <div class="shopping_price"><p class="namefield">单价:</p><input type="text" class="input"></div>
            <div class="shopping_num"><p class="namefield">最多购买份数:</p><input type="text" class="input"></div>
            <div class="shopping_controller">
                <a class="btn btn-primary btn_additem">保存</a>
                <a class="btn btn-primary btn_canceledit">取消</a>
            </div>
            <div class="errorinfo" style="display: none;">必须填写商品名称</div>
        </div>
    </div>
</div>

<a id="element_product" class="positive"><i class="glyphicon glyphicon-plus">添加商品</i></a>
</li>


<li class="clear" id="prop_default_value">
<label class="desc" for="element_default">
默认值
<a href="#" class="tooltip" title="Default Value" rel="By setting this value, the field will be prepopulated with the text you enter.">(?)</a>
</label>

<input id="element_default" class="text large" name="text" value="" tabindex="11" maxlength="255" onkeyup="set_properties(JJ(this).val(), 'default_value')" onblur="set_properties(JJ(this).val(), 'default_value')" type="text">
</li>

<li class="clear" id="prop_default_country">
<label class="desc" for="fieldaddress_default">
Default Country
<a href="#" class="tooltip" title="Default Country" rel="By setting this value, the country field will be prepopulated with the selection you make.">(?)</a>
</label>
<select class="select medium" id="element_countries" onchange="set_properties(JJ(this).val(), 'default_value')">
<option value=""></option>

<optgroup label="North America">
<option value="Antigua and Barbuda">Antigua and Barbuda</option>
<option value="Bahamas">Bahamas</option>
<option value="Barbados">Barbados</option> 
<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
<option value="Saint Lucia">Saint Lucia</option>
<option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option> 
<option value="Trinidad and Tobago">Trinidad and Tobago</option>
<option value="United States">United States</option>
</optgroup>
</select>
</li>

<li class="clear" id="prop_phone_default">
<label class="desc" for="element_phone_default1">
默认值
<a href="#" class="tooltip" title="Default Value" rel="By setting this value, the field will be prepopulated with the text you enter.">(?)</a>
</label>

( <input id="element_phone_default1" class="text" size="3" name="text" value="" tabindex="11" maxlength="3" onkeyup="set_properties(JJ('#element_phone_default1').val().toString()+JJ('#element_phone_default2').val().toString()+JJ('#element_phone_default3').val().toString(), 'default_value')" onblur="set_properties(JJ('#element_phone_default1').val().toString()+JJ('#element_phone_default2').val().toString()+JJ('#element_phone_default3').val().toString(), 'default_value')" type="text"> ) 

<input id="element_phone_default2" class="text" size="3" name="text" value="" tabindex="11" maxlength="3" onkeyup="set_properties(JJ('#element_phone_default1').val().toString()+JJ('#element_phone_default2').val().toString()+JJ('#element_phone_default3').val().toString(), 'default_value')" onblur="set_properties(JJ('#element_phone_default1').val().toString()+JJ('#element_phone_default2').val().toString()+JJ('#element_phone_default3').val().toString(), 'default_value')" type="text"> -
<input id="element_phone_default3" class="text" size="4" name="text" value="" tabindex="11" maxlength="4" onkeyup="set_properties(JJ('#element_phone_default1').val().toString()+JJ('#element_phone_default2').val().toString()+JJ('#element_phone_default3').val().toString(), 'default_value')" onblur="set_properties(JJ('#element_phone_default1').val().toString()+JJ('#element_phone_default2').val().toString()+JJ('#element_phone_default3').val().toString(), 'default_value')" type="text">
</li>


<li class="clear">
<label class="desc" for="element_instructions">
用户提示信息
<a href="#" class="tooltip" title="Guidelines" rel="This text will be displayed to your users while they're filling out particular field.">(?)</a>
</label>

<textarea class="textarea full" rows="10" cols="50" id="element_instructions" tabindex="18" onkeyup="set_properties(this.value, 'guidelines')" onblur="set_properties(this.value, 'guidelines')"></textarea>
</li>
</ul>
</form>
<ul id="add_elements_button" style="display: none; padding-top: 5px">
<li class="buttons" id="list_buttons">
<a href="#"  onclick="display_fields(0);return false" class="positive">
                <i class="glyphicon glyphicon-plus"></i>添加另一个组件
</a>
<!--
<a href="#" onclick="display_fields(0);return false">
<img src="images/icons/textfield_add.gif" alt="">添加另一个组件</a>
-->
</li>
</ul>
<div class="arrow-left-inner"><i class="fa fa-caret-left"></i></div>
</div>
</div>






<form style="display: none;" id="form_properties" action="" onsubmit="return false;">
<div id="add_elements" class="accordion-heading">
          	<div class="available-fields">
<div class="accordion-toggle"><span>2</span><i class="glyphicon glyphicon-cog"></i>表单设置</div>
<ul class="edit_elements">
<li>
<label class="desc" for="form_title">表单标题<a class="tooltip" title="Form Title" rel="The title of your form displayed to the user when they see your form.">(?)</a></label>
<input id="form_title" class="text medium" value="" tabindex="1" maxlength="50" onkeyup="update_form(this.value, 'name')" onblur="update_form(this.value, 'name')" type="text">
</li>
<li>
<label class="desc" for="form_description">表单描述<a class="tooltip" title="Description" rel="This will appear directly below the form name. Useful for displaying a short description or any instructions, notes, guidelines.">(?)</a></label>
<textarea class="textarea small" rows="10" cols="50" id="form_description" tabindex="2" onkeyup="update_form(this.value, 'description')" onblur="update_form(this.value, 'description')"></textarea>
</li>

<li>
<input id="form_password_option" class="checkbox" value="" tabindex="5" type="checkbox">
<label class="choice" for="form_password_option"><b>密码保护</b></label>
<a class="tooltip" title="Turn On Password Protection" rel="如果开启此项,所有用户填写此表单时都需输入密码才能访问">(?)</a><br>
<div id="form_password" class="password hide">
<img src="images/icons/key.gif" alt="Password : ">
<input id="form_password_data" class="text" value="" size="25" tabindex="6" maxlength="255" onkeyup="update_form(this.value, 'password')" onblur="update_form(this.value, 'password')" type="password">
</div>
</li>

<li>
<input id="form_captcha" class="checkbox" value="" onchange="(this.checked)?update_form('1', 'captcha'):update_form('0','captcha');" tabindex="6" type="checkbox">
<label class="choice" for="form_captcha"><b>开启验证码</b></label>
<a class="tooltip" title="开启验证码" rel="如果启用,将生成图像与随机的单词(音频也提供),用户将被要求输入正确的单词才可以提交表单,以防止机器人或程序自动填表。">(?)</a><br>
</li>

<li>
<input id="form_unique_ip" class="checkbox" value="" onchange="(this.checked)?update_form('1', 'unique_ip'):update_form('0','unique_ip');" tabindex="7" type="checkbox">
<label class="choice" for="form_unique_ip"><b>限制每个用户提交一次</b></label>
<a class="tooltip" title="限制每个用户一个条目" rel="根据ip限制每个用户只能提交一次">(?)</a><br>
</li>

<li>
<input id="form_review" class="checkbox" value="" onchange="(this.checked)?update_form('1', 'review'):update_form('0','review');" tabindex="8" type="checkbox">
<label class="choice" for="form_review"><b>提交之前显示预览</b></label>
<a class="tooltip" title="提交之前显示预览" rel="If enabled, users will be prompted to a preview page that lets them double check their entries before submitting the form.">(?)</a><br>
</li>

<li>
<fieldset>
<legend>提交成功消息</legend>

<div class="left">
<input id="form_success_message_option" name="confirmation" class="radio" value="" checked="checked" tabindex="8" onclick="update_form('', 'redirect'); Element.removeClassName('form_success_message', 'hide');Element.addClassName('form_redirect_url', 'hide')" type="radio">
<label class="choice" for="form_success_message_option">显示文本</label>
<a class="tooltip" title="成功消息" rel="用户提交表单成功后将显示此消息">(?)</a>
</div>

<div class="right">
<input id="form_redirect_option" name="confirmation" class="radio" value="" tabindex="7" onclick="update_form(redirect_url, 'redirect'); Element.addClassName('form_success_message', 'hide');Element.removeClassName('form_redirect_url', 'hide');" type="radio">
<label class="choice" for="form_redirect_option">跳转到其他页面</label>
<a class="tooltip" title="Redirect URL" rel="用户提交后可自动跳转到此url">(?)</a>
</div>

<textarea class="textarea full" rows="10" cols="50" id="form_success_message" tabindex="9" onkeyup="update_form(JJ(this).val(), 'success_message')" onblur="update_form(JJ(this).val(), 'success_message')"><?php echo $form->success_message; ?></textarea>

<input id="form_redirect_url" class="text full hide" name="text" value="http://" tabindex="10" onkeyup="redirect_url = JJ(this).val();update_form(JJ(this).val(), 'redirect')" onblur="urlInHistory = JJ(this).val();update_form(JJ(this).val(), 'redirect')" type="text">
</fieldset>
</li>
</ul>
</div>
            <div class="arrow-left-inner"><i class="fa fa-caret-left"></i></div>
</div>
</form>
</div>

<script src="js/vendor/jquery.ui.widget.js"></script>
<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
<script src="js/jquery.iframe-transport.js"></script>
<!-- The basic File Upload plugin -->
<script src="js/jquery.fileupload.js"></script>
<!-- The File Upload processing plugin -->
<script src="js/jquery.fileupload-process.js"></script>
<!-- The File Upload image preview & resize plugin -->
<script src="js/jquery.fileupload-image.js"></script>
<!-- The File Upload audio preview plugin -->
<script src="js/jquery.fileupload-audio.js"></script>
<!-- The File Upload video preview plugin -->
<script src="js/jquery.fileupload-video.js"></script>
<!-- The File Upload validation plugin -->
<script src="js/jquery.fileupload-validate.js"></script>


<?php 
	$footer_data =<<<EOT
<script type="text/javascript">
var json_form = {$json_form};
var json_elements = {$json_element};
</script>
EOT;
	require('includes/footer.php'); 
?>
