"use-strict";

function handleError(message) {
	alert(message);
}

function displayOkMessage(message) {
	$("#infoMessage").html(message);
	$("#infoMessage").removeClass();
	$("#infoMessage").addClass("successMessage");
}

function displayErrorMessage(message) {
	$("#infoMessage").html(message);
	$("#infoMessage").removeClass();
	$("#infoMessage").addClass("errorMessage");
}

function displayConccurencyMessage(message) {
	$("#infoMessage").html(message);
	$("#infoMessage").removeClass();
	$("#infoMessage").addClass("errorMessage");
}

function hideMessage() {
	$("#infoMessage").html('');
	$("#infoMessage").removeClass();

}

function displayMessage(result) {

	if (result.Status == "ok")
		displayOkMessage(result.HtmlMessage);
	else if (result.Status == "error")
		displayErrorMessage(result.HtmlMessage);
	else if (result.Status == "conccurency")
		displayConccurencyMessage(result.HtmlMessage);

	//timer
	var timer = setTimeout(function() {
		hideMessage();
		clearTimeout(timer);
	}, 6000);

}

var UrlHelper = {

	getLastPart: function() {
		var href = document.URL;
		return href.substr(href.lastIndexOf('/') + 1);
	},

	getParam: function(name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results === null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}

};

var ListKOHelper = {
	refreshKOList: function(observableList, newList, customMapCallback, callbackArgument) {
		observableList([]);
		for (var i = 0; i < newList.length; i++) {
			var observable = ko.mapping.fromJS(newList[i]);
			if (customMapCallback)
				customMapCallback(observable, callbackArgument);
			observableList.push(observable);
		}
	}
};

var AjaxHelper = {

	post: function(url, data, success) {
		var toSend = JSON.stringify(data);
		$.ajax({
			url: url,
			type: 'POST',
			data: toSend,
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				success(data);
			}
		});
	},

	postKOObject: function(url, data, success) {
		var unmapped = ko.mapping.toJS(data);
		var toSend = JSON.stringify(unmapped);
		$.ajax({
			url: url,
			type: 'POST',
			data: toSend,
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				success(data);
			}
		});
	},

	get: function(url, data, success) {
		$.ajax({
			url: url,
			type: 'GET',
			data: data,
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				success(data);
			}
		});
	},

	getQ: function(url, data) {
		return Q($.ajax({
			url: url,
			type: 'GET',
			data: data,
			contentType: 'application/json; charset=utf-8'
		}));
	},

	postQ: function(dataToSend, url) {

		var toSend = JSON.stringify(dataToSend);

		return Q($.ajax({
			url: url,
			type: 'POST',
			data: toSend,
			contentType: 'application/json; charset=utf-8',
		}));
	},

	postDataQ: function(dataToSend, url) {

		var toSend = JSON.stringify(dataToSend);

		return Q($.ajax({
			url: url,
			type: 'POST',
			data: toSend,
			contentType: 'application/json; charset=utf-8',
		}));
	},

	postDataAndHandleMessageQ: function(dataToSend, url) {
		//var unmapped = ko.mapping.toJS(dataToSend);
		var toSend = JSON.stringify(dataToSend);

		return Q($.ajax({
			url: url,
			type: 'POST',
			data: toSend,
			contentType: 'application/json; charset=utf-8'
				//success: function(data) {
				//	displayMessage(data);
				//	//if (sucessCallback !== null) {
				//	//	sucessCallback(dataToSend, mapFuncForResult(data));
				//	}
		})).then(function(data) {
			displayMessage(data);
			return data;
		});
	}
};



var CloneHelper = {

	cloneShallow: function(obj) {
		if (null === obj || "object" != typeof obj) return obj;
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				copy[attr] = obj[attr];
			}
		}
		return copy;
	}
};