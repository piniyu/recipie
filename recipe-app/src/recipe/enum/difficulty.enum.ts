import { registerEnumType } from "@nestjs/graphql";
// import { Difficulty } from "@prisma/client";

export enum Difficulty {
  DIFFICULT5 = 'DIFFICULT5',
  DIFFICULT4 = 'DIFFICULT4',
  MODERATE3 = 'MODERATE3',
  EASY2 = 'EASY2',
  EASY1 = 'EASY1',
}

// export const Difficulty = {
//   DIFFICULT5: 'DIFFICULT5',
//   DIFFICULT4: 'DIFFICULT4',
//   MODERATE3: 'MODERATE3',
//   EASY2: 'EASY2',
//   EASY1: 'EASY1'
// };

// type x = typeof Difficulty[keyof typeof Difficulty]
// const test: x = '3'

// export type Difficulty = 'ACTIVE' | 'ARCHIVE' | 'DELETE' | 'DRAFT' | 'LOCK' | 'REPORTED';

registerEnumType(Difficulty, {
    name: 'Difficulty',
    description: 'The recipe difficulty scale of 1 to 5.',
});