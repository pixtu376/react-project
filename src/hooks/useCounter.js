import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../slices/counterSlice';

export const useCounter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return { count, increment: () => dispatch(increment()), decrement: () => dispatch(decrement()), reset: () => dispatch(reset()) };
};