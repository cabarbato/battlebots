import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Robots Activate header', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Robots Activate/i);
  expect(linkElement).toBeInTheDocument();
});
