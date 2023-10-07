"use strict";

class BasicProduct {
  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.total = this.calculateTotal();
  }

  calculateTotal() {
    return this.quantity * this.price;
  }

  displayInfo() {
    console.log(`Назва: ${this.name}`);
    console.log(`Кількість: ${this.quantity}`);
    console.log(`Ціна: ${this.price.toFixed(2)}`);
    console.log(`Сума: ${this.total.toFixed(2)}`);
  }
}

class Product extends BasicProduct {
  constructor(name, quantity, price, category, discountPercentage) {
    super(name, quantity, price);
    this.category = category;
    this.discountPercentage = discountPercentage;
    this.discountAmount = this.calculateDiscount();
    this.totalWithDiscount = this.calculateTotalWithDiscount();
  }

  calculateDiscount() {
    if (this.category in discounts && this.quantity >= 3) {
      return this.total * (this.discountPercentage / 100);
    }
    return 0;
  }

  calculateTotalWithDiscount() {
    return this.total - this.discountAmount;
  }

  displayInfo() {
    super.displayInfo();
    console.log(`Категорія: ${this.category}`);
    console.log(`Відсоток знижки: ${this.discountPercentage}%`);
    console.log(`Сума знижки: ${this.discountAmount.toFixed(2)}`);
    console.log(`Сума зі знижкою: ${this.totalWithDiscount.toFixed(2)}`);
  }
}

const discounts = {
  "хлібо-булочні вироби": 5,
  "побутова хімія": 7,
};

class BasicReceipt {
  constructor(products) {
    this.date = this.formatDate();
    this.time = this.formatTime();
    this.products = products;
    this.totalAmount = this.calculateTotalAmount();
    this.numOfItems = products.length;
  }

  calculateTotalAmount() {
    return this.products.reduce(
      (total, product) => total + product.totalWithDiscount,
      0
    );
  }

  formatDate() {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
  }

  formatTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }

  displayReceipt() {
    console.log("Касовий чек");
    console.log(`Дата: ${this.date}`);
    console.log(`Час: ${this.time}`);
    console.log("Товари:");
    this.products.forEach((product) => {
      product.displayInfo();
      console.log("---------------");
    });
    console.log(`Загальна сума: ${this.totalAmount.toFixed(2)}`);
    console.log(`Кількість найменувань товарів: ${this.numOfItems}`);
  }
}
class Receipt extends BasicReceipt {
  constructor(products) {
    super(products);
    this.checkTime = new Date().getHours();
  }

  alert() {
    return (
      this.products.some(
        (product) => product.category === "лікеро-горілчані вироби"
      ) &&
      (this.checkTime >= 22 || this.checkTime < 12)
    );
  }

  processPurchase() {
    if (this.alert()) {
      console.log("Продаж лікеро-горілчаних виробів заблокована в данний час.");
      const choice = prompt(
        "Ви бажаєте скасувати покупку повністю (введіть 'cancel') чи провести покупку без цих товарів (введіть 'proceed')?"
      );
      if (choice.toLowerCase() === "cancel") {
        this.products = [];
        console.log("Покупка скасована.");
      } else if (choice.toLowerCase() === "proceed") {
        this.products = this.products.filter(
          (product) => product.category !== "лікеро-горілчані вироби"
        );
        console.log("Покупка продовжена без лікеро-горілчаних виробів.");
      } else {
        console.log("Невірний вибір.");
      }
    } else {
      console.log("Покупка успішно проведена.");
    }
  }

  displayReceipt() {
    super.displayReceipt();
    if (this.alert()) {
      console.log(
        "Увага: Продаж лікеро-горілчаних виробів заблокована в данний час."
      );
    }
  }
}

const product1 = new Product("Хліб", 5, 10, "хлібо-булочні вироби", 5);
const product2 = new Product("Мило", 2, 20, "побутова хімія", 7);
const product3 = new Product("Вино", 1, 50, "лікеро-горілчані вироби", 10);

const productsList = [product1, product2, product3];
const receipt = new Receipt(productsList);

receipt.displayReceipt();

receipt.processPurchase();

receipt.displayReceipt();
