<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  
  const answerTime = 20;
  const bonusTime = 3;
  let time = "00:00"
  let endTime = 0;
  let startTime = 0;
  let interval;
  function start(){
    startTime = Date.now()
    endTime = Date.now() + (answerTime * 1000)
    interval = setInterval(update, 60)
  }
  export function add(){
    endTime += (bonusTime * 1000)
  }
  export function stop(){
    clearInterval(interval)
    let totalTime = Date.now() - startTime;
    return dateToString(totalTime);
  }
  function update(){
    let timeLeft = endTime - Date.now();
    time = dateToString(timeLeft)
    if(timeLeft < 0){
      stop()
      time = "0:00"
      dispatch("timesUp")
    }
  }
  /**
   * @param {number} date
   */
  function dateToString(date){
    let seconds = Math.floor(date / 1000 % 60);
    let ms = Math.floor(date % 1000 / 10)
    let sString = String(seconds).padStart(2,"0")
    let msString = String(ms).padStart(2,"0")
    return `${sString}:${msString}`;
  }
  start()
</script>


<h4>{time}</h4>