// This file is part of Avaku
// Copyright (C) 2010 Gio Carlo Cielo
//
// Avaku is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Avaku is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
* Layer with item image
* @param{src} Source image for layer
*/
function Layer(src) {
	// Functional
	this.prev = null;
	this.next = null;
	
	// Remote Data
    this.id = 2320;
    this.type = 'm';
	
    // Local Data
	this._img = new Image();
    this._img.src = src;
}

Layer.prototype = {
	source: function() {
		return this._img.src;
	},
    update: function() {

    },
    draw: function() {
		if (ctx) {
			ctx.save();
				ctx.drawImage(this._img, 0, 0, config.WIDTH, config.HEIGHT);
			ctx.restore();
		}
    }
};