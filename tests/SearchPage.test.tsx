import SearchPage from "@/app/pages/search/page";
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// const getFileInputs = (container: HTMLElement) => 
//     Array.from(container.querySelectorAll<HTMLInputElement>('input[type=file]'));

async function fillForm(
    user: ReturnType<typeof userEvent.setup>, 
) {
    await user.type(screen.getByLabelText (/^full name/i), "Abigail Ufuoma Onyeka");

    await user.type(screen.getByLabelText(/year of passing from/i), "2004");

    await user.type(screen.getByLabelText(/year of passing to/i), "2026")

    await user.selectOptions(screen.getByLabelText(/state of passing/i), "Delta")


    
}

describe('SearchPage', () => {
    it('should render the search form with all label', () => {
        render(<SearchPage/>)

        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/year of passing from/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/year of passing to/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/state of passing/i)).toBeInTheDocument();
    });

    it('put what the user types in the search field', async () => {
        const user = userEvent.setup();
        render(<SearchPage/>);

        await fillForm(user);

        expect(screen.getByLabelText(/full name/i)).toHaveValue("Abigail Ufuoma Onyeka");
        // expect(screen.getByLabelText(/state of passing/)).toHaveValue("combobox");
        expect(screen.getByLabelText(/year of passing from/i)).toHaveValue("2004");
                expect(screen.getByLabelText(/year of passing to/i)).toHaveValue("2026");
                      expect(screen.getByLabelText(/^state of passing/i)).toHaveValue("Delta");
    });

    it('should render the search result', async () => {
        const user = userEvent.setup();
        render (<SearchPage/>);
        
        await fillForm(user);
        await user.click(screen.getByRole("button", {name: /search/i}));

        expect(screen.getByText("Abigail Ufuoma Onyeka")).toBeInTheDocument();
        expect(screen.getByText(/1 record found/i)).toBeInTheDocument();
    });

    it('should show an empty state when search field is empty or no record is found', async () => {
        const user = userEvent.setup();
        render(<SearchPage/>)

        await user.type(screen.getByLabelText(/full name/i), "jesuqq");
        await user.click(screen.getByRole("button", {name: /search/i}));

        expect(screen.getByText(/no records found/i)).toBeInTheDocument();
    })
})
