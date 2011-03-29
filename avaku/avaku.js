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

var canvas = null, 
	ctx = null,
	fragment = null;
var avatar = null,
	bc_avatar = null;

var Avaku = {};
(function(avaku) {
	avaku.initVariables = function() {
		canvas = document.getElementById('avatar');
		bc_avatar = document.getElementById('bc_avatar');
		
		if (canvas.getContext) {
			ctx = canvas.getContext('2d');
			avatar = new CanvasAvatar();
		} else {
			fragment = document.createDocumentFragment();
			avatar = new DomAvatar();
		}
	};

	avaku.initHandlers = function() {
		var items = algo.getByClass('item');
		
		var save = document.getElementById('save');
		var clear = document.getElementById('clear');
		
		save.onclick = function() {
			avatar.compile();
			return false;
		};
		
		clear.onclick = function() {
			for (var i in items) {
				var image = algo.getByClass('layer', items[i])[0].firstChild;
				if (image != null && image.className.indexOf('equipped') != -1) {
					image.className = '';
					avatar.removeLayer(image.src);
					
					algo.getByClass('remove', items[i])[0].style.display = 'none';
				}
				avaku.draw();
			}
			return false;
		};

		for (var i in items) {
			var layer = algo.getByClass('layer', items[i])[0];
			var image = layer.firstChild;
			
			var remove = algo.getByClass('remove', items[i])[0]
			var raise = algo.getByClass('raise', items[i])[0]
			var lower = algo.getByClass('lower', items[i])[0]
			
			layer.onclick = function(item) {
				return function() {
					var layer = algo.getByClass('layer', item)[0]
					var image = layer.firstChild;
					if (image.className.indexOf('equipped') == -1) {
						image.className = 'equipped';
						avatar.addLayer(image.src);
					
						algo.getByClass('remove', item)[0].style.display = 'block';
					}
					
					avaku.draw();
					return false;
				}
			}(items[i]);
			
			remove.onclick = function(image) {
				return function() {
					if (image.className.indexOf('equipped') != -1) {
						image.className = '';
					
						this.style.display = 'none';
						avatar.removeLayer(image.src);
						avaku.draw();
						return false;
					}
				}
			}(image);
			
			if (raise != null && lower != null) {
				raise.onclick = function(image) {
					return function() {
						algo.raiseLayer(avatar, image.src);
						avaku.draw();
						return false;
					}
				}(image);
				
				lower.onclick = function(image) {
					return function() {
						algo.lowerLayer(avatar, image.src);
						avaku.draw();
						return false;
					}
				}(image);
			}
		}
	};

	avaku.draw = function() {
		avatar.render();
	};

	avaku.init = function() {
		avaku.initVariables();
		avaku.initHandlers();
		
		avaku.draw();
	};
})(Avaku);