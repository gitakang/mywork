/*加载头部、尾部*/
define(["jquery","cookie"],function(){
    $(function(){
        $("#header").load("/html/include/loadHeader.html",function(){
            $.cookie.json = true;
            if ($.cookie("products")){
                let lens = $.cookie("products").length;
                    $(".amounts").text(lens);
            }  else {
                $(".amounts").text(0);
            }

            $(".searchs").on("keyup",function(){
                const txt =$(this).val();
                const url = `https://suggest.taobao.com/sug?code=utf-8&q=${txt}&callback=?`;
                $.getJSON(url,function (data){
                    let html ="";
                    data.result.forEach(function(curr){
                        html += `<div>${curr[0]}</div>`;
                    });
                    $(".search_txt").show().html(html);
                });
            });
            //点击文本把文本添加到输入框中
            $(".search_txt").on("click","div",function(){
                const txt = $(this).text();
                    $(".searchs").val(txt);
                $(".search_txt").hide();
            })
        });
        $(".footer").load("/html/include/loadFooter.html");
    });
});
