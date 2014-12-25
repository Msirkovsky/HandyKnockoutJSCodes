"use-strict";
ko.bindingHandlers.date = {
	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var value = valueAccessor(),
			allBindings = allBindingsAccessor();
		var valueUnwrapped = ko.utils.unwrapObservable(value);
		var dateJS = new Date(valueUnwrapped);
		var text = moment(dateJS).format('D.M.YYYY');

		$(element).text(text);
	}
};


ko.bindingHandlers.priceText = {

	init: function(element, valueAccessor) {
		$(element).on("change", function(ev) {
			var observable = valueAccessor();
			observable(ev.target.value);
		});
	},

	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var value = valueAccessor();
		var valueUnwrapped = value();
		var text = MoneyHelper.na2pcFixed(valueUnwrapped);
		element.innerText = text;
	}
	
};

ko.bindingHandlers.dateIn = {

	init: function(element, valueAccessor) {
		$(element).on("change", function(ev) {
			var observable = valueAccessor();
			observable(ev.target.value);
		});
	},

	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var value = valueAccessor();
		var valueUnwrapped = value();
		if (valueUnwrapped === null)
		{
			element.value ="";
			return;
		}
		var moment1 =	moment(valueUnwrapped, "DD.MM.YYYY");
		if (moment1.isValid() === false)
		{
 			moment1 =	moment(valueUnwrapped);
		}
		element.value = moment1.format('D.M.YYYY');
	}
};

(function(factory) {
	if (typeof define === "function" && define.amd) {
		define(["knockout"], factory);
	} else {
		factory(ko);
	}
})
(function(ko) {
	function getOptions(valueAccessor) {
		var options = ko.utils.unwrapObservable(valueAccessor());
		if (options.pattern) {
			return options;
		} else {
			return {
				pattern: options
			};
		}
	}

	ko.bindingHandlers.selectOnFocus = {
		init: function(element, valueAccessor) {
			var firstFocus = true;

			function selectContentAsync() {
				setTimeout(function() {
					var options = getOptions(valueAccessor);
					var onlySelectOnFirstFocus = ko.utils.unwrapObservable(options.onlySelectOnFirstFocus);

					if (!onlySelectOnFirstFocus || firstFocus) {
						element.select();
						firstFocus = false;
					}
				}, 1);
			}

			if (document.activeElement === element) {
				selectContentAsync();
			}

			ko.utils.registerEventHandler(element, 'focus', function(e) {
				selectContentAsync();
			});
		}
	};
});


ko.bindingHandlers.datepicker = {
	DATE_CONSTANT: 'dd.mm.yyyy',

	init: function(element, valueAccessor, allBindingsAccessor) {
		var options = allBindingsAccessor().datepickerOptions || {};
		$(element).datepicker({
			language: 'cs',
			autoclose: true,
			format: ko.bindingHandlers.datepicker.DATE_CONSTANT
		}).on("changeDate", function(ev) {
			var observable = valueAccessor();
			observable(ev.date);
		});
	},
	update: function(element, valueAccessor) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		if (value === '') {
			$(element).datepicker("update", null);
			
		}
		else  if (value !== null) {
			var date = moment(value).format("DD.MM.YYYY");
			$(element).datepicker("update", date);
		}
	}
};


ko.bindingHandlers.numeric = {
	init: function(element, valueAccessor) {
		$(element).on("keydown", function(event) {
			
			if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
			
				(event.keyCode == 65 && event.ctrlKey === true) ||
			
				(event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
			
				(event.keyCode >= 35 && event.keyCode <= 39)) {
			
				return;
			} else {
			
				if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
					event.preventDefault();
				}
			}
		});
	}
};


ko.bindingHandlers.autoComplete = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var settings = valueAccessor();

		var selectedOption = settings.selected;
		var options = settings.options;
		var paramOptions = settings.paramOptions;
		if (paramOptions) {

			var key = "SP" + paramOptions();
			if (bindingContext.$root[key] !== undefined)
				options = bindingContext.$root[key];
			else
				options = [];
		}


		selectedOption.subscribe(function(newValue) {
			$(element).val(newValue.label);

		});

		var updateElementValueWithLabel = function(event, ui) {

			event.preventDefault();
			if (ui.item === null)
			{
				//nastavím aspoň do observable
				return;
			}
			$(element).val(ui.item.label);

			if (typeof ui.item !== "undefined") {
				selectedOption(ui.item);
			}
		};

		$(element).autocomplete({
			source: options,
			minLength: 0,
			messages: {
				noResults: '',
				results: function() {}
			},
			select: function(event, ui) {
				updateElementValueWithLabel(event, ui);
			},
			focus: function(event, ui) {				
			},
			change: function(event, ui, a) {
				updateElementValueWithLabel(event, ui);
			}
		})

.on('focus', function(event) {
    		var self = this;
    		$(self).autocomplete( "search", "");
    	});
	},
	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		$(element).val(value.label);
	}
};


