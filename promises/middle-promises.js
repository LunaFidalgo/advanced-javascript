class Promise {
    constructor(fn) {
        this.status = "Pending";
        this.successCB = [];
        this.errorCB = [];
        fn(this.resolve.bind(this), this.reject.bind(this));
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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (seconds % 2 === 0) {
                resolve();
            } else {
                reject();
            }
        }, seconds * 1000);
    });
}

const p = myTimeout(3);

const log = () => {
    console.log("FIN");
};
p.addSuccess(log);
p.addError(() => {
    console.error("Error");
});
