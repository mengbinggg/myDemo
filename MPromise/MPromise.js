const STATUS = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}

class MPromise {
    constructor(fn) {
        this.status = STATUS.PENDING;
        this.value = null;
        this.errMsg = null;
        this.onSuccessCallbacks = [];
        this.onFailCallbacks = [];

        try {
            fn(this.resolve, this.reject);
        }catch (err) {
            this.reject(err);
        }
    }

    resolve = data => {
        if(this.status == STATUS.PENDING) {
            this.status = STATUS.FULFILLED;
            this.value = data;
            this.onSuccessCallbacks.forEach(fn => fn());
        }
    }

    reject = err => {
        if(this.status == STATUS.PENDING) {
            this.status = STATUS.REJECTED;
            this.errMsg = err;
            this.onFailCallbacks.forEach(fn => fn());
        }
    }

    then(successCallback, failCallback) {
        if(this.status == STATUS.FULFILLED) {
            successCallback(this.value);
        }
        if(this.status == STATUS.REJECTED) {
            failCallback(this.errMsg);
        }
        if(this.status == STATUS.PENDING) {
            this.onSuccessCallbacks.push(() => successCallback(this.value));
            this.onFailCallbacks.push(() => failCallback(this.errMsg));
        }
    }
}