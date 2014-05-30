<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="keywords" content="表单制作,客户管理,数据收集,市场营销,调查问卷,通讯录,麦客" />
	<meta name="description" content="莫比是简洁易用的表单制作与联系人管理工具，你可以自己设计表单，收集结构化数据，轻松进行客户管理" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
	<title>莫比 - 简单好用的表单和联系人管理工具</title>
	<link rel="stylesheet" href="css/login_reset.css"/>
	<link rel="stylesheet" href="css/global.css"/>
	<link rel="stylesheet" href="css/component.css"/>
	<link rel="stylesheet" href="css/login.css"/>

    <script src="js/jquery-1.8.2.min.js"></script>
	<script src="js/jquery.cookie.js"></script>
	<script src="js/jquery.validate.js"></script>
	<script src="js/jquery.metadata.js"></script>
	<script src="js/jquery.validate.message_cn.js"></script>
	<script src="js/jquery.nicescroll.min.js"></script>
	<script src="lib/jsLib/mgTextWidth.js"></script>
	<script src="js/tinybox.js"></script>
	<script src="js/global.js"></script>
	<script src="js/components.js?m=20140522"></script>
	<script src="js/md5.js"></script>
	<script src="js/login.js?m=20140522"></script>

	<script>
	$(document).ready(function(){
		if ($.browser.msie && ( ($.browser.version == "6.0") || ($.browser.version == "7.0") ) && !$.support.style) {
			$('.IE_alert').show();
		}else{
			$('.login_form').fadeIn();
			registValidate();//注册验证
		}
	});

	var destPage = null;
	
	var pageType = null;
		</script>
</head>

<body scroll="no">

<div id="login_wrapper">
	<div id="login_main">
		<div class="login_logo"></div>
		<div class="IE_alert">
			<p>很遗憾，您的浏览器过于古老，暂时无法使用莫比</p>
			<p class="suggestBrowser">我们建议您使用 <a href="http://www.google.cn/intl/zh-CN/chrome/browser/?installdataindex=chinabookmarkcontrol&brand=CHUN">谷歌浏览器</a>，或 <a href="http://windows.microsoft.com/zh-CN/internet-explorer/download-ie">更高版本的IE浏览器</a> </p>
		</div>

		<div class="login_form">
			<div class="login_form_header">
				<p class="p_login login_active">登录</p>
				<p class="p_register"><span class="img_register"></span>注册</p>
				<div class="clearB"></div>
			</div>
			<form class="login_items" id="login_items">
				<label class="input_val"><input class="input" name="EMAIL" id="login_email" autocomplete="off" /><span>邮箱</span><img src="images/login_mail.png" /></label>
				<label class="input_val"><input class="input" name="PASSWORD" type="password" id="login_password" autocomplete="off" /><span>密码</span><img src="images/login_password.png" /></label>
				<div class="login_msg">
					<p class="login_error">
						<span></span>
					</p>
				</div>
					
				<div class="clearB"></div>
				<div class="remeber">
					<span class="input_checkbox">
						<input type="checkbox" name="REMEMBER" id="remember" checked="checked"/>
						<label for="remember">下次自动登录</label>
					</span>					
					&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
					<a id="forgetPassword" href="javascript:void(0)">忘记密码</a>
				</div>
				<a class="login_btn submit">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
			</form>
			<form class="register_items" id="register_items">
				<label class="input_val"><input class="input" name="COMPANY" value="" autocomplete="off" /><span>公司名</span></label>
				<label class="input_val"><input class="input" name="NICKNAME" value="" autocomplete="off" /><span>昵称</span></label>
				<label class="input_val"><input class="input" name="PHONE" value="" autocomplete="off" /><span>手机号</span></label>
				<label class="input_val"><input class="input" name="EMAIL" value="" autocomplete="off" /><span>登录邮箱</span></label>
				<label class="input_val"><input class="input" name="PASSWORD" value="" type="password" autocomplete="off" /><span>密码</span></label> 
				<div class="remeber">
					点击注册表示您接受
					<a id="treaty">《莫比Data服务条款》</a>
				</div>
				<a class="login_btn submit">免&nbsp;&nbsp;费&nbsp;&nbsp;注&nbsp;&nbsp;册</a>
			</form>
            
            <!--
			<div class="login_coopeField">
				<p class="coopeLogin_title" type="OPEN">使用其他账号登录</p>
				<div class="coopeLogin_mainFiild">
					<a class="btn_coopeLogin coopeLogin_weixin" href="#"><span class="span_coopeLogin">微信二维码登录</span></a>
					<a class="btn_coopeLogin coopeLogin_mingdao" href="#"><span class="span_coopeLogin">用明道账户登录</span></a>
					<a class="btn_coopeLogin coopeLogin_weibo" href="#"><span class="span_coopeLogin">用微博账号登录</span></a>
					<a class="btn_coopeLogin coopeLogin_qq" href="#"><span class="span_coopeLogin">用QQ账号登录</span></a>
				</div>
			</div>
            -->
		</div>

		<p class="contactUs">联系我们：1090647052@QQ.com</p>
	</div>
