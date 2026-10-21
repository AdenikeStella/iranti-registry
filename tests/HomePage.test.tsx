import HomePage from '@/app/page';
import { render, screen, within } from '@testing-library/react'


describe('HomePage', () => {
    it('should have the link to the search page on the nav bar ', () => {
        render (<HomePage />);

        const nav = screen.getByRole("navigation", {name: 'Main'});
        const link = within(nav).getByRole('link', {name: /search records/i});

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/pages/search');
    })
})