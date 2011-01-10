function Avatar() {
    this._width = config.WIDTH;
    this._height = config.HEIGHT;

    this._layers = [];
    this._base = new Base();
}

Avatar.prototype = {
    addLayer: function(layer) {
        this._layers.unshift(layer);
    },
    removeLayer: function(layer) {
         this._layers.splice(this._layers.indexOf(layer));
    },
    render: function() {
        this.clear();

        this._base.draw();

        var i = this._layers.length;
        while (i--) {
            this._layers[i].draw();
        }
    },
    clear: function() {
        canvas.width = canvas.width;
    },
    compile: function() {
        
    }
};