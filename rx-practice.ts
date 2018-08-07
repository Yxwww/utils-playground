import {
    Subject,
    pipe,
    of,
} from 'rxjs';
import {
    sampleTime,
    switchMap,
    debounceTime,
    tap,
} from 'rxjs/operators'
import { Observable } from 'rxjs';

const DEFAULT_INTERACT_AHEAD_SAMPLE = 300;
const DEFAULT_INTERACT_AHEAD_DEBOUNCE = 1000;
export const interactAheadSubject$ = (onSwitchMap: any) => {
    let existingUpdates = {};
    const updateSubject$ = new Subject();
    updateSubject$.pipe(
            sampleTime(DEFAULT_INTERACT_AHEAD_SAMPLE),
            debounceTime(DEFAULT_INTERACT_AHEAD_DEBOUNCE),
            switchMap(onSwitchMap),
            tap(console.log),
        )

    const next = (data: any) => {
        existingUpdates = {
            ...existingUpdates,
            ...data,
        };
        updateSubject$.next(existingUpdates);
    }

    return {
        next,
        updateSubject$,
        getUpdates: function() {
            return existingUpdates;
        }
    };
}

const { updateSubject$, next, getUpdates } = interactAheadSubject$((data) => {
    return of(data);
})

next({ test:'name' });
updateSubject$.subscribe((firstSubscribe) => {
    console.log({ firstSubscribe });
});
updateSubject$.subscribe((secondSubscribe) => {
    console.log({ secondSubscribe });
});
updateSubject$.next({ test1: 'subjectNext' });
const updates = getUpdates();
console.log({ updates })


