// Data for interactive timeline steps
const stepData = {
    1: {
        num: "01",
        title: "Petani Garam (Hulu)",
        role: "Produsen utama garam mentah",
        desc: "Petani garam Madura mengalirkan air laut ke petak-petak meja garam tradisional. Melalui penguapan sinar matahari selama 21 hingga 30 hari, kristal garam kasar (krosok) mulai terbentuk dan dipanen. Kualitas sangat ditentukan oleh intensitas sinar matahari dan kebersihan lahan.",
        next: "Garam mentah hasil panen dikumpulkan ke dalam karung goni dan diangkut menggunakan kendaraan pikap menuju gudang pengepul lokal karena petani jarang memiliki gudang penyimpan berkapasitas besar.",
        time: "21 - 30 Hari (Penguapan)",
        delivery: "Karung Plastik/Goni via Pikap Lokal"
    },
    2: {
        num: "02",
        title: "Pengepul Garam (Logistik)",
        role: "Konsolidator logistik & grading",
        desc: "Pengepul membeli garam langsung dari para petani di sekitarnya. Di sini dilakukan penyortiran mutu berdasarkan kejernihan dan kandungan air (Grading K1, K2, atau K3). Pengepul menampung garam dalam jumlah besar agar memenuhi volume angkut minimum pabrik.",
        next: "Stok garam yang telah dikelompokkan dikirim menggunakan truk besar (truk CDD atau fuso) ke unit pengolahan garam atau pabrik iodisasi untuk diproses lebih lanjut.",
        time: "3 - 7 Hari (Transit & Sortasi)",
        delivery: "Colt Diesel Double (CDD) / Fuso"
    },
    3: {
        num: "03",
        title: "Unit Pengolahan & Pengemasan",
        role: "Manufaktur & standarisasi mutu",
        desc: "Pabrik mengolah garam krosok mentah melalui proses pencucian (washing) untuk meningkatkan kadar NaCl, pengeringan (spin & oven), serta penambahan Kalium Iodat (KIO3) minimal 30 ppm sesuai standar SNI. Garam kemudian dikemas secara higienis dalam berbagai ukuran retail.",
        next: "Produk garam kemasan siap konsumsi diserahterimakan kepada distributor skala besar untuk proses distribusi nasional.",
        time: "1 - 2 Hari (Proses Pabrik)",
        delivery: "Conveyor & Truk Container"
    },
    4: {
        num: "04",
        title: "Distributor Utama (Distribusi)",
        role: "Distribusi makro antarpulau",
        desc: "Distributor bertanggung jawab atas logistik jarak jauh. Mereka mengelola pengiriman dari Madura menuju gudang-gudang regional di berbagai provinsi menggunakan moda transportasi darat maupun laut (kapal kontainer).",
        next: "Pasokan diturunkan ke agen wilayah yang lebih kecil, pusat grosir, serta gudang logistik supermarket.",
        time: "2 - 5 Hari (Pengiriman Logistik)",
        delivery: "Truk Fuso Box / Kapal Kargo Laut"
    },
    5: {
        num: "05",
        title: "Pengecer & Sektor Industri",
        role: "Titik penjualan akhir & hilir",
        desc: "Garam disalurkan ke warung, pasar tradisional, minimarket, supermarket, atau langsung dibeli oleh industri makanan sebagai bahan baku pembantu. Di tahapan inilah konsumen dapat dengan mudah menjangkau garam beryodium.",
        next: "Konsumen membeli produk garam beryodium secara eceran untuk penggunaan harian.",
        time: "1 - 3 Hari (Display & Retail)",
        delivery: "Kendaraan Box Ritel / Motor Roda Tiga"
    },
    6: {
        num: "06",
        title: "Konsumen Akhir (Hilir)",
        role: "Pengguna akhir produk garam",
        desc: "Masyarakat umum, rumah tangga, katering, serta pelaku UMKM kuliner menggunakan garam beryodium untuk memasak makanan sehat sehari-hari guna mencegah gangguan akibat kekurangan yodium (GAKY).",
        next: "Siklus rantai pasok garam selesai setelah produk dikonsumsi habis secara domestik.",
        time: "Konsumsi Harian",
        delivery: "Pembelian Langsung di Toko Terdekat"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navLinkItems = document.querySelectorAll(".nav-link");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu on link click
        navLinkItems.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // 2. SCROLLED NAVBAR STYLING
    const header = document.querySelector(".navbar-container");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. ACTIVE NAV LINK ON SCROLL
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 120) {
                current = section.getAttribute("id");
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // 5. INTERACTIVE TIMELINE / ALUR STEP CLICK
    const timelineSteps = document.querySelectorAll(".timeline-step");
    const timelineProgress = document.getElementById("timelineProgress");
    const detailNum = document.getElementById("detailNum");
    const detailTitle = document.getElementById("detailTitle");
    const detailRoleText = document.getElementById("detailRoleText");
    const detailNextText = document.getElementById("detailNextText");
    const detailStatTime = document.getElementById("detailStatTime");
    const detailStatDelivery = document.getElementById("detailStatDelivery");
    const stepDetailBox = document.getElementById("stepDetailBox");

    function updateProgressLine(stepIndex) {
        const totalSteps = timelineSteps.length;
        // Calculate percentage for progress line based on steps
        const percentage = ((stepIndex - 1) / (totalSteps - 1)) * 100;
        if (window.innerWidth > 768) {
            timelineProgress.style.width = `${percentage}%`;
            timelineProgress.style.height = `4px`;
        } else {
            timelineProgress.style.width = `4px`;
            timelineProgress.style.height = `${percentage}%`;
        }
    }

    timelineSteps.forEach(step => {
        step.addEventListener("click", () => {
            const stepIndex = parseInt(step.getAttribute("data-step"));

            // Remove active class from all
            timelineSteps.forEach(s => s.classList.remove("active"));
            
            // Add active class to clicked & previous steps (for visual chain)
            for (let i = 1; i <= stepIndex; i++) {
                const currentStep = document.querySelector(`.timeline-step[data-step="${i}"]`);
                if (currentStep) currentStep.classList.add("active");
            }

            // Update Progress Line
            updateProgressLine(stepIndex);

            // Update detail box with fade effect
            stepDetailBox.style.opacity = 0;
            stepDetailBox.style.transform = "translateY(10px)";
            
            setTimeout(() => {
                const data = stepData[stepIndex];
                detailNum.textContent = data.num;
                detailTitle.textContent = data.title;
                detailRoleText.textContent = data.role + " - " + data.desc;
                detailNextText.textContent = data.next;
                detailStatTime.textContent = data.time;
                detailStatDelivery.textContent = data.delivery;
                
                stepDetailBox.style.opacity = 1;
                stepDetailBox.style.transform = "translateY(0)";
            }, 300);
        });
    });

    // 6. DASHBOARD NUMBER COUNTER ANIMATION
    const statNumbers = document.querySelectorAll(".stat-number");
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const limit = parseInt(target.getAttribute("data-target"));
                const suffix = target.getAttribute("data-suffix") || "";
                let count = 0;
                const duration = 1500; // ms
                const stepTime = Math.max(Math.floor(duration / limit), 15);
                
                const timer = setInterval(() => {
                    count += 1;
                    if (count >= limit) {
                        target.textContent = limit + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = count + suffix;
                    }
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // Handle resize for progress bar
    window.addEventListener("resize", () => {
        const activeSteps = document.querySelectorAll(".timeline-step.active");
        if (activeSteps.length > 0) {
            const lastActiveIndex = parseInt(activeSteps[activeSteps.length - 1].getAttribute("data-step"));
            updateProgressLine(lastActiveIndex);
        }
    });
});
