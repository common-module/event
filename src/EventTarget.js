define('event:EventTarget', function (require, exports, module) {
    var Event = require('event:Event');

    /**
     * 导出
     */
    module.exports = EventTarget;

    /**
     * 事件机制
     */
    function EventTarget() {
        /**
         * 事件栈堆
         */
        this.__eventStack = {};
    }

    /**
     * 添加事件监听
     * @param {String} type 事件类型
     * @param {Function} listener 事件监听函数
     * @param {Boolean} [useCapture] 是否捕捉事件
     * @return {Undefined}
     */
    EventTarget.prototype.addEventListener = function (type, listener, useCapture) {
        /**
         * 验证参数，type是否存在
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
         * 验证参数，listener是否存在
         */
        if (typeof listener === 'undefined') {
            throw new Error('argument listener is not defined');
        }

        /**
         * 验证参数，listener是否为函数
         */
        if (typeof listener !== 'function') {
            throw new Error('argument listener is not a function');
        }

        /**
         * 判断事件有没有被监听过
         */
        if (typeof this.__eventStack[type] === 'undefined') {
            /**
             * 没有被监听过，初始化一个数组
             */
            this.__eventStack[type] = [];
        }

        /**
         * 将监听函数列入监听列表
         */
        this.__eventStack[type].push(listener);
    }

    /**
     * 移除事件监听
     * @param {String} type 事件类型
     * @param {Function} listener 事件监听函数
     * @param {Boolean} [useCapture] 是否捕捉事件
     * @return {Undefined}
     */
    EventTarget.prototype.removeEventListener = function (type, listener, useCapture) {
        /**
         * 验证参数，type是否存在
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
         * 验证参数，listener是否存在
         */
        if (typeof listener === 'undefined') {
            throw new Error('argument listener is not defined');
        }

        /**
         * 验证参数，listener是否为函数
         */
        if (typeof listener !== 'function') {
            throw new Error('argument listener is not a function');
        }

        /**
         * 判断有没有事件监听堆栈
         */
        if (typeof this.__eventStack[type] === 'undefined') {
            /**
             * 没有监听过事件，返回
             */
            return;
        }

        var eventListeners = this.__eventStack[type];

        /**
         * 判断事件的监听队列长度
         */
        if (eventListeners.length === 0) {
            /**
             * 已经没有监听函数了，返回
             */
            return;
        }

        /**
         * 递归查找事件监听函数，移除特定的监听函数
         */
        for (var i = 0; i < eventListeners.length; i++) {
            if (eventListeners[i] === listener) {
                eventListeners.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 派发事件
     * @param {Event} event 事件对象
     * @return {Undefined}
     */
    EventTarget.prototype.dispatchEvent = function (event) {
        var me = this;

        /**
         * 验证参数，event是否传入
         */
        if (typeof event === 'undefined') {
            throw new Error('argument event is not defined');
        }

        /**
         * 验证参数，event是否是合法的
         */
        if (! event instanceof Event) {
            throw new Error('argument event is not a valid event');
        }

        /**
         * 判断是否存在此事件的监听函数
         */
        if (typeof this.__eventStack[event.type] === 'undefined') {
            /**
             * 此事件没有被监听过，返回
             */
            return;
        }

        var eventListeners = this.__eventStack[event.type];

        /**
         * 判断事件监听函数个数
         */
        if (eventListeners.length === 0) {
            /**
             * 监听函数清空了，返回
             */
            return;
        }

        for (var i = 0; i < eventListeners.length; i++) {
            /**
             * 按顺序、异步执行所有的监听函数
             */
            ;(function () {
                var thatI = i;
    
                setTimeout(function () {
                    eventListeners[thatI].call(me, event);
                }, 0);
            })();
        }
    }
});
