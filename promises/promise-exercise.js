class Promise {
    constructor(fn) {
        this.status = "Pending";
        this.successCB = [];
        this.errorCB = [];
        fn(this.resolve.bind(this), this.reject.bind(this));
    }

    addSuccess(cb) {
        return new Promise((resolve, reject) => {
            this.successCB.push(data => {
                const result = cb(data);
                if (result instanceof Promise) {
                    result.addSuccess(resolve);
                    result.addError(reject);
                } else {
                    resolve(result);
                }
            });
        });
    }

    addError(cb) {
        this.errorCB.push(cb);
    }

    resolve(data) {
        this.status = "Resolved";
        this.successCB.forEach(f => f(data));
    }

    reject(error) {
        this.status = "Rejected";
        this.errorCB.forEach(f => f(error));
    }

    /*
    * han de resolverse todas para que la final se resuelva => pero con que una haya dado error, lo que devuelvo es FALLO.
      y si falla => [] con los errores fallidas
    */
    static all(promises) {
        let successCount = 0;
        const successValues = new Array(promises.length);
        let errorCount = 0;
        const errorValues = new Array(promises.length);
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                let num = i;
                promises[i].addSuccess(data => {
                    successCount++;
                    successValues[num] = data;
                    if (
                        successCount === promises.length ||
                        successCount + errorCount === promises.length
                    ) {
                        if (errorCount > 0) {
                            reject(errorValues);
                        } else {
                            resolve(successValues);
                        }
                    }
                });
                promises[i].addError(data => {
                    errorCount++;
                    errorValues[num] = data;
                    if (
                        errorValues === promises.length ||
                        successCount + errorCount === promises.length
                    ) {
                        reject(errorValues);
                    }
                });
            }
        });
    }
}

function myTimeout(seconds) {
    return new PromiseExercise((resolve, reject) => {
        setTimeout(() => {
            if (seconds % 2 === 0) {
                resolve();
            } else {
                reject("promesa rejected");
            }
        }, seconds * 1000);
    });
}

console.log("Start");
const p = myTimeout(2);
const p1 = myTimeout(2);
const p2 = myTimeout(3);

const pFinal = Promise.all([p, p1, p2]);

pFinal.addSuccess(data => {
    console.log("End");
});

pFinal.addError(err => {
    console.log("ERROR");
    console.error(err);
});
