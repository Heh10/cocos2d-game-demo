/**
 * Created by HE on 2017/4/26.
 */
var PlayLayer = cc.Layer.extend({
    SushiSprites:null,
    bgSprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.SushiSprites = [];
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            rotation: 180
        });
        this.addChild(this.bgSprite, 0);
        this.schedule(this.update,1,16*1024,1);
        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);
        return true;
    },
    addSushi : function() {
        var sushi = new SushiSprite(res.Sushi_1n);
        var size = cc.winSize;
        var x = sushi.width/2+size.width/2*cc.random0To1();
        sushi.attr({
            x: x,
            y:size.height - 30
        });
        var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x,-50));
        sushi.runAction(dorpAction);
        this.SushiSprites.push(sushi);
        this.addChild(sushi,5);
    },
    removeSushi : function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
            if(this.SushiSprites[i].y <= -48) {
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i,1);
                i= i-1;
            }
        }
    },
    update : function() {
        this.addSushi();
        this.removeSushi();
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});