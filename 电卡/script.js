document.addEventListener('DOMContentLoaded', function() {
    // 元素引用
    const envelopeCover = document.getElementById('envelopeCover');
    const envelopeContent = document.getElementById('envelopeContent');
    const backBtn = document.getElementById('backBtn');
    const flowerCenter = document.getElementById('flowerCenter');
    const mainFlower = document.getElementById('mainFlower');
    const flowersContainer = document.getElementById('flowersContainer');
    const essayText = document.getElementById('essayText');
    const wordCount = document.getElementById('wordCount');

    // 信封封面点击事件
    envelopeCover.addEventListener('click', function() {
        openEnvelope();
    });

    // 返回封面按钮
    backBtn.addEventListener('click', function() {
        closeEnvelope();
    });

    // 打开信封
    function openEnvelope() {
        // 添加封面展开动画
        envelopeCover.style.animation = 'none';
        envelopeCover.offsetHeight; // 触发重绘
        envelopeCover.style.animation = 'openCover 0.8s ease-out forwards';
        
        // 隐藏封面，显示内容
        setTimeout(() => {
            envelopeCover.classList.add('hidden');
            envelopeContent.classList.add('active');
            envelopeContent.classList.remove('hidden');
        }, 400);
    }

    // 关闭信封
    function closeEnvelope() {
        // 隐藏内容，显示封面
        envelopeContent.classList.remove('active');
        envelopeContent.classList.add('hidden');
        envelopeCover.classList.remove('hidden');
        
        // 重置封面动画
        envelopeCover.style.animation = 'closeCover 0.6s ease-out forwards';
    }

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes openCover {
            0% {
                transform: scale(1) rotateX(0);
                opacity: 1;
            }
            50% {
                transform: scale(1.1) rotateX(20deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotateX(90deg);
                opacity: 0;
                display: none;
            }
        }
        
        @keyframes closeCover {
            0% {
                transform: scale(0) rotateX(90deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.1) rotateX(20deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(1) rotateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // 花朵交互
    let isPetalsFalling = false;
    let petalCount = 0;
    const maxPetals = 12;

    // 点击花朵中心
    flowerCenter.addEventListener('click', function(e) {
        e.stopPropagation();
        createPetalFall();
    });

    // 点击整个花朵
    mainFlower.addEventListener('click', function(e) {
        if (e.target !== flowerCenter) {
            createPetalFall();
        }
    });

    // 创建花瓣飘落效果
    function createPetalFall() {
        if (isPetalsFalling) return;
        
        isPetalsFalling = true;
        petalCount = 0;
        
        for (let i = 0; i < maxPetals; i++) {
            setTimeout(() => {
                createSinglePetal();
                petalCount++;
                
                if (petalCount >= maxPetals) {
                    setTimeout(() => {
                        isPetalsFalling = false;
                    }, 1000);
                }
            }, i * 80);
        }
        
        addFlowerClickEffect();
    }

    // 创建单个花瓣
    function createSinglePetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal-fall');
        
        const size = 10 + Math.random() * 15;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        const startX = 50 + (Math.random() - 0.5) * 30;
        petal.style.left = `${startX}%`;
        petal.style.top = '40%';
        
        const hue = 330 + Math.random() * 20;
        const saturation = 70 + Math.random() * 20;
        const lightness = 60 + Math.random() * 20;
        petal.style.background = `linear-gradient(135deg, 
            hsl(${hue}, ${saturation}%, ${lightness}%), 
            hsl(${hue + 10}, ${saturation - 10}%, ${lightness + 10}%))`;
        
        const duration = 2 + Math.random() * 2;
        const delay = Math.random() * 0.5;
        const endX = (Math.random() - 0.5) * 100;
        
        petal.style.animation = `petalFall ${duration}s linear ${delay}s forwards`;
        petal.style.setProperty('--end-x', `${endX}px`);
        
        flowersContainer.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode === flowersContainer) {
                flowersContainer.removeChild(petal);
            }
        }, (duration + delay) * 1000);
    }

    // 花朵点击反馈
    function addFlowerClickEffect() {
        flowerCenter.style.transform = 'scale(1.2)';
        flowerCenter.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.9)';
        
        setTimeout(() => {
            flowerCenter.style.transform = 'scale(1)';
            flowerCenter.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.6)';
        }, 300);
        
        const petals = document.querySelectorAll('.petal');
        petals.forEach((petal, index) => {
            setTimeout(() => {
                petal.style.transform = `rotate(${index * 60}deg) scale(1.1)`;
                setTimeout(() => {
                    petal.style.transform = `rotate(${index * 60}deg) scale(1)`;
                }, 200);
            }, index * 50);
        });
    }

    // 小作文字数统计
    function updateWordCount() {
        const text = essayText.value;
        const count = text.replace(/\s/g, '').length; // 去除空格统计纯字数
        wordCount.textContent = count;
        
        // 根据字数改变颜色提示
        if (count < 100) {
            wordCount.style.color = '#e74c3c';
        } else if (count < 300) {
            wordCount.style.color = '#f39c12';
        } else {
            wordCount.style.color = '#27ae60';
        }
    }

    essayText.addEventListener('input', updateWordCount);
    updateWordCount(); // 初始化统计

    // 初始创建一些漂浮爱心
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 1500);
    }

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-flower');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        const startX = Math.random() * 100;
        heart.style.left = `${startX}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        
        const size = 0.8 + Math.random() * 1.2;
        heart.style.fontSize = `${size}rem`;
        
        const hue = 330 + Math.random() * 30;
        heart.style.color = `hsl(${hue}, 80%, 65%)`;
        
        flowersContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode === flowersContainer) {
                flowersContainer.removeChild(heart);
            }
        }, 5000);
    }
});