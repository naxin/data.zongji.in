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
          <li><a href="set_form.php?action=overview&id=<?php echo $formInfo['form_id'];?>">概述</a></li>
          <!--<li><a href="form_created_edit.html">编辑</a></li>
          <li><a href="form_rule.html">规则</a></li>
          <li><a href="form_theme.html">样式</a></li>-->
          <li><a href="set_form.php?action=setting&id=<?php echo $formInfo['form_id'];?>">设置</a></li>
          <li class="active"><a href="set_form.php?action=publish&id=<?php echo $formInfo['form_id'];?>">发布</a></li>
          <li><a href="manage_entries.php?id=<?php echo $formInfo['form_id'];?>">数据</a></li>
        </ul>
      </div>
      <div class="form-overview">
        <div class="row main_content" id="form_setting">
          <div class="share-rules-info">
        <span>填写者权限：</span>
        <span>公开（所有人可填）</span>
        <a href="set_form.php?action=setting&id=<?php echo $formInfo['form_id'];?>">设置权限</a>
      </div>
          <div class="tabbable tabs-left">
            <ul class="nav nav-tabs">
              <li class="publish-step active" data-id="1"><a href="javascript:void(0)">表单网址</a></li>
              <li class="publish-step" data-id="2"><a href="javascript:void(0)">嵌入网页</a></li>
              <li class="publish-step" data-id="3"><a href="javascript:void(0)">分享社交网站</a></li>
              <li class="publish-step" data-id="4"><a href="javascript:void(0)">微信公共账号</a></li>
              <li class="publish-step" data-id="5"><a href="javascript:void(0)">发给微信好友</a></li>
            </ul>
          
            <div class="tab-content" data-id="1">
              <div class="tab-pane active" id="tab_visit_url"><ul>
                  <li>
                    直接访问网址
                    <div>
                    <input id="published_form_link" class="copy-target input-xxlarge" value="<?php echo SITE_URL. "/view.php?id={$formInfo['form_id']}";?>">
                      <a href="javascript:void(0);" class="copy-link1 btn btn-primary" data-href="#published_form_link_2" data-message="网址复制成功！" data-role="copy" id="copy-link">复制网址</a>
                      <a href="<?php echo SITE_URL. "/view.php?id={$formInfo['form_id']}";?>" class="copy-link2 btn btn-primary" data-no-turbolink="true" target="_blank">直接打开</a>
                  </li>
                  <li>
                    二维码发布
                    <div id="qrcode" class="with_tooltip" data-placement="right" title="" data-original-title="128px, 适合置于网页">
                      <div>
                        <img alt="Tldyxh" src="<?php echo "/data/qrcode/{$formInfo['shorturl']}.png";?>">
                      </div>
                      <div class="download" data-no-turbolink="">
                        <a href="#"><i class="icon download-icon"></i></a>
                      </div>
                    </div>
<!--
                    <div class="download_links" data-no-turbolink="">
                      <a href="/forms/TldyXH/qrcode/small" class="with_tooltip" data-placement="bottom" title="" data-original-title="宽256px,适合置入文档">小号</a>
                      <a href="/forms/TldyXH/qrcode/medium" class="with_tooltip" data-placement="bottom" title="" data-original-title="宽512px,适合插入PPT">中号</a>
                      <a href="/forms/TldyXH/qrcode/large" class="with_tooltip" data-placement="bottom" title="" data-original-title="宽1024px,适合海报印刷">大号</a>
                    </div>
