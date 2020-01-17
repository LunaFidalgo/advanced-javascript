/*
 Enunciado:
       1. Crear una función que construya objetos con
      las siguientes carácteristicas:
      - lat: Float Min -90 Max: 90
      - lon: Float Min -180 Max 180
      - id: string con max 10 carácteres. No se puede modificar
      - date: Fecha con formato YYYY-MM-DD
      En el caso de que no se cumpla alguna validación
      lanzará un error.
      2. Clases
      Modelar un reproductor de Video que soporte los
      siguientes formatos:
      - mpg
      - mp4
      - avi
      Cada formato de video se decodifica de un modo.
      El reproductor de video tiene las siguientes funcionalidades:
      - play
      - pause
      - decode
      - toString
      3. Utilizando un Proxy de JS, implementar una función
      que reciba un objeto de configuración y valide los campos
      del objeto.
      Ejemplo:
      const obj = addValidation(target, {
        name: {
          required: true,
          type: 'string'
        },
        age: {
          required: true,
          type: 'number'
        }
      })
      Cada vez que se intente modificar alguna de las propiedades
      del objeto `target`, la libreria comprobará si la propiedad
      a modificar cumple la validación.
 */


function generateObject(lat, lon, id, date) {
  const obj = {};

  Object.defineProperties(obj, {
    lat: {
      configurable: true,
      enumerable: true,
      set(value) {
        if (isNaN(value)) {
          throw new Error(`${value} is not convertible a number`);
        }

        const floatValue = parseFloat(value);
        if (value < -90 && value > 90) {
          throw new Error(`${value} should be between -90 and 90`);
        }

        this._lat = floatValue;
      },
      get() {
        return this._lat;
      }
    },
    lon: {
      configurable: true,
      enumerable: true,
      set(value) {
        if (value > -180 && value < 180) {
          return (this._lon = value);
        }
        throw new Error(`${value} should be between -180 and 180`);
      },
      get() {
        return this._lon;
      }
    },
    id: {
      configurable: false,
      enumerable: true,
      set(value) {
        if (typeof value === "string" && value.length < 10) {
          return (this._id = value);
        }
        throw new Error(`id : '${value}' is not valid.`);
      },
      get() {
        return this._id;
      }
    },
    date: {
      configurable: true,
      enumerable: true,
      set(value) {
        if (
          typeof value === "string" &&
          value.match(/\d{4}-{1}\d{2}-{1}\d{2}/)
        ) {
          //need validate form YYYY-MM-DD
          return (this._date = value);
        }
        throw new Error(
          `Not valid format date. ${value} should have this form: "YYYY-MM-DD"`
        );
      },
      get(value) {
        return this._date;
      }
    }
  });

  obj.lat = lat;
  obj.lon = lon;
  obj.id = id;
  return obj;
}

const newObj = generateObject(50, 80, "my-feqqeg", "123334-12-12");

console.log();

class Player {
  play() {
    this.decode();
    console.log("PLAYING");
  }
  pause() {
    console.log("PAUSE");
  }
  toString() {
    console.log("TOSTRING");
  }
}

class MPG extends Player {
  decode() {
    console.log("DECODING MPG PLAYER");
  }
}

class MP4 extends Player {
  decode() {
    console.log("DECODING MP4 PLAYER");
  }
}

class AVI extends Player {
  decode() {
    console.log("DECODING AVI PLAYER");
  }
}

const aviReproductor = new AVI();

//ejercicio 3

function addValidation(targetObj, configuration) {
  //pre validation
  Object.keys(targetObj).map(prop => {
    if (configuration[prop].required && !targetObj[prop]) {
      throw new Error(`required property ${prop} not found`);
    }
    if (configuration[prop].type !== typeof targetObj[prop]) {
      throw new Error("Invalid type");
    }
  });

  //handler
  const handler = {
    set: function(obj, prop, value) {
      if (configuration[prop].required && !targetObj[prop]) {
        throw new Error("required property not found");
      }

      if (configuration[prop].type !== typeof value) {
        throw new Error("Invalid type");
      }

      return (targetObj[prop] = value);
    },
    deleteProperty(target, prop) {
      if (configuration[prop].required && targetObj[prop]) {
        throw new Error("you can't delete a required property");
      }
      delete target[prop];
    }
  };

  const proxy = new Proxy(targetObj, handler);

  return proxy;
}

const target = {
  name: "name",
  age: 12
};

const obj = addValidation(target, {
  name: {
    required: true,
    type: "string"
  },
  age: {
    required: true,
    type: "number"
  }
});

//delete obj.age;
obj.name = 1;

//console.log();
