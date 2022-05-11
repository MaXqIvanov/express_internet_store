const initial: any = {
  people: [],
  planets: [],
};

export default function reducer(state: any = initial, action: any) {
  switch (action.type) {
    case 'SET_PEOPLE': {
      return {
        ...state,
        people: [...state.people, action.payload],
      };
    }

    case 'SET_PLANETS': {
      return {
        ...state,
        planets: [...state.planets, action.payload],
      };
    }

    default:
      return state;
  }
}
