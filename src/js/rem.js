/**
 * Created by cvtt on 2017/6/5.
 */
export const rem =()=>{//����andriod4.4���� �ڴ�����webview��ʱ��,����ҳ��������rem,�Ժ��治�����õ�,ͨ���汾���ԵͰ汾�����ض���rem
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
} // 85.069 ��ͨ����ӡ��ҳ1rem �� ת���ɵ�px �Ƕ�������,�ڴ�ӡ����ҳ�����л����