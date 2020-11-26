window.testButtonAction = function () {
    console.log("clicked GUI")
    var textView = document.querySelector('a-gui-label');
    // console.log('Loading text view...'+textView.getAttribute('a-gui-label').value);
    console.log('Loading text view...'+textView.getAttribute('value'));
    var keypressed = document.querySelector('a-gui-button');
    console.log('Key pressed: '+keypressed.tagName);
    console.log('Key pressed: '+keypressed.getAttributeNames());
    console.log('Key pressed: '+keypressed.getAttribute('value'));
    console.log('Key pressed: '+keypressed.attributes.item(3));
    console.log('Key pressed: '+keypressed.attributes.item(4));
    console.log('Key pressed: '+keypressed.attributes);

    textView.setAttribute('value',keypressed.getAttribute('value'));
}

window.testToggleAction = function () {
    console.log("clicked GUI");
}
