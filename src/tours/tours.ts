import { tour as helloWorldTour } from './helloWorldTour';
import { Tour } from './tour';

const tours = new Map<string, Tour>([
    [helloWorldTour.name, helloWorldTour],
]);

export const useTour = (name: string) => {
    const tour = tours.get(name);

    return tour;
}