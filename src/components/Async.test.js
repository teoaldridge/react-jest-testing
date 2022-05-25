import { render, screen} from "@testing-library/react";
import Async from './Async';

describe('Async component', () => {
    test('renders posts if request succeeds', async () => {
        //here we use jest's inbuilt fetch function which help us create 
        //a dummy function which overwrites the real fetch function.
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ id: 'p1', title: 'First post'}]
        });
        render(<Async />)

        const listItemElements = await screen.findAllByRole('listitem');
        expect (listItemElements).not.toHaveLength(0);
        
    });
});



