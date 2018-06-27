require(["config"],function(){
    require(["jquery","load","cookie"],function($){
        $(function(){
            $(".log_phone").blur(function(){
                let txt = $(this).val(),
                    phone = /^1[3|4|5|8][0-9]\d{4,8}$/;
                if(!phone.test(txt)){
                    $(".err").text("手机号码有误！");
                    $(".info").show();
                } else
                $(".info").hide();
            });
            $(".log_password").blur(function(){
                let regs = /^[a-zA-Z0-9]{6,10}$/,
                    pw = $(this).val();
                if (!regs.test(pw)){
                    $(".err").text("密码格式有误！");
                    $(".info").show();
                }else
                $(".info").hide();
            });
            $(".loginer").click(function(){
                let txt = $(this).val(),
                    phone = /^1[3|4|5|8][0-9]\d{4,8}$/,
                    regs = /^[a-zA-Z0-9]{6,10}$/,
                    pw = $(this).val();
                if (phone.test(txt) && regs.test(pw)){
                    $.post("http://localhost/api/login.php",$(".log_form").serialize(),function(data){
                        if (data.res_code === 1){
                            $.cookie.json=true;
                            const user = {
                                username : txt;
                            }
                            const users = [];
                            location = "/index.html";
                        }
                        else{
                            $(".ups").show();
                            setTimeout($(".ups").hide(),1000);
                        }
                    },"json");
                }else{

                }

            });
        });
    });
});
