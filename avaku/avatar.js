// This file is part of Avaku
// Copyright (C) 2010 Gio Carlo Cielo Borje Borje
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
* Canvas implementation of avatars
* Benefits: Decoupled from CSS and fast algorithms with data-urls
* Concerns: Backwards compatibility
*/
function CanvasAvatar() {
    this._width = config.WIDTH;
    this._height = config.HEIGHT;

	this.base = new Base('M');
}

CanvasAvatar.prototype = new LinkedList();

CanvasAvatar.prototype.render = function() {
	this.clear();
	this.base.draw();
	algo.for_each (Avaku.avatar, function(layer) {
		layer.draw();
	});
};

CanvasAvatar.prototype.clear = function() {
	Avaku.canvas.width = Avaku.canvas.width;
};
	
CanvasAvatar.prototype.compile = function() {
	var compiled = document.getElementById('compiled');
	compiled.src = Avaku.canvas.toDataURL(config.COMPILE_FORMAT);
};

/**
* DOM implementation of avatars
* Benefits: Cross-compatible
* Concerns: Strongly coupled with CSS and slow algorithms
*/
function DomAvatar() {
    this._width = config.WIDTH;
    this._height = config.HEIGHT;

	this.base = new Base('M');
}

DomAvatar.prototype = new LinkedList();

DomAvatar.prototype.render = function() {
	this.clear();
	var img = document.createElement('img');
	img.src = this.base._img.src;
	Avaku.fragment.appendChild(img);
	algo.for_each(Avaku.avatar, function(layer) {
		var img = document.createElement('img');
		img.src = layer._img.src;
		Avaku.fragment.appendChild(img);
	});
	Avaku.bc_avatar.appendChild(Avaku.fragment.cloneNode(true));
	while (Avaku.fragment.hasChildNodes())
		Avaku.fragment.removeChild(Avaku.fragment.lastChild);
};

DomAvatar.prototype.clear = function() {
	while (Avaku.bc_avatar.hasChildNodes()) 
		Avaku.bc_avatar.removeChild(Avaku.bc_avatar.lastChild);
};
	
DomAvatar.prototype.compile = function() {
	var compiled = document.getElementById('dom_compiled');
	while (compiled.hasChildNodes()) 
		compiled.removeChild(compiled.lastChild);
	var img = document.createElement('img');
	img = this.base._img;
	Avaku.fragment.appendChild(img);
	algo.for_each(Avaku.avatar, function(layer) {
		var img = document.createElement('img');
		img.src = layer._img.src;
		img.style.position = 'absolute';
		Avaku.fragment.appendChild(img);
	});
	compiled.appendChild(Avaku.fragment.cloneNode(true));
};
