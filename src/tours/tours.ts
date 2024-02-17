import { Tour } from './tour';
import { tour as helloWorldTour } from './helloWorldTour';
import { tour as newAboutPageTour } from './newAboutPageTour';

const tours = new Map<string, Tour>([
    [helloWorldTour.name, helloWorldTour],
    [newAboutPageTour.name, newAboutPageTour],
]);

export const useTour = (name: string) => {
    const tour = tours.get(name);

    return tour;
}