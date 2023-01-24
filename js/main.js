import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

const info = document.querySelector('.info');
const about = document.querySelector('.about');
const splash = document.querySelector('.splash');
const closeAbout = document.querySelector('.bi-x-lg');
const main = document.querySelector('.main-content');
const buttons = document.querySelector('.buttons');
const returnHome = document.querySelector('.returnHome');
const article = document.querySelector('.article');
const close_article = document.querySelector('.close_article');
const article_frame = document.querySelector('.article_frame');
const close_window = document.querySelector('.exit');

const colors = [];

close_window.addEventListener('click', function () {
    window.open("index.html#", '_self').window.close();
});

info.addEventListener('click', function () {
    splash.style.cssText = 'animation: hideSplash 0.2s ease-in-out forwards;';
    about.style.cssText = 'display: flex; animation: showAbout 0.5s ease-in-out forwards;';
}, false);
closeAbout.addEventListener('click', function () {
    splash.style.cssText = 'animation: showSplash 0.5s ease-in-out forwards;';
    about.style.cssText = 'animation: hideAbout 0.2s ease-in-out forwards;';
}, false);

const start = document.querySelector('.start');
start.addEventListener('click', function () {
    main.style.cssText = 'display: none';
    buttons.style.display = 'flex';
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    showBrain();
}, false);

returnHome.addEventListener('click', function () {
    document.getElementsByTagName('canvas').innerHTML = '';
    main.style.display = 'block';
});


class edgeLine {
    constructor(x, y, z, color, scene, gltf, name) {
        this.x = x; this.y = y; this.z = z, this.color = color; this.scene = scene, this.gltf = gltf;
        this.name = name;
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const geometry = new THREE.BoxGeometry(size.x, size.x, size.x);
        const material = new THREE.MeshBasicMaterial({ color: this.color, opacity: 0.3, transparent: true });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        cube.position.set(this.x, this.y, this.z);
        cube.userData.name = this.name;
        const edgesGeometry = new THREE.EdgesGeometry(cube.geometry, 40);
        for (let i = 0; i < edgesGeometry.attributes.position.count; i++) {
            colors.push(0, 0, 0);
        }
        edgesGeometry.setAttribute(
            "color",
            new THREE.Float32BufferAttribute(colors, 3)
        );
        const edgesMaterial = new THREE.LineBasicMaterial({
            vertexColors: true
        });
        const line = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        cube.add(line);
    }
}

