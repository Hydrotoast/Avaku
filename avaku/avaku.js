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

var canvas, ctx;
var avatar;	

var Avaku = {};
(function(avaku) {
	avaku.initVariables = function() {
		canvas = document.getElementById('avatar');
		ctx = canvas.getContext('2d');
		
		avatar = new Avatar();
	};

	avaku.initHandlers = function() {
		var items = document.getElementsByClassName('item');
		var save = document.getElementById('save');
		var clear = document.getElementById('clear');
		
		save.onclick = function() {
			avatar.compile();
			return false;
		};
		
		clear.onclick = function() {
			for (var i in items) {
				if (items[i].getElementsByClassName) {
					var image = items[i].getElementsByClassName('layer')[0].firstChild;
					if (image != null && image.className.indexOf('equipped') != -1) {
						image.className = '';
						avatar.removeLayer(image.src);
						
						items[i].getElementsByClassName('remove')[0].style.display = 'none';
					}
					avaku.draw();
				}
			}
			return false;
		};

		for (var i in items) {
			if (items[i].getElementsByClassName) {
				var layer = items[i].getElementsByClassName('layer')[0];
				var image = layer.firstChild;
				
				var remove = items[i].getElementsByClassName('remove')[0];
				var raise = items[i].getElementsByClassName('raise')[0];
				var lower = items[i].getElementsByClassName('lower')[0];
				
				layer.onclick = function(item) {
					return function() {
						var layer = item.getElementsByClassName('layer')[0];
						var image = layer.firstChild;
						if (image.className.indexOf('equipped') == -1) {
							image.className = 'equipped';
							avatar.addLayer(image.src);
						
							item.getElementsByClassName('remove')[0].style.display = 'block';
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