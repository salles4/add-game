<script>
  import Addition from './lib/Addition.svelte';
  import Counter from './lib/Counter.svelte'
  import Fireworks from './lib/Fireworks.svelte';
  let complete = true
  function again(){
    complete = true
    console.log("again");
  }
  let score;
  let time;
</script>

<main>
  {#if complete}
    <Addition on:complete={e=>{score = e.detail.score; time = e.detail.time; complete = false}}/>
  {:else}
    <Fireworks score={score} time={time} on:click={again}/>
  {/if}
</main>

<style>

</style>
