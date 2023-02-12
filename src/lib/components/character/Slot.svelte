<script>
  export let slot;
</script>

<div class="slot">
  { slot.name }
</div>

<style>
  .slot {
    border: 1px solid red;
    width: 32px;
    height: 32px;

    user-select: none;
  }
</style>