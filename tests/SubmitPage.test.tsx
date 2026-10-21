import SubmitPage from "@/app/pages/submitMemorial/page";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const submitButton = () =>
  screen.getByRole("button", { name: /submit memorial for review/i });

const makeFile = (name: string) =>
  new File(["dummy"], name, { type: "application/pdf" });

const getFileInputs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLInputElement>('input[type="file"]'));

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement,
) {
  await user.type(screen.getByLabelText(/^full name/i), "John Adeyemi");

  fireEvent.change(screen.getByLabelText(/date of birth/i), {
    target: { value: "1950-05-10" },
  });
  fireEvent.change(screen.getByLabelText(/date of death/i), {
    target: { value: "2026-01-15" },
  });

 
  const [stateSelect, relationSelect] = screen.getAllByRole(
    "combobox",
  ) as HTMLSelectElement[];
  await user.selectOptions(stateSelect, stateSelect.options[1].value);

  await user.type(screen.getByLabelText(/^lga/i), "Ikeja");
  await user.type(screen.getByLabelText(/burial site/i), "Vaults Gardens Cemetery");
  await user.type(screen.getByLabelText(/caretaker name/i), "Musa Bello");
  await user.type(screen.getByLabelText(/caretaker phone number/i), "08012345678");
  await user.type(screen.getByLabelText(/applicant full name/i), "Jane Adeyemi");

  await user.selectOptions(relationSelect, relationSelect.options[1].value);

  await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
  await user.type(screen.getByLabelText(/^phone number/i), "08087654321");

  const [deathCert, validId] = getFileInputs(container);
  await user.upload(deathCert, makeFile("death-cert.pdf"));
  await user.upload(validId, makeFile("valid-id.pdf"));

  await user.click(screen.getByRole("checkbox")); // agree to terms
}


