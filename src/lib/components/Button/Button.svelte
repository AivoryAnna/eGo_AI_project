<script lang="ts">
  import '../Button/button.css';
  export let primary = false;
  export let backgroundColor: string | undefined = undefined;
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let label: string = '';
  export let type: 'reset' | 'submit' | 'button' | undefined;

  $: mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  $: style = backgroundColor ? `background-color: ${backgroundColor}` : '';
</script>

<button
  {type}
  class={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
  {style}
  on:click
>
  {label}
</button>
