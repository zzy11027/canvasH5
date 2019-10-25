//跳过
$('.skip').click(function(){
    // regSwiper();
    Swiper1.slideTo(7, 500, false);
    $('.page2 ').find('.ai,.xiang,.haha,.xiao,.lu,.qi').hide();
    $('.page4 ').find('.tanqi').hide();
    $('.angry2').hide();
    $('.Template').show();
    $('.cashi').remove();
})
//扎心了吗？
$('.swiper-slide>.cashi').on('touchstart',function(e) {
    $(this).remove();
});
//点击关闭二维码
$(document).on("click touchstart",".close",function(){
    if($(this).parent().attr('class') == 'follow'){
        $('.follow ').remove();
    }else{
        $('.container').hide();
        // $('.prize').hide();
        $('.tjSuccess').hide();
        $('.file').hide();
    }
    $('.follow').hide();//隐藏二维码页面
});
//点击关闭二维码
$(document).on("click touchstart",".guan",function(){
    $('.follow ').remove();
    $('.follow').hide();//隐藏二维码页面
});
//分享
$('.fx').click(function(){
    $('.fximg').show();
})
//关闭分享
$(document).on("click touchstart",".fximg",function(){
    $('.fximg').hide();
});
//返回
$(document).on("click touchstart",".return",function(){
    regSwiper();
    Swiper1.slideTo(0, 500, false);
    $('.Template').hide();
});
//一键解锁
$(document).on("click touchstart",".key",function(){
    window.location.href = 'http://weixin.caafc.cn/web/weisite/index.html#/carloanapplication?brand=carBrand9879&series=BRAND20190204&type=BRAND20190206';
});
//关闭alert
$('.alert>.closes').click(function(){
    $('.alert').hide();
    $('.container').css('z-index','11');
    if($('.alert>.dd').text() == '您已领过奖啦，请把机会留给他人哦……' || $('.alert>.dd').text() == '手机号不符合！'){
        window.location.href = '';
    }
})
//领奖
var isLing = 0;
$('.Determine').click(function(){
    // if(isLing == 1){alert('您已领取！');return false;}
    var openid = $("#openid").val();
    var token = $("#token").val();
    var lucky_tel = $(".phone").val();
    if (lucky_tel == "") {
        $('.alert').show();
        $('.container').css('z-index','99999');
        $('.container').show();
        $('.alert>.dd').text('请输入手机号!');
        return false;
    }
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (!reg.test(lucky_tel)) {         
        $('.alert').show();
        $('.container').show();
        $('.alert>.dd').text('请输入手机号!');
    }
    $.ajax({
        url:'/ca1.php?step=insert',
        type:'post',
        data:{
            phone:lucky_tel,
        },
        dataType:'json',
        beforeSend: function(request) { 
                request.setRequestHeader("Authorization", token); 
        }, 
        success:function(data){
            isLing = 1;
            if(data.data == 1){
                $('.prize').hide();
                $('.tjSuccess').show();
                $('.container').show();
                return false;
            }else if(data.data == 5){
                $('.alert').show();
                $('.container').show();
                $('.container').css('z-index','99999');
                $('.alert>.dd').text('未知错误！');
                return false;
            }else if(data.data == 6){
                $('.alert').show();
                $('.container').show();
                $('.container').css('z-index','99999');
                $('.alert>.dd').text('手机号不符合！');
                return false;
            }else if(data.data == 7){
                $('.alert').show();
                $('.container').show();
                $('.container').css('z-index','99999');
                $('.alert>.dd').text('您已领过奖啦，请把机会留给他人哦……');
                return false;
            }
        }
    })
});
//确认选择模板
var imgSrc;
var imgSrcs;
$('.sure').click(function(){
    $('#but').css('top','1rem');
    if(mySwiper1s.snapIndex == 0){
        imgSrc = '../img/Template1.png';
        imgSrcs = '../img/1s.jpg';
    }
    else if(mySwiper1s.snapIndex == 1){
        imgSrc = '../img/Template2.png';
        imgSrcs = '../img/2s.jpg';
    }
    else if(mySwiper1s.snapIndex == 2){
        imgSrc = '../img/Template3.png';
        imgSrcs = '../img/3s.jpg';
    }
    else if(mySwiper1s.snapIndex == 3){
        imgSrc = '../img/Template4.png';
        imgSrcs = '../img/4s.jpg';
    }
    else if(mySwiper1s.snapIndex == 4){
        imgSrc = '../img/Template5.png';
        imgSrcs = '../img/5s.jpg';
    }
    $('.swiper-container1').hide();
    $('.Template').hide();
    $('.Synthesis').show();
    $('.fales').attr('src',imgSrcs);
    $('.fales').show();
})

