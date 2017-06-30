/**
 * Created by cvtt on 2017/6/5.
 */
export const rem =()=>{//发现andriod4.4以下 在打开两个webview的时候,在首页进行设置rem,对后面不起作用的,通过版本监测对低版本设置特定的rem
    var uuu = navigator.userAgent;
    var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
    if(isAndroid){
        var androidVersion = window.navigator.userAgent.split(' ')[3].split(';')[0];
        var androidVersionArr = androidVersion.split('.');
        var androidCurrentVersion = androidVersionArr[0]+'.'+androidVersionArr[1]
        if(parseInt(androidCurrentVersion)<=4.4){
           return  document.documentElement.style.fontSize = innerWidth /85.069 +'px';
            onresize = function(){
                document.documentElement.style.fontSize = innerWidth /85.069 +'px';
            }
        }
    }
} // 85.069 ：通过打印首页1rem ： 转化成的px 是多上像素,在打印错误页，进行换算得