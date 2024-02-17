const name = "home-world-tour";

const steps = [
    {
        target: '[hello-world-tour-step="1"]',
        title: "Step 1",
        content: "This is the first step",
        placement: "top",
    },
    {
        target: '[hello-world-tour-step="2"]',
        title: "Step 2",
        content: "This is the second step",
        placement: "left",
    },
    {
        target: '[hello-world-tour-step="3"]',
        title: "Step 3",
        content: "This is the third step",
        placement: "right",
    },
];

const options = {
    buttons: {
        skip: {
            label: "Skip",
        },
        previous: {
            label: "Previous",
        },
        next: {
            label: "Next",
        },
        finish: {
            label: "Finish",
        },
    },
};

const tour = {
    name,
    options,
    steps,
};

export { tour };
