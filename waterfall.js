
;(function (w) {
    var Waterfall = function (parent, item) {
        // 获取瀑布流的最外层包裹元素
        this.oParent = document.querySelector(parent)
        // 获取瀑布流中的每一个块元素所组成的数组
        this.oBoxs = Array.prototype.slice.call(document.querySelectorAll(item))

        if (!this.oParent) {
            return false
        } else {
            this.init()
        }
    }

    Waterfall.prototype.init = function () {
        // 获取单个box的宽度
        let single_BoxW = this.oBoxs[0].offsetWidth;

        // 计算列数目
        let cols = Math.floor(document.documentElement.clientWidth / single_BoxW)

        // 设置最外层盒子的宽度
        this.oParent.style.cssText = 'width:' + single_BoxW * cols + 'px;margin:0 auto'

        let hArr = [] // 用于存放每一列的高度

        for (let i = 0; i < this.oBoxs.length; i++) {
            if (i < cols) {
                hArr.push(this.oBoxs[i].offsetHeight)
            } else {
                // 找出数组中的最小高度
                let minH = Math.min.apply(null,hArr)
                // 获取数组中最小高度的索引值
                let index = this._getMinHIndex(hArr,minH)
                // 从第七个开始
                this.oBoxs[i].style.position = 'absolute'
                this.oBoxs[i].style.top = minH + 'px'
                this.oBoxs[i].style.left = this.oBoxs[index].offsetLeft + 'px'
                hArr[index] += this.oBoxs[i].offsetHeight
            }
        }

    }

    Waterfall.prototype._getMinHIndex = function(arr,minh){
        for(var i in arr){
            if(arr[i] == minh){
                return i
            }
        }
    }

   w.waterfall = Waterfall

})(window)