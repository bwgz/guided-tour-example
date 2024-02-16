<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-empty-function -->
<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from "vue";
import { arrow, autoUpdate, useFloating } from "@floating-ui/vue";

const mounted = ref(false);

const props = defineProps({
    name: String,
    options: {
        type: Object,
        default: () => {},
    },
    step: {
        type: Object,
        default: (() => {}) as ((payload: MouseEvent) => void) | undefined,
    },
    next: {
        type: Function,
        default: (): void => {},
    },
    previous: {
        type: Function,
        default: (): void => {},
    },
    finish: {
        type: Function,
        default: (): void => {},
    },
    isFirst: Boolean,
    isLast: Boolean,
});

const floating = ref(null);
const floatingArrow = ref(null);

const target = computed(() => mounted.value && document.querySelector(props.step.target));

const { floatingStyles, isPositioned, middlewareData } = useFloating(target, floating, {
    placement: props.step.placement,
    whileElementsMounted: autoUpdate,
    middleware: [arrow({ element: floatingArrow })],
});

const next = (payload: MouseEvent): void => {
    props.next();
};

const previous = (payload: MouseEvent): void => {
    props.previous();
};

const finish = (payload: MouseEvent): void => {
    props.finish();
};

watch(target, (value) => {
    console.log("target", value);
    if (value) {
        //value.scrollIntoView({ behavior: "smooth" });
    }
});

watch(isPositioned, (isPositioned) => {
  if (isPositioned) {
    target.value.focus();
    target.value.scrollIntoView();
  }
});

onMounted(() => {
    console.log("tour step: mounted");
    mounted.value = true;
});
</script>

<template>
    <div v-if="mounted" ref="floating" class="v-step" :style="floatingStyles">
        <div v-if="step.title" v-html="step.title" class="v-step__header"></div>
        <div v-if="step.content" v-html="step.content" class="v-step__content"></div>
        <div class="v-step__buttons">
            <button v-if="!isLast" @click.prevent="finish" class="v-step__button v-step__button-skip">
                {{ options.buttons.skip.label }}
            </button>
            <button v-if="!isFirst" @click.prevent="previous" class="v-step__button v-step__button-previous">
                {{ options.buttons.previous.label }}
            </button>
            <button v-if="!isLast" @click.prevent="next" class="v-step__button v-step__button-next">
                {{ options.buttons.next.label }}
            </button>
            <button v-if="isLast" @click.prevent="finish" class="v-step__button v-step__button-finish">
                {{ options.buttons.finish.label }}
            </button>
        </div>
        <div 
            ref="floatingArrow"
            :style="{
                position: 'absolute',
                left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
            }"
        ></div>
    </div>
</template>

<style scoped>
.v-step {
    background: #50596c; /* #ffc107, #35495e */
    color: white;
    max-width: 320px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    padding: 1rem;
    pointer-events: auto;
    text-align: center;
    z-index: 10000;

    &--sticky {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        & .v-step__arrow {
            display: none;
        }
    }
}

.v-step__arrow,
.v-step__arrow::before {
    position: absolute;
    width: 10px;
    height: 10px;
    background: inherit;
}

.v-step__arrow {
    visibility: hidden;

    &--dark {
        &:before {
            background: #454d5d;
        }
    }
}

.v-step__arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
    margin-left: -5px;
}

.v-step[data-popper-placement^="top"] > .v-step__arrow {
    bottom: -5px;
}

.v-step[data-popper-placement^="bottom"] > .v-step__arrow {
    top: -5px;
}

.v-step[data-popper-placement^="right"] > .v-step__arrow {
    left: -5px;
}

.v-step[data-popper-placement^="left"] > .v-step__arrow {
    right: -5px;
}

/* Custom */

.v-step__header {
    margin: -1rem -1rem 0.5rem;
    padding: 0.5rem;
    background-color: #454d5d;
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
