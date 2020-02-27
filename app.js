// ****** ДЭЛГЭЦТЭЙ ХОЛБООТОЙ МОДУЛЬ ******
var uiController = (function() {})();

// ****** САНХҮҮТЭЙ ХОЛБООТОЙ МОДУЛЬ ******
var financeController = (function() {})();

// ****** АПП МОДУЛЬ ******
var appController = (function(uiController, fnController) {})(
  uiController,
  financeController
);
