class Options {
    constructor (height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    createDiv (text) {
        let div = document.createElement('div');
        div.textContent = text;
        this.cssText(div);
        document.body.appendChild(div);
    }

    cssText (elem) {
        elem.style.height = this.height;
        elem.style.width = this.width;
        elem.style.background = this.bg;
        elem.style.fontSize = this.fontSize;
        elem.style.textAlign = this.textAlign;
    }
}

let opt = new Options('50px', '100px', '#ff00ff', '18px', 'center');
opt.createDiv('This is my DIV element');