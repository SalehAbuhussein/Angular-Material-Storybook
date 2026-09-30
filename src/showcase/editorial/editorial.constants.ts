import type { BodyBlock, Section } from './editorial.types';

export const SECTIONS: Section[] = [
  { id: 's1', label: 'The quiet part' },
  { id: 's2', label: 'What the tokens changed' },
  { id: 's3', label: 'A note on restraint' },
];

export const BODY: BodyBlock[] = [
  {
    id: 's1',
    heading: 'The quiet part',
    lead: true,
    paras: [
      'Design systems are mostly agreements. The components are the visible half, and the half everyone argues about, but the part that decides whether a product feels coherent is the set of decisions nobody writes down: how much air a heading gets, when a rule earns its place, which greys are allowed.',
      'A component library that ships opinions about all of that is doing you a favour right up until the moment your product needs a different opinion. Then it becomes a negotiation, and the negotiation is usually settled by whoever is most willing to write selectors at two in the morning.',
    ],
  },
  {
    id: 's2',
    heading: 'What the tokens changed',
    paras: [
      'The interesting shift is that the opinions moved out of the compiled stylesheet and into custom properties. That sounds like plumbing. It is not. It means the negotiation happens in CSS you own, at runtime, in a scope you choose, rather than in a fork you maintain.',
      'This page is the proof by contradiction. There is nothing here that looks like Material, and yet the list, the chips, the slider and the reading progress bar are all stock components with their tokens pointed somewhere else.',
    ],
  },
  {
    id: 's3',
    heading: 'A note on restraint',
    paras: [
      'The temptation, once you can restyle everything, is to restyle everything. Resist it in the places where the default carries meaning: focus rings, disabled states, error colours, the size of a touch target. Those are not aesthetic choices wearing a disguise. They are the reasons the component was worth using.',
      'Change the surface. Keep the behaviour.',
    ],
  },
];

export const DEFAULT_MEASURE = 66;
