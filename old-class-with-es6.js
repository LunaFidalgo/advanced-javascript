class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  toString() {
    console.log(`My name is ${this.name} and my age is ${this.age}`);
  }

  canVote() {
    return this.age >= 18;
  }
}

const Luna = new User("Luna", 27);

class Admin extends User {
  constructor(name, age) {
    super(name, age);
  }

  isSuperAdmin() {
    return true;
  }
}

class Guest extends User {
  constructor(name, age) {
    super(name, age);
    this.expirationDate = new Date(Date.now() + 50000000);
  }

  isExpired() {
    return this.expirationDate < Date.now();
  }

  toString() {
    console.log(`I'm a guest`);
  }
}

const guest = new Guest("Luna", 85);

console.log(guest.toString());
