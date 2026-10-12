//tab
$(function () {
        $('.c-tab_item').on('click', function () {//.c-tab_itemをクリックしたら
                $('.c-tab_item, .c-tabpanel').removeClass('js-active');//まずc-tab_itemとc-tabpanelからjs-activeを削除
                $(this).addClass('js-active');//自身（c-tab_item）にjs-activeを付与する
                let index = $('.c-tab_item').index(this);//変数indexに自身（c-tab_item）が何番目かを保存
                $('.c-tabpanel').eq(index).addClass('js-active');//変数indexと同じ番目のc-tabpanelにjs-activeを付与
        });
});

//slide menu
$(function () {
        //スムーススクロール
        const header = $('header');
        $('a[href^="#"]').on('click', function () {
                const gap = header.outerHeight();
                const speed = 500;
                const href = $(this).attr("href");
                const target = $(href == "#" || href == "" ? "html" : href);
                const position = target.offset().top - gap;
                $("html, body").animate({ scrollTop: position }, speed, "swing");
                return false;
        });
        //スライドメニュー（open時スクロール固定&PC時非表示）
        let state = false;
        let scrollpos;
        const change = $('.c-trigger, .l-nav_top, .l-nav_lower, .l-nav_lower_lower, .c-cover');
        $('.c-trigger, .c-cover').on('click', function () {
                change.toggleClass('open');
                if (state === false) {
                        scrollpos = $(window).scrollTop();
                        $('body').css({
                                position: 'fixed',
                                top: -scrollpos
                        });
                        state = true;
                } else {
                        $('body').attr('style', '');
                        window.scrollTo(0, scrollpos);
                        state = false;
                }
        });
        $(window).on('load resize', function () {
                let winW = $(window).width();
                let devW = 825;//740:
                if (winW >= devW) {
                        $('.l-nav_top', '.l-nav_lower', '.l-nav_lower_lower').css('transition', 'none');
                        if (change.hasClass('open')) {
                                change.removeClass('open');
                                $('body').attr('style', '');
                                window.scrollTo(0, scrollpos);
                                state = false;
                        }
                } else {
                        $('.l-nav_top', '.l-nav_lower', '.l-nav_lower_lower').css('transition', '1s',);
                }
        });
});

//360px固定
!(function () {
        const viewport = document.querySelector('meta[name="viewport"]');
        function switchViewport() {
                const value =
                        window.outerWidth > 360
                                ? 'width=device-width,initial-scale=1'
                                : 'width=360';
                if (viewport.getAttribute('content') !== value) {
                        viewport.setAttribute('content', value);
                }
        }
        addEventListener('resize', switchViewport, false);
        switchViewport();
})();

//スクロールアクション
$(window).on('scroll', function () {//画面がスクロールしたらスクロールアクションを実行する
        scrollaction();
});


//20230224
function scrollaction() {//スクロールしてオブジェクトがモニターに表示されたらアクションのクラスを付与する説明
        $('.onclass').each(function () {//オンアクションという名前 繰り返し実行する 
                //onclassを書いておかないとどこに実行していいのかわからない
                let isAnimate = $(this).data('animate');//自分自身のデータ
                let elemPos = $(this).offset().top + 50; //ページの天から目的のオブジェクトの位置＋50pxの距離
                let scroll = $(window).scrollTop(); //スクロールした全体量
                let windowHeight = $(window).height();  //ブラウザーの表示されている領域の高さのこと
                if (scroll >= elemPos - windowHeight) { //スクロールの全体量が大きいときは、デスクトップに目的のオブジェクトが表示されたとき
                        $(this).addClass(isAnimate); //クラスを付与する
                } else {
                        $(this).removeClass(isAnimate);
                }
        });
}

//roading animation //読み込みの速さを確認するためにはデベロッパーツールのパフォーマンスタブから低速を選択するとゆっくりに見える
$(window).on('load', function () {
        $('c-loader').delay(50).fadeOut(100);
        $('c-loader-bg').delay(50).fadeOut(200);
        sessionStorage

});

