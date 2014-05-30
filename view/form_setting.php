<?php require('includes/header.php'); ?>
<?php require('includes/setform.header.php'); ?>

      <div class="form-overview">
        <div class="row main_content" id="form_setting">
          <div class="tabbable tabs-left">
            <ul class="nav nav-tabs">
              <li class="form_set" data-id="collect-data"><a href="javascript:void(0)">收集数据</a></li>
              <li class="form_set" data-id="submit-form"><a href="javascript:void(0)">提交表单后</a></li>
              <!--<li class="form_set" data-id="push-alert"><a href="javascript:void(0)">推送提醒</a></li>
              <li class="form_set" data-id="form-result"><a href="javascript:void(0)">结果</a></li>
              <li class="form_set" data-id="form-alipay"><a href="javascript:void(0)">支付方式</a></li>
              <li class="form_set" data-id="team"><a href="javascript:void(0)">团队协作</a></li>
              <li class="form_set" data-id="form-text" class="active"><a href="javascript:void(0)">文案</a></li>-->
            </ul>
          
            <div class="tab-content">
              <div class="tab-pane active" id="collect-data">
                <div class="control-group">
                  <div class="control-label">填写者权限</div>
                  <div class="controls share-rules">
                    <div id="sub_authority_of_public" class="config ">
                      <label class="radio" for="form_unique_ip">
                      <input <?php if(!$formInfo['form_unique_ip']) echo 'checked="checked"';?> id="form_unique_ip" name="form_unique_ip" type="radio" value="0">不做限制
                      </label>
                      <label class="radio" for="form_unique_ip">
                        <input <?php if($formInfo['form_unique_ip']) echo 'checked="checked"';?> id="form_unique_ip" name="form_unique_ip" type="radio" value="1">每个用户限填一次
                      </label>
                    </div>
                  </div>
                </div>
                <!--
                <div class="control-group">
                  <div class="control-label">自动开启/停止</div>
                  <div class="controls share-rules">
                    <label class="checkbox">
                      <input data-role="close_rule" id="form_setting_enabled_close_rules_" name="form_setting[enabled_close_rules][]" type="checkbox" value="ByTimeRangeCloseRule">
                      设定开启/停止时间
                    </label>
                    <label class="checkbox">
                      <input data-role="close_rule" id="form_setting_enabled_close_rules_" name="form_setting[enabled_close_rules][]" type="checkbox" value="ByTimeRangeCloseRule">
                      设定数据量上线
                    </label>
                    <label class="checkbox">
                      <input data-role="close_rule" id="form_setting_enabled_close_rules_" name="form_setting[enabled_close_rules][]" type="checkbox" value="ByTimeRangeCloseRule">
                    设定每日开启时段
                    </label>  
                  </div>
                </div>            
                -->
                <hr>
                <div class="control-group">
                  <div class="control-label">表单状态</div>
                  <div class="controls share-rules form-status">
                  <span class="current-status">正在收集</span><a href="javascript:void(0)" data-href="set_form.php?action=changeStatus&id=<?php echo $formInfo['form_id'];?>" data-status="0" class="form-status-text">停止收集</a>  
                  </div>              
                </div>
                <hr>
                <div class="control-group">
                  <div class="control-label">密码保护</div>
                  <div class="controls share-rules">
                    <label class="checkbox">
                      <input data-role="close_rule" <?php if($formInfo['form_password']){ echo 'checked="checked" value=1';} else{ echo "value=0";};?>  id="password-protected" name="password-protected" type="checkbox">
                    提交前须填写密码
                    </label>
                    <label class="checkbox" id="password-content" <?php if($formInfo['form_password']) echo 'style="display:block"';?>>
                      <input id="form_password" class="copy-target form-control input-sm" <?php if($formInfo['form_password']){echo "value={$formInfo['form_password']}";} else{ echo "value=0";}?>>
                    </label>
                  </div>              
                </div>
                <hr>
                <div class="control-group">
                  <div class="control-label">验证码</div>
                  <div class="controls share-rules">
                    <label class="checkbox">
                      <input data-role="close_rule" id="form_captcha" name="form_captcha" type="checkbox" <?php if($formInfo['form_captcha']){ echo 'checked="checked value=1"';} else{ echo "value=0";};?>>
                    提交前须填写验证码
                    </label>
                  </div>              
                </div>
                <hr>
                <div class="control-group">
                  <div class="control-label">提交预览</div>
                  <div class="controls share-rules">
                    <label class="checkbox">
                      <input data-role="close_rule" id="form_review" name="form_review" type="checkbox"  <?php if($formInfo['form_review']){ echo 'checked="checked value=1"';} else{ echo "value=0";};?>>
                    提交前显示预览页面
                    </label>
                  </div>              
                </div>
                <!--
                <hr>
                <div class="control-group">
                  <div class="control-label">百度统计ID</div>
                  <div class="controls share-rules">
                    <input disabled="disabled" id="form_setting_ga_id" name="form_setting[ga_id]" size="30" type="text">
                    <span class="muted">借助该功能，您可以追踪记录该表单被浏览的详细情况，比如访客数量、访客来源、使用的设备。您需要先去Google Analytics申请一个跟踪ID。<a href="#">使用帮助</a></span>
                  </div>              
                </div>
                -->
                <hr>
                <div class="control-group">
                <div class="control-label">去除底部<?php echo SITE_NAME;?>Logo</div>
                  <div class="controls share-rules"><span class="muted"><a href="#">暂未开放</a></span></div>              
                </div>
                <!--
                <hr>
                <div class="control-group">
                  <div class="control-label">表单语言</div>
                  <div class="controls share-rules">
                    <select id="form_setting_locale" name="form_setting[locale]">
                      <option value="zh-CN" selected="selected">中文</option>
                      <option value="en">English</option>
                    </select>
                  </div>              
                </div>
                -->
                <hr>
                <div class="control-group">
                  <div class="buttons"><a href="javascript:void(0)" class="btn prevent-default" id="form-set-submit"><i class="glyphicon glyphicon-ok"></i>保存修改</a></div>
                </div>
              </div>

              <div class="tab-pane" id="submit-form" style="display:none;">
                <div class="control-group">
                  <div class="control-label lable-tit">填写者填完表单后</div>
                  <div class="controls share-rules">
                    <label class="radio inline"><input name="form-tip" class="form-tip" data-target="form_success_message"  <?php if($formInfo['form_success_message']){ echo 'checked="checked"';}?> type="radio">显示提示文字</label>
                    <label class="radio inline"><input name="form-tip" class="form-tip" data-target="form_redirect"  <?php if($formInfo['form_redirect']){ echo 'checked="checked"';}?> type="radio">跳转至指定页面</label>
                    <div id="sub_authority_of_public" class="config">
                    <!--
                      <label id="panel">提示文字：
                        <span class="label-hint"> 还可以输入
                          <span data-counter-rel="contador" class="counter">95</span>个字
                        </span>
                      </label>
                    -->
                      <textarea class="input-xlarge form-tip-content" cols="40" data-counter-rel="contador" id="form_success_message" maxlength="100" name="form_setting[success_message]" rows="3"> <?php if($formInfo['form_success_message']){ echo $formInfo['form_success_message'];} else{ echo "提交成功！";}?></textarea>
                      <input class="form-control input-sm form-tip-content" id="form_redirect" <?php if($formInfo['form_redirect']){echo "value={$formInfo['form_redirect']}";}?>>
                      <!--
                      <label class="checkbox"><input type="checkbox">向填写者展示其序号</label>
                      <label class="checkbox"><input type="checkbox">展示“再填一次”的链接</label>
                      <label class="checkbox"><input type="checkbox">展示社交网站分享链接</label>
                      <label class="checkbox"><input type="checkbox">不再提醒用户登录或注册</label>
                        -->
                    </div>
                  </div>
                </div>
                <!--
                <hr>
                <div class="control-group">
                  <label class="checkbox">
                    <input type="checkbox" value="1">
                      <span>将数据以JSON格式发送给第三方<i class="std1-feature exp1-feature ent1-feature"></i></span> 
                      <a href="#" target="_blank" class="entry-api-helper">详细帮助</a><br>
                      <span class="muted hint">选择此项，莫比将在收到数据后，向对应的HTTP地址 POST发送JSON格式数据。该服务器需在2秒内返回2XX作为应答。如果出错，莫比会重试最多三次。</span>
                  </label>             
                </div>-->
                <hr>
                <div class="control-group">
                  <div class="buttons"><a href="javascript:void(0)" class="btn prevent-default" id="btn-submit-form"><i class="glyphicon glyphicon-ok"></i>保存修改</a></div>
                </div>
              </div>
              <div class="tab-pane" id="push-alert" style="display:none;">
                <div class="control-group">
                  <div class="control-label">新增数据邮件提醒</div>
                  <div class="controls share-rules">已关闭<a href="#">&nbsp;&nbsp;开启</a></div>              
                </div>
                <hr>
                <div class="control-group">
                  <div class="control-label">自由定制提醒</div>
                  <div class="controls share-rules">
                    <a href="#" class="btn prevent-default">添加短信提醒(0.1元/条)</a>
                    <a href="#" class="btn prevent-default">添加邮件提醒</a>    
                    当前余额：0.00 元， 
                    <a href="#">充值</a>
                    <hr>
                    <div class="rules">
                      <div class="sending-history">
                        <ul class="nav nav-tabs">
                          <li class="active"><a href="#">短信发送记录</a></li>
                          <li><a href="#">邮件发送记录</a></li>
                        </ul>
                        <div class="tab-content">
                          <div class="tab-pane active" id="sms_history">暂无记录</div>
                          <div class="tab-pane" id="email_history">暂无记录</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane active" id="form-result" style="display:none;">
                <div class="control-group">
                  <div class="control-label">分享结果</div>
                  <div class="controls share-rules">网址：
                    <div>
                      <input id="results_link" class="copy-target" disabled="disabled">
                      <a href="#" class="copy-link btn btn-primary disabled" id="copy_results_link">复制网址</a>
                      <a href="#" class="copy-link btn btn-primary disabled" target="_blank">直接打开</a>
                    </div>
                   <hr>
                  </div>
                  <div class="controls share-rules">结果分享页面浏览权限：
                    <div>
                      <label class="radio"><input checked="checked" type="radio">公开：所有人均可浏览，并在填写者成功之后向其展示</label>
                      <label class="radio"><input type="radio">加密：凭密码浏览</label>
                      <label class="radio"><input type="radio">私密：不向任何人公开</label>
                    </div>
                    <hr>
                  </div>
                  <div class="controls share-rules">在结果分享页面上：
                    <div>
                      <label class="checkbox"><input type="checkbox" checked="checked">公开数据</label>
                      <label class="checkbox"><input type="checkbox" checked="checked">公开报表</label>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="control-label">对外查询</div>
                <div class="controls share-rules">公开对外查询后，他人可以在该页面上通过输入“查询条件”来搜索对应的数据，比如单行/多行文本、单项选择、数字、邮箱、网址、电话、手机或下拉框。
                    <hr>
                    该表单还没有可供查询的字段
                </div> 
                <hr>
                <div class="control-label">结果公开范围</div>
                <div class="controls share-rules">
                  <div class="rules">
                      <div class="sending-history">
                        <ul class="nav nav-tabs">
                          <li class="active"><a href="#">分享结果-数据</a></li>
                          <li><a href="#">分享结果-报表</a></li>
                          <li><a href="#">对外查询-数据</a></li>
                        </ul>
                        <div class="tab-content">
                          <div class="tab-pane active" id="sms_history">
                            <label class="checkbox"><input type="checkbox">序号</label>
                            <label class="checkbox"><input type="checkbox">提交人</label>
                            <label class="checkbox"><input type="checkbox">提交时间</label>
                            <label class="checkbox"><input type="checkbox">修改时间</label>
                          </div>
                          <div class="tab-pane" id="email_history">暂无记录</div>
                        </div>
                      </div>
                    </div>
                </div> 
                <hr>
                <div class="control-label">修改结果</div>
                <div class="controls share-rules">
                  <label class="checkbox"><input type="checkbox">允许填写者在登录莫比后修改结果</label>
                </div>                
                <hr>
                <div class="control-group">
                  <div class="buttons"><a href="#" class="btn prevent-default"><i class="glyphicon glyphicon-ok"></i>保存修改</a></div>
                </div>
              </div>
              <div class="tab-pane" id="form-alipay" style="display:none;">
                <div class="help-block">当表单中包含商品字段时，您可以选择绑定支付宝账户，用于自动收款。试运行期间，交易款流量不收手续费。
                </div>
              </div>
              <div class="tab-pane" id="team" style="display:none;">
                <div class="roles">
                  <table class="table table-hover roles-table">
                    <thead>
                      <tr>
                        <th>成员</th>
                        <th class="data_maintainer_role">数据维护员</th>
                        <th class="manager_role">表单管理员</th>
                        <th class="actions"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="name-with-vip-style">
                            <span class="vip-user free_user ">
                              <span>nnnn &lt;
                                <a class="smarterwiki-linkify" href="mailto:xingdekong@163.com">xingdekong@163.com</a>&gt;
                              </span>
                            </span>
                          </div>
                          </td>
                          <td class="data_maintainer_role">
                          </td>
                          <td class="manager_role">
                            <input checked="checked" class="role" type="radio">
                          </td>
                          <td class="actions">
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="4"><a href="#">添加或邀请成员</a></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
              </div>
              <div class="tab-pane" id="form-text" style="display:none">
                <div class="help-block">
                您可以在这里修改表单各个地方的提示文字                
                </div>
                <hr>
                <div class="control-group ">
                  <label class="control-label">填完表单后提示文字</label>
                  <div class="controls share-rules">
                    <textarea cols="40" data-counter-rel="wording_submitted_success" id="form_setting_success_message" maxlength="100" name="form_setting[success_message]" rows="3">提交成功！</textarea>
                    <span class="help-inline">100字以内，还可以输入<span data-counter-rel="wording_submitted_success" class="counter">95</span>个字</span>
                  </div>
                </div>
                <hr>
                <div class="control-group ">
                  <label class="control-label">表单提交按钮</label>
                  <div class="controls share-rules">
                    <input data-counter-rel="wording_submit" id="form_setting_wording_submit" maxlength="10" name="form_setting[wording][submit]" type="text" value="提交"  size="41">
                    <span class="help-inline">100字以内，还可以输入<span data-counter-rel="wording_submitted_success" class="counter">95</span>个字</span>
                  </div>
                </div>
                <hr>
                <div class="control-group ">
                  <label class="control-label">表单暂未开放</label>
                  <div class="controls share-rules">
                    <textarea cols="40" data-counter-rel="wording_submitted_success" id="form_setting_success_message" maxlength="100" name="form_setting[success_message]" rows="3">您访问的表单暂未开放</textarea>
                    <span class="help-inline">40字以内，还可以输入<span data-counter-rel="wording_submitted_success" class="counter">30</span>个字</span>
                  </div>
                </div>
                <hr>
                <div class="control-group ">
                  <label class="control-label">表单停止提交</label>
                  <div class="controls share-rules">
                    <textarea cols="40" data-counter-rel="wording_submitted_success" id="form_setting_success_message" maxlength="100" name="form_setting[success_message]" rows="3">您访问的表单已停止提交</textarea>
                    <span class="help-inline">40字以内，还可以输入<span data-counter-rel="wording_submitted_success" class="counter">29</span>个字</span>
                  </div>
                </div>
                <hr>
                <div class="control-group ">
                  <label class="control-label">表单需凭密码填写</label>
                  <div class="controls share-rules">
                    <textarea cols="40" data-counter-rel="wording_submitted_success" id="form_setting_success_message" maxlength="100" name="form_setting[success_message]" rows="3">填写该表单需输入密码，请向管理员索取</textarea>
                    <span class="help-inline">36字以内，还可以输入<span data-counter-rel="wording_submitted_success" class="counter">18</span>个字</span>
                  </div>
                </div>
                <hr>
                <div class="control-group ">
                  <label class="control-label">结果需凭密码查看</label>
                  <div class="controls share-rules">
                    <textarea cols="40" data-counter-rel="wording_submitted_success" id="form_setting_success_message" maxlength="100" name="form_setting[success_message]" rows="3">输入密码才能查看，请向表单管理员索取</textarea>
                    <span class="help-inline">36字以内，还可以输入<span data-counter-rel="wording_submitted_success" class="counter">18</span>个字</span>
                  </div>
                </div>
                <hr>

                <div class="control-group">
                  <div class="buttons"><a href="#" class="btn prevent-default"><i class="glyphicon glyphicon-ok"></i>保存修改</a></div>
                </div>
              </div>

            </div>

          </div>
          </div>


               
      </div>
