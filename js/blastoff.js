// https://www.youtube.com/watch?v=OnoNITE-CLc

function startCountdown() {
    loadSlide("content");
    document.getElementById("header").hidden = true;
    document.getElementById("content").setAttribute("id", "content_black");
    document.getElementById("footer").setAttribute("id", "footer_black");
    handleTimer("content_black");
 }

 function loadSlide(field) {

    newContent = `
    <p style="text-align:center">
    <iframe width="1024" height="576" src="https://www.youtube.com/embed/OnoNITE-CLc?mute=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p>
    `
    document.getElementById(field).innerHTML = newContent;
}

function handleTimer(field) {
    existingContent = document.getElementById(field).innerHTML;
    newContent = existingContent + "<div id=\"countdownTimer\"></div>"
               + "<div id=\"statusDiv\"></div>";
    document.getElementById(field).innerHTML = newContent;

    var ms = 232000; // Starting value
    var liftoff = 136100; // Liftoff time
    var missionTime = 0; // Mission time starts at 0
    var switchover = ms - liftoff;

    var counter = setInterval(timer, 10); //interval will run every 10 ms

    function timer() {
        statusDiv = document.getElementById("statusDiv");
 
        ms -= 10;
        // Message control
        switch (ms) {
            case 230000: 
                statusDiv.innerHTML = "<h1 style=\"color: green;\">Welcome. Check the volume to make sure you can hear.</h1>";
                break;
            case 215000:
                statusDiv.innerHTML = "<h1>Checklist Begins</h1>";
                break;
            case 167000:
                statusDiv.innerHTML = "<h1 style=\"color: yellow;\">GO for Auto Sequence Start</font></h1><br />Vehicle is independent from launch pad.";
                break;
            case 136100:
                statusDiv.innerHTML = "<h1 style=\"color: red; weight: bold;\">L I F T O F F</font></h1>";
                break;
            case 120000:
                statusDiv.innerHTML = "<h1 style=\"color: white;\">ON MISSION</font></h1><br />Speed increases to > 750 MPH prior to sound barrier.<br />Once through the sound barrier, acceleration increases dramatically.";
                break;
            case 56000:
                statusDiv.innerHTML = "<h1 style=\"color: yellow;\">BOOSTER SEPARATION</font></h1><br />The shuttle is traveling at a speed of around 3,000 MPH at booster separation.";
                break;
            case 12000:
                statusDiv.innerHTML = "<h1 style=\"color: green;\">NEGATIVE RETURN</font></h1><br />The shuttle is outside the \"return to launch site\" window.<br />It cannot return to its origin due to distance from the launch site if the mission was aborted.";
                break;
            case 3000:
                statusDiv.innerHTML = "<h1 style=\"color: white;\">Thank you for watching!</font></h1>";
                break;
        }
        // Direct Timer control
        if (ms <= liftoff && ms > 0) {
            leader = "T + ";
            missionTime += 10;
            document.getElementById("countdownTimer").innerHTML = leader + msConversion(missionTime);

        } else if (switchover > 0) {
            switchover -= 10;
            leader = "T - ";
            document.getElementById("countdownTimer").innerHTML = leader + msConversion(switchover);
        } else if (ms <= 0) {
            document.getElementById("countdownTimer").innerHTML = "";
            clearInterval(counter);
            return;
        }
    }
}

function msConversion(ms) {
    var min = Math.floor(ms / 60000);
    var sec = ((ms % 60000) / 1000).toFixed(0);
   
    return (sec == 60 ? (min + 1) + ":00" : min + ":" + 
           (sec < 10 ? "0" : "") + sec);
}