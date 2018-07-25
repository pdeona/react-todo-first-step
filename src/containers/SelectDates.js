// @flow
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import compose from 'lodash/fp/compose'
import SelectDates from 'components/SelectDates'
import selectDate from 'actions/dates'
import {
  makeSelectFrom,
  makeSelectTo,
} from 'selectors/dates'

const mapStateToProps = createStructuredSelector({
  from: makeSelectFrom(),
  to: makeSelectTo(),
})

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onSelectDay: compose(dispatch, selectDate),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withConnect(SelectDates)
