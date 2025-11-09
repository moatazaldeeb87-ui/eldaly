// ===============================================
// UI Class for Modal Control
// ===============================================
class UI {
    constructor() {
        // العناصر الخاصة بنموذج تسجيل الدخول
        this.loginBtn = document.getElementById('login-btn');
        this.loginModal = document.getElementById('login-modal');
        this.closeModalBtn = document.getElementById('close-modal');
        this.loginForm = document.getElementById('login-form');

        // ربط الأحداث
        this.loginBtn.addEventListener('click', this.openLoginModal.bind(this));
        this.closeModalBtn.addEventListener('click', this.closeLoginModal.bind(this));
        
        // إغلاق النموذج عند الضغط خارج المحتوى
        this.loginModal.addEventListener('click', (e) => {
            if (e.target.id === 'login-modal') {
                this.closeLoginModal();
            }
        });

        // معالجة إرسال النموذج (للتجربة)
        this.loginForm.addEventListener('submit', this.handleLoginSubmit.bind(this));
    }

    /**
     * @description إظهار نموذج تسجيل الدخول
     */
    openLoginModal() {
        this.loginModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
    }

    /**
     * @description إخفاء نموذج تسجيل الدخول
     */
    closeLoginModal() {
        this.loginModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // السماح بالتمرير مرة أخرى
    }

    /**
     * @description معالجة عملية تسجيل الدخول عند إرسال النموذج
     */
    handleLoginSubmit(e) {
        e.preventDefault(); // منع الإرسال الافتراضي للصفحة
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // هنا يمكنك إضافة منطق التحقق وإرسال البيانات إلى خادم
        console.log("Email:", email);
        console.log("Password:", password);

        // رسالة بسيطة
        alert(`تم محاولة تسجيل الدخول بالبريد: ${email}`);

        // إغلاق النموذج بعد محاولة الدخول
        this.closeLoginModal();
    }
}

// تشغيل وظيفة التحكم في النموذج
document.addEventListener('DOMContentLoaded', () => {
    new UI(); 
    // إذا كنت تستخدم كلاسات المشروع الأول، قم بدمج هذا المنطق مع كلاس UI الرئيسي أو كلاس App
});



// ===============================================
// 1. Theme Toggle Logic (منطق تبديل المظهر)
// ===============================================
function setupThemeToggle() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeToggleButton.checked = true; 
        } else {
            body.classList.remove('dark-theme');
            themeToggleButton.checked = false;
        }
        localStorage.setItem('theme', theme);
    }

    // تحميل التفضيل عند فتح الصفحة
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // إضافة مستمع الحدث
    themeToggleButton.addEventListener('change', () => {
        const newTheme = themeToggleButton.checked ? 'dark' : 'light';
        applyTheme(newTheme);
    });
}

// ===============================================
// 2. Scroll Animation Logic (منطق ظهور العناصر عند التمرير)
// ===============================================
function setupScrollAnimations() {
    // العناصر التي تحمل الكلاس animate-on-scroll
    const targets = document.querySelectorAll('.animate-on-scroll'); 

    if (targets.length === 0) return;

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 // يبدأ الظهور عندما يظهر 10% من العنصر
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة كلاس is-visible لبدء الحركة
                entry.target.classList.add('is-visible'); 
                observer.unobserve(entry.target); // التوقف عن المراقبة
            }
        });
    }, observerOptions);

    targets.forEach(target => {
        observer.observe(target);
    });
}

// ===============================================
// 3. 3D Tilt Effect Logic (منطق تأثير الإمالة على البطاقات)
// ===============================================
function setupCardTiltEffect() {
    document.querySelectorAll('.year-card').forEach(card => {
        // عند تحريك الماوس فوق البطاقة
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // موقع X بالنسبة للبطاقة
            const y = e.clientY - rect.top; // موقع Y بالنسبة للبطاقة

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // حساب درجة الدوران (بحد أقصى 10 درجات)
            const rotateX = ((centerY - y) / centerY) * 10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            // تطبيق الدوران
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // عند خروج الماوس
        card.addEventListener('mouseleave', () => {
            // إعادة البطاقة لوضعها الطبيعي
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// ===============================================
// نقطة البدء: تشغيل جميع الوظائف بعد تحميل الصفحة
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupScrollAnimations();
    setupCardTiltEffect();
});