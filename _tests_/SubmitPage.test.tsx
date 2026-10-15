import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubmitPage from '@/app/pages/submitMemorial/page'; 
import { nigerianStates } from '@/app/lib/data/states';
import { relations } from '@/app/lib/data/relationship';


jest.mock('@/app/components/fileUploadPractice', () => ({
  FileUploadCardPractice: ({
    id,
    onFileSelect,
  }: {
    id: string;
    onFileSelect: (f: File | undefined) => void;
  }) => (
    <input
      type="file"
      data-testid={id}
      onChange={(e) => onFileSelect(e.target.files?.[0])}
    />
  ),
}));

jest.mock('@/app/components/checkbox', () => ({
  Checkbox: ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  ),
}));

function typeInto(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function fillWholeForm() {
  typeInto(/^full name/i, 'Ada Lovelace');
  typeInto(/date of birth/i, '1950-01-01');
  typeInto(/date of death/i, '2020-05-10');
  typeInto(/state of death/i, nigerianStates[0]);
  typeInto(/^lga/i, 'Ikeja');
  typeInto(/burial site/i, 'Vaults Gardens Cemetery Lagos');
  typeInto(/caretaker name/i, 'John Caretaker');
  typeInto(/caretaker phone number/i, '08012345678');
  typeInto(/applicant full name/i, 'Grace Hopper');
  typeInto(/email address/i, 'grace@example.com');
  typeInto(/^phone number/i, '08098765432');

  
  fireEvent.change(screen.getAllByRole('combobox')[1], {
    target: { value: relations[0] },
  });

  //upload ,mock files
  const file = new File(['hello'], 'document.pdf', { type: 'application/pdf' });
  fireEvent.change(screen.getByTestId('deathcert'), { target: { files: [file] } });
  fireEvent.change(screen.getByTestId('validId'), { target: { files: [file] } });

  // Tick the "I agree" box
  fireEvent.click(screen.getByRole('checkbox'));
}

describe('SubmitPage', () => {
  it('shows the page title', () => {
    render(<SubmitPage />);

    expect(screen.getByText('Preserve a life remembered')).toBeInTheDocument();
  });

  it('shows error messages when the form is empty', async () => {
    render(<SubmitPage />);

    fireEvent.click(screen.getByTestId('Submit Button'));

    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
      expect(screen.getByText('Select a state')).toBeInTheDocument();
      expect(screen.getByText('Death certificate is required')).toBeInTheDocument();
      expect(
        screen.getByText('Kindly agree to the terms and privacy policy to continue'),
      ).toBeInTheDocument();
    });
  });

  // This test is now async, and waits for the form to finish checking
  it('removes numbers when typing a name', async () => {
    render(<SubmitPage />);

    typeInto(/^full name/i, 'Ada123');

    await waitFor(() => {
      expect(screen.getByLabelText(/^full name/i)).toHaveValue('Ada');
    });
  });

  it('shows the application data after a correct submit', async () => {
    render(<SubmitPage />);

    fillWholeForm();
    fireEvent.click(screen.getByTestId('Submit Button'));

    await waitFor(() => {
      expect(screen.getByText('Application Data')).toBeInTheDocument();
      expect(screen.getByText('Full Name: Ada Lovelace')).toBeInTheDocument();
      expect(screen.getByText('Applicant Name: Grace Hopper')).toBeInTheDocument();
    });
  });

  it('opens the success pop-up after "Proceed to Submit"', async () => {
    render(<SubmitPage />);

    fillWholeForm();
    fireEvent.click(screen.getByTestId('Submit Button'));
    fireEvent.click(await screen.findByText('Proceed to Submit'));

    expect(screen.getByText('Memorial submitted')).toBeInTheDocument();
  });
});