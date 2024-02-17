<!-- eslint-disable @typescript-eslint/no-empty-function -->

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from "vue";
import { offset, arrow, shift, flip, autoUpdate, useFloating } from "@floating-ui/vue";

const props = defineProps({
    tour: {
        type: Object,
        default: () => {},
    },
});

const state = ref<Record<string, string | number | boolean | undefined>>({});
const index = ref(); // index is the current step that the tour is focused on
const step = ref(); // step is the current step that the tour is focused on
const target = ref(); // target is the reference to the element that the tour is currently focused on
const floating = ref(); // floating is the reference to the floating element that is positioned around the target
const open = ref(false); // open is a boolean that determines whether the floating element is visible
const placement = ref(); // placement is how the floating element
const placementArrow = ref();
const floatingArrow = ref();

const { floatingStyles, isPositioned, middlewareData } = useFloating(target, floating, {
    middleware: [
        offset(15),
        arrow({
            element: floatingArrow,
        }),
    ],
    open,
    placement,
    whileElementsMounted: autoUpdate,
});

const isFirst = computed(() => index.value === 0);
const isLast = computed(() => index.value === props.tour.steps.length - 1);

watch(isPositioned, (value) => {
    console.log("isPositioned", value);
    target.value.focus();
    target.value.scrollIntoView();
});

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

watch(index, (value) => {
    console.log("watch index", value);
    if (value !== undefined) {
        step.value = props.tour.steps[value];
        localStorage.setItem(props.tour.name, JSON.stringify({ index: value }));
    } else {
        state.value.index = undefined;
    }
});

const placementArrowMap: Record<string, string> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
};

watch(step, (value) => {
    console.log("watch step", JSON.stringify(value));
    if (value !== undefined) {
        target.value = document.querySelector(value.target);
        placement.value = value.placement;
        placementArrow.value = placementArrowMap[placement.value];
    }
});

watch(target, (value) => {
    console.log("watch reference", value);
    if (value) {
        value.scrollIntoView({ behavior: "smooth" });
    }
});

watch(state, (value) => {
    console.log("watch state", value);
    if (value) {
        open.value = true;
    }
});

onMounted(() => {
    console.log("onMounted");
    const item = localStorage.getItem(props.tour.name);
    console.log("onMounted - item", item);
    if (item) {
        const json = JSON.parse(item);
        console.log("onMounted - index", json.index);
        if (json !== undefined) {
            index.value = json.index;
        }
    } else {
        index.value = 0;
    }
});
</script>

<template>
    <div id="target">
        <div ref="floating" class="v-tour" :style="floatingStyles">
            <div v-if="step" class="v-step">
                <div v-html="step.title" class="v-step__header"></div>
                <div v-html="step.content" class="v-step__content"></div>
                <div class="v-step__buttons">
                    <button v-if="!isLast" @click.prevent="finish" class="v-step__button">
                        {{ tour.options.buttons.skip.label }}
                    </button>
                    <button v-if="!isFirst" @click.prevent="previous" class="v-step__button">
                        {{ tour.options.buttons.previous.label }}
                    </button>
                    <button v-if="!isLast" @click.prevent="next" class="v-step__button">
                        {{ tour.options.buttons.next.label }}
                    </button>
                    <button v-if="isLast" @click.prevent="finish" class="v-step__button">
                        {{ tour.options.buttons.finish.label }}
                    </button>
                </div>
                <div
                    ref="floatingArrow"
                    :style="{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        background: '#0063a3',
                        left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                        top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
                        [placementArrow]: '-10px',
                        transform: 'rotate(45deg)',
                    }"
                ></div>
            </div>
        </div>
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

.v-step {
    background: #0063a3; /* #ffc107, #35495e */
    color: white;
    max-width: 320px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    padding: 1rem;
    pointer-events: auto;
    text-align: center;
    z-index: 10000;
}


.v-step__header {
    margin: -1rem -1rem 0.5rem;
    padding: 0.5rem;
    background-color: #004f83;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.v-step__content {
    margin: 0 0 1rem 0;
}

.v-step__button {
    background: transparent;
    border: 0.05rem solid white;
    border-radius: 0.1rem;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8rem;
    height: 1.8rem;
    line-height: 1rem;
    outline: none;
    margin: 0 0.2rem;
    padding: 0.35rem 0.4rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s ease;
    vertical-align: middle;
    white-space: nowrap;

    &:hover {
        background-color: rgba(white, 0.95);
        color: #50596c;
    }
}
</style>
