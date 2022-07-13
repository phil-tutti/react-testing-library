import React from 'react'
import {render, screen, act, waitFor} from '@testing-library/react'
import {DelayedForm} from '../DelayedForm'
import {DelayedFormXHR} from '../DelayedFormXHR'
import {DelayedFormFetch} from '../DelayedFormFetch'
import {DelayedFormFetchAwait} from '../DelayedFormFetchAwait'


describe('DelayedForm', () => {

    afterEach(() => {
        jest.useRealTimers()
    })

    describe("fetch", () => {
        it('does not work with faketimers',  done => {
            jest.useFakeTimers();
            setTimeout(() => {
                console.log("setTimeout in test")
            }, 10);
            render(<DelayedFormFetch />)

            console.log("before advanceTimersByTime 8");
            act(() => {
                jest.advanceTimersByTime(8)
            });
            console.log("after advanceTimersByTime 8");
            expect(screen.getByTestId("loading")).not.toBeNull();

            console.log("before advanceTimersByTime 1");
            act(() => {
                jest.advanceTimersByTime(1)
            });
            console.log("after advanceTimersByTime 1");

            expect(screen.getByTestId("loading")).not.toBeNull();
            console.log("before advanceTimersByTime 10");
            act(() => {
                jest.advanceTimersByTime(10)
            });
            act(() => {
                jest.runOnlyPendingTimers()
            })
            console.log("after advanceTimersByTime 10");
            expect(screen.getByText('request done')).not.toBeNull();
            act(() => {
                jest.runOnlyPendingTimers();
                jest.useRealTimers();
            });
            done();
        })

        it('works without faketimers', async () => {
            render(<DelayedFormFetch />)
            await waitFor(() => {
                expect(screen.getByText('request done')).not.toBeNull();
            });
        })
    })

    describe("fetch await", () => {
        it('does not work with faketimers',  done => {
            jest.useFakeTimers();
            setTimeout(() => {
                console.log("setTimeout in test")
            }, 10);
            render(<DelayedFormFetchAwait />)

            console.log("before advanceTimersByTime 8");
            act(() => {
                jest.advanceTimersByTime(8)
            });
            console.log("after advanceTimersByTime 8");
            expect(screen.getByTestId("loading")).not.toBeNull();

            console.log("before advanceTimersByTime 1");
            act(() => {
                jest.advanceTimersByTime(1)
            });
            console.log("after advanceTimersByTime 1");

            expect(screen.getByTestId("loading")).not.toBeNull();
            console.log("before advanceTimersByTime 10");
            act(() => {
                jest.advanceTimersByTime(10)
            });
            act(() => {
                jest.runOnlyPendingTimers()
            })
            console.log("after advanceTimersByTime 10");
            expect(screen.getByText('request done')).not.toBeNull();
            act(() => {
                jest.runOnlyPendingTimers();
                jest.useRealTimers();
            });
            done();
        })

        it('works without faketimers', async () => {
            render(<DelayedFormFetchAwait />)
            await waitFor(() => {
                expect(screen.getByText('request done')).not.toBeNull();
            });
        })
    })

    describe("XHR", () => {
        it('does not work with faketimers',  done => {
            jest.useFakeTimers();
            setTimeout(() => {
                console.log("setTimeout in test")
            }, 10);
            render(<DelayedFormXHR />)

            console.log("before advanceTimersByTime 8");
            act(() => {
                jest.advanceTimersByTime(8)
            });
            console.log("after advanceTimersByTime 8");
            expect(screen.getByTestId("loading")).not.toBeNull();

            console.log("before advanceTimersByTime 1");
            act(() => {
                jest.advanceTimersByTime(1)
            });
            console.log("after advanceTimersByTime 1");

            expect(screen.getByTestId("loading")).not.toBeNull();
            console.log("before advanceTimersByTime 10");
            act(() => {
                jest.advanceTimersByTime(10)
            });
            act(() => {
                jest.runOnlyPendingTimers()
            })
            console.log("after advanceTimersByTime 10");
            expect(screen.getByText('request done')).not.toBeNull();
            act(() => {
                jest.runOnlyPendingTimers();
                jest.useRealTimers();
            });
            done();
        })

        it('works without faketimers', async () => {
            render(<DelayedFormXHR/>)
            await waitFor(() => {
                expect(screen.getByText('request done')).not.toBeNull();
            });
        })

    })

    const Delayed = () => {
        const [state, setState] = React.useState("");
        setTimeout(() => {
            setState("halleluja");
        }, 10);

        if (state === "") {
            return <div>loading...</div>
        }

        return <div>{state}</div>
    }

    it("sanity test that  setTimeout works with faketimers", () => {
        jest.useFakeTimers();

        render(<Delayed/>);
        expect(screen.getByText("loading...")).not.toBeNull();

        act(() => {
            jest.advanceTimersByTime(10)
        });
        expect(screen.getByText("halleluja")).not.toBeNull();
        jest.useRealTimers();
    });
})
