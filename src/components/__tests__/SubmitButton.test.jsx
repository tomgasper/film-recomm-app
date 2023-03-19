import { render, fireEvent } from '@testing-library/react';
import { onButtonClick } from '../../handlers/handleButtonClick';
import SubmitButton from '../Buttons/SubmitButton';

jest.mock('../../handlers/handleButtonClick');

test('SubmitButton should render correctly', () => {
  const { getByTestId } = render(<SubmitButton type="accept" id={0} />);
  const buttonElement = getByTestId('button-accept');
  expect(buttonElement).toBeInTheDocument();
});

test('onButtonClick should be called when button is clicked', () => {
    onButtonClick.mockImplementation( () => {} );
    const { getByTestId } = render(<SubmitButton type="reject" id={0} />);
    const buttonElement = getByTestId('button-reject');

    fireEvent.click(buttonElement);
    expect(onButtonClick).toHaveBeenCalled();
});