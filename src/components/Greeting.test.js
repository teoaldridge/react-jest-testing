

//screen gives us access to this virtual DOM/ Screen
//We can use screen to then find elements on that screen
//i.e. screen.get - to find somthing, .query, .find- other options for other scenarios
import { render, screen } from '@testing-library/react';

//userEvent is an object that helps us trigger user events on this virtual screen. 
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting'; 

describe ('Greeting Component', () => {
    test('renders Hello World as a text', () => {
        // Arrange
        //!!!Note that with render here we test the rendering of Greeting 
        //plus all the components that are added to it.
        render (<Greeting />); 
    
        // Act
    
        // Assert
        const helloWorldElement = screen.getByText('Hello World', { exact: false }); 
        expect(helloWorldElement).toBeInTheDocument(); 
    });

    test('Renders good to see you if the button was not clicked', () => {
        render (<Greeting />); 

        const outputElement = screen.getByText('good to see you', { exact: false });
        expect(outputElement).toBeInTheDocument();
    });

    test('renders "Changed" if the button was clicked', () => {
        //Arrange 
        render (<Greeting />); 

        //Act
        const buttonElement = screen.getByRole('button'); 
        userEvent.click(buttonElement); 

        //Assert
        const outputElement = screen.getByText('Changed!');
        expect(outputElement).toBeInTheDocument();
    });

    test('does not render "good to see you" if the button was clicked', () => {
        //Arrange 
        render (<Greeting />); 

        //Act
        const buttonElement = screen.getByRole('button'); 
        userEvent.click(buttonElement); 

        //Assert
        //here we use queryByText instead, 
        //because it will not just throw an error if the element is not found, 
        //- it will return null.
        const outputElement = screen.queryByText('good to see you', {exact: false});
        expect(outputElement).toBeNull();
    });
}); 

