const handler = {
  get(target, key) {
    console.log(`accessing to ${key} property`);
    return target[key];
  },
  set(target, key, value) {
    console.log(`modifiying ${key} property with ${value}`);
    return (target[key] = value);
  }
};

function Vehicle(brand, numWheels, createdAt) {
  const myVehicle = {};
  Object.defineProperties(myVehicle, {
    brand: {
      value: brand,
      writable: false,
      configurable: false,
      enumerable: true
    },
    numWheels: {
      enumerable: true,
      get() {
        return this._numWheels;
      },
      set(value) {
        if (!Number.isNaN()) {
          if (value >= 0) {
            return (this._numWheels = parseInt(value));
          } else {
            throw new Error(`${value} should be greater than 0`);
          }
        }
        throw new Error(`${value} should be a number`);
      }
    },
    createdAt: {
      enumerable: true,

      get() {
        return this._createdAt;
      },
      set(value) {
        if (!(value instanceof Date)) {
          throw new Error(`${value} is not a Date`);
        }
        /*    if (value < Date.now()) {
          throw new Error(
            `${value} is not a valid date. Should be greater than now`
          );
        }*/
        return (this._createdAt = value);
      }
    }
  });

  myVehicle.brand = brand;
  myVehicle.numWheels = numWheels;
  myVehicle.createdAt = createdAt;

  //return myVehicle;
  return new Proxy(myVehicle, handler);
}

const myCar = Vehicle("aaaa", 2, new Date());
//console.log(myCar);
