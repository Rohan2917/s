window.onload=function() {
    window.scrollTo(0,0);

}
document.addEventListener("DOMContentLoaded",function() {
    const navbarToggler=document.getElementById("navbarToggler");
    navbarToggler.addEventListener("click",function() {
        const icon=this.querySelector(".fas");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });
});

const slidesContainer=document.querySelector('.hero-slides');
const slides=document.querySelectorAll('.hero-slide');
let currentSlide=0; 
let prevSlide=0;
let isCompleteHeroSectionInViewMode=true;
let allowScrolling=true;
let scrollTimeout;

function scrollToSlide() {
    const heroSection=document.getElementById('hero-section');
    const heroRect=heroSection.getBoundingClientRect();
    if(heroRect.top===65) {

        slidesContainer.style.transform=`translateY(-${currentSlide*100}vh)`;
        updateActiveDot();
    }

}

function updateActiveDot() {
    const dots=document.querySelectorAll('.dot');
    if(prevSlide!=currentSlide)
    {
       dots.forEach((dot,index) => {
        if(index===prevSlide ) {
            
            // dot.classList.add('prev-dot-progress');
            dot.classList.add('move-animation');
            // Remove the move-animation class after the animation completes
            setTimeout(() => {
                dot.classList.remove('move-animation');
                // dot.classList.remove('prev-dot-progress');
            },1000);
        }

    });   
    }
  

    dots.forEach((dot,index) => {
        if(index===currentSlide) {
         
            // dot.classList.add('move-animation');
            dot.classList.add('prev-dot-progress');
            // Remove the move-animation class after the animation completes
            setTimeout(() => {
                dot.classList.remove('prev-dot-progress');
                dot.classList.add('active');
                // dot.classList.remove('move-animation');
              
            },1000);
        } else {
            
            dot.classList.remove('active');
        }
    });
}
updateActiveDot();


const imgLogos=document.querySelectorAll("[id^='img-logo-']");
imgLogos.forEach((imgLogo,index) => {
    imgLogo.addEventListener("click",function() {


        const heroSection=document.getElementById('hero-section');
        const heroRect=heroSection.getBoundingClientRect();
        if(heroRect.top===65) {
            prevSlide=currentSlide;
            currentSlide=index+1;
            scrollToSlide();
        }
    });
});

const dots=document.querySelectorAll("[id^='dot-']");
dots.forEach((dot,index) => {
    dot.addEventListener("click",function() {
        const heroSection=document.getElementById('hero-section');
        const heroRect=heroSection.getBoundingClientRect();
        if(heroRect.top===65) {
            prevSlide=currentSlide;
            currentSlide=index;
            scrollToSlide();
        }

    });
});

function handleSlideScroll(event) {

    isHeroSectionInView();
    const heroSection=document.getElementById('hero-section');
    const heroRect=heroSection.getBoundingClientRect();
    if(heroRect.top===65) {




        if(allowScrolling&&isCompleteHeroSectionInViewMode) {
            if(event.deltaY<0&&currentSlide>0) {
                // Scrolling up
                prevSlide=currentSlide;
                currentSlide--;
                scrollToSlide();
                preventDefaultAndResetScrolling(event);
            } else if(event.deltaY>0&&currentSlide<slides.length-1) {
                // Scrolling down
                prevSlide=currentSlide;
                currentSlide++;
                scrollToSlide();
                preventDefaultAndResetScrolling(event);
            } else if(event.deltaY>0&&currentSlide===slides.length-1) {
                // Scrolling down from the last slide
                scrollToNextSection();
                preventDefaultAndResetScrolling(event);
            }
        }
    }
}

function preventDefaultAndResetScrolling(event) {
    event.preventDefault();
    allowScrolling=false;
    clearTimeout(scrollTimeout);
    scrollTimeout=setTimeout(() => {
        allowScrolling=true;
    },2000);
}

function scrollToNextSection() {
    isCompleteHeroSectionInViewMode=false;
    document.body.style.overflowY='scroll';
    const sectionToScroll=document.getElementById('main-section');
    if(sectionToScroll) {
        sectionToScroll.scrollIntoView({behavior: 'smooth'});
    }
}
// window.addEventListener('wheel', handleSlideScroll, { passive: false });
const mediaQuery=window.matchMedia('(max-width: 768px)');
const handleMediaQueryChange=(event) => event.matches;
mediaQuery.addListener(handleMediaQueryChange);
if(handleMediaQueryChange(mediaQuery)) {
    document.body.style.overflowY='scroll';
}else{
    window.addEventListener('wheel', handleSlideScroll, { passive: false });
}

function isHeroSectionInView() {
    const heroSection=document.getElementById('hero-section');
    const heroRect=heroSection.getBoundingClientRect();
    console.log(heroRect.top)
    console.log("body-scroll= ",document.body.style.overflowY)
    if(heroRect.top===65) {

        document.body.style.overflowY='hidden';
        isCompleteHeroSectionInViewMode=true;
    } else {
        document.body.style.overflowY='scroll';
    }
}


function initializeHoverEffects(containerId) {
    const featureCardDetails=document.getElementById(`${containerId}`);
    const backDetails=document.querySelector(`#${containerId} .feature-work-back-details`);
    featureCardDetails.addEventListener('mouseover',function() {
        backDetails.classList.add('feature-work-back-card-hover-effect');
    });
    featureCardDetails.addEventListener('mouseout',function() {
        backDetails.classList.remove('feature-work-back-card-hover-effect');
    });
}
initializeHoverEffects('feature-card-1');
initializeHoverEffects('feature-card-2');
initializeHoverEffects('feature-card-3');
initializeHoverEffects('feature-card-4');
initializeHoverEffects('feature-card-5');
function initializeCarousel(containerId) {
    const carousel=document.querySelector(`#${containerId} .carousel`);
    const prevButton=document.querySelector(`#${containerId} .prev-btn`);
    const nextButton=document.querySelector(`#${containerId} .next-btn`);
    const images=document.querySelector(`#${containerId} .carousel-images`);
    let currentPosition=0;

    nextButton.addEventListener('click',() => {
        currentPosition-=5;

        carousel.style.transform=`translateX(${currentPosition}px)`;
    });

    prevButton.addEventListener('click',() => {
        currentPosition+=5;
        carousel.style.transform=`translateX(${currentPosition}px)`;

    });
}

initializeCarousel('feature-card-1');
initializeCarousel('feature-card-2');
initializeCarousel('feature-card-3');
initializeCarousel('feature-card-4');
initializeCarousel('feature-card-5');



