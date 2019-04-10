const canvass = document.getElementById("canvas");
const contextt = canvass.getContext("2d");
class Helperr {
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
class Sortt {
    static bubbleSort(values) {
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < values.length - i - 1; j++) {
                if (values[j] > values[j + 1]) {
                    [values[j], values[j + 1]] = [values[j + 1], values[j]];
                }
            }
        }
    }
    static selectionSort(arr, compare_Function) {
        function compare(a, b) {
            return a - b;
        }
        var min = 0;
        var index = 0;
        var temp = 0;
        compare_Function = compare_Function || compare;
        for (var i = 0; i < arr.length; i += 1) {
            index = i;
            min = arr[i];
            for (var j = i + 1; j < arr.length; j += 1) {
                if (compare_Function(min, arr[j]) > 0) {
                    min = arr[j];
                    index = j;
                }
            }
            temp = arr[i];
            arr[i] = min;
            arr[index] = temp;
        }
        return arr;
    }
    static quicksort(values) {
        if (values.length == 0)
            return [];
        var left = [], right = [], pivot = values[0];
        for (var i = 1; i < values.length; i++) {
            if (values[i] < pivot)
                left.push(values[i]);
            else
                right.push(values[i]);
        }
        return this.quicksort(left).concat(pivot, this.quicksort(right));
    }
    static insertionSort(values) {
        for (var i = 1; i < values.length; i++) {
            if (values[i] < values[0])
                values.unshift(values.splice(i, 1)[0]);
            else if (values[i] > values[i - 1])
                continue;
            else {
                for (var j = 1; j < i; j++) {
                    if (values[i] > values[j - 1] && values[i] < values[j])
                        values.splice(j, 0, values.splice(i, 1)[0]);
                }
            }
        }
        return values;
    }
    static heap_root(input, i) {
        var left = 2 * i + 1;
        var right = 2 * i + 2;
        var max = i;
        if (left < this.array_length && input[left] > input[max]) {
            max = left;
        }
        if (right < this.array_length && input[right] > input[max]) {
            max = right;
        }
        if (max != i) {
            this.swap(input, i, max);
            this.heap_root(input, max);
        }
    }
    static swap(input, index_A, index_B) {
        var temp = input[index_A];
        input[index_A] = input[index_B];
        input[index_B] = temp;
    }
    static heapSort(values) {
        this.array_length = values.length;
        for (var i = Math.floor(this.array_length / 2); i >= 0; i -= 1) {
            this.heap_root(values, i);
        }
        for (i = values.length - 1; i > 0; i--) {
            this.swap(values, 0, i);
            this.array_length--;
            this.heap_root(values, 0);
        }
    }
    static mergeSort(values) {
        if (values.length == 1)
            return values;
        let mid = values.length / 2;
        let left = values.slice(0, mid);
        let right = values.slice(mid);
        left = this.mergeSort(left);
        right = this.mergeSort(right);
        return this.merge(left, right);
    }
    static merge(left, right) {
        var result = [];
        var leftIndex = 0;
        var rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] > right[rightIndex]) {
                result.push(right[rightIndex]);
                rightIndex++;
            }
            else {
                result.push(left[leftIndex]);
                leftIndex++;
            }
        }
        while (leftIndex < left.length) {
            result.push(left[leftIndex]);
            leftIndex++;
        }
        while (rightIndex < right.length) {
            result.push(right[rightIndex]);
            rightIndex++;
        }
        return result;
    }
}
function onBubbleClickk() {
    window.location.hash = 'bubble';
    window.location.reload();
}
function onSelectioClickk() {
    window.location.hash = 'selection';
    window.location.reload();
}
function onInsertionClickk() {
    window.location.hash = 'insertion';
    window.location.reload();
}
function onQuickClickk() {
    window.location.hash = 'quick';
    window.location.reload();
}
function onHeapClickk() {
    window.location.hash = 'heap';
    window.location.reload();
}
function onMergeClickk() {
    window.location.hash = 'merge';
    window.location.reload();
}
/*************************************************************/
document.addEventListener("DOMContentLoaded", function (event) {
    let max = 1000;
    let lengthes = new Array(15);
    let results = new Array(15);
    let values;
    for (let i = 0; i < lengthes.length; i++) {
        values = new Array(max);
        for (let i = 0; i < values.length; i++)
            values[i] = Helperr.getRandomInt(0, 10000);
        let t0 = performance.now();
        if (window.location.hash == "#bubble")
            Sortt.bubbleSort(values);
        if (window.location.hash == "#selection")
            Sortt.selectionSort(values, function (a, b) { return a - b; });
        if (window.location.hash == "#insertion")
            Sortt.insertionSort(values);
        if (window.location.hash == "#heap")
            Sortt.heapSort(values);
        if (window.location.hash == "#quick")
            Sortt.quicksort(values);
        if (window.location.hash == "#merge")
            Sortt.mergeSort(values);
        let t1 = performance.now();
        lengthes[i] = max;
        results[i] = Math.floor(t1 - t0);
        max += 2000;
    }
    let data = {
        labels: lengthes,
        datasets: [
            {
                label: "Sorting Results",
                data: results,
                borderColor: ['rgba(54, 162, 235, 1)'],
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                borderWidth: 2
            },
        ]
    };
    new Chart(canvass, {
        type: 'line',
        data: data,
        options: {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        }
    });
});
/*************************************************************/
