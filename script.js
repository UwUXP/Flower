onload = () => {
  // 1. ซ่อนคลาส not-loaded หลังจาก 1 วินาที (เพื่อให้พื้นหลังและก้านขึ้น)
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
  
  // 2. ตั้งค่าให้ดอกไม้อยู่ในสถานะหุบรอการคลิก
  document.body.classList.add('not-bloomed'); 
  
  // 3. กำหนด Event Listener สำหรับการคลิกที่ปุ่ม
  const introMessage = document.getElementById('intro-message');
  introMessage.addEventListener('click', startAnimation);
  // เพิ่ม listener สำหรับ Touch (กรณีใช้มือถือ)
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

  // 3. เพิ่มแอนิเมชันการบานกลับเข้าไปในองค์ประกอบใบไม้
  // *เนื่องจากแอนิเมชันเดิมมีความซับซ้อนตามลำดับเวลา เราต้องใส่แอนิเมชันที่ถูกลบออกจาก CSS กลับเข้าไป
  const flowerLeafs = document.querySelectorAll('.flower__leafs');
  flowerLeafs.forEach(leafs => {
    // กำหนดแอนิเมชันและ delay ที่หายไปกลับเข้าไป
    if (leafs.classList.contains('flower__leafs--1')) {
        leafs.style.animation = 'blooming-flower 2s 1.1s backwards';
    } else if (leafs.classList.contains('flower__leafs--2')) {
        leafs.style.animation = 'blooming-flower 2s 1.4s backwards';
    } else if (leafs.classList.contains('flower__leafs--3')) {
        leafs.style.animation = 'blooming-flower 2s 1.7s backwards';
    }
  });

  // 4. เริ่มเอฟเฟกต์หัวใจลอย
  setupHeartEffect();
  
  // 5. ลบ Event Listener ออกเพื่อป้องกันการทำงานซ้ำ
  introMessage.removeEventListener('click', startAnimation);
  introMessage.removeEventListener('touchstart', startAnimation);
}


// --- ฟังก์ชันสำหรับสร้างและจัดการเอฟเฟกต์หัวใจ ---

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
      // ใช้ e.touches[0] เพื่อรับตำแหน่งนิ้วแรกที่สัมผัส
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
