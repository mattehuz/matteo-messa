const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');
const mediaOutput = document.getElementById('mediaO');
const minOutput = document.getElementById('minO');
const maxOutput = document.getElementById('maxO');

const numbers = [];

for (let i = 0; i < 100; i++) {
    numbers.push(Math.floor(Math.random() * 201) - 100);
}

let media = 0;

for (let i = 0; i < 100; i++) {
    media += numbers[i];
}

media = media / 100;

let min = numbers[0];
let max = numbers[0];

for (let i = 1; i < 100; i++) {
    if (numbers[i] < min) {
        min = numbers[i];
    }
    if (numbers[i] > max) {
        max = numbers[i];
    }
}

const numbers2 = [];

for (let i = 0; i < 100; i++) {
    if (numbers[i] > 50) {
        numbers2.push(numbers[i]);
    }
}

for (let i = 0; i < numbers.length; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = i;
    const td2 = document.createElement('td');
    td2.textContent = numbers[i];
    tr.appendChild(td1);
    tr.appendChild(td2);
    output1.appendChild(tr);
}

for (let i = 0; i < numbers2.length; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = i;
    const td2 = document.createElement('td');
    td2.textContent = numbers2[i];
    tr.appendChild(td1);
    tr.appendChild(td2);
    output2.appendChild(tr);
}

mediaOutput.textContent = `Media: ${media}`;
minOutput.textContent = `Min: ${min}`;
maxOutput.textContent = `Max: ${max}`;
