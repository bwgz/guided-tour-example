<script setup lang="ts">
import { ref } from "vue";
import { autoUpdate, useFloating } from "@floating-ui/vue";

const reference = ref(null);
const floating = ref(null);
const { floatingStyles } = useFloating(reference, floating,{
  placement: 'right',
  whileElementsMounted: autoUpdate,

});
</script>

<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button ref="reference">Button</button>
        <div ref="floating" :style="floatingStyles">Tooltip</div>
    </div>
</template>
