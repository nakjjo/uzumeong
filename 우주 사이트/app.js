let currentAudio = null;
let rotationX = 0;
let rotationY = 0;
let zoomValue = 1000;
let translateX = 0;
let translateY = 0;

window.onload = function() {
    setRandomBackground();
    init3DUniverse();
    // 3초 뒤 로딩 해제 (시간은 자유롭게 조절하세요)
    setTimeout(removeLoading, 3000);
};

function setRandomBackground() {
    const bgLayer = document.getElementById('background-layer');
    const bgImages = ['space_image.jpg', 'image.jpg', 'you.png']; 
    const randomImg = bgImages[Math.floor(Math.random() * bgImages.length)];
    bgLayer.style.backgroundImage = `url('${randomImg}')`;
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
    { name: '시리우스', x: -800, y: 400, z: -1200, color: '#ffffff', info: '밤하늘에서 가장 밝은 별입니다. 고대 이집트에서는 이 별이 뜨면 나일강이 범람한다는 것을 알았대요.' },
    { name: '베텔게우스', x: 400, y: 600, z: -1500, color: '#ff6600', info: '오리온자리의 어깨에 해당하며, 조만간 초신성 폭발을 일으킬 수도 있는 거대한 별입니다.' },
    { name: '북극성', x: 0, y: -2000, z: -500, color: '#fffec8', info: '지구 자전축 바로 위에 위치해 항해사들에게 영원한 길잡이가 되어준 고마운 별입니다.' },
    { name: '리겔', x: 600, y: 1200, z: -1800, color: '#87ceeb', info: '오리온자리의 무릎 부분이며, 태양보다 수만 배나 더 밝게 빛나는 청색 초거성입니다.' },
    { name: '알데바란', x: -1200, y: -300, z: -1000, color: '#ff8c00', info: '황소자리의 눈에 해당하는 별로, 화를 잘 내는 황소의 붉은 눈처럼 보인답니다.' },
    { name: '베가', x: 1500, y: -800, z: -2000, color: '#e6e6fa', info: '거문고자리의 가장 밝은 별로, 견우와 직녀 이야기 속 직녀에 해당합니다.' },
    { name: '알타이르', x: 1300, y: -1500, z: -2200, color: '#f0f8ff', info: '독수리자리의 별이며, 직녀성과 함께 은하수를 사이에 두고 마주 보고 있습니다.' },
    { name: '안타레스', x: -500, y: 1800, z: -2500, color: '#ff4500', info: '전갈자리의 심장에 해당하며, 붉은색 때문에 화성의 라이벌로 불리기도 했습니다.' },
    { name: '카노푸스', x: -300, y: 2500, z: -3000, color: '#ffffff', info: '남쪽 하늘에서 시리우스 다음으로 밝은 별로, 노인성이라 부르며 무병장수를 기원하던 별입니다.' },
    { name: '데네브', x: 1800, y: 200, z: -1800, color: '#ffffff', info: '백조자리의 꼬리 부분이며, 여름철 대삼각형의 한 축을 담당합니다.' },
    { name: '아르크투루스', x: -1800, y: -1200, z: -1500, color: '#ffcc99', info: '목동자리에서 가장 밝은 별로, 곰을 지키는 사람이라는 뜻을 가지고 있습니다.' },
    { name: '폴룩스', x: -1500, y: 800, z: -1200, color: '#ffdb58', info: '쌍둥이자리 중 동생에 해당하는 별입니다. 형인 카스토르와 늘 붙어 있죠.' },
    { name: '스피카', x: -700, y: -2500, z: -2000, color: '#b0e0e6', info: '처녀자리의 이삭에 해당하는 별로, 깨끗하고 하얀 빛을 내는 것이 특징입니다.' },
    { name: '프로키온', x: -1000, y: 100, z: -1300, color: '#f5f5f5', info: '작은개자리의 별이며, 시리우스보다 조금 먼저 뜨기 때문에 개보다 먼저 오는 것이라는 뜻입니다.' },
    { name: '레굴루스', x: 800, y: -200, z: -1400, color: '#ffffff', info: '사자자리의 심장이며, 왕을 상징하는 별로 알려져 있습니다.' },
    { name: '카스토르', x: -1600, y: 900, z: -1100, color: '#ffffff', info: '쌍둥이자리 중 형에 해당하는 별입니다. 실제로는 여러 개의 별이 모인 다중성계입니다.' },
    { name: '미라', x: 200, y: -2800, z: -2500, color: '#ff6666', info: '고래자리의 별로, 밝기가 주기적으로 변하는 신기한 변광성입니다.' },
    { name: '카펠라', x: 300, y: -1800, z: -1200, color: '#ffff00', info: '마차부자리의 별로, 작은 암염소라는 귀여운 뜻을 가진 노란색 별입니다.' },
    { name: '미차르', x: 2000, y: 2000, z: -3000, color: '#ffffff', info: '북두칠성의 손잡이 끝에서 두 번째 별로, 옛날 시력 검사 용도로 쓰였던 별입니다.' },
    { name: '포말하우트', x: 0, y: 3000, z: -2000, color: '#f0ffff', info: '남쪽물고기자리의 입 부분이며, 외로운 가을 하늘의 1등성이라 불립니다.' },
    { name: '플레이아데스', x: -2200, y: -500, z: -1800, color: '#add8e6', info: '수백 개의 어린 별들이 모여 있는 성단입니다. 우리나라에서는 "좀생이별"이라는 정겨운 이름으로 불렸어요.' },
    { name: '안드로메다 은하', x: 2500, y: -1000, z: -4000, color: '#ffccff', info: '우리 은하와 가장 가까운 거대 나선 은하입니다. 약 40억 년 후에는 우리 은하와 충돌할 예정이래요.' },
    { name: '오리온 성운 (M42)', x: 450, y: 700, z: -1600, color: '#ff99cc', info: '별들이 새로 태어나는 거대한 가스 구름입니다. 맨눈으로도 희미하게 볼 수 있는 아름다운 성운이죠.' },
    { name: '스피카', x: -1400, y: -2200, z: -1300, color: '#ffffff', info: '처녀자리의 가장 밝은 별로, "보리 이삭"이라는 뜻을 가지고 있습니다. 청백색으로 빛나는 깨끗한 별이에요.' },
    { name: '안타레스', x: -2800, y: 1500, z: -2200, color: '#ff4500', info: '전갈자리의 심장입니다. 붉은 빛이 화성(Ares)과 경쟁하는 것 같다고 해서 "안타레스(Anti-Ares)"라는 이름이 붙었습니다.' },
    { name: '데네브', x: 1900, y: 300, z: -2500, color: '#ffffff', info: '백조자리의 꼬리 별입니다. 태양보다 수만 배나 밝은 초거성으로, 여름철 대삼각형 중 하나입니다.' },
    { name: '포말하우트', x: 100, y: 2800, z: -1500, color: '#f0ffff', info: '남쪽물고기자리의 입 부분에 있는 별입니다. 가을 하늘에 홀로 밝게 빛나서 "외로운 별"이라고도 불러요.' },
    { name: '아르크투루스', x: -1900, y: -1500, z: -1100, color: '#ffb366', info: '목동자리의 별로, 하늘에서 세 번째로 밝은 별입니다. 봄철 대곡선의 중심을 잡고 있습니다.' },
    { name: '카펠라', x: 500, y: -2500, z: -1400, color: '#fffacd', info: '마차부자리의 별입니다. "작은 암염소"라는 뜻을 가졌으며, 실제로는 네 개의 별이 모여 있는 시스템입니다.' },
    { name: '폴룩스', x: -1800, y: 1200, z: -1000, color: '#ffd700', info: '쌍둥이자리 중 동생의 머리에 해당합니다. 형인 카스토르보다 조금 더 오렌지색을 띠고 있어요.' },
    { name: '카스토르', x: -2000, y: 1350, z: -950, color: '#f8f8ff', info: '쌍둥이자리 중 형의 머리 별입니다. 실제로는 6개의 별이 서로 복잡하게 돌고 있는 다중성계입니다.' },
    { name: '레굴루스', x: 900, y: -400, z: -1200, color: '#f0f8ff', info: '사자자리의 심장 별입니다. 황도 바로 위에 있어서 고대부터 왕을 상징하는 중요한 별로 여겨졌습니다.' },
    { name: '알데바란', x: -1500, y: -800, z: -2000, color: '#fa8072', info: '황소자리의 붉은 눈입니다. 플레이아데스 성단을 뒤쫓아가는 모습 때문에 "뒤따르는 자"라는 뜻이 있어요.' },
    { name: '프로키온', x: -1100, y: 200, z: -1400, color: '#fafad2', info: '작은개자리의 별입니다. 시리우스보다 아주 조금 먼저 떠오르기 때문에 "개보다 먼저"라는 이름이 붙었습니다.' },
    { name: '알비레오', x: 2100, y: 500, z: -1900, color: '#ffd700', info: '백조자리의 머리 별입니다. 망원경으로 보면 금색과 푸른색 별이 나란히 붙어 있는 가장 아름다운 이중성입니다.' },
    { name: '게 성운 (M1)', x: -800, y: -1800, z: -3000, color: '#00ced1', info: '1054년에 폭발한 초신성의 잔해입니다. 폭발 당시에는 낮에도 보일 정도로 밝았다고 해요.' },
    { name: '말머리 성운', x: 550, y: 850, z: -1700, color: '#4b0082', info: '모양이 말 머리를 닮아 유명한 암흑 성운입니다. 오리온자리의 삼태성 근처에 숨어 있습니다.' },
    { name: '카노푸스', x: -400, y: 3200, z: -2100, color: '#ffffff', info: '남쪽 하늘의 별로, 우리나라에서는 이 별을 보면 장수한다는 설화가 있어 "노인성"이라고 불렀습니다.' },
    { name: '고리 성운 (M57)', x: 1700, y: -1200, z: -2800, color: '#7fffd4', info: '별이 수명을 다하고 겉껍질을 날려 보내 만든 도넛 모양의 성운입니다. 우주의 눈동자처럼 보여요.' },
    { name: '장미 성운', x: -1200, y: 1800, z: -2300, color: '#ff1493', info: '붉은 장미꽃을 닮은 거대한 성운입니다. 그 중심에는 갓 태어난 젊은 별들이 모여 있습니다.' }
];

