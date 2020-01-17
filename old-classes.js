function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.toString = function() {
  console.log(`My name is ${this.name} and my age is ${this.age}`);
};

User.prototype.canVote = function() {
  return this.age >= 18;
};

const Luna = new User("Luna", 27);

function Admin(name, age) {
  User.call(this, name, age);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.isSuperAdmin = function() {
  return true;
};

function Guest(name, age) {
  User.call(this, name, age);
  this.expirationDate = new Date(Date.now() + 50000000);
}

Guest.prototype = Object.create(User.prototype);
Guest.prototype.isExpired = function() {
  return this.expirationDate < Date.now();
};

Guest.prototype.toString = function() {
  console.log(`I'm a guest`);
};

const guest = new Guest("Luna", 85);

console.log(guest.isExpired());
