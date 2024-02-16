<!-- eslint-disable @typescript-eslint/no-empty-function -->

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from "vue";
import GuidedTourStep from "./GuidedTourStep.vue";

const mounted = ref(false);

const props = defineProps({
    name: String,
    tour: {
        type: Object,
        default: () => {},
    },
});

let index = ref(0);
const isFirst = computed(() => index.value === 0);
const isLast = computed(() => index.value === props.tour.steps.length - 1);

const step = computed(() => props.tour.steps[index.value]);
const target = computed(() => step.value?.target);

const next = (payload: MouseEvent): void => {
    console.log("tour: next", payload);
    index.value++;
};

const previous = (payload: MouseEvent): void => {
    console.log("tour: previous", payload);
    index.value--;
};

const finish = (payload: MouseEvent): void => {
    console.log("tour: finish", payload);
    index.value = props.tour.steps.length;
};

watch(target, (value) => {
    console.log("tour: target", value);
});

onMounted(() => {
    console.log("tour: mounted");
    mounted.value = true;
});
</script>

<template>
    <div v-if="mounted" class="v-tour">
        <GuidedTourStep
            v-if="tour.steps[index]"
            :options="tour.options"
            :step="step"
            :isFirst="isFirst"
            :isLast="isLast"
            :next="next"
            :previous="previous"
            :finish="finish"
        ></GuidedTourStep>
    </div>
</template>

<style scoped>
body.v-tour--active {
    pointer-events: none;
}

.v-tour {
    pointer-events: auto;
}

.v-tour__target--highlighted {
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4);
    pointer-events: auto;
    z-index: 9999;
}

.v-tour__target--relative {
    position: relative;
}
</style>
