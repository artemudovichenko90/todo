'use strict';
const state = [];
const form = document.getElementById('rootForm')
const list = document.getElementById('list');
const pattern = /^[A-Z][a-z]{1,12}/

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { target, target: { elements: { inputText } } } = e;
  const inputValue = inputText.value.trim();
  if (pattern.test(inputValue) ?? !state.includes(inputValue)) {
    state.push(inputValue);
    target.reset();
    render(inputValue);
  }
});

function render(inputValue) {
  const li = createElement('li', { classNames: ['item'] },
    document.createTextNode(inputValue));
  const btn = createElement('button', { typeEvent: 'click', handlerEvent: deleteHandler.bind(li), dataValue: inputValue },
    document.createTextNode('X'));
  li.append(btn);
  list.append(li);
}

function deleteHandler({ target }) {
  state.splice(state.indexOf(target.dataset.idValue), 1);
  this.remove();
}


function createElement(tag, { classNames = [], typeEvent = '', handlerEvent = null, dataValue = '' }, ...children) {
  const element = document.createElement(tag);
  if (classNames.length) {
    element.classList.add(...classNames);
  }
  if (handlerEvent) {
    element.addEventListener(typeEvent, handlerEvent);
  }
  if (dataValue) {
    element.dataset.idValue = dataValue;
  }
  element.append(...children);
  return element;

}