      <div class="breadcrumbs">
        <ol class="breadcrumb">
          <li><a href="/"><i class="glyphicon glyphicon-home"></i>首页</a></li>
          <li><a href="/manage_form.php">智能表单</a></li>
          <li class="active"><?php echo $formInfo['form_name']; ?></li>
        </ol>
      </div>
      <div class="subnav">
        <ul class="nav nav-tabs">
          <li><a href="set_form.php?action=overview&id=<?php echo $formInfo['form_id'];?>">概述</a></li>
          <!--<li><a href="form_created_edit.html">编辑</a></li>
          <li><a href="form_rule.html">规则</a></li>
          <li><a href="form_theme.html">样式</a></li>-->
          <li class="active"><a href="set_form.php?action=setting&id=<?php echo $formInfo['form_id'];?>">设置</a></li>
          <li><a href="set_form.php?action=publish&id=<?php echo $formInfo['form_id'];?>">发布</a></li>
          <li><a href="manage_entries.php?id=<?php echo $formInfo['form_id'];?>">数据</a></li>
        </ul>
      </div>
