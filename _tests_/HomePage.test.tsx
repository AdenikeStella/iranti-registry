import {render, screen} from '@testing-library/react';
import HomePage from '@/app/page';

it('should show "why this matters" in the heading', () => {
    render(<HomePage/>) //ARRANGE

    const div = screen.getByText("why this matters") //ACT

    expect(div).toBeInTheDocument()  //ASSERT
})