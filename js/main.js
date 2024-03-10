class Timer {
    constructor() {
        this.intervalId = null;
        this.startTime = null;
        this.endTime = null;
    }

    start(callback) {
        this.startTime = Date.now();
        this.endTime = null;
        this.intervalId = setInterval(() => {
            if (callback) callback(this.getTimeInMinSecFormat());
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.endTime = Date.now();
    }

    getElapsedTimeInSeconds() {
        if (!this.startTime) {
            return 0;
        }
        let endTime = this.endTime;
        if (!endTime) {
            endTime = Date.now();
        }
    
        let elapsedTimeInMillis = endTime - this.startTime;
        const result = Math.floor(elapsedTimeInMillis / 1000);
        return result
    }    

    getTimeInMinSecFormat() {
        let timeInSeconds = this.getElapsedTimeInSeconds();
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;

        minutes = (minutes < 10 ? '0' : '') + minutes;
        seconds = (seconds < 10 ? '0' : '') + seconds;
        const result = `${minutes}:${seconds}`;
        return result

    }

    getElapsedHoursAndMinutes() {
        if (!this.startTime) return [0, 0];
      
        let endTime = this.endTime || Date.now();
        let elapsedTimeInSeconds = Math.floor((endTime - this.startTime) / 1000);
      
        let hours = Math.floor(elapsedTimeInSeconds / 3600);
        let minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
      
        return [hours, minutes];
      }

    reset() {
        this.startTime = null;
        this.endTime = null;
    }
}
let timer = new Timer();



const displayInfo = (text) => {
    document.getElementById("alert-message").textContent = text
    document.getElementById("alert").style.opacity=1
    document.getElementsByClassName("alert-container")[0].style.zIndex=999
    setTimeout(()=>{
        document.getElementById("alert").style.opacity=0
        document.getElementsByClassName("alert-container")[0].style.zIndex=0
    }, 2000)
}

const updateTimerDisplay = (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    document.getElementById('timer').textContent = timeInSeconds; //`${minutes}:${seconds}`;
}

const stopTimer = () => {
    // пример без использования jQuery
    timer.stop();
    if (document.getElementById('running-task').textContent === '') return

    const elapsedTime = timer.getElapsedHoursAndMinutes();
    elspaedHours = elapsedTime[0]
    elapsedMinutes = elapsedTime[1]

    if (elapsedMinutes > 0) {
        let hours = elspaedHours > 0 ? `${elspaedHours} ч` : '' ;
        
        let minutes = elapsedMinutes % 60;
        document.getElementById('elapsed-time').textContent = `${hours} ${minutes} м`
        document.getElementById('finished-task').textContent = document.getElementById('running-task').textContent
    } else {
        document.getElementById('finished-task').textContent = ''
        document.getElementById('elapsed-time').textContent = `0 м`
        displayInfo('Задачи длительностью менее 1 минуты не сохраняются!')
    }
    document.getElementById('timer').textContent = `00:00`
    document.getElementById('running-task').textContent = ''
    document.getElementById('button-play').disabled = false
    timer.reset()
}


const start = () => {
    // пример с использованием jQuery
    task = $("#edit-task").val()
    if (task === '') {
        displayInfo('Введите текст задачи')
        return
    }
    $("#running-task").text($("#edit-task").val())
    $("#edit-task").val('')
    $("#running-task").click(stopTimer)
    $("#button-play").prop('disabled', true)
    timer.start(time => updateTimerDisplay(time));
}

$(document).ready(()=>{
    $("#button-play").click(()=>{
        start()
    })
})
