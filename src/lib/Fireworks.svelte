<script lang="ts">
  import { Fireworks } from '@fireworks-js/svelte'
  import type { FireworksOptions } from '@fireworks-js/svelte'

  import {slide} from 'svelte/transition';

  let fw: Fireworks
  let options: FireworksOptions = {
    opacity: 1,
    autoresize: true
  }
  function toggleFireworks() {
    const fireworks = fw.fireworksInstance()
    if (fireworks.isRunning) {
      fireworks.waitStop()
    } else {
      fireworks.start()
    }
  }
  export let score: number;
  export let time: string;

</script>
<div class="fireworks-div">
    <Fireworks bind:this={fw} autostart={true} {options} class="fireworks" />
</div>
<div class="dashboard container">
    <div class="content" in:slide={{delay: 600}}>
        <h3>
            New Record!
        </h3>
        <h1>{score}</h1>
        <h5>Solved in {time}s</h5>
        <div>
            <button on:click class="btn btn-primary m-2">Play Again</button>
            <button class="btn btn-secondary m-2">Show Scores</button>
        </div>
    </div>
</div>

<style>
    .fireworks-div{
        background-color: black !important;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        position: absolute;
        z-index: 0;
    }
    .dashboard{
        display: flex;
        place-items: center;
        padding: 2em;
        color: white;
        min-height: 100vh;
        margin: auto;
        z-index: 1;
    }
    .content{
        margin: auto;
        text-align: center;
        backdrop-filter: blur(2px);
        background-color: rgba(255, 255, 255, 0.062);
        border: 1px solid white;
        padding: 2em;
        border-radius: 12px;
    }
    h1{
        font-size: 3.5em;
    }
</style>