</div>

<!-- 忘记密码 -->
<div class="popwin_forgetPassword" style="display:none">
	<p class="popwin_title">
		忘记密码
	</p>
	<div class="popwin_content">
		<p class="popwin_error">呃..这好像不是你注册时的邮箱</p>
		<p class="popwin_tips">请输入注册时的邮箱账号</p>
		<form>
			<input class="input popwin_input popwin_newForm_input" type="text" name="SIGNUPEMAIL" value="" />
			<a class="button btn_blue popwin_forgetPassword_confirm">确定</a>
			<a class="button btn_gray popwin_cancel" onclick="TINY.box.hide();">取消</a>
		</form>
	</div>
</div>
<!-- 服务协议弹出窗 -->
<div class="popwin" id="popwin_treaty" style="display:none">
	<p class="popwin_title">
		莫比Data服务条款
	</p>
	<div class="popwin_content treaty">
		<p class="treaty_content">
			&nbsp;&nbsp;&nbsp;&nbsp;莫比Data免费版（以下简称免费版）是由上海纳鑫科技有限公司（以下简称莫比）在该公司莫比网站上创建的营销化客户管理平台。若您申请莫比免费版帐户（以下简称免费版帐户）并使用相应服务，您必须首先同意此协议。<br /> 
			<span class="treaty_content_h2">一、接受</span><br />
			（1）当您使用服务时，您知晓并且同意此《莫比Data免费版帐户协议》；<br />
			（2）此协议在必要时将进行修改更新，网站发布后立即生效； 属于政策性调整的，在30天内将通过电子邮件的方式通知帐户；<br />
			（3）如果您拒绝接受新的协议，将被视为放弃使用莫比Data网站免费版提供的服务；若您继续使用该免费版提供的服务，则表明您接受新的协议；<br /> 
			（4）除非特别声明，某些增强服务的新功能将适用此协议；<br /> 
			（5）此协议只有莫比免费版的书面授权人员才可以修改。<br />
			<span class="treaty_content_h2">二、服务内容</span><br />
			（1）此协议所述服务仅在莫比网站内有效。莫比网站是指<a class="smarterwiki-linkify" href="#">http://www.360mb.cn及其所属网页；</a><br /> 
			（2） 莫比Data免费版不会向客户收取任何费用，无相关附加服务；<br /> 
			（3） 莫比Data免费版有权根据实际情况自主调整服务内容。<br />
			<span class="treaty_content_h2">三、帐户</span><br />
			（1）莫比Data网站的帐户是能够承担相应法律责任的公司或个人。若您不具备此资格，请不要使用莫比Data网站提供的服务；<br />
			（2）莫比Data网站要求帐户在使用服务时必须遵守相关法律法规。对帐户使用服务所产生的与其他公司或者个人的纠纷不负法律责任；<br />
			（3） 莫比Data网站有权对恶意帐户中止服务，并无需特别通知；<br />
			（4） 莫比Data网站的服务将不提供给那些被临时或永久取消会员资格的公司或个人。<br />
			<span class="treaty_content_h2">四、费用</span><br />
			（1）莫比Data网站免费版2个帐户为长期免费，在不超过常规使用、存储、上传数据数量（5M）免费。<br /> 
			（2）莫比保留对收费模式和具体金额调整的权利，涉及收费服务，将至少提前30天的时间通过电子邮件的形式通知帐户<br />
			<span class="treaty_content_h2">五、服务期限</span><br />
			&nbsp;&nbsp;&nbsp;&nbsp;莫比Data网站有权判定免费版帐户的行为是否符合《免费版帐户协议》的要求，如果免费版帐户违背了该《免费版帐户协议》的规定，莫比Data网站有权决定取消该莫比Data免费版帐户资格或者采取其他莫比Data网站认为合适的措施。<br />
			<span class="treaty_content_h2">六、服务终止</span><br />
			&nbsp;&nbsp;&nbsp;&nbsp;有下列情形之一的，莫比Data网站有权随时暂停、终止、取消或拒绝帐户服务。<br />
			（1）帐户违反了此协议或已在约定范围内的任一条款；<br /> 
			（2）根据此协议相关说明而终止服务；<br /> 
			（3）利用莫比Data网站的发布功能滥发重复信息；<br />
			（4）未经请求或授权向莫比Data网站帐户发送大量与业务不相关的信息；<br />
			（5）冒用其他企业的名义发布商业信息，进行商业活动；<br /> 
			（6）攻击莫比Data网站的数据、网络或服务；<br /> 
			（7）盗用他人在莫比Data网站上的帐户名和 / 或密码。<br /> 
			&nbsp;&nbsp;&nbsp;&nbsp;以下信息是严格禁止并绝对终止帐户服务的：<br /> 
			（1）有关宗教、种族或性别的贬损言辞；<br /> 
			（2）骚扰、滥用或威胁其他帐户；<br /> 
			（3）侵犯任何第三方著作权、专利、商标、商业秘密或其它专有权利、发表权或隐私权的信息；<br /> 
			（4）其它任何违反互联网相关法律法规的信息。<br />
			<span class="treaty_content_h2">七、安全策略</span><br />
			（1）莫比Data网站采取安全策略。如果帐户触发了莫比Data网站的安全机制，将被暂时或永久禁止再次访问莫比Data网站。同时，其他帐户在莫比Data网站上发布的信息将暂时或永久不能被该帐户查看；<br /> 
			（2）登录名，密码和安全 <br />
			&nbsp;&nbsp;&nbsp;&nbsp;在注册过程中，您可自主选择一个登录名和密码，并须对其保密性负责，同时对使用该登录名和密码的所有活动负责。您同意：<br /> 
			&nbsp;&nbsp;&nbsp;&nbsp;<span class="treaty_content_h3">（1）对非授权使用您的登录名及密码以及其他破坏安全性的行为，帐户应立即向莫比Data网站告知，易客多公司将采取技术措施阻止恶意破坏； <br />
			&nbsp;&nbsp;&nbsp;&nbsp;（2）确保每次使用莫比Data网站后正确地离开该站点。莫比Data网站对您因没有遵守此协议而造成的损失不负任何法律责任。</span><br />
			<span class="treaty_content_h2">八、免费版帐户的权利和义务</span><br />
			（1）免费版帐户服务生效后，帐户就可享受免费版相应服务内容；<br />
			（2）免费版帐户在使用莫比Data网站提供的相应服务时必须保证遵守当地及中国有关法律法规的规定；不得利用该网站进行任何非法活动；遵守所有与使用该网站有关的协议、规定、程序和惯例；<br /> 
			（3）免费版帐户如需修改自己的帐户信息资料，必须接受莫比Data网站的审核与批准。如果免费版帐户使用虚假的帐户信息资料，莫比Data有权终止其服务；<br /> 
			（4）帐户对输入数据的准确性、可靠性、合法性、适用性等负责； <br />
			（5）对由于帐户在使用莫比Data网站服务的过程中，违反本协议或通过提及而纳入本协议的条款和规则或帐户违反任何法律或第三方的权利而产生或引起的每一种类和性质的任何索赔、要求、诉讼、损失和损害（实际、特别及后果性的）而言，无论是已知或未知的，包括合理的律师费，帐户同意就此对莫比Data网、员工、所有者及代理进行补偿并使其免受损害。<br /> 
			<span class="treaty_content_h2">九、莫比Data网站的权利和义务</span><br />
			（1） 为标免费帐户提供莫比Data网站承诺的服务； 
			（2）莫比Data网站服务的所有权和经营权未经书面许可仅属于易客多； 
			（3）对于因不可抗力造成的服务中断、链接受阻或其他缺陷（包括但不限于自然灾害、社会事件以及因网站所具有的特殊性质而产生的包括黑客攻击、电信部门技术调整导致的影响、政府管制而造成的暂时性关闭在内的任何影响网络正常运营的因素），莫比Data网站不承担任何责任，但将尽力减少因此而给会员造成的损失和影响；<br /> 
			（4）莫比Data网站将尽最大努力来减少错误，但网站上提供的服务和信息仍可能包含错误内容，莫比Data网站对帐户因使用莫比Data网站而造成的损失不负法律责任。莫比Data网站对其服务和信息不作保证，不论什么情况下对帐户因使用莫比Data网站而造成的直接、间接、偶尔的、特殊的、惩罚性的损害或其他一切损害不负法律责任，即便事先被告知损害存在的可能性也是如此。若您对莫比Data网站提供的部分或所有服务不满，您唯一的补救措施是停止使用这些服务; <br />
			（6）如因莫比Data网站原因，造成免费版帐户服务的不正常中断，莫比Data网不承担任何责任，莫比Data网站也不承担由此致使会员蒙受的其它方面的连带损失； <br />
			（7）莫比Data网站有权决定删除免费版帐户张贴的任何违反中国法律、法规、《莫比Data免费版帐户协议》内容，或其他莫比Data网站认为不可接受的内容。情节严重者，莫比Data网站有权取消其帐户资格。 <br />
			<span class="treaty_content_h2">十、莫比Data网站对所收集信息的声明</span><br />
			（1）如果您希望成为莫比Data网站的用户，您必须注册并提供相应的信息。当您在莫比Data网站注册帐户时，莫比Data网站需要收集您的姓名、电子邮箱等信息。当您浏览莫比Data网站时，服务器会自动收集您的 IP 地址，此 IP 地址只被计算机用来向您发送相关的页面 , 帮助您监控非授权登陆。<br /> 
			（2）莫比Data网站的免费版帐户可以发布商业信息，莫比Data网站有权审核发布或删除帐户提交的信息。 所有的帐户对其发布信息的准确性、完整性、即时性、合法性都独立承担所有责任，莫比Data网站会尽可能检查帐户提交的信息，但并不能完全保证信息的准确性和合法性，同时也不承担由此引至的任何法律责任。莫比Data网站在任何情况下均不就因本网站、本网站的服务或本协议而产生或与之有关的利润损失或任何特别、间接或后果性的损害（无论以何种方式产生，包括疏忽）承担任何责任。<br /> 
			（3）莫比Data网站收集全球供应商及其产品信息、全球采购商的需求信息，构建其数据库系统，拥有对相关信息及网站设计的版权，对数据的准确性不付任何责任。任何未经授权的复制或未经许可的基于莫比Data网站的商业行为，莫比Data网站将保留追究其法律责任的权利。<br /> 
			<span class="treaty_content_h2">十一、最终解释权</span><br />
			&nbsp;&nbsp;&nbsp;&nbsp;上海纳鑫科技有限公司对莫比Data保有任何活动、限制等的最终解释权。<br /> 
			<span class="treaty_content_h2">十二、 版权声明</span><br />
			&nbsp;&nbsp;&nbsp;&nbsp;莫比Data网站的所有内容版权属纳鑫所有，严禁未经易客多书面许可的任何形式的部分或全部拷贝使用。版权所有翻版必究。 <br />
			<span class="treaty_content_h2">十三．责任免除</span><br /> 
			（1）上海纳鑫科技有限公司及其代理商对“服务”及其内容的有效性 、正确性 、质量 、稳定性 、可靠性、及时性、适用性、真实性、实用性、准确性或完整性等均不作任何陈述、承诺或保证；<br /> 
			（2）帐户理解并接受任何信息资料的传输取决于帐户自己并由其承担系统受损或资料丢失的所有风险和责任；<br /> 
			（3）莫比Data网站对帐户之间的商业进程不作任何明示或暗示的承诺与保证；<br /> 
			（4）莫比Data网站、员工、所有者及代理对帐户使用莫比Data网站上公布的信息而造成的损失或伤害以及帐户相信莫比Data网站上公布的信息内容而做出的决定或采取的行动不负责任；<br /> 
			（5）莫比Data网站、员工、所有者及代理对帐户使用或无法使用莫比Data网站的服务而造成的直接的、间接的、偶尔的、特殊的或其他损害不负法律责任，即便事先被告知损害存在的可能性也是如此。<br /> 
			<span class="treaty_content_h2">十四、争议的解决 </span><br />
			&nbsp;&nbsp;&nbsp;&nbsp;莫比Data网站与免费版帐户任何一方未履行协议所规定的责任均视为违约，按《合同法》规定处理；如双方在此协议范围内发生纠纷，应尽量友好协商解决。此协议适用中华人民共和国法律。如与此协议有关的某一特定事项缺乏明确法律规定，则应参照通用的国际商业惯例和行业惯例。<br />
		</p>
	</div>
</div>



</body>
</html>


