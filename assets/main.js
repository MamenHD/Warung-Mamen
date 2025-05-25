// Navbar Toggle
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

// Close menu when clicking on nav link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

// Change background header on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav__link[href*=${sectionId}]`).classList.add('active-link');
    } else {
      document.querySelector(`.nav__link[href*=${sectionId}]`).classList.remove('active-link');
    }
  });
});


// Menu Filter
const menuCategories = document.querySelectorAll('.menu__category');
const menuItems = document.querySelectorAll('.menu__item');

menuCategories.forEach(category => {
  category.addEventListener('click', () => {
    // Remove active class from all categories
    menuCategories.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked category
    category.classList.add('active');
    
    const categoryValue = category.getAttribute('data-category');
    
    // Filter menu items
    menuItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      
      if (categoryValue === 'all' || itemCategory === categoryValue) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Testimonial Slider - hanya aktif di mobile
const testimonialWrapper = document.querySelector('.testimonial__wrapper');
const testimonialCards = document.querySelectorAll('.testimonial__card');
const testimonialNavButtons = document.querySelectorAll('.testimonial__nav-button');
let currentTestimonial = 0;
let autoSlideInterval;

function initTestimonialSlider() {
  // Hanya aktifkan slider jika lebar layar < 768px
  if (window.innerWidth < 768) {
    testimonialWrapper.style.display = 'flex';
    testimonialWrapper.style.scrollBehavior = 'smooth';
    
    // Set interval untuk auto slide
    autoSlideInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      scrollToTestimonial(currentTestimonial);
    }, 5000);
  } else {
    // Nonaktifkan slider di desktop
    clearInterval(autoSlideInterval);
    testimonialWrapper.style.display = 'flex';
    testimonialWrapper.style.flexWrap = 'wrap';
    testimonialWrapper.style.justifyContent = 'center';
    testimonialWrapper.style.gap = '1.5rem';
  }
}

function scrollToTestimonial(index) {
  const cardWidth = testimonialCards[0].offsetWidth + 16; // width + margin
  testimonialWrapper.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  });
  
  // Update nav buttons
  testimonialNavButtons.forEach(button => {
    button.classList.remove('active');
  });
  testimonialNavButtons[index].classList.add('active');
  currentTestimonial = index;
}

// Event listeners untuk nav buttons
testimonialNavButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    scrollToTestimonial(index);
    // Reset interval setelah klik manual
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      scrollToTestimonial(currentTestimonial);
    }, 5000);
  });
});

// Inisialisasi saat load dan resize
window.addEventListener('load', initTestimonialSlider);
window.addEventListener('resize', initTestimonialSlider);

// Form submission
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
    
    // Reset form
    contactForm.reset();
  });
}

