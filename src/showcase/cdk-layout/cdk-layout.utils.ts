import { type BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { type Observable, map } from 'rxjs';

/** Emits true while the viewport matches the `Handset` breakpoint. */
export const observeHandset = (observer: BreakpointObserver): Observable<boolean> =>
  observer.observe(Breakpoints.Handset).pipe(map((state) => state.matches));
