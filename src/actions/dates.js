// @flow
import type { DateAction, DateRange } from './types'

const selectDate = (input: DateRange): DateAction => ({
  type: 'SELECT_DATES',
  payload: input,
})

export default selectDate
