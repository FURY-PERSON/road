import { CounterSchema } from "../types/counter.schema";
import { counterReducer, counterActions } from "./counter.slice";

describe('counter.slice', () => {
  test('should decrement', () => {
    const state: CounterSchema = {
      value: 3 
    };

    expect(counterReducer(state, counterActions.decrement())).toEqual({value: 2})
  });

  test('should increment', () => {
    const state: CounterSchema = {
      value: 3 
    };

    expect(counterReducer(state, counterActions.increment())).toEqual({value: 4})
  });
  
  test('should work with empty state', () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({value: 1})
  });
});