const showBrain = () => {
    /*---------------Scene and render---------------*/
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const pointer = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    let clicked = new THREE.Object3D();
    let intersected;

    /*---------------Camera---------------*/
    const camera = new THREE.PerspectiveCamera(69, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2.5;

    /*---------------Controls---------------*/
    const controls = new OrbitControls(camera, renderer.domElement);

    /*---------------3D Objects---------------*/
    let mixer;
    let robot, robot2, robot3, robot4, robot5, robot6;

    const brain = new GLTFLoader();
    brain.load('./assets/3D/scene.gltf', (gltf) => {
        console.log(gltf);
        robot = gltf.scene;
        mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });
        gltf.scene.position.set(0, -0.5, 0);
        scene.add(gltf.scene);
    });
    const infoBlue = new GLTFLoader();
    infoBlue.load('./assets/button3d/scene.gltf', (gltf) => {
        robot2 = gltf.scene;
        gltf.scene.position.set(0, 0.65, 0.5);
        robot2.scale.set(0.03, 0.03, 0.03);
        scene.add(gltf.scene);
        const edge = new edgeLine(0, 0.65, 0.5, 0x0a6157, scene, gltf, 'front');
    });
    const infoYellow = new GLTFLoader();
    infoYellow.load('./assets/button3d/scene.gltf', (gltf) => {
        robot3 = gltf.scene;
        gltf.scene.position.set(0, 0.55, -0.55);
        robot3.scale.set(0.03, 0.03, 0.03);
        scene.add(gltf.scene);
        const edge = new edgeLine(0, 0.55, -0.55, 0xc2bc0e, scene, gltf, 'top');
    });
    const infoBrown = new GLTFLoader();
    infoBrown.load('./assets/button3d/scene.gltf', (gltf) => {
        robot4 = gltf.scene;
        gltf.scene.position.set(0, -0.30, -0.65);
        robot4.scale.set(0.03, 0.03, 0.03);
        scene.add(gltf.scene);
        const edge = new edgeLine(0, -0.30, -0.65, 0x2e0d08, scene, gltf, 'underback');
    });
    const infoRed = new GLTFLoader();
    infoRed.load('./assets/button3d/scene.gltf', (gltf) => {
        robot5 = gltf.scene;
        gltf.scene.position.set(0, 0.03, -0.77);
        robot5.scale.set(0.03, 0.03, 0.03);
        scene.add(gltf.scene);
        const edge = new edgeLine(0, 0.03, -0.77, 0x690505, scene, gltf, 'back');
    });
    const infoGreen = new GLTFLoader();
    infoGreen.load('./assets/button3d/scene.gltf', (gltf) => {
        console.log(gltf);
        robot6 = gltf.scene;
        gltf.scene.position.set(0, -0.18, 0.40);
        robot6.scale.set(0.03, 0.03, 0.03);
        scene.add(gltf.scene);
        const edge = new edgeLine(0, -0.18, 0.40, 0x0a840b, scene, gltf, 'bottom');
    });

    /*---------------Lights---------------*/
    // Top
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 20, 0);
    scene.add(light);

    // Bottom
    const light2 = new THREE.PointLight(0xffffff, 1, 100);
    light2.position.set(0, -20, 0);
    scene.add(light2);

    // Back
    const light3 = new THREE.PointLight(0xffffff, 1, 100);
    light3.position.set(0, 0, -20);
    scene.add(light3);

    //Front
    const light4 = new THREE.PointLight(0xffffff, 1, 100);
    light4.position.set(0, 0, 20);
    scene.add(light4);

    let clock = new THREE.Clock();

    /*---------------Animate---------------*/
    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.003;
        if (robot && robot2 && robot3 && robot4 && robot5 && robot6) {
            robot2.rotation.y += 0.04;
            robot3.rotation.y += 0.04;
            robot4.rotation.y += 0.04;
            robot5.rotation.y += 0.04;
            robot6.rotation.y += 0.04;
        }
        render();
    }
    animate();
    var xSpeed = 0.0001;
    var ySpeed = 0.0001;

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 87) {
            robot.position.y += ySpeed;
        } else if (keyCode == 83) {
            robot.position.y -= ySpeed;
        } else if (keyCode == 65) {
            robot.position.x -= xSpeed;
        } else if (keyCode == 68) {
            robot.position.x += xSpeed;
        } else if (keyCode == 32) {
            robot.position.set(0, 0, 0);
        }
    };
    const setLineColor = (color) => {
        for (let i = -1; i < 24; i++) {
            intersected.geometry.attributes.color.set(i, color.r, color.g, color.b);
            intersected.geometry.attributes.color.setXYZ(i + 1, color.r, color.g, color.b);
        }
        intersected.geometry.attributes.color.needsUpdate = true;
        console.log(intersected.geometry.attributes.color);
    };
    document.addEventListener('mousemove', function (event) {
        onPointerClick(event);
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            if (intersected != intersects[0].object) {
                if (intersected) {
                    setLineColor(new THREE.Color("black"));
                }
                intersected = intersects[0].object.children[0];
                document.body.style.cursor = 'pointer';
                setLineColor(new THREE.Color("aqua"));
                console.log(intersects[0].object.userData.name);
            }
        } else {
            if (intersected) {
                setLineColor(new THREE.Color("black"));
                document.body.style.cursor = 'auto';
            }
            intersected = null;
        }
    }, false);
    document.addEventListener('mousemove', function (event) {
        onPointerClick(event);
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            if (intersected != intersects[0].object) {
                if (intersected) {
                    setLineColor(new THREE.Color("black"));
                }
                intersected = intersects[0].object.children[0];
                document.body.style.cursor = 'pointer';
                setLineColor(new THREE.Color("aqua"));
            }
        } else {
            if (intersected) {
                setLineColor(new THREE.Color("black"));
                document.body.style.cursor = 'auto';
            }
            intersected = null;
        }
    }, false);
    window.addEventListener('click', function (event) {
        onPointerClick(event);
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            if (intersected != intersects[0].object) {
                console.log(intersects[0].object.userData.name);
                switch (intersects[0].object.userData.name) {
                    case 'front':
                        article_frame.src = 'https://pl.wikipedia.org/wiki/P%C5%82at_czo%C5%82owy';
                        break;
                    case 'top':
                        article_frame.src = 'https://pl.wikipedia.org/wiki/P%C5%82at_ciemieniowy';
                        break;
                    case 'back':
                        article_frame.src = 'https://pl.wikipedia.org/wiki/P%C5%82at_potyliczny';
                        break;
                    case 'underback':
                        article_frame.src = 'https://pl.wikipedia.org/wiki/M%C3%B3%C5%BCd%C5%BCek';
                        break;
                    case 'bottom':
                        article_frame.src = 'https://pl.wikipedia.org/wiki/P%C5%82at_skroniowy';
                        break;
                }
                article.style.display = 'flex';
                document.body.style.cssText = 'display: flex; flex-direction: row';
                camera.aspect = (window.innerWidth - 500) / window.innerHeight;
                camera.updateProjectionMatrix();
            }
        }
    }, false);
    function onPointerClick(event) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        console.log(pointer);
    }
    function render() {
        renderer.setClearColor(0x949494);
        renderer.render(scene, camera);
    }
    close_article.addEventListener('click', function () {
        document.body.style.cssText = 'display: block;';
        article.style.display = 'none';
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }, false);
}