//最初に一度だけ表示するsplash
$(function () {
        if (sessionStorage.getItem("splash") === null) { //"splash"が設定されていない、保存していない場合＝null
                sessionStorage.setItem("splash", "true");//splashの値にtrueを入れる
                $('.c-splash').css('display', 'flex'); //sessionstorageが設定されていない場合＝splashを表示する
                $('.c-wrap').css('display', 'block'); //chromeのバグ防止.コンテンツ全体を消去→表示する
                //display をflexに指定する
                $('l-header_top').css('animation', 'slide_down .3s 2.7s ease-out both'); //splashのAnimation秒数と累計した秒数を設定して書くanimeを上書きしている
                $('c-catchcopy').css('animation', 'fade 2s 2s both');
                $('c-scroll').css('animation', 'fade 1s 3s both');
        } else { //2回目の時
                $('.c-splash').addClass('c-none'); //sessionstorageが設定されている場合＝非表示にする
                $('.c-wrap').css('display', 'block'); //chromeのバグ防止.コンテンツ全体を消去→表示する
        }
});

//ふわっとロード、ふわっとスクロールされる
$(function () {
        load_effect();
        $(window).scroll(function () {
                scroll_effect();
        });
});

//ふわっとロード
function load_effect() {
        var tt = $(window).scrollTop();
        var hh = $(window).height();
        $('.load-fade').each(function () {
                var yy = $(this).offset().top;
                if (tt > yy - hh) {
                        $(this).addClass('done');
                }
        });
        $('.load-up').each(function () {
                var yy = $(this).offset().top;
                if (tt > yy - hh) {
                        $(this).addClass('done');
                }
        });
}

//ふわっとスクロール
function scroll_effect() {
        var tt = $(window).scrollTop();
        var hh = $(window).height();
        $('.scroll-fade').each(function () {
                var yy = $(this).offset().top + 400;//効果発生開始タイミングを操作したい場合は数値を変更する
                if (tt > yy - hh) {
                        $(this).addClass('done');
                }
        });
        $('.scroll-up').each(function () {
                var yy = $(this).offset().top + 400;//効果発生開始タイミングを操作したい場合は数値を変更する
                if (tt > yy - hh) {
                        $(this).addClass('done');
                }
        });
}
//↑ふわっとロード、ふわっとスクロールされる

//スクロールしてページトップから100に達したらボタンを表示
$(function () {
        // 変数にクラスを入れる
        var button = $('.button');
        $(window).on('load scroll', function () {
                if ($(this).scrollTop() > 500) {
                        button.addClass('active');
                } else {
                        button.removeClass('active');
                }
        });
        //スクロールしてトップへ戻る
        button.on('click', function () {
                $('index,html').animate({
                        scrollTop: 0
                });
        });
});

//slick
$(function () {
        $('#slick01').slick({
                dots: false,
                infinite: true,
                speed: 400,//500,
                fade: true,
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 3000,//4500,
                arrows: false
        });
        $('#slick02').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
        $('#slick03').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
        $('#slick04').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
        $('#slick05').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
        $('#slick06').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
        $('#slick07').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
        $('#slick08').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
        $('#slick09').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
        $('#slick10').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                //autoplay: true,
                //autoplaySpeed: 3700,
                arrows: true
        });
});

$(function () {
        new ScrollHint('.js-scrollable');
});

$(function () {
        $('.scroll-hint-text').html("Please Scroll");
});
//↑slick


//スプラッシュのアニメーション
//SVGアニメーションの描画
var stroke;
stroke = new Vivus('mask', {//アニメーションをするIDの指定
        start: 'manual',//自動再生をせずスタートをマニュアルに
        type: 'scenario-sync',// アニメーションのタイプを設定
        duration: 600,//アニメーションの時間設定。数字が小さくなるほど速い
        forceRender: false,//パスが更新された場合に再レンダリングさせない
        animTimingFunction: Vivus.EASE,//動きの加速減速設定
}
);

$(window).on('load', function () {
        $("#splash").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェイドアウト
        $("#splash_logo").delay(1500).fadeOut('slow');//ロゴを1.5秒（1500ms）待機してからフェイドアウト
        stroke.play();//SVGアニメーションの実行
});

//ボタンをクリックするとターゲットの要素にスクロールされる
$(function () {
        const scrollLink = document.getElementById('scrollLink');
        const targetElement = document.getElementById('target');
        scrollLink.addEventListener('click', (event) => {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
        });
});