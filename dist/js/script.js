
// kllik gambar produk 
const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);
// akhir klik gambar produk 


// deskripsi produk
const parentContainer =  document.querySelector('.read-more-colom');

parentContainer.addEventListener('click', event=>{

    const current = event.target;

    const isReadMoreBtn = current.className.includes('read-more-btn');

    if(!isReadMoreBtn) return;

    const currentText = event.target.parentNode.querySelector('.read-more-text');

    currentText.classList.toggle('read-more-text--show');

    current.textContent = current.textContent.includes('Deskripsi Lengkap') ? "Sembunyikan" : "Deskripsi Lengkap";

})
// akhir deskripsi produk

// slide gambar dan video
const sliderContainer = document.querySelector('.img-display');
const slider = document.querySelector('.img-showcase');
const images = document.querySelectorAll('.img-showcase img');
const videos = document.querySelectorAll('.img-showcase video');
const slideIndicators = document.querySelectorAll('.slide-indicator');
let currentIndex = 0;
let startPosition = 0;

images.forEach((img, index) => {
    img.addEventListener('touchstart', touchStart);
    img.addEventListener('touchmove', touchMove);
    img.addEventListener('touchend', touchEnd);
});

videos.forEach((video, index) => {
    video.addEventListener('touchstart', touchStart);
    video.addEventListener('touchmove', touchMove);
    video.addEventListener('touchend', touchEnd);
    video.addEventListener('ended', nextSlide);
});

function touchStart(e) {
    const touch = e.touches[0];
    startPosition = touch.clientX;
}

function touchMove(e) {
    e.preventDefault(); // Prevent scrolling while swiping
}

function touchEnd(e) {
    const touch = e.changedTouches[0];
    const endPosition = touch.clientX;
    const difference = startPosition - endPosition;
    const sensitivity = 50; // Adjust as needed for sensitivity
    if (Math.abs(difference) > sensitivity) {
        if (difference > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % (images.length + videos.length);
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + (images.length + videos.length)) % (images.length + videos.length);
    updateSlider();
}

function currentSlide(index) {
    currentIndex = index - 1;
    updateSlider();
}

function updateSlider() {
    const slideWidth = sliderContainer.clientWidth;
    const translateX = -currentIndex * slideWidth;
    const transitionDuration = '0.8s'; // Adjust as needed
    slider.style.transition = `transform ${transitionDuration} ease-in-out`;
    slider.style.transform = `translateX(${translateX}px)`;
    updateIndicators();
}

function updateIndicators() {
    slideIndicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

slider.addEventListener('transitionend', () => {
    slider.style.transition = ''; // Remove transition after it's done
});

updateSlider();


// akhir slide gambar dan video



// SWIPER 
