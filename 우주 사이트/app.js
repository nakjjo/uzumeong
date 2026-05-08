// 1. 전역 변수 설정 (상태 관리)
let currentAudio = null;
let rotationX = 0;
let rotationY = 0;
let zoomValue = 1000;
let translateX = 0;
let translateY = 0;
let prevDiff = -1; // 모바일 핀치 줌용

// 2. 초기 실행 함수
window.onload = function() {
    setRandomBackground();
    init3DUniverse();
    // 2.5초 뒤 로딩 해제
    setTimeout(removeLoading, 2500);
};

// 3. 배경 설정 함수
function setRandomBackground() {
    const bgLayer = document.getElementById('background-layer');
    const bgImages = ['space_image.jpg', 'image.jpg', 'you.png']; 
    const randomImg = bgImages[Math.floor(Math.random() * bgImages.length)];
    if(bgLayer) bgLayer.style.backgroundImage = `url('${randomImg}')`;
}

// 4. 우주 구현 및 이벤트 제어 (핵심 로직)
function init3DUniverse() {
    const viewer = document.getElementById('universe-viewer');
    const container = document.getElementById('stars-container');
    const bgLayer = document.getElementById('background-layer');

    // [A] 배경 별 600개 생성
    for(let i=0; i<600; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const x = Math.random() * 4000 - 2000;
        const y = Math.random() * 4000 - 2000;
        const z = Math.random() * 4000 - 2000;
        star.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        container.appendChild(star);
    }

    // [B] 주요 천체 데이터 및 클릭 이벤트
const mainStars = [
    { name: '게 성운 (M1)', x: -800, y: -1800, z: -3000, color: '#00ced1', info: '1054년에 폭발한 초신성의 잔해입니다. 폭발 당시에는 낮에도 보일 정도로 밝았다고 해요.' },
    { name: '고리 성운 (M57)', x: 1700, y: -1200, z: -2800, color: '#7fffd4', info: '별이 수명을 다하고 겉껍질을 날려 보내 만든 도넛 모양의 성운입니다. 우주의 눈동자처럼 보여요.' },
    { name: '고래자리 타우', x: -1100, y: -2900, z: -1800, color: '#ffffcc', info: '지구와 매우 유사한 환경을 가진 행성이 있을 것으로 추측되어 외계 생명체 탐사의 주요 대상인 별입니다.' },
    { name: '남십자자리 알파 (아크룩스)', x: -200, y: 3500, z: -2500, color: '#b0c4de', info: '남반구 하늘의 상징인 남십자자리에서 가장 밝은 별로, 남극을 찾는 길잡이 역할을 합니다.' },
    { name: '데네브', x: 1800, y: 200, z: -1800, color: '#ffffff', info: '백조자리의 꼬리 부분이며, 태양보다 수만 배나 밝은 초거성입니다.' },
    { name: '데네볼라', x: 900, y: -100, z: -1200, color: '#ffffff', info: '사자자리의 꼬리에 해당하는 별로, "사자의 꼬리"라는 뜻을 가지고 있습니다.' },
    { name: '레굴루스', x: 800, y: -200, z: -1400, color: '#ffffff', info: '사자자리의 심장이며, 왕을 상징하는 별로 알려져 있습니다.' },
    { name: '리겔', x: 600, y: 1200, z: -1800, color: '#87ceeb', info: '오리온자리의 무릎 부분이며, 태양보다 수만 배나 더 밝게 빛나는 청색 초거성입니다.' },
    { name: '말머리 성운', x: 550, y: 850, z: -1700, color: '#4b0082', info: '모양이 말 머리를 닮아 유명한 암흑 성운입니다. 오리온자리의 삼태성 근처에 숨어 있습니다.' },
    { name: '메로페', x: -2100, y: -600, z: -1900, color: '#f0f8ff', info: '플레이아데스 성단의 일곱 자매 중 하나로, 주변의 푸른 가스 성운을 밝게 비추고 있습니다.' },
    { name: '메르카크', x: 100, y: -2200, z: -900, color: '#ffffff', info: '북두칠성의 국자 끝부분에 있는 별로, 북극성을 찾는 이정표가 됩니다.' },
    { name: '미라', x: 200, y: -2800, z: -2500, color: '#ff6666', info: '고래자리의 별로, 밝기가 주기적으로 변하는 신기한 변광성입니다.' },
    { name: '미르파크', x: -1400, y: 2200, z: -1500, color: '#fffec8', info: '페르세우스자리에서 가장 밝은 별로, 은하수 한가운데에서 밝게 빛납니다.' },
    { name: '미차르', x: 2000, y: 2000, z: -3000, color: '#ffffff', info: '북두칠성의 손잡이 끝에서 두 번째 별로, 옛날 시력 검사 용도로 쓰였던 별입니다.' },
    { name: '민타카', x: 300, y: 400, z: -1300, color: '#ffffff', info: '오리온자리 허리띠(삼태성)의 왼쪽 끝 별로, 하늘의 적도 바로 위에 걸쳐 있습니다.' },
    { name: '베가', x: 1500, y: -800, z: -2000, color: '#e6e6fa', info: '거문고자리의 가장 밝은 별로, 견우와 직녀 이야기 속 직녀에 해당합니다.' },
    { name: '베텔게우스', x: 400, y: 600, z: -1500, color: '#ff6600', info: '오리온자리의 어깨에 해당하며, 조만간 초신성 폭발을 일으킬 수도 있는 거대한 별입니다.' },
    { name: '벨라트릭스', x: 200, y: 500, z: -1400, color: '#b0e0e6', info: '오리온자리의 왼쪽 어깨 별로, "여전사"라는 뜻을 가진 푸른 별입니다.' },
    { name: '북극성', x: 0, y: -2000, z: -500, color: '#fffec8', info: '지구 자전축 바로 위에 위치해 항해사들에게 영원한 길잡이가 되어준 별입니다.' },
    { name: '사비크', x: 1200, y: 1500, z: -2100, color: '#ffffff', info: '땅꾼자리의 별로, 거대한 뱀을 다루는 사람의 무릎 부근에서 빛나고 있습니다.' },
    { name: '셰다르', x: -1900, y: 2800, z: -1200, color: '#ffcc99', info: '카시오페이아자리의 'W'자 모양 중 하나로, 가슴을 뜻하는 이름을 가진 오렌지색 거성입니다.' },
    { name: '스피카', x: -700, y: -2500, z: -2000, color: '#b0e0e6', info: '처녀자리의 이삭에 해당하는 별로, 깨끗하고 하얀 빛을 내는 청백색 별입니다.' },
    { name: '시리우스', x: -800, y: 400, z: -1200, color: '#ffffff', info: '밤하늘에서 가장 밝은 별입니다. 고대 이집트 나일강 범람의 상징이었습니다.' },
    { name: '아르크투루스', x: -1800, y: -1200, z: -1500, color: '#ffcc99', info: '목동자리의 밝은 별로, 봄철 대곡선의 중심을 잡고 있는 오렌지색 거성입니다.' },
    { name: '아스테리온', x: -1500, y: -1000, z: -800, color: '#ffffcc', info: '사냥개자리의 별로, 목동자리를 따라가는 사냥개의 모습을 상상하게 합니다.' },
    { name: '아크루스', x: 1000, y: 2800, z: -2600, color: '#ffffff', info: '에리다누스자리의 끝에 있는 별로, "강의 끝"이라는 뜻을 가진 매우 밝은 별입니다.' },
    { name: '안드로메다 은하', x: 2500, y: -1000, z: -4000, color: '#ffccff', info: '우리 은하와 가장 가까운 거대 나선 은하입니다. 약 40억 년 후 우리 은하와 충돌할 예정입니다.' },
    { name: '안타레스', x: -500, y: 1800, z: -2500, color: '#ff4500', info: '전갈자리의 심장에 해당하며, 붉은 빛이 화성의 라이벌이라 불립니다.' },
    { name: '알골', x: -1100, y: 1900, z: -1600, color: '#ffffff', info: '페르세우스자리의 별로, 밝기가 변하는 모습 때문에 "마왕의 별"이라 불렸습니다.' },
    { name: '알데바란', x: -1200, y: -300, z: -1000, color: '#ff8c00', info: '황소자리의 눈에 해당하는 별로, "뒤따르는 자"라는 뜻을 가지고 있습니다.' },
    { name: '알디라', x: 1600, y: -2200, z: -1400, color: '#ffffff', info: '쌍둥이자리의 발부분에 위치하며, 두 형제의 발치를 장식하는 별입니다.' },
    { name: '알비레오', x: 2100, y: 500, z: -1900, color: '#ffd700', info: '백조자리의 머리 별로, 금색과 푸른색 별이 나란히 붙어 있는 아름다운 이중성입니다.' },
    { name: '알슈하일', x: -600, y: 3200, z: -2800, color: '#ff6600', info: '돛자리의 별로, 옛날 거대한 아르고 배의 돛 부분에서 빛나던 별입니다.' },
    { name: '알타이르', x: 1300, y: -1500, z: -2200, color: '#f0f8ff', info: '독수리자리의 별이며, 견우와 직녀 이야기 속 견우에 해당합니다.' },
    { name: '알페라츠', x: 2200, y: 1000, z: -1300, color: '#ffffff', info: '안드로메다자리의 머리 부분과 페가수스자리의 사각형을 잇는 중요한 길목의 별입니다.' },
    { name: '오리온 성운 (M42)', x: 450, y: 700, z: -1600, color: '#ff99cc', info: '별들이 새로 태어나는 거대한 가스 구름입니다. 맨눈으로도 볼 수 있을 만큼 밝습니다.' },
    { name: '장미 성운', x: -1200, y: 1800, z: -2300, color: '#ff1493', info: '붉은 장미꽃을 닮은 거대한 성운입니다. 그 중심에는 젊은 별들이 모여 있습니다.' },
    { name: '전갈자리 람다 (샤울라)', x: -800, y: 2200, z: -2700, color: '#b0e0e6', info: '전갈의 독침 끝에 해당하는 별로, "치켜든 꼬리"라는 뜻을 가지고 있습니다.' },
    { name: '카노푸스', x: -300, y: 2500, z: -3000, color: '#ffffff', info: '남쪽 하늘에서 두 번째로 밝은 별로, 장수를 상징하는 "노인성"이라 불립니다.' },
    { name: '카스토르', x: -1600, y: 900, z: -1100, color: '#ffffff', info: '쌍둥이자리 중 형에 해당하는 별로, 실제로는 6개의 별이 뭉쳐 있습니다.' },
    { name: '카펠라', x: 300, y: -1800, z: -1200, color: '#ffff00', info: '마차부자리의 별로, "작은 암염소"라는 뜻을 가진 노란색 다중성계입니다.' },
    { name: '코카브', x: 400, y: -2400, z: -600, color: '#ffcc66', info: '작은곰자리의 별로, 고대에는 북극성 대신 항해자들의 길잡이가 되었던 별입니다.' },
    { name: '타니나', x: 1900, y: -3000, z: -2200, color: '#ffffff', info: '용자리의 별로, 밤하늘 북쪽에서 거대한 용의 몸집을 그리는 별 중 하나입니다.' },
    { name: '폴룩스', x: -1500, y: 800, z: -1200, color: '#ffdb58', info: '쌍둥이자리 중 동생에 해당하는 별로, 형 카스토르보다 조금 더 오렌지색입니다.' },
    { name: '포말하우트', x: 0, y: 3000, z: -2000, color: '#f0ffff', info: '가을 하늘에 홀로 밝게 빛나 "외로운 별"이라 불리는 남쪽물고기자리의 별입니다.' },
    { name: '프로키온', x: -1000, y: 100, z: -1300, color: '#f5f5f5', info: '작은개자리의 별이며, 시리우스보다 조금 먼저 뜨는 것이 특징입니다.' },
    { name: '플레이아데스', x: -2200, y: -500, z: -1800, color: '#add8e6', info: '수백 개의 어린 별들이 모여 있는 성단으로, 한국에서는 "좀생이별"이라 부릅니다.' },
    { name: '햄알', x: -2500, y: 200, z: -1400, color: '#ffcc99', info: '양자리에서 가장 밝은 별로, 고대 점성술에서 봄의 시작을 알리는 중요한 별이었습니다.' }
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

    // [C] 마우스 드래그 로직 (PC)
    let isDragging = false;
    let lastX, lastY;

    viewer.onmousedown = e => {
        isDragging = true;
        lastX = e.clientX; lastY = e.clientY;
        viewer.style.cursor = 'grabbing';
    };

    window.onmousemove = e => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        rotationY += deltaX * 0.15;
        rotationX += deltaY * 0.15;
        if(bgLayer) bgLayer.style.transform = `translate3d(${rotationY * 0.2}px, ${rotationX * 0.2}px, 0)`;
        updateTransform();
        lastX = e.clientX; lastY = e.clientY;
    };

    window.onmouseup = () => { isDragging = false; viewer.style.cursor = 'grab'; };

    // [D] 휠 줌 로직 (PC)
    window.onwheel = e => {
        e.preventDefault();
        const zoomDelta = e.deltaY * 1.5;
        zoomValue = Math.min(Math.max(zoomValue + zoomDelta, 300), 5000);
        viewer.style.perspective = `${zoomValue}px`;
        updateTransform();
    };

    // [E] 핀치 줌 로직 (모바일)
    viewer.ontouchmove = e => {
        if (e.targetTouches.length === 2) {
            e.preventDefault();
            const t1 = e.targetTouches[0];
            const t2 = e.targetTouches[1];
            const curDiff = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));

            if (prevDiff > 0) {
                const zoomDelta = (curDiff - prevDiff) * -5; // 감도 상향
                zoomValue = Math.min(Math.max(zoomValue + zoomDelta, 300), 5000);
                viewer.style.perspective = `${zoomValue}px`;
            }
            prevDiff = curDiff;
        }
    };

    viewer.ontouchend = () => { prevDiff = -1; };

    function updateTransform() {
        container.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
}

// 5. 로딩 해제 및 UI 노출 함수
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

// 6. 음악 제어 함수
function playMusic(file) {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio(file);
    currentAudio.play().catch(() => console.log("음악 파일 재생 오류"));
}

function stopMusic() {
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
}

// 7. 팝업 닫기 함수
function closePopup() {
    const popup = document.getElementById('guide-popup');
    if(popup) {
        popup.style.opacity = '0';
        setTimeout(() => { popup.style.display = 'none'; }, 300);
    }
}
