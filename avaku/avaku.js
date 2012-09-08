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
		canvas = document.getElementById(config.AVATAR_ID);
		bc_avatar = document.getElementById(config.BC_AVATAR_ID);
		
		if (canvas.getContext) {
			ctx = canvas.getContext('2d');
			avatar = new CanvasAvatar();
		} else {
			fragment = document.createDocumentFragment();
			avatar = new DomAvatar();
			bc_avatar.style.position = 'relative';
		}
	};

	avaku.initHandlers = function() {
		var items = algo.getByClass(config.ITEM_CLASS);
		
		var save = document.getElementById(config.SAVE_ID);
		var clear = document.getElementById(config.CLEAR_ID);
		
		save.addEventListener('click', function() {
			avatar.compile();
			return false;
		});
		
		clear.addEventListener('click', function() {
			for (var i in items) {
				var image = algo.getByClass(config.LAYER_CLASS, items[i])[0].firstChild;
				if (image != null && image.className.indexOf(config.EQUIPPED_CLASS) != -1) {
					image.className = '';
					avatar.removeLayer(image.alt);
					
					algo.getByClass(config.REMOVE_CLASS, items[i])[0].style.display = 'none';
				}
				avaku.draw();
			}
			return false;
		});

		for (var i in items)
			avaku.bindItemHandler(items, i);
	};
	
	avaku.bindItemHandler = function(items, i) {
		var layer = algo.getByClass(config.LAYER_CLASS, items[i])[0];
		var image = layer.firstChild;
		
		var remove = algo.getByClass(config.REMOVE_CLASS, items[i])[0]
		var raise = algo.getByClass(config.RAISE_CLASS, items[i])[0]
		var lower = algo.getByClass(config.LOWER_CLASS, items[i])[0]
		
		// EquipItem event handler
		layer.addEventListener('click', function(item) {
			return function() {
				var layer = algo.getByClass(config.LAYER_CLASS, item)[0]
				var image = layer.firstChild;
				if (image.className.indexOf(config.EQUIPPED_CLASS) == -1) {
					image.className = config.EQUIPPED_CLASS;
					avatar.addLayer(image.getAttribute('data-src'));
				
					algo.getByClass(config.REMOVE_CLASS, item)[0].style.display = 'block';
				}
				
				avaku.draw();
				return false;
			}
		}(items[i]));
		
		// UnequipItem event handler
		remove.addEventListener('click', function(image) {
			return function() {
				if (image.className.indexOf(config.EQUIPPED_CLASS) != -1) {
					image.className = '';
				
					this.style.display = 'none';
					avatar.removeLayer(image.getAttribute('data-src'));
					avaku.draw();
					return false;
				}
			}
		}(image));
		
		if (raise != null && lower != null) {
			// RaiseLayer event handler
			raise.addEventListener('click', function(image) {
				return function() {
					algo.raiseLayer(avatar, image.getAttribute('data-src'));
					avaku.draw();
					return false;
				}
			}(image));
			
			// LowerLayer event handler
			lower.addEventListener('click', function(image) {
				return function() {
					algo.lowerLayer(avatar, image.getAttribute('data-src'));
					avaku.draw();
					return false;
				}
			}(image));
		}
	};

	avaku.draw = function() {
		avatar.render();
	};
	
	avaku.apply = function() {
		var json = avatar.jsonify();
		var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		xhr.open('POST', config.AVATAR_SCRIPT_PATH, false);
		xhr.addEventListener('load', function() {
			return xhr.status === 200;
		}, false);
		xhr.setRequestHeader('Content-Type', 'application/x-www-url-form-urlencoded');
		xhr.setRequestHeader('Content-Length', json.length);
		xhr.setRequestHeader('Connection', 'close');
		xhr.send(json);
	};

	avaku.init = function() {
		avaku.initVariables();
		avaku.initHandlers();
		
		avaku.draw();
	};
})(Avaku);
