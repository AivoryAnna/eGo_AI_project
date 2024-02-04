<script lang="ts">
    export let type: 'reset' | 'submit' | 'button' | undefined;
    export let isFocused: boolean = false;
  </script>
  
  <button {type} on:click class="absolute end-2.5 bottom-2.5 {isFocused ? 'bg-custom-blue hover:bg-custom-blue focus:ring-4 focus:outline-none focus:ring-custom-blue' : 'bg-light-blue '}  font-medium rounded-lg text-sm px-4 py-2">
    <slot></slot>
  </button>