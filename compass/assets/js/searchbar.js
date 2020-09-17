setTimeout( function(){
  try{
    document.getElementById('search-text').focus();
  } catch(e){}
}, 200);

$("input:text").bind("input propertychange",function(){
  input = document.getElementById('search-text');
  form = document.getElementById('super-search-fm');
  mode = 'both';
  switch(input.value){
    case 'gg ':
      form.action = "https://www.google.com/search";
      input.name = "q";
      input.value = ""
      input.placeholder = "Search Google";
      mode = 'search';
      break;
    case 'bd ':
      form.action = "https://www.baidu.com/baidu";
      input.name = "wd";
      input.value = "";
      input.placeholder = "Search 百度";
      mode = 'search';
      break;
    case 'sg ':
        form.action = "https://www.sogou.com/web";
        input.name = "query";
        input.value = "";
        input.placeholder = "Search 搜狗";
        mode = 'search';
        break;
    case 'ddg ':
      form.action = "https://duckduckgo.com/";
      input.name = "q";
      input.value = "";
      input.placeholder = "Search DuckDuckGo";
      mode = 'search';
      break;
    case 'gh ':
      form.action = "https://github.com/search";
      input.name = "q";
      input.value = "";
      input.placeholder = "Search Github";
      mode = 'search';
      break;
    case 'db ':
      form.action = "https://movie.douban.com/subject_search";
      input.name = "search_text";
      input.value = "";
      input.placeholder = "Search 豆瓣";
      mode = 'search';
      break;
    case 'tb ':
      form.action = "https://s.taobao.com/search";
      input.name = "q";
      input.value = "";
      input.placeholder = "Search 淘宝";
      mode = 'search';
      break;
    case 'wx ':
      form.action = "https://weixin.sogou.com/weixin";
      input.name = "p";
      input.value = "";
      input.placeholder = "Search 微信";
      mode = 'search';
      break;
    case 'zh ':
      form.action = "https://zhihu.sogou.com/zhihu";
      input.name = "query";
      input.value = "";
      input.placeholder = "Search 知乎";
      mode = 'search';
      break;
    case 'wk ':
      form.action = "https://en.wikipedia.org/wiki/";
      input.name = "search";
      input.value = "";
      input.placeholder = "Search Wikipedia";
      mode = 'search';
      break;
    case 'wa ':
      form.action = "https://www.wolframalpha.com/input/";
      input.name = "i";
      input.value = "";
      input.placeholder = "Search WolframAlpha";
      mode = 'search';
      break;
  }

  function isURL(str) {
      return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
  }

  if (isURL(input.value)&&mode!="search") {
    console.log("url matched");
    form.action = input.value;
    input.name = "";
  }

  // console.log(input.value);

  // console.log($(this).val().length);

});
