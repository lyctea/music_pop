//获取内联样式width的值
    function getStyle(obj,attr){
        if (obj.currentStyle) {
            return obj.currentStyle[attr];   //ie
        }else{
            return getComputedStyle(obj,false)[attr];
        }
    }


    function startMove(obj,json,fn){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                var bStop = true;
                for(var attr in json){
                var iCur = 0;
                if(attr == "opacity"){
                    iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
                }else{
                    iCur = parseInt(getStyle(obj,attr));
                }
                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                //检测停止条件  当前值不等于目标值
                if (iCur != json[attr] ){
                    bStop = false;
                }
                if(attr == "opacity"){
                    iCur += iSpeed;
                    obj.style.filter = 'alpha(opacity:' + iCur + ')';
                    obj.style[attr] = iCur / 100;
                }else{
                    obj.style[attr] = iCur + iSpeed + "px";
                }
              }
              if(bStop){
                clearInterval(obj.timer);
                if(fn) fn();
              }
         },30);
    }

