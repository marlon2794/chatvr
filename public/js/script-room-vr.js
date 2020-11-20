console.log('Conectado...');
var scene = document.querySelector('a-scene');
var text = document.querySelector('a-text');
text.setAttribute('asdasd');
console.log(text.localName);
console.log(text.attributes);
console.log(text.tagName);
console.log(text.attributes.item(0));
text.setAttribute('value','hellofriend');

(function start() {
    if (!scene.hasLoaded) {
        scene.addEventListener('loaded', start);
        return;
    }

    var prefix = window.location.host.split('.')[0] + '-';
    var currentUrl = new URL(window.location);
    var roomName = currentUrl.search.substr(1);

    if (!roomName) {
        roomName = prefix + Date.now();
        currentUrl.search = roomName;
        history.pushState({}, '', currentUrl.href);
    }

    var room = document.querySelector('[sharedspace]');

    room.addEventListener('enterparticipant', function (evt) {
        var detail = evt.detail;
        console.log('Id: ' + detail.id);
        console.log('Position: ' + detail.position);
    });

    room.addEventListener('avataradded', function onAdded(evt) {

        var avatar = evt.detail.avatar;
        if (!avatar.hasLoaded) {
            avatar.addEventListener('loaded', onAdded.bind(null, evt));
            return;
        }

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
    var environment = document.querySelector('[environment]');

    function setEnvironment(preset) {
        environment.setAttribute('environment', { preset: preset });
    }

    function getNextPreset() {
        var currentPreset = environment.getAttribute('environment').preset;
        var index = presets.indexOf(currentPreset);
        console.log(presets[(index + 1)]);
        return presets[(index + 1)];
    }

    window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 32 /* spacebar */) {
            var preset = getNextPreset();
            setEnvironment(preset);
            room.components.sharedspace.send('*', { type: 'environment', preset: preset});
            room.components.sharedspace.send('*', { type: 'a-text', value: 'Hello Friend'});
            text.setAttribute('value','cabez mapa');
        }
    });

    room.addEventListener('participantmessage', function (evt) {
        if (evt.detail.message.type === 'environment') {
            var preset = evt.detail.message.preset;
            setEnvironment(preset);
        }
    });


    room.setAttribute('sharedspace', { room: roomName, hold: false });


}());