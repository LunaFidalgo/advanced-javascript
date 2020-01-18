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

function ToString(target: Function){
    target.prototype.toString = function(){
        Object.keys(this).map(key => console.log(key, this[key]))
    }
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

console.log(myself.toString());
