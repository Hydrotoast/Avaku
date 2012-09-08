// This file is part of Avaku
// Copyright (C) 2010 Gio Carlo Cielo Borje
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
* Linked List implementation for handling avatar layering
* Maintains all algorithms for layer arithmetic
*/
function LinkedList() {
    this.head = null;
    this.tail = null;
	this.length = 0;
}

LinkedList.prototype = {
	findLayer: function(src) {
		// Get absolute path of image source
		var img = new Image();
		img.src = src;
		for (var iter = this.head;
			iter != null;
			iter = iter.next)
			if (iter.source() === img.src)
				return iter;
		return null;
	},
	addLayer: function(src) {
		var layer = new Layer(src);
		if (this.length === 0) {
			this.head = layer;
			this.tail = layer;
		} else {
			this.tail.next = layer;
			layer.prev = this.tail;
			this.tail = layer;
		}
		this.length++;
	},
	removeLayer: function(src) {
		// Get absolute path of image source
		var img = new Image();
		img.src = src;
		if (img.src === this.head.source()) {
			this.head = this.head.next;
			if (this.head != null)
				this.head.prev = null;
		} else if (img.src === this.tail.source()) {
			this.tail = this.tail.prev;
			if (this.tail != null)
				this.tail.next = null;
		} else {
			var layer = this.findLayer(img.src);
			layer.prev.next = layer.next;
			layer.next.prev = layer.prev;
		}
		this.length--;
	},
	jsonify: function() {
		var layers = {
			items: []
		};
		algo.for_each(avatar, function(layer) {
			layers.items.push({ id: layer.id, type: layer.type });
		});
		return JSON.stringify(layers);
	}
};