-->
                  </li>
                </ul>
                </div>
            </div>


            <div class="tab-content hide" data-id="2">
              <div class="tab-pane active" id="tab_visit_url">
              <ul>
                <li>在网页中以iFrame的方式嵌入表单<span class="muted">其他方式增加中</span>
                  <textarea id="published_form_iframe" class="copy-target input-xxlarge height80"><?php echo $standard_form_code;?></textarea>
                    <a href="javascript:void(0);" class="copy-link1 btn btn-primary iframe-a" data-href="#published_form_link_2" data-message="网址复制成功！" data-role="copy" id="copy-code">复制代码</a>
                </li>
              </ul>
              </div>
            </div><!--tab2 end-->


            <div class="tab-content hide" data-id="3">
              <div class="tab-pane active" id="tab_visit_url">
              <ul>
                <li>分享社交网站
                <div class="bshare-custom icon-medium-plus"><a title="分享到" href="http://www.bShare.cn/" id="bshare-shareto" class="bshare-more">分享到</a><a title="分享到QQ空间" class="bshare-qzone"></a><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到网易微博" class="bshare-neteasemb"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a><span class="BSHARE_COUNT bshare-share-count">0</span></div><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh"></script><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script>
                  </div>
                </li>               
              </ul>
            </div><!--tab3 end-->

            <div class="tab-content hide" data-id="4">
              <div class="tab-pane active" id="tab_visit_url">
              <div>
                <p>您可以有多种方式把莫比网的表单嵌入到微信</p>
              
              <ol>
                <li>开发模式：您可以自由定制</li>
                <li>编辑模式-菜单：将表单网址复制到微信后台菜单配置中的“跳转到网页”，由于微信限制，需去掉网址前面的"https://"</li>
                <li>编辑模式-关键词回复：参见以下教程</li>               
              </ol>
              <ul>
                <li>代码:<span class="muted"></span>
                  <div>
                  <input id="published_form_link_2" class="copy-target input-xxlarge" value="<a href=&quot;http://data.360mb.cn/view.php?id=<?php echo $formInfo['form_id'];?>&quot;>未命名表单</a>">
                    <a href="javascript:void(0);" class="copy-link1 btn btn-primary" data-href="#published_form_link_2" data-message="网址复制成功！" data-role="copy" id="copy_link">复制代码</a>
                  </div>
                </li>
                <li>详细教程：
                  <ol>
        <li>在微信后台设置自定义回复，添加在莫比网所创建的表单地址，如下图所示：
          <div><img src="images/weixin1.png" width="547" height="439"></div>
        </li>
        <li>没有第二步了，看看效果吧：
          <div>
            <img src="images/weixin2.jpg" width="320" height="568">
            <img src="images/weixin3.jpg" width="320" height="568">
          </div>
        </li>
      </ol>
    </li>
              </ul>
              </div>
              </div>
            </div>            
        <!--tab4 end-->

<div class="tab-content hide" data-id="5">
              <div class="tab-pane active" id="tab_visit_url">
                <div>
                <p>想要把表单发送给微信上的朋友？只需要3步：</p>
                <ol>
                <li>用微信的“扫一扫”扫描此二维码。
                  <div id="qrcode">
                    <div><img alt="Tldyxh" src="<?php echo "/data/qrcode/{$formInfo['shorturl']}.png";?>"></div>
                  </div>
                </li>
                <li>打开表单后，点击右上角的“分享”。
                  <div><img src="images/weixinfriend2.jpg"></div>
                </li>
                <li>然后选择“发送给朋友”。
                  <div><img src="images/weixinfriend3.jpg"></div>
                </li>               
                </ol>                        
                </div>
              </div>
        <!--tab5 end-->


          </div>
          </div>
        </div>

               
      </div>

<script src="/js/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="/js/jquery.zclip.js"></script>
<script type="text/javascript" charset="utf-8">
bShare.addEntry({
    title: "我刚刚在@<?php echo SITE_NAME;?> 创建了表单[ <?php echo $form_name;?> ]，邀请大家轻击链接来填写，谢谢！",
    url: "<?php echo SITE_URL. "/view.php?id={$formInfo['form_id']}";?>",
    summary: "<?php echo $formInfo['form_description'];?>",
    pic: "http://myform.cn/images/appnitro_logo.png"
});
</script>
<script>
$(function(){
    $('#copy-code').zclip({
        path : '/js/ZeroClipboard.swf',
        copy : 'sdfsdfs'
    });
     
    // 当点击 Id 为 copy-button 的按钮时
    // Id 为 content 中的内容将会被复制
     
    $('#copy-link').zclip({
        path : '/js/ZeroClipboard.swf',
        copy : $('#published_form_link').val()
    });

    $(".publish-step").click(function(){
        $(".publish-step").removeClass("active");
        $(this).addClass("active");
        var dataid = $(this).attr("data-id");

        $(".tab-content").hide();
        $(".tab-content[data-id='"+dataid+"']").removeClass("hide");
        $(".tab-content[data-id='"+dataid+"']").show();
    });
});
</script>
<?php require('includes/footer.php');?>

