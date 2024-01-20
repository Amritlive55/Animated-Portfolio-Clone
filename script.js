var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl= gsap.timeline();

    tl.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration:2,
        delay: -1,
        stagger:.2
    })
    .from("#herofooter",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}
 
function circleChaptaKaro(){
    xscale=1;
    yscale=1;
    xprev=0;
    yprev=0;

    window.addEventListener("mousemove",function(dets){
       clearTimeout(timeout);
             xscale=gsap.utils.clamp(.8,1.2,dets.clientX-xprev);
      yscale=gsap.utils.clamp(.8,1.2,dets.clientY-yprev);
     
      xprev=dets.clientX;
      yprev=dets.clientY;

      circleMouseFollower(xscale,yscale);
    timeout=setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;   
    },100);
    })
}

function circleMouseFollower(xscale,yscale) {
    window.addEventListener("mousemove",function(dets){
  // document.querySelector("#minicircle").style.transform = 'translate(${dets.clientX}px, ${dets.clientY}px)'; 
     document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
})
}

circleMouseFollower();
firstPageAnim();
circleChaptaKaro();

document.querySelectorAll(".elem") .forEach(function(elem){
    var rotate=0;
    var difer=0;

    elem.addEventListener("mouseleave",function(details){
        var diff=details.clientY-elem.getBoundingClientRect().top;
         difer=details.clientX-rotate;
         rotate=details.clientX;
       gsap.to(elem.querySelector("img"),{
        opacity:0,
        ease:Power3,
        duration:0.5
       });
       });

    elem.addEventListener("mousemove",function(details){
        var diff=details.clientY-elem.getBoundingClientRect().top;
         difer=details.clientX-rotate;
         rotate=details.clientX;
       gsap.to(elem.querySelector("img"),{
        opacity:1,
        ease:Power3,
        top:diff, 
        left:details.clientX,
        rotate:gsap.utils.clamp(-20,20,difer*0.5)
       });
       });
    });


    // Calling showTime function at every second
setInterval(showTime, 1000);

// Defining showTime funcion
function showTime() {
	// Getting current time and date
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	am_pm = "AM";

	// Setting time for 12 Hrs format
	/*if (hour >= 12) {
		if (hour > 12) hour -= 12;
		am_pm = "PM";
	} else if (hour == 0) {
		hr = 12;
		am_pm = "AM";
	}*/

	hour =hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

	let currentTime =hour +":" +min +":" +sec +am_pm;

	// Displaying the time
	document.getElementById(
		"clock"
	).innerHTML = currentTime;
}
showTime();
