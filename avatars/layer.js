function Layer(src) {
    this._img = new Image();
    this._img.src = src;
    console.log(src);

    this._id;
    this._type;
}

Layer.prototype = {
    update: function() {

    },
    draw: function() {
        ctx.save();
            ctx.drawImage(this._img, 0, 0, config.WIDTH, config.HEIGHT);
        ctx.restore();
    },
    clear: function() {
        
    }
};