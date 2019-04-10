const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const context = canvas.getContext("2d");

class Helper {
    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

class Sort {
    static async bubbleSort() {
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < values.length - i - 1; j++) {
                if (values[j] > values[j + 1]) {
                    [values[j], values[j + 1]] = [values[j + 1], values[j]]
                    k1 = j + 1;

                    visualizeBubble();
                    await Helper.sleep(50);
                }
            }

            k2 = values.length - i - 1;
        }
    }

    static async selectionSort() {

        for (let i = 0; i < values.length - 1; i++) {
            let min = i;
            let f = false;

            k1 = i;

            for (let j = i + 1; j < values.length; j++) {
                if (values[j] < values[min]) {
                    min = j;
                    f = true;
                }

                k2 = j;
                k3 = min;

                visualizeSelection();
                await Helper.sleep(30);
            }
            if (f) [values[i], values[min]] = [values[min], values[i]];
        }
    }

    static async insertionSort() {

        for (let i = 1; i < values.length; i++) {
            k1 = i;
            for (let j = i; j > 0; j--) {
                if (values[j] < values[j - 1])
                    [values[j], values[j - 1]] = [values[j - 1], values[j]];
                else break;

                k2 = j - 1;

                visualizeInsertion();
                await Helper.sleep(250);
            }
        }
    }

    static async MaxHeapify(index: number, heapsize: number) {

        let i = index;
        let largest: number;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        let notheapified = true;

        while (notheapified) {
            l = 2 * i + 1;
            r = 2 * i + 2;
            notheapified = false;
            if (l < heapsize && values[l] > values[i]) {
                notheapified = true;
                largest = l;
            }
            else
                largest = i;
            if (r < heapsize && values[r] > values[largest]) {
                notheapified = true;
                largest = r;
            }

            if (largest != i) {
                [values[i], values[largest]] = [values[largest], values[i]];
            }

            i = largest;
        }
    }

    static async BuildMaxHeap() {
        for (let i = values.length / 2 - 1; i >= 0; i--)
            this.MaxHeapify(i, values.length);
    }

    static async HeapSort() {

        this.BuildMaxHeap();

        let Hs = values.length;
        for (let i = values.length - 1; i > 0; i--) {
            k1 = i;

            [values[0], values[i]] = [values[i], values[0]];

            Hs = Hs - 1;
            this.MaxHeapify(0, Hs);

            visualizeHeap();
            await Helper.sleep(100);

        }
    }

    static async partioning(first: number, last: number) {
        pivot = values[last];

        let temp: number;
        let i = first - 1;

        for (let j = first; j < last; j++) {
            if (values[j] <= pivot) {
                i++;
                [values[i], values[j]] = [values[j], values[i]];
            }
        }

        [values[i + 1], values[last]] = [values[last], values[i + 1]];
        pivot = i + 1;
    }

    static async quickSort(first: number, last: number) {

        visualizeBubble();
        await Helper.sleep(500);

        if (first < last) {

            this.partioning(first, last);
            k1 = pivot;
            this.quickSort(first, pivot - 1);
            this.quickSort(pivot + 1, last);
        }
    }
}

/*************************************************************/

let values: number[] = new Array(80);
let k1: number;
let k2: number;
let k3: number;
let k4: number;

let pivot: number;


function onBubbleClick() {
    window.location.hash = 'bubble';
    window.location.reload();
}
function onSelectioClick() {
    window.location.hash = 'selection';
    window.location.reload();
}
function onInsertionClick() {
    window.location.hash = 'insertion';
    window.location.reload();
}
function onQuickClick() {
    window.location.hash = 'quick';
    window.location.reload();
}
function onHeapClick() {
    window.location.hash = 'heap';
    window.location.reload();
}

/*************************************************************/

document.addEventListener("DOMContentLoaded", function (event) {
    for (let i = 0; i < values.length; i++)
        values[i] = Helper.getRandomInt(0, 450);

    if (window.location.hash == "#bubble") Sort.bubbleSort();
    if (window.location.hash == "#selection") Sort.selectionSort();
    if (window.location.hash == "#insertion") Sort.insertionSort();
    if (window.location.hash == "#heap") Sort.HeapSort();
    if (window.location.hash == "#quick") Sort.quickSort(0, 80);
});

/*************************************************************/


function visualizeBubble() {

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let position = 0;
    context.fillStyle = 'rgba(54, 162, 235, 1)';

    for (let k = 0; k < values.length; k++) {
        if (k == k1) context.fillStyle = 'rgba(255, 206, 86, 1)';
        if (k >= k2) context.fillStyle = 'rgba(255, 206, 86, 1)';
        context.fillRect(position + 1, 450, 8, - values[k]);
        position += 10;
        context.fillStyle = 'rgba(54, 162, 235, 1)';
    }
}

function visualizeSelection() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let position = 0;

    for (let k = 0; k < values.length; k++) {
        if (k == k2) context.fillStyle = 'rgba(255, 206, 86, 1)';
        else if (k == k3) context.fillStyle = 'rgba(255, 99, 132, 1)';
        else if (k < k1) context.fillStyle = 'rgba(255, 206, 86, 1)';
        else context.fillStyle = 'rgba(54, 162, 235, 1)';

        context.fillRect(position + 1, 450, 8, - values[k]);
        position += 10;
    }
}

function visualizeInsertion() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let position = 0;

    for (let k = 0; k < values.length; k++) {
        if (k == k2) {
            context.fillStyle = 'rgba(255, 99, 132, 1)';
        }
        else if (k < k1) {
            context.fillStyle = 'rgba(255, 206, 86, 1)';
        }
        else {
            context.fillStyle = 'rgba(54, 162, 235, 1)';
        }

        context.fillRect(position + 1, 450, 8, - values[k]);
        position += 10;
    }
}

function visualizeHeap() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let position = 0;

    for (let k = 0; k < values.length; k++) {

        if (k == 0) {
            context.fillStyle = 'rgba(255, 99, 132, 1)';
        }

        else if (k > k1) {
            context.fillStyle = 'rgba(255, 206, 86, 1)';
        }
        else {
            context.fillStyle = 'rgba(54, 162, 235, 1)';
        }

        context.fillRect(position + 1, 450, 8, - values[k]);
        position += 10;
    }
}