class Promise {
    constructor() {
        this.status = "Pending";
        this.successCB = [];
        this.errorCB = [];
    }

    addSuccess(cb) {
        this.successCB.push(cb);
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
}

function myTimeout(seconds) {
    const promise = new Promise();
    setTimeout(() => {
        if (seconds % 2 === 0) {
            promise.resolve();
        } else {
            promise.reject();
        }
    }, seconds * 1000);
    return promise;
}

const p = myTimeout(3);

const log = () => {
    console.log("FIN");
};
p.addSuccess(log);
p.addError(() => {
    console.error("Error");
});
