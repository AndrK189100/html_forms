import "./informer.css"

export default class Informer {

    static #informerId = 1;
    static #events = {click: 'click', hoover: 'hoover',};

    static #informerTemplate = `<div class="informer" id="informer0">` +
    `<div class="arrow"></div>` +
    `<h3 class="informer-header"></h3>` +
    `<div class="informer-body"></div></div>`;

    static init() {

        this.showHideInformerClick = this.showHideInformerClick.bind(this);
        this.showInformerMouseOver = this.showInformerMouseOver.bind(this);
        this.hideInformerMouseOut = this.hideInformerMouseOut.bind(this);

        const elements = document.body.querySelectorAll("[data-toggle='informer']");

        const addedEvents = new Set();

        elements.forEach(element => {
            element.dataset.informerid = 'informer' + this.#informerId;
            this.#informerId += 1;

            const env = this.#events[element.dataset.env];

            switch(env) {
                case 'click': {
                    if(!addedEvents.has('click')) {
                        document.addEventListener('click', Informer.showHideInformerClick);
                        addedEvents.add('click');
                    }
                    break;
                }
                case 'hoover': {
                    if(!addedEvents.has('hoover')) {
                        document.addEventListener('mouseover', Informer.showInformerMouseOver);
                        document.addEventListener('mouseout', Informer.hideInformerMouseOut);
                        addedEvents.add('hoover');
                    }
                    break;
                }
                default: {
                    if(!addedEvents.has('hoover')) {
                        document.addEventListener('click', Informer.showHideInformerClick);
                        addedEvents.add('click');
                    }
                    break;
            }
           }
        });
    }

    static showHideInformerClick(event) {

        const target = event.target;

        if((target.dataset.toggle === 'informer' && target.dataset.env === 'click') ||
        target.dataset.toggle === 'informer' && !target.dataset.env) {

            const informerId = target.dataset.informerid;
            
            let elementInformer = document.getElementById(informerId);

            if (!elementInformer) {
                document.body.insertAdjacentHTML('beforeend', this.#informerTemplate);
                elementInformer = document.getElementById('informer0');
                elementInformer.setAttribute('id', informerId);
                elementInformer.querySelector('.informer-header').innerHTML = target.dataset.header ? target.dataset.header : '' ;
                elementInformer.querySelector('.informer-body').innerHTML = target.dataset.body ? target.dataset.body : 'укажите data атрибут body';
                            
                const {left, top} = this.#calcCoordinate(target, elementInformer);
                elementInformer.style.left = left;
                elementInformer.style.top = top;
                            
            }
            else {
                elementInformer.remove();
            }
        }
    }

    static showInformerMouseOver(event) {

        const target = event.target;

        if(target.dataset.toggle === 'informer' && target.dataset.env === 'hoover') {

            const informerId = event.target.dataset.informerid;
                    
            document.body.insertAdjacentHTML('beforeend', this.#informerTemplate);
            const elementInformer = document.getElementById('informer0');
            elementInformer.setAttribute('id', informerId);
            elementInformer.querySelector('.informer-header').innerHTML = target.dataset.header ? target.dataset.header : '' ;
            elementInformer.querySelector('.informer-body').innerHTML = target.dataset.body ? target.dataset.body : 'укажите data атрибут body';

            const {left, top} = this.#calcCoordinate(target, elementInformer);
            elementInformer.style.left = left;
            elementInformer.style.top = top;
        }

    }

    static hideInformerMouseOut(event) {
        const target = event.target;
        
        if(target.dataset.toggle === 'informer' && target.dataset.env === 'hoover') {
            document.getElementById(event.target.dataset.informerid).remove();
        }
    }

    static #calcCoordinate(initiator, element) {
        const domRectInitiator = initiator.getBoundingClientRect();
        const domRectElement = element.getBoundingClientRect();
        return {left: domRectInitiator.left + domRectInitiator.width / 2 - domRectElement.width / 2 +'px', 
                top: domRectInitiator.top - domRectElement.height - 10 + 'px'}  
    }
}