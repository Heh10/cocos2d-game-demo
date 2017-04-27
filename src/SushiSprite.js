/**
 * Created by HE on 2017/4/26.
 */
var SushiSprite = cc.Sprite.extend({
    disappearAction:null,
    onEnter:function () {
        this.addTouchEventListenser();
        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();
        this._super();
    },
    onExit:function () {
        this.disappearAction.release();
        this._super();
    },
    addTouchEventListenser:function(){
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    //响应精灵点中
                    cc.log("touched: x="+pos.x+",y="+pos.y);
                    target.stopAllActions();
                    var ac = target.disappearAction;
                    var seqAc = cc.Sequence.create( ac, cc.CallFunc.create(function () {
                        target.removeFromParent();
                    },target) );
                    target.runAction(seqAc);
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    createDisappearAction : function() {
        var frames = [];
        for (var i = 0; i < 11; i++) {
            var str = "sushi_1n_"+i+".png"
            //cc.log(str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.01);
        var action = new cc.Animate(animation);
        return action;
    }
});

