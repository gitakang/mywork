require(["config"],function(){
    require(["jquery","load"],function($){
        $(function(){
            $(".verCode").text(checkcode());
            //手机正则表达式
            $("#phone_number").blur(function(){
                let phone = /^1[3|4|5|8][0-9]\d{4,8}$/,
                    phoneval =$(this).val();
                if (!phone.test(phoneval)){
                    $(".err").text("手机号码有误！");
                    $(".info").show();
                }else{
                    $(".info").hide();
                }
            });
            //点击验证码换一张
            $(".verCode").click(function(){
                $(this).text(checkcode());
            });
            //验证码框失去焦点开始验证并提示
            $(".enter").blur(function() {
                let val = $(this).val().toLowerCase(),
                    txt = $(".verCode").text().toLowerCase();
                if (val !== txt){
                    $(".err").text("验证码有误！");
                    $(".info").show();
                }
                else
                    $(".info").hide();
            });
            //密码框输入后失去焦点验证格式是否正确
            $(".set_password").blur(function(){
                let regs = /^[a-zA-Z0-9]{6,10}$/,
                    setpassword = $(this).val();
                if (!regs.test(setpassword)){
                    $(".err").text("密码格式有误！");
                    $(".info").show();
                }else
                    $(".info").hide();
            });
            //重复密码失去焦点时验证是否正确
            $(".repeat_password").blur(function(){
                let set = $(".set_password").val();
                if (! set == $(this).val()){
                    $(".err").text("重复密码与设置密码不一致！");
                    $(".info").show();
                }else
                $(".info").hide();
            });
            //点击注册时验证所有格式是否正确
            $(".click_reg").click(function(){
                let phone = /^1[3|4|5|8][0-9]\d{4,8}$/,
                    phoneval =$("#phone_number").val(),
                    val = $(".enter").val().toLowerCase(),
                    txt = $(".verCode").text().toLowerCase(),
                    regs = /^[a-zA-Z0-9]{6,10}$/,
                    setpassword = $(".set_password").val(),
                    repeatpassword = $(".repeat_password").val();
                    console.log($(".reg_form").serialize())
                if (phone.test(phoneval) && val === txt && regs.test(setpassword) && setpassword === repeatpassword){
                    $.post("http://localhost/api/register.php",$(".reg_form").serialize(),function(data){
                        if (data.res_code==1)
                        location="/html/login.html";
                        else{
                            console.log(data.res_message)
                            $(".err").text(data.res_message);
                            $(".info").show();
                        }
                    },"json");
                }else{
                    $(".err").text("格式有误，请认真填写！");
                    $(".info").show();
                }
            });
            //生成验证码函数
            function checkcode () {
                let library = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                let str = "";
                for(let i = 0; i < 4; i++){
                    let n = (Math.floor(Math.random()*62));
                        str += library[n];
                    }
                return str;
            };
        });
    });
});
