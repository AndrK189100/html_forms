/**
 * @jest-environment jsdom
 */

import Informer from "../js/informer/informer";

test('must show informer on click button', () => {

    document.body.innerHTML = '<button class="button1" data-toggle="informer" data-header="Кнопка 1" data-body="Это кнопка 1 по клику, событие по умолчанию">CLICK1</button>';
         
    Informer.init();

    const button = document.querySelector('.button1');
    button.click();

    const element = !document.querySelector('.informer');
    
     expect(element).toBe(false);

})

test('must hide informer on double click button', () => {
    
    document.body.innerHTML = '<button class="button1" data-toggle="informer" data-header="Кнопка 1" data-body="Это кнопка 1 по клику, событие по умолчанию">CLICK1</button>';
         
    Informer.init();

    const button = document.querySelector('.button1');
    button.click();
    button.click();

    const element = !document.querySelector('.informer');

    expect(element).toBe(true);

})