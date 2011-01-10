function base() {
    this._img = new Image();
    this._img.src = 'avatars/images/base_m.png';

    this._type;
}

base.prototype = {
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