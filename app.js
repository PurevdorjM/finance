// ****** ДЭЛГЭЦТЭЙ АЖИЛЛАХ МОДУЛЬ КОНТРОЛЛЕР ******
var uiController = (function() {})();

// ****** САНХҮҮТЭЙ АЖИЛЛАХ МОДУЛЬ КОНТРОЛЛЕР ******
var financeController = (function() {})();

// ****** ПРОГРАММ ХОЛБОГЧ МОДУЛЬ КОНТРОЛЛЕР ******
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    console.log("Дэлгэцээс өгөгдөл авах хэсэг");
    //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж түүнд хадгална.

    //3. Олж авсан өгөгдлүүдийг вэв дээрээ тохирох хэсэгт нь гаргана.

    //4. Төсвийг тооцоолно.

    //5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
  };

  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
