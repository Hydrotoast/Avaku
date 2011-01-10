function base() {
    this._type;
}

base.prototype = {
    update: function() {

    },
    draw: function() {
        ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillRect(0, 0, config.WIDTH, config.HEIGHT);
        ctx.restore();
    },
    clear: function() {

    }
};