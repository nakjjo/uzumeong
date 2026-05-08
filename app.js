let currentAudio = null;
let rotationX = 0;
let rotationY = 0;
let zoomValue = 1000;
let translateX = 0;
let translateY = 0;
let prevDiff = -1;

window.onload = function() {
    setRandomBackground();
    init3DUniverse();
    setTimeout(removeLoading, 2500);
};

function setRandomBackground() {
    const bgLayer = document.getElementById('background-layer');
    const bgImages = ['space_image.jpg', 'image.jpg', 'you.png']; 
    const randomImg = bgImages[Math.floor(Math.random() * bgImages.length)];
    if(bgLayer) bgLayer.style.backgroundImage = `url('${randomImg}')`;
}

function init3DUniverse() {
    const viewer = document.getElementById('universe-viewer');
    const container = document.getElementById('stars-container');
    const bgLayer = document.getElementById('background-layer');

    for(let i=0; i<600; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const x = Math.random() * 4000 - 2000;
        const y = Math.random() * 4000 - 2000;
        const z = Math.random() * 4000 - 2000;
        star.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        container.appendChild(star);
    }

    const mainStars = [
        { name: '게 성운 (M1)', x: -800, y: -1800, z: -3000, color: '#00ced1', info: '1054년에 폭발한 초신성의 잔해입니다.' },
        { name: '고리 성운 (M57)', x: 1700, y: -1200, z: -2800, color: '#7fffd4', info: '우주의 눈동자처럼 보이는 성운입니다.' },
        { name: '고래자리 타우', x: -1100, y: -2900, z: -1800, color: '#ffffcc', info: '외계 생명체 탐사의 주요 대상인 별입니다.' },
        { name: '남십자자리 알파', x: -200, y: 3500, z: -2500, color: '#b0c4de', info: '남반구 하늘의 상징인 길잡이 별입니다.' },
        { name: '데네브', x: 1800, y: 200, z: -1800, color: '#ffffff', info: '태양보다 수만 배나 밝은 초거성입니다.' },
        { name: '데네볼라', x: 900, y: -100, z: -1200, color: '#ffffff', info: '사자자리의 꼬리에 해당하는 별입니다.' },
        { name: '레굴루스', x: 800, y: -200, z: -1400, color: '#ffffff', info: '사자자리의 심장이며, 왕을 상징하는 별입니다.' },
        { name: '리겔', x: 600, y: 1200, z: -1800, color: '#87ceeb', info: '태양보다 수만 배나 밝은 청색 초거성입니다.' },
        { name: '말머리 성운', x: 550, y: 850, z: -1700, color: '#4b0082', info: '오리온자리 근처의 유명한 암흑 성운입니다.' },
        { name: '메로페', x: -2100, y: -600, z: -1900, color: '#f0f8ff', info: '플레이아데스 성단의 일곱 자매 중 하나입니다.' },
        { name: '메르카크', x: 100, y: -2200, z: -900, color: '#ffffff', info: '북극성을 찾는 이정표가 되는 별입니다.' },
        { name: '미라', x: 200, y: -2800, z: -2500, color: '#ff6666', info: '밝기가 변하는 신기한 변광성입니다.' },
        { name: '미르파크', x: -1400, y: 2200, z: -1500, color: '#fffec8', info: '페르세우스자리에서 가장 밝은 별입니다.' },
        { name: '미차르', x: 2000, y: 2000, z: -3000, color: '#ffffff', info: '옛날 시력 검사 용도로 쓰였던 별입니다.' },
        { name: '민타카', x: 300, y: 400, z: -1300, color: '#ffffff', info: '오리온자리 삼태성 중 하나입니다.' },
        { name: '베가', x: 1500, y: -800, z: -2000, color: '#e6e6fa', info: '견우와 직녀 이야기 속 직녀성입니다.' },
        { name: '베텔게우스', x: 400, y: 600, z: -1500, color: '#ff6600', info: '조만간 폭발할 수도 있는 거대한 별입니다.' },
        { name: '벨라트릭스', x: 200, y: 500, z: -1400, color: '#b0e0e6', info: '여전사라는 뜻을 가진 푸른 별입니다.' },
        { name: '북극성', x: 0, y: -2000, z: -500, color: '#fffec8', info: '지구 자전축 바로 위에 위치한 길잡이 별입니다.' },
        { name: '사비크', x: 1200, y: 1500, z: -2100, color: '#ffffff', info: '땅꾼자리의 무릎 부근에서 빛나는 별입니다.' },
        { name: '셰다르', x: -1900, y: 2800, z: -1200, color: '#ffcc99', info: '카시오페이아자리의 W자 모양 중 하나입니다.' },
        { name: '스피카', x: -700, y: -2500, z: -2000, color: '#b0e0e6', info: '처녀자리의 이삭에 해당하는 깨끗한 별입니다.' },
        { name: '시리우스', x: -800, y: 400, z: -1200, color: '#ffffff', info: '밤하늘에서 가장 밝은 별입니다.' },
        { name: '아르크투루스', x: -1800, y: -1200, z: -1500, color: '#ffcc99', info: '봄철 대곡선의 중심을 잡는 오렌지색 별입니다.' },
        { name: '안드로메다 은하', x: 2500, y: -1000, z: -4000, color: '#ffccff', info: '우리 은하와 가장 가까운 거대 은하입니다.' },
        { name: '안타레스', x: -500, y: 1800, z: -2500, color: '#ff4500', info: '전갈자리의 심장에 해당하는 붉은 별입니다.' },
        { name: '알골', x: -1100, y: 1900, z: -1600, color: '#ffffff', info: '마왕의 별이라 불리는 변광성입니다.' },
        { name: '알데바란', x: -1200, y: -300, z: -1000, color: '#ff8c00', info: '황소자리의 눈에 해당하는 붉은 별입니다.' },
        { name: '알비레오', x: 2100, y: 500, z: -1900, color: '#ffd700', info: '금색과 푸른색이 함께 있는 이중성입니다.' },
        { name: '알타이르', x: 1300, y: -1500, z: -2200, color: '#f0f8ff', info: '견우와 직녀 이야기 속 견우성입니다.' },
        { name: '오리온 성운', x: 450, y: 700, z: -1600, color: '#ff99cc', info: '별들이 새로 태어나는 거대한 가스 구름입니다.' },
        { name: '장미 성운', x: -1200, y: 1800, z: -2300, color: '#ff1493', info: '붉은 장미꽃을 닮은 거대한 성운입니다.' },
        { name: '카노푸스', x: -300, y: 2500, z: -3000, color: '#ffffff', info: '무병장수를 기원하던 노인성입니다.' },
        { name: '카스토르', x: -1600, y: 900, z: -1100, color: '#ffffff', info: '쌍둥이자리 중 형에 해당하는 별입니다.' },
        { name: '카펠라', x: 300, y: -1800, z: -1200, color: '#ffff00', info: '작은 암염소라는 뜻을 가진 노란 별입니다.' },
        { name: '폴룩스', x: -1500, y: 800, z: -1200, color: '#ffdb58', info: '쌍둥이자리 중 동생에 해당하는 별입니다.' },
        { name: '포말하우트', x: 0, y: 3000, z: -2000, color: '#f0ffff', info: '가을 하늘에 홀로 밝게 빛나는 별입니다.' },
        { name: '프로키온', x: -1000, y: 100, z: -1300, color: '#f5f5f5', info: '시리우스보다 조금 먼저 뜨는 별입니다.' },
        { name: '플레이아데스', x: -2200, y: -500, z: -1800, color: '#add8e6', info: '한국에서는 좀생이별이라 불리는 성단입니다.' }
    ];

    mainStars.forEach(s => {
        const star = document.createElement('div');
        star.className = 'star main-star';
        star.style.background = s.color;
        star.style.boxShadow = `0 0 20px ${s.color}`;
        star.style.transform = `translate3d(${s.x}px, ${s.y}px, ${s.z}px)`;

        const handleInteraction = (e) => {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            alert(`[${s.name}]\n\n${s.info}`);
        };
        star.onclick = handleInteraction;
        star.ontouchstart = handleInteraction;

        const label = document.createElement('div');
        label.className = 'star-label';
        label.innerText = s.name;
        star.appendChild(label);
        container.appendChild(star);
    });

    let isDragging = false;
    let lastX, lastY;
    viewer.onmousedown = e => { isDragging = true; lastX = e.clientX; lastY = e.clientY; viewer.style.cursor = 'grabbing'; };
    window.onmousemove = e => {
        if (!isDragging) return;
        rotationY += (e.clientX - lastX) * 0.15;
        rotationX += (e.clientY - lastY) * 0.15;
        if(bgLayer) bgLayer.style.transform = `translate3d(${rotationY * 0.2}px, ${rotationX * 0.2}px, 0)`;
        updateTransform();
        lastX = e.clientX; lastY = e.clientY;
    };
    window.onmouseup = () => { isDragging = false; viewer.style.cursor = 'grab'; };
    window.onwheel = e => {
        e.preventDefault();
        zoomValue = Math.min(Math.max(zoomValue + e.deltaY * 1.5, 300), 5000);
        viewer.style.perspective = `${zoomValue}px`;
        updateTransform();
    };
    viewer.ontouchmove = e => {
        if (e.targetTouches.length === 2) {
            e.preventDefault();
            const t1 = e.targetTouches[0]; const t2 = e.targetTouches[1];
            const curDiff = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
            if (prevDiff > 0) {
                zoomValue = Math.min(Math.max(zoomValue + (curDiff - prevDiff) * -5, 300), 5000);
                viewer.style.perspective = `${zoomValue}px`;
            }
            prevDiff = curDiff;
        }
    };
    viewer.ontouchend = () => { prevDiff = -1; };
    function updateTransform() { container.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`; }
}

function removeLoading() {
    const loader = document.getElementById('loading-screen');
    const ui = document.getElementById('ui-buttons');
    const popup = document.getElementById('guide-popup');
    if(loader) {
        loader.style.opacity = '0';
        setTimeout(() => { 
            loader.style.display = 'none'; 
            if(ui) ui.style.display = 'block'; 
            if(popup) popup.style.display = 'flex'; 
        }, 800);
    }
}

function playMusic(file) {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio(file);
    currentAudio.play().catch(() => console.log("음악 재생 실패"));
}

function stopMusic() { if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; } }

function closePopup() {
    const popup = document.getElementById('guide-popup');
    if(popup) {
        popup.style.opacity = '0';
        setTimeout(() => { popup.style.display = 'none'; }, 300);
    }
}
