<!-- eslint-disable @typescript-eslint/no-empty-function -->

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from "vue";
import { offset, arrow, autoUpdate, useFloating } from "@floating-ui/vue";

const props = defineProps({
    tour: {
        type: Object,
        default: () => {},
    },
});

/**
 * State of the tour.
 */
const state = ref<Record<string, string | number | boolean | undefined>>({});
/*
 * Index of the current step. When the tour is finished or skipped it is set to
 * number of steps. 
 */
const index = ref();
/*
 * Current step of the tour. Based on the index. Will be undefined if the index 
 * exceeds the number of steps.
 */
const step = ref(); 
/*
 * Reference to the element that the tour is currently focused on.
 */
const target = ref();
/*
 * Reference to the floating element that is positioned around the target.
 */
const floating = ref();
/*
 * Whether the floating element is visible.
 */
const open = ref(false);
/*
 * Placement of the floating element. Take from the step.
 */
const placement = ref();
const placementArrow = ref();
const placementArrowColor = ref();
const floatingArrow = ref();

const stepHasArrow = computed(() => (step.value?.arrow !== undefined ? step.value.arrow : props.tour?.options?.arrow));
const stepHasBeacon = computed(() =>
    step.value?.beacon !== undefined ? step.value.beacon : props.tour?.options?.beacon
);

const offsetValue = () => (stepHasBeacon.value ? 50 : 20);

const { floatingStyles, middlewareData, update } = useFloating(target, floating, {
    middleware: [
        offset(offsetValue),
        arrow({
            element: floatingArrow,
        }),
    ],
    open,
    placement,
    whileElementsMounted: autoUpdate,
});

console.log("floatingStyles", floatingStyles.value);

const isFirst = computed(() => index.value === 0);
const isLast = computed(() => index.value === props.tour.steps.length - 1);

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

const placementArrowColorMap: Record<string, string> = {
    top: "#0063a3",
    bottom: "#004f83",
    left: "#0063a3",
    right: "#0063a3",
};

watch(step, (value) => {
    console.log("watch step", JSON.stringify(value));
    if (value !== undefined) {
        target.value = document.querySelector(value.target);
        placement.value = value.placement;
        placementArrow.value = placementArrowMap[placement.value];
        placementArrowColor.value = placementArrowColorMap[placement.value];
        update();
    }
});

watch(target, (value) => {
    console.log("watch reference", value);
    if (value) {
        value.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
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
    <div>
        <div ref="floating" class="v-tour" :style="floatingStyles">
            <div v-if="step" class="v-step">
                <div v-if="step.title" v-html="step.title" class="v-step__header"></div>
                <div v-if="step.content" v-html="step.content" class="v-step__content"></div>
                <div v-if="step.title || step.content">
                    <div class="v-step__buttons">
                        <button
                            v-if="tour.options.buttons.skip?.label && !isLast"
                            @click.prevent="finish"
                            class="v-step__button"
                        >
                            {{ tour.options.buttons.skip.label }}
                        </button>
                        <button
                            v-if="tour.options.buttons.previous?.label && !isFirst"
                            @click.prevent="previous"
                            class="v-step__button"
                        >
                            {{ tour.options.buttons.previous.label }}
                        </button>
                        <button
                            v-if="tour.options.buttons.next?.label && !isLast"
                            @click.prevent="next"
                            class="v-step__button"
                        >
                            {{ tour.options.buttons.next.label }}
                        </button>
                        <button
                            v-if="tour.options.buttons.finish?.label && isLast"
                            @click.prevent="finish"
                            class="v-step__button"
                        >
                            {{ tour.options.buttons.finish.label }}
                        </button>
                    </div>
                    <div
                        v-if="stepHasArrow"
                        ref="floatingArrow"
                        :style="{
                            position: 'absolute',
                            width: '20px',
                            height: '20px',
                            background: placementArrowColor,
                            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
                            [placementArrow]: '-10px',
                            transform: 'rotate(45deg)',
                            zIndex: -1,
                        }"
                    ></div>
                    <span
                        v-if="stepHasBeacon"
                        class="dot"
                        :style="{
                            position: 'absolute',
                            width: '20px',
                            height: '20px',
                            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
                            [placementArrow]: '-40px',
                            transform: 'rotate(45deg)',
                            zIndex: 1,
                        }"
                    ></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.v-tour {
    pointer-events: auto;
}

.v-step {
    background: #0063a3; /* #ffc107, #35495e */
    color: white;
    max-width: 320px;
    border-radius: 3px;
    padding: 1rem;
    pointer-events: auto;
    text-align: center;
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
    border: 1px solid white;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
    height: 24px;
    line-height: 1rem;
    outline: none;
    margin: 0 0.2rem;
    padding: 3px 16px;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s ease;
    vertical-align: middle;
    white-space: nowrap;

    &:hover {
        background-color: #005288;
        color: white;
    }
}

.dot {
    background-color: red;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: block;
    z-index: 1;
    position: absolute;
}
.dot::before {
    background-color: red;
    content: "";
    top: calc(50% - 5px);
    left: calc(50% - 5px);
    width: 10px;
    height: 10px;
    opacity: 1;
    border-radius: 50%;
    position: absolute;
    animation: burst-animation 1s infinite;
    animation-fill-mode: forwards;
    z-index: 0;
}
@keyframes burst-animation {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(4);
    }
}
</style>
