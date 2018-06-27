require(["config"],function(){
    require(["jquery","arttemplate","load","fly","cookie"],function($,template){
        $(function(){
            //轮播图
            $(function(){
                let lis = $("li",".banaers"),
                    boxwidth = $(lis).width(),
                    winWidth = $(window).width(),
                    len = lis.length,
                    imgWidth = $(lis).eq(0).width(),
                    currentIndex = 0,
                    nextIndex = 1,
                    more = 300,
                    duration = 2000,
                    isAnimate = true,
                    firstImg = $(lis).eq(0).clone(),
                    lastImg = $(lis).last().clone();
                    $(".banaers").prepend($(lastImg));
                    $(".banaers").append($(firstImg));
                    len += 2;
                    //设置宽度和lest值
                    $(".banaers").css({
                        "width" :boxwidth * len,
                        left : -(boxwidth + more)
                    });
                    //动态创建小圆点
                    let html = "";
                        for (var i = 0; i <len -2;i++){
                            html += `<i ${i==0?"class='current'":''}></i>`;
                        }
                    $(".point").html(html);
                    let points = $("i",".point");
                    //切换函数
                    let move = function () {
                        isAnimate = false;
                        let _left = - (nextIndex * boxwidth + more);
                        $(".banaers").animate({
                            left : _left
                        }, 300,function(){
                            if(nextIndex >= len){
                                currentIndex = 1;
                                nextIndex = 2;
                                $(".banaers").css({
                                    left : - (boxwidth + more)
                                });
                            }else if(nextIndex === 1){
                                currentIndex = len - 2;
                                nextIndex = len - 1;
                                $(".banaers").css({
                                    left : - ((len - 2) * boxwidth + more)
                                });
                            }
                            isAnimate =true;
                        });
                        //该表小圆点的样式
                        let index = nextIndex - 1;
                            if(index >= len - 2){
                                index = 0;
                            }else if (index < 0){
                                index = len - 3;
                            }
                        for (let i = 0; i < len - 2; i++){
                            $(points).eq(i).removeClass('current');
                        }
                        $(points).eq(index).addClass('current');
                        currentIndex = nextIndex;
                        nextIndex ++;
                    };

                let timer = setInterval(move,duration);
                $("#banaer").mouseenter(function(){
                    clearInterval(timer);
                    $(".btn").css({
                        display:"block"
                    });
                });
                $("#banaer").on("mouseleave",function(){
                    timer = setInterval(move,duration);
                    $(".btn").css({
                        display:"none"
                    });
                });
                //为小圆点绑定事件
                $(".point").on("mouseenter","i",function(){
                    let index = $(this).index();
                    if ($(".current").index() !== index){
                        nextIndex = index +1;
                        move();
                    }
                })
                //向前后翻页
                $(".left").click(function(){
                    if (isAnimate){
                        nextIndex = currentIndex - 1;
                        move();
                    }
                });
                $(".right").click(function () {
                    if(isAnimate){
                        move();
                    }
                });
            });

            //回到顶部
            $(function(){
                let scrollTops = "";
                $(document).scroll(function(){
                    scrollTops = $(document).scrollTop();
                    if (scrollTops > 200)
                    $(".top").css({display:"block"})
                    else if (scrollTops <= 200)
                    $(".top").css({display:"none"})
                })
                //点击top回到顶部
                $(".top").click(function(){
                     $('html,body').animate({scrollTop:0},300);
                      return false;
                });
            });
            //倒计时
            let countDown = function (){
                let after = new Date ("2018-06-29T00:00:00"),
    				now = new Date (),
                    lag = Math.ceil((after - now)/1000),
    				houer = ("0" + Math.floor(lag / 3600 ) % 24).slice(-2),
    				m = ("0" + Math.floor(lag / 60 % 60)).slice(-2),
    				s = ("0" + lag % 60).slice(-2);
                $(".hour").text(houer);
                $(".min").text(m);
                $(".sec").text(s);
            };
            setInterval(countDown,1000);
            //动态加载后台数据----热卖商品
            $.getJSON("/mock/hotsale.json",function(data){
                const html = template("hot_sale_temp",{list:data.res_body.list});
                $(".hot_shop_list").prepend(html);
            });

            //点击抢购加入购物车
            $(".flash_prod").on("click",".flash_pay",function(event){
                //抛物线
            		let img = $(this).parent().parent().find('img').attr('src'),
    		            flyer = $('<img class="u-flyer" src="'+img+'" style="width:60px;height:60px;z-index:1000;">');

            		flyer.fly({
            			start: {
            				left: event.clientX,
            				top: event.clientY
            			},
            			end: {
            				left: 1240,
            				top: 710,
            				width: 0,
            				height: 0
            			},
            			onEnd: function(){
                            if($(".u-flyer").css("left") == 1240 & $(".u-flyer").css("top") == 710)
            				$(".u-flyer").remove();
            			}
            		});
                //加入购物车使用cookie
                $.cookie.json = true;
                const prod = {
                    id : $(this).data("id"),
                    img : $(this).parent().parent().find('img').attr('src'),
                    title : $(this).parent().find(".title").text(),
                    price : $(this).data("price"),
                    amount : 1
                };

                const pro =  $.cookie("products") || [],
                        index = testId(prod.id,pro);
                    if (index === -1)
                        pro.push(prod);
                    else
                        pro[index].amount++;
                    $.cookie("products",pro,{expires:7,path:"/"});
                const lens = $.cookie("products").length;
                        $(".amounts").text(lens);

                function testId (index,arr){
                    for (let i = 0; i < arr.length; i++){
                        if (index == arr[i].id)
                        return i;
                    }
                    return -1;
                }

            });






            //动态加载后台数据----限时抢购商品
            $.getJSON("/mock/timeBaying.json",function(data){
                const html = template("flash_prod_list",{list:data.res_body.list});
                $(".flash_prod").prepend(html);
            });
            $.getJSON("/mock/prductsList.json",function(data){
                const html = template("products_temp",{list:data.res_body.list});
                $(".products").prepend(html);
            });
        });
    });
});
