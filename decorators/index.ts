/*
 * DECORADORES------------------
 * PROPIEDAD => virtual => que cuando haga un get me devuelva la concatenación de las propiedades que le hemos enviado
 * (imagino que no se puede modificar, al ser virtual)
 *
 * MÉTODO => método suma: quiero un decorador que reciba tantos argumentos en su función como argumentos tiene la función a la que decora
 * cada argumento recibe el tipo de lo que va a validar. ex: @validParameters('number', 'number')
 *
 * CLASE => método toString que añade un método a la clase que hace un console log de todos los métodos y atributos de la clase
 * -----------------------------
 * */

function Virtual(...args: string[]) {
    return function(target: any, propertyName: string) {
        Object.defineProperty(target, propertyName, {
            get() {
                return args.reduce((acc, prev) => acc + this[prev], "");
            },
            set() {
                throw new Error("you can't define a virtual property");
            }
        });
    };
}

function ValidParameters(...decoratorArgs: any[]) {
    //args is like: ['number', 'string']
    return function(target: any, property: any, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function(...args: any[]) {
            const valid = args.every((arg, i) => typeof arg === decoratorArgs[i]);
            if (valid) {
                return method.apply(this, args);
            }
            throw new Error("NOT VALID PARAMETERS TYPE");
        };
        return descriptor;
    };
}

function ToString(target: Function) {
    target.prototype.toString = function() {
        Object.keys(this).map(key => console.log(key, this[key]));
    };
}

@ToString
class User {
    constructor(public name: string, public surname: string) {}

    @Virtual("name", "surname")
    fullname: string;

    @ValidParameters("number", "number")
    sum(a: any, b: any) {
        return a + b;
    }
}

const myself = new User("Luna", "Fidalgo");

//example fullname
console.log(myself.toString());

//example valid sum
console.log(myself.sum(1, 2));

//example invalid type
//console.log(myself.sum(1,"a"))

type validateConfig = {
    required: boolean;
    type: string;
    in?: any[];
    max?: number;
    min?: number;
};

function Validate(config: validateConfig) {
    return function(target: any, propertyName: string) {
        let value: any;
        Object.defineProperty(target, propertyName, {
            get() {
                return value;
            },
            set(newValue: any) {
                if (config.required && !newValue) {
                    throw new Error(`Required property: ${newValue}`);
                }
                if (typeof newValue !== config.type) {
                    throw new Error(`${typeof newValue} is not ${config.type}`);
                }

                if (config.in && !config.in.find(element => element === newValue)) {
                    throw new Error(`${newValue} is not in: ${config.in}`);
                }

                if (config.type === "number") {
                    if (
                        config.max !== undefined &&
                        config.max !== null &&
                        newValue > config.max
                    ) {
                        throw new Error(
                            `${newValue} is greater than max value: ${config.max}`
                        );
                    }
                    if (
                        config.min !== undefined &&
                        config.min !== null &&
                        newValue < config.min
                    ) {
                        throw new Error(
                            `${newValue} is lower than min value: ${config.min}`
                        );
                    }
                }

                return (value = newValue);
            }
        });
    };
}

class Vehicle {
    constructor(numWheels: number) {
        this.numWheels = numWheels;
    }

    @Validate({
        required: true,
        type: "number",
        //  max: 8,
        //   min: 2,
        in: [1,5]
    })
    numWheels: any;
}

const myVehicle = new Vehicle(1);

console.log(myVehicle.numWheels);
