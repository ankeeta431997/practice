import { render, screen ,fireEvent, waitFor  } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import AuthorizationService from './services/auth.service';
// import Calculator from './components/calculator/Calculator';
// import CalculatorComponent from './components/model/CalculatorComponent';
// import { functionButtons, numberButtons, operatorButtons } from
'./components/model/ButtonValues';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is Home Pages.../i);
  expect(linkElement).toBeInTheDocument();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('axios');

it('should render Login component when navigating to /login', () => {
  const { container } = render(<App />);
  const loginLink = screen.getByText('Login');
  fireEvent.click(loginLink);
  expect(container.querySelector('.Auth-form-container')).toBeInTheDocument();
});


it('should render Register component when navigating to /register', () => {
  const { container } = render(<App />);
  const registerLink = screen.getByText('Register');
  fireEvent.click(registerLink);
  expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
});

it('should successfully submit login form with valid credentials', async () => {
  // You can mock the API response using 'axios' mockResolvedValueOnce
  // Here, we assume the login is successful, and the user will be redirected to '/calculator'
  const mockLoginResponse = { data: { accessToken: 'dummyAccessToken' } };

  // Mock axios.post instead of AuthorizationService.login
  axios.post.mockResolvedValueOnce(mockLoginResponse);

  const { container } = render(<App />);
  const loginLink = screen.getByText('Login');
  fireEvent.click(loginLink);

  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.queryByText('Invalid credentials. Please try again.')).not.toBeInTheDocument();
  });
});

it('should show error message for invalid credentials on login', async () => {
  // Here, we assume the login fails and the error message should be displayed
   // Here, we assume the login fails and the error message should be displayed
   const mockErrorResponse = { data: { message: 'Invalid credentials' } };
   // Mock axios.post to reject the promise with the error response
   axios.post.mockRejectedValueOnce(mockErrorResponse);

   const { container } = render(<App />);
   const loginLink = screen.getByText('Login');
   fireEvent.click(loginLink);

   const usernameInput = screen.getByLabelText('Username');
   const passwordInput = screen.getByLabelText('Password');
   const submitButton = screen.getByRole('button', { name: /submit/i });

   fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
   fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
   fireEvent.click(submitButton);

   await waitFor(() => {
     expect(screen.queryByText('Invalid credentials. Please try again.')).toBeInTheDocument();
   });
 });

