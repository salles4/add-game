<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
</svelte:head>
<script>
  import Addition from './lib/Addition.svelte';
  import Fireworks from './lib/Fireworks.svelte';
  let complete = false
  function again(){
    complete = false
  }
  let score;
  let time;
</script>

<main>
  {#if !complete}
    <Addition on:complete={e=>{score = e.detail.score; time = e.detail.time; complete = true}}/>
  {:else}
    <Fireworks score={score} time={time} on:click={again}/>
  {/if}
</main>

<style>

</style>