mainStars.forEach(s => {
    const star = document.createElement('div');
    star.className = 'star main-star';
    star.style.background = s.color;
    star.style.boxShadow = `0 0 20px ${s.color}`;
    star.style.transform = `translate3d(${s.x}px, ${s.y}px, ${s.z}px)`;

    // 클릭 함수 정의
    const handleStarInteraction = (e) => {
        // 이벤트 전파 방지 (드래그가 동시에 일어나는 것 방지)
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        alert(` [${s.name}]\n\n${s.info || '아름다운 별입니다.'}`);
    };

    // 여러 방식의 이벤트를 모두 등록 (하나라도 걸리게)
    star.onclick = handleStarInteraction;
    star.ontouchstart = handleStarInteraction;
    
    // 라벨 추가
    const label = document.createElement('div');
    label.className = 'star-label';
    label.innerText = s.name;
    star.appendChild(label);
    
    container.appendChild(star);
});
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
        bgLayer.style.transform = `translate3d(${rotationY * 0.2}px, ${rotationX * 0.2}px, 0)`;
        updateTransform();
        lastX = e.clientX; lastY = e.clientY;
    };

    window.onmouseup = () => { isDragging = false; viewer.style.cursor = 'grab'; };

    window.onwheel = e => {
        e.preventDefault();
        const mouseX = (e.clientX - window.innerWidth / 2);
        const mouseY = (e.clientY - window.innerHeight / 2);
        const zoomDelta = e.deltaY * 1.8;
        const oldZoom = zoomValue;
        zoomValue = Math.min(Math.max(zoomValue + zoomDelta, 400), 5000);
        if (zoomValue > 400 && zoomValue < 5000) {
            const ratio = zoomDelta / oldZoom;
            translateX -= mouseX * ratio;
            translateY -= mouseY * ratio;
        }
        viewer.style.perspective = `${zoomValue}px`;
        updateTransform();
    };
    // 모바일용 핀치 줌 변수
