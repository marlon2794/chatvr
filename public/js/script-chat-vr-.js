var hideButton = document.querySelector('.hide');
var instructions = document.querySelector('.instructions');
hideButton.onclick = function (evt) {
    instructions.classList.toggle('hidden');
    this.textContent = instructions.classList.contains('hidden') ? 'Show': 'Hide';
    return false;
};

var scene = document.querySelector('a-scene');
var room = document.querySelector('[sharedspace]');
var table = document.querySelector('.table');

// Make the avatar to look at the center of the table.
room.addEventListener('avataradded', function onAdded(evt) {

    // Fixing should happen after the avatar fully loads.
    // Only then, it is safe to alter the avatars components.
    var avatar = evt.detail.avatar;
    if (!avatar.hasLoaded) {
        avatar.addEventListener('loaded', onAdded.bind(null, evt));
        return;
    }

    var tablePosition = table.getAttribute('position');
    var avatarY = avatar.getAttribute('position').y;
    avatar.object3D.lookAt(new THREE.Vector3(
        tablePosition.x, avatarY, tablePosition.z
    ));

    // It is not enough to modify the underlaying Three object. It is
    // neccessary to use the A-Frame API for the sharedspace component to
    // be able of serialize the rotation correctly.
    var radToDeg = THREE.Math.radToDeg;
    var rotation = avatar.object3D.rotation;
    rotation.y += Math.PI;

    avatar.setAttribute('rotation', {
        x: radToDeg(rotation.x),
        y: radToDeg(rotation.y),
        z: radToDeg(rotation.z)
    });

});

// Create a new room or join one.
let roomName = window.location.search.substr(1);
if (!roomName) {
    roomName = 'room-' + Date.now();
    console.log('Room name: '+ roomName);
    console.log('Link Room: '+ window.location + '?' + roomName);
    history.pushState({}, '', window.location + `?${roomName}`);
}
else {
    hideButton.click();
}
connect();

function connect() {
    if (!scene.hasLoaded) {
        scene.addEventListener('loaded', connect);
        return;
    }
    room.setAttribute('sharedspace', { room: roomName, hold: false });
}

// Select link on click.
var link = document.querySelector('.link');
link.textContent = window.location.href;
link.onclick = function () {
    var range = document.createRange();
    range.selectNode(link);
    var selection = document.getSelection();
    selection.empty();
    selection.addRange(range);
};