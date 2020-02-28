// ****** ДЭЛГЭЦТЭЙ АЖИЛЛАХ МОДУЛЬ КОНТРОЛЛЕР ******
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    },

    addListItem: function(item, type) {
      // Орлого зарлагын элементийг агуулсан HTML-ийг бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__precentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);

      // Бэлтгэсэн HTML-ээ DOM-руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    }
  };
})();

// ****** САНХҮҮТЭЙ АЖИЛЛАХ МОДУЛЬ КОНТРОЛЛЕР ******
var financeController = (function() {
  //private Функц
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //private Функц
  var Expence = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //private data
  var data = {
    items: {
      inc: [],
      exp: []
    },

    totals: {
      inc: 0,
      exp: 0
    }
  };

  return {
    addItem: function(type, desc, val) {
      var item;

      // identification

      if (data.items[type].length === 0) id = 1;
      else {
        data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expence(id, desc, val);
      }
      data.items[type].push(item);

      return item;
    },
    seeData: function() {
      return data;
    }
  };
})();

// ****** ПРОГРАММ ХОЛБОГЧ МОДУЛЬ КОНТРОЛЛЕР ******
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getInput();

    console.log(input);
    //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж түүнд хадгална.
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );

    //3. Олж авсан өгөгдлүүдийг вэв дээрээ тохирох хэсэгт нь гаргана.
    uiController.addListItem(item, input.type);

    //4. Төсвийг тооцоолно.

    //5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
  };

  // EventListener-үүдийн буюу хулганы гарны лижтенерүүдийн холбогч функц
  var setupEventListeners = function() {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function() {
      console.log("Application started...");
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();
