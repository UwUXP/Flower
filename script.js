onload = () => {
  // ลบคลาส not-loaded ทันทีเมื่อ DOM พร้อม
  document.body.classList.remove("not-loaded");

  // กำหนด Event Listener สำหรับการคลิกที่ปุ่ม
  const introMessage = document.getElementById('intro-message');
  introMessage.addEventListener('click', startAnimation);
  introMessage.addEventListener('touchstart', startAnimation); 
};

/**
 * ฟังก์ชันที่ถูกเรียกเมื่อผู้ใช้กดปุ่มเพื่อเริ่มแอนิเมชันดอกไม้บาน
 */
function startAnimation() {
  const introMessage = document.getElementById('intro-message');
  
  // 1. ซ่อนข้อความแจ้งเตือน
  introMessage.classList.add('hidden');
  
  // 2. ลบสถานะ 'not-bloomed' เพื่อเริ่มแอนิเมชันการบานของดอกไม้
  document.body.classList.remove('not-bloomed');

  // 3. เพิ่มแอนิเมชันการบานกลับเข้าไปในองค์ประกอบใบไม้ทั้งหมด
  const flowerLeafs = document.querySelectorAll('.flower__leafs');
  flowerLeafs.forEach((leafs, index) => {
    // ใช้ index เพื่อให้ดอกไม้บานเหลื่อมเวลากัน
    let delay = 1.1 + (index * 0.3); 
    leafs.style.animation = `blooming-flower 2s ${delay}s backwards`;
  });

  // 4. เริ่มแอนิเมชันของลำต้น/ก้านใบ (ถ้ายังไม่ทำงาน)
  const flowerLines = document.querySelectorAll('.flower__line');
  flowerLines.forEach(line => {
    if (!line.style.animationName || line.style.animationName === 'none') {
        line.style.animation = `grow-flower-tree 4s backwards`; 
    }
  });
  
  // 5. เริ่มเอฟเฟกต์หัวใจลอย
  setupHeartEffect();
  
  // 6. ลบ Event Listener ออก
  introMessage.removeEventListener('click', startAnimation);
  introMessage.removeEventListener('touchstart', startAnimation);
}


// --- ฟังก์ชันสำหรับสร้างและจัดการเอฟเฟกต์หัวใจ (ใช้โค้ดเดิม) ---

function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️'; 
  heart.classList.add('heart-particle');
  
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  
  const randomX = (Math.random() - 0.5) * 100;
  heart.style.setProperty('--rand-x', randomX);

  document.body.appendChild(heart);

  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

function setupHeartEffect() {
  let isDragging = false;
  
  const startHandler = (e) => {
    isDragging = true;
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
    createHeart(x, y);
  };
  
  const moveHandler = (e) => {
    if (isDragging && Math.random() < 0.25) { 
      const x = e.clientX || (e.touches[0] ? e.touches[0].clientX : 0);
      const y = e.clientY || (e.touches[0] ? e.touches[0].clientY : 0);
      createHeart(x, y);
    }
  };

  const endHandler = () => {
    isDragging = false;
  };
  
  document.addEventListener('mousedown', startHandler);
  document.addEventListener('touchstart', startHandler);
  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('touchmove', moveHandler);
  document.addEventListener('mouseup', endHandler);
  document.addEventListener('touchend', endHandler);
  document.addEventListener('touchcancel', endHandler);


  // หัวใจลอยแบบสุ่มในพื้นหลัง
  setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      createHeart(x, y);
  }, 1000); 
}
