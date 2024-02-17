import { Tour, TourOptions, TourStep } from "./tour";

const name = "new-about-page-tour";

const steps: TourStep[] = [
    {
        target: '[new-about-page-tour-step="1"]',
        content: "<i class=\"fa-regular fa-star fa-bounce\"></i> We added a new about page!",
        placement: "right",
        beacon: true,
    } as TourStep,
];

const options: TourOptions = {
    buttons: {
        finish: {
            label: "Got it!",
        },
    },
    arrow: true,
    beacon: false,
};

const tour: Tour = {
    name,
    options,
    steps,
};

export { tour };
