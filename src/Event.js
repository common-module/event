define('event:Event', function (require, exports, module) {
    /**
     * 导出
     */
    module.exports = Event;

    /**
     * 事件对象
     * @param {String} type    事件类型
     * @param {Object} options 配置
     */
    function Event(type, options) {
        /**
         * 验证参数，type是否传入
         */
        if (typeof type === 'undefined') {
            throw new Error('argument type is not defined');
        }

        /**
         * 验证参数，type是否为字符串
         */
        if (typeof type !== 'string') {
            throw new Error('argument type is not a string');
        }

        /**
         * 验证参数，options
         */
        options = options || {};

        /**
         * 事件是否冒泡
         */
        this.bubbles = false;

        /**
         * 取消事件冒泡
         */
        this.cancelBubble = false;

        /**
         * 事件是否可取消
         */
        this.cancelable = true;

        /**
         * 剪贴板数据
         */
        this.clipboardData = undefined;

        /**
         * 事件当前目标
         */
        this.currentTarget = null;

        /**
         * 默认组织事件
         */
        this.defaultPrevented = false;

        /**
         * 事件阶段
         */
        this.eventPhase = 0;

        /**
         * 事件返回值
         */
        this.returnValue = true;

        /**
         * 事件源元素
         */
        this.srcElement = null;

        /**
         * 事件目标
         */
        this.target = null;

        /**
         * 事件触发时间
         */
        this.timeStamp = new Date();

        /**
         * 事件类型
         */
        this.type = type;

        /**
         * 参数赋值
         */
        for (var property in options) {
            if (options.hasOwnProperty(property)) {
                this[property] = options[property];
            }
        }
    }

    /**
     * 常量，向下捕捉时期
     */
    Event.prototype.CAPTURING_PHASE = false;

    /**
     * 常量，到达目标时期
     */
    Event.prototype.AT_TARGET = false;

    /**
     * 常量，向上冒泡时期
     */
    Event.prototype.BUBBLING_PHASE = false;

    /**
     * 停止冒泡
     */
    Event.prototype.stopPropagation = function () {
        // TODO
    }

    /**
     * 阻止默认行为
     */
    Event.prototype.preventDefault = function () {
        // TODO
    }
});
