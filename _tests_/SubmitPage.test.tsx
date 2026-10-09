import { render, screen, fireEvent } from '@testing-library/react';
import SubmitPage from '@/app/submitMemorial/page'; // change to where YOUR submit page lives
import { nigerianStates } from '@/app/lib/data/states';
import { relations } from '@/app/lib/data/relationship';

// ---------- FAKE PARTS ----------
// Your page uses two custom components (file upload and checkbox).
// We swap them for simple fake versions so the test only checks the PAGE.
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

// ---------- HELPERS (little shortcuts so we don't repeat ourselves) ----------
// Finds an input by its label and types a value into it.
function typeInto(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

// Fills the WHOLE form with good data.
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

  // The relationship <select> has no id, so its label isn't connected to it.
  // Workaround: it is the 2nd dropdown on the page.
  fireEvent.change(screen.getAllByRole('combobox')[1], {
    target: { value: relations[0] },
  });

  // Pretend to upload two files
  const file = new File(['hello'], 'document.pdf', { type: 'application/pdf' });
  fireEvent.change(screen.getByTestId('deathcert'), { target: { files: [file] } });
  fireEvent.change(screen.getByTestId('validId'), { target: { files: [file] } });

  // Tick the "I agree" box
  fireEvent.click(screen.getByRole('checkbox'));
}

// ---------- THE TESTS ----------
describe('SubmitPage', () => {
  it('shows the page title', () => {
    render(<SubmitPage />); // ARRANGE

    // ASSERT (nothing to act on here, we just look)
    expect(screen.getByText('Preserve a life remembered')).toBeInTheDocument();
  });

  it('shows error messages when the form is empty', async () => {
    render(<SubmitPage />); // ARRANGE

    fireEvent.click(screen.getByTestId('Submit Button')); // ACT

    // ASSERT. "await findBy..." means "wait until it appears".
    // We wait because the form checks its fields a tiny moment after the click.
    expect(await screen.findByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
    expect(screen.getByText('Select a state')).toBeInTheDocument();
    expect(screen.getByText('Death certificate is required')).toBeInTheDocument();
    expect(
      screen.getByText('Kindly agree to the terms and privacy policy to continue'),
    ).toBeInTheDocument();
  });

  it('removes numbers when typing a name', () => {
    render(<SubmitPage />); // ARRANGE

    typeInto(/^full name/i, 'Ada123'); // ACT

    expect(screen.getByLabelText(/^full name/i)).toHaveValue('Ada'); // ASSERT
  });

  it('shows the application data after a correct submit', async () => {
    render(<SubmitPage />); // ARRANGE

    fillWholeForm(); // ACT
    fireEvent.click(screen.getByTestId('Submit Button'));

    // ASSERT
    expect(await screen.findByText('Application Data')).toBeInTheDocument();
    expect(screen.getByText('Full Name: Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Applicant Name: Grace Hopper')).toBeInTheDocument();
  });

  it('opens the success pop-up after "Proceed to Submit"', async () => {
    render(<SubmitPage />); // ARRANGE

    fillWholeForm(); // ACT
    fireEvent.click(screen.getByTestId('Submit Button'));
    fireEvent.click(await screen.findByText('Proceed to Submit'));

    expect(screen.getByText('Memorial submitted')).toBeInTheDocument(); // ASSERT
  });
});