describe("SubmitPage", () => {
  it("should render the form with all the fields", () => {
    render(<SubmitPage />);

    expect(screen.getByLabelText(/^full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^nee$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of death/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state of death/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^lga/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/burial site/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/short biography/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/caretaker name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/caretaker phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/applicant full name/i)).toBeInTheDocument();
    expect(screen.getByText(/your relationship to the deceased/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^phone number/i)).toBeInTheDocument();
  });

  it("should link to privacy policy page", () => {
    render(<SubmitPage />);

    const link = screen.getByRole("link", { name: /privacy policy/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pages/terms_privacy/privacy");
  });

  it("should link to terms page", () => {
    render(<SubmitPage />);

    const link = screen.getByRole("link", { name: /terms of service/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pages/terms_privacy/terms");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const button = submitButton();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();
  });

  it("should not disable button if agreed to terms", async () => {
    render(<SubmitPage />);

    const checkbox = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    const button = submitButton();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeEnabled();
  });

  describe("submitting an empty form", () => {
    it("shows an error for every required field", async () => {
      const user = userEvent.setup();
      render(<SubmitPage />);

      await user.click(screen.getByRole("checkbox"));
      await user.click(submitButton());

      expect(await screen.findByText("Full name is required")).toBeInTheDocument();
      expect(screen.getByText("Your full name is required")).toBeInTheDocument();
      expect(screen.getByText("caretaker name is required")).toBeInTheDocument();
      expect(screen.getByText("Date of Birth is required")).toBeInTheDocument();
      expect(screen.getByText("Date of Death is required")).toBeInTheDocument();
      expect(screen.getByText("Select a state")).toBeInTheDocument();
      expect(screen.getByText("LGA is required")).toBeInTheDocument();
      expect(screen.getByText("Burial site is required")).toBeInTheDocument();
      expect(screen.getByText("Select your relationship with deceased")).toBeInTheDocument();
      expect(screen.getByText("invalid email address")).toBeInTheDocument();
      expect(screen.getByText("Death certificate is required")).toBeInTheDocument();
      expect(screen.getByText("Valid ID is required")).toBeInTheDocument();

      expect(screen.getAllByText("enter a valid phone number")).toHaveLength(2);
    });

    it("does not show the submitted data", async () => {
      const user = userEvent.setup();
      render(<SubmitPage />);

      await user.click(screen.getByRole("checkbox"));
      await user.click(submitButton());

      await screen.findByText("Full name is required"); 
      expect(screen.queryByText("Application Data")).not.toBeInTheDocument();
    });
  });

  describe("filling the form", () => {
    it("puts what the user types into the inputs", async () => {
      const user = userEvent.setup();
      const { container } = render(<SubmitPage />);

      await fillForm(user, container);

      expect(screen.getByLabelText(/^full name/i)).toHaveValue("John Adeyemi");
      expect(screen.getByLabelText(/date of birth/i)).toHaveValue("1950-05-10");
      expect(screen.getByLabelText(/date of death/i)).toHaveValue("2026-01-15");
      expect(screen.getByLabelText(/^lga/i)).toHaveValue("Ikeja");
      expect(screen.getByLabelText(/burial site/i)).toHaveValue("Vaults Gardens Cemetery");
      expect(screen.getByLabelText(/caretaker name/i)).toHaveValue("Musa Bello");
      expect(screen.getByLabelText(/caretaker phone number/i)).toHaveValue("08012345678");
      expect(screen.getByLabelText(/applicant full name/i)).toHaveValue("Jane Adeyemi");
      expect(screen.getByLabelText(/email address/i)).toHaveValue("jane@example.com");
      expect(screen.getByLabelText(/^phone number/i)).toHaveValue("08087654321");
      expect(screen.getByRole("checkbox")).toBeChecked();
      expect(submitButton()).toBeEnabled();
    });

    it("clears a field's error once the user fixes it", async () => {
      const user = userEvent.setup();
      render(<SubmitPage />);

      await user.click(screen.getByRole("checkbox"));
      await user.click(submitButton());
      expect(await screen.findByText("Full name is required")).toBeInTheDocument();

      await user.type(screen.getByLabelText(/^full name/i), "John Adeyemi");

      await screen.findByDisplayValue("John Adeyemi");
      expect(screen.queryByText("Full name is required")).not.toBeInTheDocument();
      expect(screen.getByText("Your full name is required")).toBeInTheDocument();
    });
  });

  describe("submitting a filled form", () => {
    it("shows the Application Data section with every value entered", async () => {
      const user = userEvent.setup();
      const { container } = render(<SubmitPage />);

      await fillForm(user, container);
      await user.click(submitButton());

      expect(await screen.findByText("Application Data")).toBeInTheDocument();

      expect(screen.getByText("Full Name: John Adeyemi")).toBeInTheDocument();
      expect(screen.getByText("Applicant Name: Jane Adeyemi")).toBeInTheDocument();
      expect(screen.getByText("Caretaker Name: Musa Bello")).toBeInTheDocument();
      expect(screen.getByText("Caretaker Phone number: 08012345678")).toBeInTheDocument();
      expect(screen.getByText("Aplicant Email: jane@example.com")).toBeInTheDocument();
      expect(screen.getByText("Applicant Phone number: 08087654321")).toBeInTheDocument();
      expect(screen.getByText("Date of Birth: 1950-05-10")).toBeInTheDocument();
      expect(screen.getByText("Date of Death: 2026-01-15")).toBeInTheDocument();
      expect(screen.getByText("LGA: Ikeja")).toBeInTheDocument();
      expect(screen.getByText("Burial Site: Vaults Gardens Cemetery")).toBeInTheDocument();
      expect(screen.getByText("Death Certificate: death-cert.pdf")).toBeInTheDocument();
      expect(screen.getByText("Valid Id: valid-id.pdf")).toBeInTheDocument();
    });

    it("shows 'None' for the burial permit when none was uploaded", async () => {
      const user = userEvent.setup();
      const { container } = render(<SubmitPage />);

      await fillForm(user, container);
      await user.click(submitButton());

      expect(await screen.findByText("Burial Permit: None")).toBeInTheDocument();
    });

    it("shows the burial permit file name when one is uploaded", async () => {
      const user = userEvent.setup();
      const { container } = render(<SubmitPage />);

      await fillForm(user, container);
      await user.upload(getFileInputs(container)[2], makeFile("permit.pdf"));
      await user.click(submitButton());

      expect(await screen.findByText("Burial Permit: permit.pdf")).toBeInTheDocument();
    });
  });
});