// ****** ДЭЛГЭЦТЭЙ АЖИЛЛАХ МОДУЛЬ КОНТРОЛЛЕР ******
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    precentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePrecentageLabel: ".item__precentage",
    datelabel: ".budget__title--month"
  };

  var nodListForeach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function(too, type) {
    too = "" + too;
    var x = too
      .split("")
      .reverse()
      .join("");

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }

    var z = y
      .split("")
      .reverse()
      .join("");

    if (z[0] === ",") z = z.substr(1, z.length - 1);

    if (type === "inc") z = "+ " + z;
    else z = "- " + z;

    return z;
  };

  return {
    displayDate: function() {
      var unuudur = new Date();

      document.querySelector(DOMstrings.datelabel).textContent =
        unuudur.getFullYear() + " оны " + unuudur.getMonth() + " сарын";
    },

    changeType: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          "," +
          DOMstrings.inputDescription +
          "," +
          DOMstrings.inputValue
      );

      nodListForeach(fields, function(el) {
        el.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.addBtn).classList.toggle("red");
    },

    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    displayPrecentages: function(allPresentages) {
      // Зарлагын NodeList-ийг олох
      var elements = document.querySelectorAll(
        DOMstrings.expensePrecentageLabel
      );

      // Элемент болгоны хувьд зарлагын хувийг массиваас авч шивж оруулах
      nodListForeach(elements, function(el, index) {
        el.textContent = allPresentages[index];
      });
    },

    getDOMstrings: function() {
      return DOMstrings;
    },

    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );

      //Convert List To Array
      var fielsdArr = Array.prototype.slice.call(fields);

      fielsdArr.forEach(function(el) {
        el.value = "";
      });
      fielsdArr[0].focus();
    },

    tusviigUzuuleh: function(tusuv) {
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";

      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.precentageLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.precentageLabel).textContent =
          tusuv.huvi;
      }
    },

    deleteListItem: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function(item, type) {
      // Орлого зарлагын элементийг агуулсан HTML-ийг бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__precentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", formatMoney(item.value, type));

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
    this.precentage = -1;
  };

  Expence.prototype.calcPrecentage = function(totalIncome) {
    if (totalIncome > 0)
      this.precentage = Math.round((this.value / totalIncome) * 100);
    else this.precentage = 0;
  };

  Expence.prototype.getPresentage = function(type) {
    return this.precentage;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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
    },

    tusuv: 0,

    huvi: 0
  };

  return {
    tusuvTootsooloh: function() {
      //Нийт орлогын нийлбэрийг тооцоолно.
      calculateTotal("inc");

      //Нийт зарлагын нийлбэрийг тооцоолно.
      calculateTotal("exp");

      //Төсвийг шинээр тооцоолно.
      data.tusuv = data.totals.inc - data.totals.exp;

      //Орлого зарлагын хувийг тооцоолно.
      if (data.totals.inc > 0) {
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else data.huvi = 0;
    },

    calculatePrecentages: function() {
      data.items.exp.forEach(function(el) {
        el.calcPrecentage(data.totals.inc);
      });
    },

    getPresentages: function() {
      var allPresentages = data.items.exp.map(function(el) {
        return el.getPresentage();
      });

      return allPresentages;
    },

    tusviigAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },

    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },

    addItem: function(type, desc, val) {
      var item, id;

      // identification

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
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

    if (input.description !== "" && input.value !== "") {
      //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж түүнд хадгална.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      //3. Олж авсан өгөгдлүүдийг вэв дээрээ тохирох хэсэгт нь гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      // Төсвийг шинээр тооцоолон дэлгэцэнд үзүүлэх
      updateTusuv();
    }
  };

  var updateTusuv = function() {
    //4. Төсвийг тооцоолно.
    financeController.tusuvTootsooloh();

    //5. Эцсийн үлдэгдэл
    var tusuv = financeController.tusviigAvah();

    //6. Төсвийн тооцоог дэлгэцэнд гаргана.
    uiController.tusviigUzuuleh(tusuv);

    //7. Элементүүдийн хувийг тооцоолно.
    financeController.calculatePrecentages();

    //8. Элементүүдийн хувийг хүлээж авна.
    var allPresentages = financeController.getPresentages();

    //9. Элементүүдийг дэлгэцэнд гаргана.
    uiController.displayPrecentages(allPresentages);
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

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiController.changeType);

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (id) {
          //inc-2
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          // console.log(type + "===>" + itemId);

          // 1. Санхүүгийн модулаас type, id ашиглаад устгана.
          financeController.deleteItem(type, itemId);

          // 2. Дэлгэц дээрээс энэ элементийг устгана.
          uiController.deleteListItem(id);

          // 3. Үлдэгдэл тооцоог шинэчилж харуулна.
          updateTusuv();
        }
      });
  };

  return {
    init: function() {
      console.log("Application started...");
      uiController.displayDate();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0
      });
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();
