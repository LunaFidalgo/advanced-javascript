function debounce(fn, waitTime, immediate) {
    let timeout;
    return function(...args) {
        const later = () => {
            timeout = null;
            fn.apply(this, args);
        };
        const callNow = immediate && !timeout;
        if (callNow) {
            fn.apply(this, args);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(later, waitTime);
        }
    };
}
​
function add(num, num2) {
    console.log(num + num2);
}
​
const addDebounce = debounce(add, 1000);
​
debounce(1, 2 );
debounce(1, 2 );
debounce(1, 2 );
debounce(1, 2 );
debounce(1, 2 );
debounce(1, 2 );
debounce(1, 2 );
debounce(1, 2 );