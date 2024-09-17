// No.1
// Create a function to calculate array of student data
//  The object has this following properties :
//  Name → String
//  Email → String
//  Age → Date
//  Score → Number

// Parameters : array of student
// 
// Return values :
// Object with this following properties :
//      Score
//          Highest
//          Lowest
//          Average
//      Age
//          Highest
//          Lowest
//          Average

interface IStudent {
    name: string;
    email: string;
    age: Date;
    score: number;
  }
  
  const students: IStudent[] = [
    {
      name: "budi",
      email: "budi@gmail.com",
      age: new Date("1991-01-01"),
      score: 60,
    },
    {
      name: "dodi",
      email: "dodi@gmail.com",
      age: new Date("1990-02-03"),
      score: 80,
    },
    {
      name: "dudi",
      email: "dudi@gmail.com",
      age: new Date("1989-01-01"),
      score: 42,
    },
  ];
  
  interface IScore {
    score: {
      highest: number;
      lowest: number;
      average: number;
    };
    age: {
      highest: number;
      lowest: number;
      average: number;
    };
  }
  
  function calculateAge(date: Date) {
    const today = new Date();
    const diff = today.getTime() - date.getTime();
    console.log(diff);
    const age = new Date(diff);
    console.log(age);
  
    return Math.abs(age.getUTCFullYear() - 1970);
  }
  
  function calculateArray(arr: IStudent[]): IScore {
    const result: IScore = {
      score: {
        highest: 0,
        lowest: 0,
        average: 0,
      },
      age: {
        highest: 0,
        lowest: 0,
        average: 0,
      },
    };
  
    const scores: number[] = [];
    const ages: number[] = [];
  
    for (let i = 0; i < arr.length; i++) {
      scores.push(arr[i].score);
  
      ages.push(calculateAge(arr[i].age));
    }
    console.log(scores);
    console.log(ages);
    result.score.highest = Math.max(...scores);
    result.score.lowest = Math.min(...scores);
    result.score.average =
      scores.reduce((a: number, b: number) => a + b) / arr.length;
  
    result.age.highest = Math.max(...ages);
    result.age.lowest = Math.min(...ages);
    result.age.average =
      ages.reduce((a: number, b: number) => a + b) / arr.length;
  
    return result;
  }
  
  console.log(calculateArray(students));
  
// No.2
// Create a program to create transaction
// Product Class
//  Properties
//      Name
//      Price
// Transaction Class
//  Properties
//      Total
//      Product
//          All product data
//          Qty
//  Add to cart method → Add product to transaction
//  Show total method → Show total current transaction
//  Checkout method → Finalize transaction, return transaction data

  interface IProduct {
    name: string;
    price: number;
  }
  
  interface ITransaction {
    products: { product: IProduct; qty: number }[];
  }
  
  class Product implements IProduct {
    name;
    price;
  
    constructor(paramName: string, paramPrice: number) {
      this.name = paramName;
      this.price = paramPrice;
    }
  }
  
  class Transaction implements ITransaction {
    #total;
    products: {
      product: IProduct;
      qty: number;
    }[];
  
    constructor() {
      this.#total = 0;
      this.products = [];
    }
  
    addToCart(product: IProduct, qty: number) {
      this.#total += product.price * qty;
      this.products.push({
        product,
        qty,
      });
    }
  
    showTotal() {
      return {
        cart: this.products,
        total: this.#total,
      };
    }
  
    checkOut() {
      const currProduct: {
        product: IProduct;
        qty: number;
      }[] = [...this.products];
      this.#total = 0;
      this.products = [];
  
      return currProduct;
    }
  }
  
  const newTransaction = new Transaction();
  newTransaction.addToCart(new Product("Kulkas", 50000), 5);
  console.log(newTransaction.showTotal());
  newTransaction.addToCart(new Product("Lemari", 100000), 2);
  console.log(newTransaction.showTotal());
  console.log(newTransaction.checkOut());
  
  newTransaction.addToCart(new Product("Lemari", 100000), 2);
  console.log(newTransaction.showTotal());
  