<script src="/js/jquery/jquery-1.9.1.min.js"></script>
<script src="/js/bootstrap3.min.js"></script>
<script>
$(function(){
    var formtarget = $("input[name='form-tip']:checked").attr("data-target");
    if(formtarget == 'form_success_message'){
        $("#form_redirect").hide();
    }
    else{
        $("#form_success_message").hide();
    }

    $(".form_set").click(function(){
        $(".tab-pane").hide();
        $("#"+$(this).attr("data-id")).show();
    });

    $(".form-tip").click(function(){
        $(".form-tip-content").hide();
        //$("#form_redirect").removeClass("hide");
        $("#"+$(this).attr("data-target")).show();
    });

    $("#btn-submit-form").click(function(){
        var formtarget = $("input[name='form-tip']:checked").attr("data-target");
        alert(formtarget);
        if(formtarget == 'form_success_message'){
            $("#form_redirect").val('');
        }
        else{
            $("#form_success_message").val('');
        }
        var url = "set_form.php?action=collectData&id=<?php echo $formInfo['form_id'];?>";
        $.post(url, {form_success_message : $("#form_success_message").val(), form_redirect : $("#form_redirect").val()}, function(data){
            if(data == 'ok'){
                alert('修改成功');
            }
            else{
                alert('修改失败');
            }
        });
    });

    $("#password-protected").click(function(){
        if($(this).val() == 0) 
            $(this).val(1);
        else
            $(this).val(0);
        $("#password-content").toggle();
    });

    $(".form-status-text").click(function(){
        var formStatus = $(this).attr("data-status");
        var url = $(this).attr("data-href");
        var $this = $(this);

        $.post(url, {form_active : formStatus}, function(data){
            if(data){
                if(formStatus == 0){
                    $(".current-status").text("已停止收集");    
                    $this.text("重新开始收集");    
                    $this.attr("data-status", 1);    
                }
                else{
                    $(".current-status").text("正在收集");    
                    $this.text("停止收集");    
                    $this.attr("data-status", 0);    
                }
            }
        });
    });

    $("#form-set-submit").click(function(){
        if($("#password-protected").val() == 1){
            if($("#form_password").val() == ""){
                alert('密码不能为空');
                return;
            }
        }
        else{
            $("#form_password").val(0);
        }
        var url = "set_form.php?action=collectData&id=<?php echo $formInfo['form_id'];?>";
        var captcha = ($("#form_captcha").prop("checked")) ? 1 : 0;
        var review = ($("#form_review").prop("checked")) ? 1 : 0;
        var post = {
            form_unique_ip : $("input[name='form_unique_ip']:checked").val(),
            form_password : $("#form_password").val(),
            form_captcha : captcha,
            form_review : review 
        }

        console.log(post);

        $.post(url,post,function(data, status){
            //console.log(data);
            if(data == 'ok'){
                alert('修改成功');
            }
            else{
                alert('修改失败');
            }
        });
    });
});
</script>
<?php require('includes/footer.php');?>