// 话费红包，全民疯抢点击事件
function prize(){
	if(isPrize == 1){
        window.location.href = 'http://weixin.caafc.cn/web/weisite/index.html#/carloanapplication?brand=carBrand9879&series=BRAND20190204&type=BRAND20190206';
        return false;
    }
    var openid = $("#openid").val();
    var token = $("#token").val();
    $.ajax({
        url:'/ca1.php?step=prize',
        type:'post',
        data:{
            // openid:openid,
        },
        dataType:'text',
        beforeSend: function(request) { 
                request.setRequestHeader("Authorization", token); 
        }, 
        success:function(data){
        	isPrize = 1;
            $('.click').css('background-image','url(../img/key.png)');
            var datas = JSON.parse(data);
            //未中奖
            if(datas.data == 4){
                $(".container").show();
                $(".file").show();   
            //中奖10元
            }else if(datas.data == 3){
                $(".container").show();
                $('.prize').show();
                $('.prize>img').attr('src','../img/10yuan.png');
            //中奖5元
            }else if(datas.data == 2){
                $(".container").show();
                $('.prize').show();
                $('.prize>img').attr('src','../img/5yujan.png');
            //中奖1元
            }else if(datas.data == 1){
                $(".container").show();
                $('.prize').show();
                $('.prize>img').attr('src','../img/1yuan.png');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('未知错误！');
        }
    })    
}
function regSwiper(){
    Swiper1 = new Swiper ('.swiper-container1', {
        direction: 'vertical', // 垂直切换选项
        effect: 'fade',
        noSwipingClass : 'stop-swiping',
        longSwipesRatio : 0.4,
        cubeEffect: {
            slideShadows: false,
            shadow: false,
        },
        on: {
            slideChange: function () {
                // 获取当前活动下标
                var index = this.realIndex;
                if(index == 1){
                    t1.play();
                    if($('#state').val() == 0){$('.follow').show();}
                    $('.Template').hide();
                    $('#but').css('top','2.7rem');
                    $('.logo').css('background-image','url(../img/logo.png)');
                }
                if(index == 2){
                    t2.play();
                    $('.page1 ').find('.angry2').hide();
                    $('.Template').hide();
                    $('.cashi').remove();
                    $('.logo').css('background-image','url(../img/logo.png)');
                }
                if(index == 3){
                    t3.play();
                    $('.page2 ').find('.ai,.xiang,.haha,.xiao,.lu,.qi').hide();
                    $('.Template').hide();
                    $('.cashi').remove();
                    $('.logo').css('background-image','url(../img/logo.png)');
                }
                if(index == 4){
                    t4.play();
                    $('.page3 ').find('.musics').hide();
                    $('.Template').hide();
                    $('.cashi').remove();
                    $('.logo').css('background-image','url(../img/logo.png)');
                }
                if(index == 5){
                    t5.play();
                    $('.page4 ').find('.tanqi').hide();
                    $('.Template').hide();
                    $('.cashi').remove();
                    $('.logo').css('background-image','url(../img/logo.png)');
                }
                if(index == 6){
                    $('.page2 ').find('.ai,.xiang,.haha,.xiao,.lu,.qi').hide();
                    $('.Template').show();
                    $('.cashi').remove();
                    $('.logo').css('background-image','url(../img/logos.png)');
                }
            }
        }
    })   
}
//模板
var mySwiper1s = new Swiper('.swiper-container2',{
    effect : 'coverflow',
    observer:true,
    observeParents:true,
    slidesPerView: 2.0,
    centeredSlides: true,
    initialSlide :2,//默认第二个
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows : true
    },
    on: {
        slideChange: function () {
            // 获取当前活动下标
            var index = this.realIndex;
        }
    }
}) 