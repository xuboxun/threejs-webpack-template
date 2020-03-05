<script>
  export let direction = "up";
</script>

<style>
  .icon {
    width: 40px;
    height: 40px;
    opacity: 0.1;
  }
  .arrow-right {
    transform: rotate(90deg);
  }
  .arrow-down {
    transform: rotate(180deg);
  }
  .arrow-left {
    transform: rotate(-90deg);
  }
</style>

<svg class="icon arrow-{direction}" viewBox="0 0 1024 1024">
  <path
    fill="#999"
    d="M491 254L12 732a36 36 0 0051 50l455-455 447 448a34 34 0 1049-49L549
    261l-6-4-2-3a36 36 0 00-50 0z" />
</svg>
