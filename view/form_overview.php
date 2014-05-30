<?php require('includes/header.php'); ?>
      <div class="breadcrumbs">
        <ol class="breadcrumb">
          <li><a href="/"><i class="glyphicon glyphicon-home"></i>首页</a></li>
          <li><a href="/manage_form.php">智能表单</a></li>
          <li class="active"><?php echo $formInfo['form_name']; ?></li>
        </ol>
      </div>
      <div class="subnav">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#">概述</a></li>
          <!--<li><a href="form_created_edit.html">编辑</a></li>
          <li><a href="form_rule.html">规则</a></li>
          <li><a href="form_theme.html">样式</a></li>-->
          <li><a href="set_form.php?action=setting&id=<?php echo $formInfo['form_id'];?>">设置</a></li>
          <li><a href="set_form.php?action=publish&id=<?php echo $formInfo['form_id'];?>">发布</a></li>
          <li><a href="manage_entries.php?id=<?php echo $formInfo['form_id'];?>">数据</a></li>
        </ul>
      </div>
      <div class="form-overview">
        <div class="row main_content">
          <div class="col-md-8 form-info">
            <dl>
              <dt>表单：</dt>
              <dd><?php echo $formInfo['form_name'];?></dd>
              <dt>表单说明：</dt>
              <dd><?php echo $formInfo['form_description'];?></dd>
              <dt>创建人：</dt>
              <dd>123</dd>
              <dt>状态：</dt>
              <?php 
                  $active = ($formInfo['form_active'] == 1) ? "正在收集<a href=\"#\">停止收集</a>" : "已停止,<a href=\"#\">启动收集</a>";
              ?>
                  <dd><?php echo $active;?></dd>
              <dt>创建时间：</dt>
              <dd><?php echo $formInfo['create_time'];?></dd>
            <!--
              <dt>数据容量：</dt>
              <dd>
                <div class="progress progress-info">
                  <div class="progress-bar progress-bar-success" style="width:60%;"></div>
                </div>
                <span>已用：0</span>
                <span class="pull-right">剩余：500</span>
              </dd>
              <dt>文件空间占用：</dt>
              <dd>0Bytes</dd>
              <dt>表单被浏览：</dt>
              <dd>0次</dd>
              <dt>结果被浏览：</dt>
              <dd>0次</dd>
              <dt>主题模板：</dt>
              <dd>
                <div class="background-preview large"><img class="img-responsive" src="images/form_bgmodel.png"></div>
              </dd>
            -->
            </dl>
          </div>
          <div class="col-md-4">
            <div class="row data-info">
              <div class="col-md-6">
                <div class="total-data-number">
                总数据量<div class="number total-number"><a href="#"><?php echo $formInfo['totalData'];?></a></div>
                </div>
              </div>
              <div class="col-md-6 today-data-number">

                  今日数据<div class="number today-number"><a href="#"><?php echo $formInfo['toDayData'];?></a></div>

              </div>
            </div>
            <div class="row form-action">
            <div class="col-md-4 col-md-p"><a class="btn btn-primary" href="view.php?id=<?php echo $formInfo['form_id'];?>" target="_blank">查看表单</a></div>
              <div class="col-md-4 col-md-p"><a class="btn btn-primary" href="edit_form.php?id=<?php echo $formInfo['form_id'];?>" target="_blank">编辑表单</a></div>
              <div class="col-md-4 col-md-p btn-group"><button class="btn btn-primary dropdown-toggle"  data-toggle="dropdown" type="button">更多操作<i class="icon icon-down"></i></button>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="manage_form.php?pageno=<?php echo $pageno; ?>&delete=<?php echo $formInfo['form_id']; ?>" onclick="javascript: return confirm('你确定你要删除这个表单和所有相关的数据吗?');">删除</a></li>
                    <li><a href="<?php echo "manage_form.php?duplicate={$formInfo['form_id']}"; ?>">复制表单</a></li>
                    <li class="divider"></li>
                    <li><a href="<?php echo "edit_css.php?id={$formInfo['form_id']}"; ?>">编辑CSS</a></li>
                  </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

<script src="/js/jquery/jquery-1.9.1.min.js"></script>
<script src="/js/bootstrap3.min.js"></script>
<?php require('includes/footer.php');?>
