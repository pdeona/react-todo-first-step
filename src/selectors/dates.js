// @flow
import { createSelector } from 'reselect'
import type { AppState, DateState } from 'actions/types'

type DateSelector = (state: AppState) => DateState
const rootSelect: DateSelector = state => state.get('dates')

const makeSelectFrom = () => createSelector(
  rootSelect,
  (dateState: DateState): ?Date => dateState.get('from'),
)

const makeSelectTo = () => createSelector(
  rootSelect,
  (dateState: DateState): ?Date => dateState.get('to'),
)

export {
  makeSelectFrom,
  makeSelectTo,
}