let prevDiff = -1;

viewer.ontouchmove = e => {
    if (e.targetTouches.length === 2) { // 두 손가락일 때만
        const touch1 = e.targetTouches[0];
        const touch2 = e.targetTouches[1];
        const curDiff = Math.sqrt(Math.pow(touch1.clientX - touch2.clientX, 2) + Math.pow(touch1.clientY - touch2.clientY, 2));

        if (prevDiff > 0) {
            const zoomDelta = (curDiff - prevDiff) * -4; // 감도 조절
            // 기존에 만들어둔 applyZoom 함수가 있다면 호출, 없다면 zoomValue 직접 조절
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

// [수정] 로딩이 끝나면 UI 버튼들을 보여주는 기능 추가
function removeLoading() {
    const loader = document.getElementById('loading-screen');
    const ui = document.getElementById('ui-buttons');
    const popup = document.getElementById('guide-popup');
    
    loader.style.opacity = '0';
    setTimeout(() => { 
        loader.style.display = 'none'; 
        if(ui) ui.style.display = 'block'; 
        popup.style.display = 'flex'; // 팝업창 띄우기
    }, 800);
}

function playMusic(file) {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio(file);
    currentAudio.play().catch(() => console.log("음악 파일이 없습니다."));
}

function stopMusic() {
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
}
// [수정] 로딩이 끝나면 UI 버튼과 팝업창을 보여줍니다.
function removeLoading() {
    const loader = document.getElementById('loading-screen');
    const ui = document.getElementById('ui-buttons');
    const popup = document.getElementById('guide-popup');
    
    loader.style.opacity = '0';
    setTimeout(() => { 
        loader.style.display = 'none'; 
        ui.style.display = 'block'; 
        // 로딩 완료 후 팝업창 띄우기
        popup.style.display = 'flex'; 
    }, 800);
}

// [추가] 팝업창 닫기 함수
function closePopup() {
    const popup = document.getElementById('guide-popup');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
    
}
function closePopup() {
    const popup = document.getElementById('guide-popup');
    popup.style.display = 'none';
}