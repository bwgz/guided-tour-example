
export type TourOptions = {
    buttons: {
        skip?: {
            label?: string,
        },
        previous?: {
            label?: string,
        },
        next?: {
            label?: string,
        },
        finish?: {
            label?: string,
        },
    },
    arrow?: boolean,
    beacon?: boolean,
};

export type TourPlacement = 'top' | 'right' | 'left' | 'bottom';

export type TourStep = {
    target?: string | HTMLElement,
    title?: string,
    content?: string,
    placement?: TourPlacement,
    arrow?: boolean,
    beacon?: boolean,
};

export type Tour = {
    name: string;
    options: TourOptions;
    steps: TourStep[];
}