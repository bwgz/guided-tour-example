const name = "home-world-tour";

const steps = [
    {
        target: '[hello-world-tour-step="1"]',
        title: "<div><img src=\"https://3dwarehouse.sketchup.com/warehouse/v1.0/content/public/3d2bfd9f-13a4-4413-831f-e4bb97c56ce6\" height=12/> <span>Step 1</span></div>",
        content: "<i class=\"fa-solid fa-star\"></i> This is the first step",
        placement: "top",
    },
    {
        target: '[hello-world-tour-step="2"]',
        title: "Step 2",
        content: "<img src=\"https://3dwarehouse.sketchup.com/warehouse/v1.0/content/public/26425ffc-bb78-4af6-b21f-3a14fd25eb65\"/><p>Lino Chair",
        placement: "left",
    },
    {
        target: '[hello-world-tour-step="3"]',
        title: "Step 3",
        content: "This is the third step",
        placement: "right",
    },
    {
        target: '[hello-world-tour-step="4"]',
        title: "Step 4",
        content: "As he crossed toward the pharmacy at the corner he involuntarily turned his head because of a burst of light that had ricocheted from his temple, and saw, with that quick smile with which we greet a rainbow or a rose, a blindingly white parallelogram of sky being unloaded from the van—a dresser with mirrors across which, as across a cinema screen, passed a flawlessly clear reflection of boughs sliding and swaying not arboreally, but with a human vacillation, produced by the nature of those who were carrying this sky, these boughs, this gliding façade.",
        placement: "bottom",
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
