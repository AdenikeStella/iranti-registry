import { render, screen, fireEvent } from '@testing-library/react';
import SearchPage from '@/app/pages/search/page';



jest.mock('@/app/lib/data/deaceasedRecords.json', () => ({
  __esModule: true,
  default: [
    { id: 1, full_name: 'Adaeze Okafor', state: 'Lagos', lga: 'Ikeja', date_of_birth: '1950-01-01', date_of_death: '2021-05-10', status: 'verified', short_bio: 'A kind teacher.' },
    { id: 2, full_name: 'Bola Adeyemi', state: 'Oyo', lga: 'Ibadan North', date_of_birth: '1940-02-02', date_of_death: '2015-03-03', status: 'pending', short_bio: 'A loving father.' },
    { id: 3, full_name: 'Chinedu Eze', state: 'Lagos', lga: 'Surulere', date_of_birth: '1960-03-03', date_of_death: '2023-07-07', status: 'verified', short_bio: 'A great trader.' },
    { id: 4, full_name: 'Ọlá Adébáyọ̀', state: 'Ogun', lga: 'Abeokuta', date_of_birth: '1930-04-04', date_of_death: '2010-08-08', status: 'verified', short_bio: 'A village elder.' },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: 100 + i,
      full_name: `Filler Person ${String(i + 1).padStart(2, '0')}`,
      state: 'Kano',
      lga: 'Nassarawa',
      date_of_birth: '1900-01-01',
      date_of_death: '2000-01-01',
      status: 'pending',
      short_bio: 'Filler record.',
    })),
  ],
}));

// ---------- SETUP ----------
// Your page calls window.scrollTo when you change pages.
// The pretend browser (jsdom) doesn't have it, so we give it a fake.
beforeEach(() => {
  window.scrollTo = jest.fn();
});

// ---------- HELPERS ----------
// Type a name into the search box and click the Search button.
function searchForName(text: string) {
  fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: text } });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));
}

// ---------- THE TESTS ----------
describe('SearchPage', () => {
  it('shows the title and all records at first', () => {
    render(<SearchPage />); // ARRANGE

    expect(screen.getByText('Search the Registry')).toBeInTheDocument(); // ASSERT
    expect(screen.getByText('14 records found')).toBeInTheDocument();
  });

  it('shows only 10 cards per page', () => {
    render(<SearchPage />);

    expect(screen.getAllByText('View Memorial')).toHaveLength(10);
  });

  // ----- searching by name -----
  it('finds a person by name after clicking Search', () => {
    render(<SearchPage />);

    searchForName('adaeze'); // ACT (small letters on purpose)

    expect(screen.getByText('Adaeze Okafor')).toBeInTheDocument(); // ASSERT
    expect(screen.queryByText('Bola Adeyemi')).not.toBeInTheDocument();
    expect(screen.getByText('1 record found')).toBeInTheDocument();
  });

  it('does not filter while you are still typing', () => {
    render(<SearchPage />);

    // type, but do NOT click Search
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'adaeze' } });

    expect(screen.getByText('14 records found')).toBeInTheDocument();
  });

  it('searches when you press Enter', () => {
    render(<SearchPage />);
    const box = screen.getByLabelText('Full Name');

    fireEvent.change(box, { target: { value: 'chinedu' } });
    fireEvent.keyDown(box, { key: 'Enter' });

    expect(screen.getByText('Chinedu Eze')).toBeInTheDocument();
    expect(screen.getByText('1 record found')).toBeInTheDocument();
  });

  it('ignores accents when searching', () => {
    render(<SearchPage />);

    searchForName('ola adebayo'); // typed WITHOUT accents

    expect(screen.getByText('Ọlá Adébáyọ̀')).toBeInTheDocument(); // record HAS accents
  });

  it('shows "No records found" when nothing matches', () => {
    render(<SearchPage />);

    searchForName('zzzzzz');

    expect(screen.getByText('No records found')).toBeInTheDocument();
    expect(screen.getByText('0 records found')).toBeInTheDocument();
  });

  // ----- state and year filters -----
  it('filters by state', () => {
    render(<SearchPage />);

    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Lagos' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByText('2 records found')).toBeInTheDocument();
    expect(screen.getByText('Adaeze Okafor')).toBeInTheDocument();
    expect(screen.getByText('Chinedu Eze')).toBeInTheDocument();
  });

  it('filters by year range', () => {
    render(<SearchPage />);

    fireEvent.change(screen.getByPlaceholderText('from'), { target: { value: '2020' } });
    fireEvent.change(screen.getByPlaceholderText('to'), { target: { value: '2023' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByText('2 records found')).toBeInTheDocument();
    expect(screen.queryByText('Bola Adeyemi')).not.toBeInTheDocument(); // died 2015
  });

  it('removes letters from the year boxes', () => {
    render(<SearchPage />);

    fireEvent.change(screen.getByPlaceholderText('from'), { target: { value: 'ab20' } });

    expect(screen.getByPlaceholderText('from')).toHaveValue('20');
  });

  // ----- quick filter buttons -----
  it('"Verified only" hides pending records', () => {
    render(<SearchPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Verified only' }));

    expect(screen.getByText('3 records found')).toBeInTheDocument();
    expect(screen.queryByText('Bola Adeyemi')).not.toBeInTheDocument();
  });

  it('"Recent" shows only people who died in 2020 or later', () => {
    render(<SearchPage />);

    fireEvent.click(screen.getByRole('button', { name: /recent/i }));

    expect(screen.getByText('2 records found')).toBeInTheDocument();
  });

  it('"All" brings everything back', () => {
    render(<SearchPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Verified only' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    expect(screen.getByText('14 records found')).toBeInTheDocument();
  });

  // ----- sorting -----
  it('sorts by most recent', () => {
    render(<SearchPage />);

    // the sort dropdown has no label, so we find it by what it shows right now
    fireEvent.change(screen.getByDisplayValue('Name A–Z'), { target: { value: 'recent' } });

    const names = screen.getAllByRole('heading', { level: 3 });
    expect(names[0]).toHaveTextContent('Chinedu Eze'); // died 2023, the newest
  });

  // ----- pages -----
  it('shows the "showing" text and disables Prev on page 1', () => {
    render(<SearchPage />);

    expect(screen.getByText(/showing 1.10 of 14/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
  });

  it('goes to page 2 when you click 2', () => {
    render(<SearchPage />);

    fireEvent.click(screen.getByRole('button', { name: '2' }));

    expect(screen.getByText(/showing 11.14 of 14/i)).toBeInTheDocument();
    expect(screen.getAllByText('View Memorial')).toHaveLength(4);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(window.scrollTo).toHaveBeenCalled(); // the page scrolled up
  });

  it('goes to page 2 with the Next button, then back with Prev', () => {
    render(<SearchPage />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/showing 11.14 of 14/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /prev/i }));
    expect(screen.getByText(/showing 1.10 of 14/i)).toBeInTheDocument();
  });
});