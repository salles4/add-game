<script>
  import wrongSfx from "../assets/wrong.mp3";
  import correctSfx from "../assets/correct.mp3";
  import completeSfx from "../assets/complete.mp3";
  import { Container } from "@sveltestrap/sveltestrap";
  import { createEventDispatcher } from "svelte";
  import Timer from "./Timer.svelte";

  let timerComponent;
  let num1 = 20;
  let num2 = 30;
  let guess;
  let finalTime;
  let score = 0;
  let scoreClass = "";
  randomize();
  function randomize() {
    let count = 15;
    const interval = setInterval(() => {
      num1 = Math.ceil(Math.random() * 100) + 1;
      num2 = Math.ceil(Math.random() * 100) + 1;
      count--;
      count === 0 ? clearInterval(interval) : "";
    }, 50);
  }
  function guessClicked() {
    timerComponent.add()
    if (guess == undefined || guess == "") {
      return;
    }
    if (num1 + num2 === guess) {
      guess = "";
      score += 1;
      scoreClass = "correct";
      new Audio(correctSfx).play();
      randomize();
    } else {
      guess = "";
      scoreClass = "wrong";
      new Audio(wrongSfx).play();
    }
  }
  const dispatch = createEventDispatcher();
  function complete() {
    let completeAudio = new Audio(completeSfx);
        completeAudio.volume = 0.9;
        completeAudio.play();
    finalTime = timerComponent.stop()
    dispatch("complete", {
      score: score,
      time: finalTime
    });
  }
</script>

<Container
  class="text-center d-flex justify-content-center align-items-center vh-100"
  style="overflow:hidden;"
>
<div class="content">
    <div class="pb-5">
      <i class="bi bi-tools"></i>
    </div>
    <h1 class="nums">{num1} + {num2}</h1>
    <input
      type="number"
      name="guess"
      bind:value={guess}
      on:keyup={(e) => (e.key === "Enter" ? guessClicked() : "")}
    />
    <button on:click={guessClicked} class="btn btn-secondary">Answer</button>
    <div>
      <h1 class={scoreClass}>
        Score: {score}
      </h1>
      <Timer bind:this={timerComponent} on:timesUp={complete}/>
      <small>+3 seconds per correct answer</small>
    </div>
  </div>
</Container>

<style>
  @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";

  .nums {
    font-size: 4em;
  }
  input {
    display: block;
    margin: 1em auto;
    font-size: 1.3em;
  }
  .btn {
    margin: 0 0 2em 0;
  }
  .correct {
    color: lightgreen;
    text-shadow:
      0 0 20px lightgreen,
      0 0 50px lightgreen,
      0 0 20px lightgreen;
  }
  .wrong {
    color: red;
    text-shadow:
      0 0 20px red,
      0 0 50px red,
      0 0 20px red;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
