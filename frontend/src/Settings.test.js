import '@testing-library/jest-dom';
import Settings from './components/Settings';

test("increments counter", () => {
    // render the component on virtual dom
    render(<Settings />);
    
    //select the elements you want to interact with
    const counter = screen.getByTestId("newPass");
    
    expect(counter).toBeInTheDocument();
});