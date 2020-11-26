// variable que reconoce el tag a-scene para poder interactuar con el DOM
var scene = document.querySelector('a-scene');

var button = document.querySelector('a-ui-button');
// console.log('Atributtes: '+button.getAttribute('text-value'));
button.addEventListener('click',click);
function click(){
    console.log('Atributtes: '+button.getAttribute('text-value'));
}



// variable que reconoce el tag a-text para poder enviar mensajes
// var text = document.querySelector('a-text');
//console.log(text.localName);

(function start() {
    if (!scene.hasLoaded) {
        scene.addEventListener('loaded', start);
        return;
    }

    var prefix = window.location.host.split('.')[0] + '-';
    var currentUrl = new URL(window.location);
    var roomName = currentUrl.search.substr(1);

    // Asignacion del nombres de la aula virtual
    if (!roomName) {
        roomName = prefix + Date.now();
        currentUrl.search = roomName;
        console.log('Room name: ' + roomName);
        history.pushState({}, '', currentUrl.href);
    }

    // variable que reconoce el componente sharedspace para poder interactuar con el DOM
    // y permite que se puedan conmunicar con en un chat normal
    var room = document.querySelector('[sharedspace]');

    // Verificacion de si ha ingresado un nuevo participante
    room.addEventListener('enterparticipant', function (evt) {
        var detail = evt.detail;
        alert("Un nuevo participante se ha unido a la sala!");
        console.log('Id: ' + detail.id);
        console.log('Position: ' + detail.position);
    });

    // Permite que un avatar pueda ser añadido al DOM
    room.addEventListener('avataradded', function onAdded(evt) {

        var avatar = evt.detail.avatar;
        if (!avatar.hasLoaded) {
            avatar.addEventListener('loaded', onAdded.bind(null, evt));
            return;
        }

        // Configuración de posición para los avatares(usuarios) que se vayan uniendo a la sala
        // NOTA: cada que ingresa un participante todos los participantes son ordenados nuevamente, y se vuelve
        // a calcular las posiciones para que no existan superposiones
        var avatarY = avatar.getAttribute('position').y;
        avatar.object3D.lookAt(new THREE.Vector3(0, avatarY, 0));

        var radToDeg = THREE.Math.radToDeg;
        var rotation = avatar.object3D.rotation;
        rotation.y += Math.PI;

        avatar.setAttribute('rotation', {
            x: radToDeg(rotation.x),
            y: radToDeg(rotation.y),
            z: radToDeg(rotation.z)
        });
    });


    var presets = [
        'contact', 'egypt', 'checkerboard', 'forest',
        'goaland', 'yavapai', 'goldmine', 'threetowers',
        'poison', 'arches', 'tron', 'japan',
        'dream', 'volcano', 'starry', 'osiris'
    ];

    var btsndmssg = document.getElementById('btsndmssg');
    console.log('Button: '+btsndmssg);

    btsndmssg.addEventListener('click',myFunction);
    var messages = '';
    function myFunction() {
        messages  = document.getElementById("message").value;
        console.log('Messages: '+ messages);
        var message = sendMessage();
        setText(message);
        room.components.sharedspace.send('*', { type: 'text', value: message});
    }

    // Seleccionamos el environment tag para poder modificarlo
    var environment = document.querySelector('[environment]');

    console.log('Environment: ' + environment.getAttribute('environment').preset);

    // Función que permite setear un nuevo preset
    function setEnvironment(preset) {
        console.log('setEnvironment');
        environment.setAttribute('environment', { preset: preset });
    }

    // Seleccionamos el text tag para poder modificarlo
    var text = document.querySelector('[text]');
    console.log('Text: ' + text.getAttribute('text').value);

    // Función que permite setear un nuevo preset
    function setText(message) {
        console.log('setText');
        console.log('Messages: '+ messages);
        text.setAttribute('text', { value: message });
    }


    function getNextPreset() {
        var currentPreset = environment.getAttribute('environment').preset;
        var index = presets.indexOf(currentPreset);
        console.log(presets[(index + 1)]);
        return presets[(index + 1)];
    }

    function sendMessage() {
        var currentMessage = text.getAttribute('text').value;
        return currentMessage+messages;
    }


    window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 17 /* Ctrl-left */) {
            var preset = getNextPreset();
            setEnvironment(preset);
            room.components.sharedspace.send('*', { type: 'environment', preset: preset});
            //text.setAttribute('value','cabez mapa');
        }
    });

    room.addEventListener('participantmessage', function (evt) {
        if (evt.detail.message.type === 'environment') {
            var preset = evt.detail.message.preset;
            setEnvironment(preset);
        }

        if (evt.detail.message.type === 'text') {
            var message = evt.detail.message.value;
            setText(message);
        }
    });
    room.setAttribute('sharedspace', { room: roomName, hold: false });


}());